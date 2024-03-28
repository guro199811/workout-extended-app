import { useState, useEffect } from "react";

import styles from "./UserData.module.css";
import { useAuth } from "../../AuthContext.jsx";

function UserData() {
  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(false);

  const { userToken, setUserToken } = useAuth();
  if (!userToken) {
    setUserToken(localStorage.getItem('accessToken'));
  }
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user", {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
        setAuth(true);
        console.log(data);
      } catch (error) {
        console.error(
          "There has been a problem with fetch operation:",
          error
        );
        setAuth(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.outerDiv}>
        {auth ? (
          <div className={styles.data}>
            <p>My Data</p>
            <label>Username</label>
            <input type="text" />
          </div>
        ) : (
          <div className={styles.failedData}>
            <p>Authentification Failed</p>
          </div>
        )}
      </div>
    </>
  );
}

export default UserData;
