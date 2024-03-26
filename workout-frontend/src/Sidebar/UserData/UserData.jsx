import {useState, useEffect} from 'react'

import styles from './UserData.module.css'
import { useAuth } from "../../AuthContext.jsx"

function UserData() {

  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(false);

  const { userToken  } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/user", {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${userToken.access_token}`
     }})
    .then((response) => response.json())
    .then((data) => setData(data), setAuth(true), console.log(data))
    .catch((err) => console.error(err), setAuth(false));
  }, []);

  return (
  <>
  <div className={styles.outerDiv}>
    {auth ?
      <div className={styles.data}>
      <p>My Data</p>
      <label>Username</label>
      <input type="text" value={data.user.username}/>
      </div>
      :
      <div className={styles.failedData}>
      <p>Authentification Failed</p>
      </div>
    }
  </div>
  </>
  )
}

export default UserData
