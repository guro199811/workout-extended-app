import { 
  createContext, 
  useContext, 
  useState, 
  useEffect } from "react";

const AuthContext = createContext();

function isTokenExpired(token) {
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= exp * 1000;
}

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const parsedToken = JSON.parse(storedToken);
      if (!isTokenExpired(parsedToken.access_token)) {
        setUserToken(parsedToken);
      } else {
        localStorage.removeItem("accessToken");
        window.location.reload();
      }
    }
    const intervalId = setInterval(() => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);
        if (isTokenExpired(parsedToken.access_token)) {
          setUserToken(null);
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      }
    }, 60000); // 60000 ms = 1 minute

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  

  useEffect(() => {
    if (userToken) {
      const access = userToken.access_token;
      if (localStorage.getItem("accessToken") !== access) {
        localStorage.setItem("accessToken", JSON.stringify(userToken));
      }
    }
  }, [userToken]);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
