import { createContext, 
  useContext, 
  useState,
  useEffect
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUserToken(localStorage.getItem('accessToken'));
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      const access = userToken.access_token;
      if (localStorage.getItem("accessToken") !== access) {
        localStorage.setItem("accessToken", access);
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