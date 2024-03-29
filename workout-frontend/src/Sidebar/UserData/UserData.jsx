import { useState, useEffect } from "react";

import styles from "./UserData.module.css";
import { useAuth } from "../../AuthContext.jsx";

function UserData() {
  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(false);
  const [bmi, setBMI] = useState(0);

  const { userToken, setUserToken } = useAuth();
  if (!userToken) {
    setUserToken(localStorage.getItem("accessToken"));
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
        const BMI = () => {
          const weight = data.weight;
          const height = data.height;
          const bmi = weight / (height * height);
          setBMI(bmi);
        }
        BMI();
      } catch (error) {
        console.error("There has been a problem with fetch operation:", error);
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
            <div className={styles.firstWrapper}>
              <p>My Data</p>
            </div>

            <div className={styles.secondWrapper}>
              <label>Full Name</label>
              <input type="text" value={data.fullname} readOnly disabled />
              <label>Weight</label>
              <input type="text" value={data.weight} readOnly disabled />
              <label>Height</label>
              <input type="text" value={data.height} readOnly disabled />
            </div>

            <div className={styles.thirdWrapper}>
              <label>BMI</label>
              <input type="text" value={bmi} readOnly disabled />
              <button className={styles.bmiButton}>Manual Bmi</button>
            </div>

            <div className={styles.fourthWrapper}>
              <button>
                <i className="bx bx-edit"></i>
              </button>
            </div>
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
