import { useState, useEffect } from "react";

import styles from "./UserData.module.css";
import { useAuth } from "../../AuthContext.jsx";

function UserData() {
  const [data, setData] = useState(null);
  const [auth, setAuth] = useState(false);
  const [bmi, setBMI] = useState(0);

  const [manualBmi, setManualBMI] = useState(false);
  const [manualCalculatedBMI, setManualCalculatedBMI] = useState(0)
  const [manualWeight, setManualWeight] = useState(0);
  const [manualHeight, setManualHeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState('Kg');
  const [heightUnit, setHeightUnit] = useState('Cm');

  const [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    if (manualWeight && manualHeight) {
      let weightInKg = weightUnit === 'Lb' ? manualWeight * 0.453592 : manualWeight;
      let heightInMeters = heightUnit === 'F/I' ? (manualHeight * 0.0254) : manualHeight / 100;
      const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setManualCalculatedBMI(calculatedBmi);
    }
  }, [manualWeight, manualHeight, weightUnit, heightUnit]);

  const handleManualBmi = () => {
    setManualBMI(!manualBmi);
  }

  const handleManualWeight = (e) => {
    setManualWeight(e.target.value);
  }

  const handleManualHeight = (e) => {
    setManualHeight(e.target.value);
  }

  const editUserData = () => {
    setEditMode(!editMode);
  }

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
              <input type="text" value={data.fullname} readOnly={!editMode} 
              disabled={!editMode} onChange={(e) => 
              setData({...data, fullname: e.target.value})} />
              <label>Weight</label>
              <input type="text" value={data.weight} readOnly={!editMode} 
              disabled={!editMode} onChange={(e) => 
              setData({...data, weight: e.target.value})} />
              <label>Height</label>
              <input type="text" value={data.height} readOnly={!editMode} 
              disabled={!editMode} onChange={(e) => 
              setData({...data, height: e.target.value})} />
            </div>


            <div className={styles.thirdWrapper}>
              <label>BMI</label>
              <input type="text" value={bmi} readOnly disabled />
              <button className={styles.bmiButton} onClick={() => handleManualBmi()}>Manual Bmi</button>
            </div>

            <div className={styles.fourthWrapper}>
              <button className={styles.editButton}
              onClick={() => editUserData()}>
                <i className="bx bx-edit"></i>
              </button>
              {editMode && 
              <button className={styles.saveButton}
              onClick={() => handleSave()}>
                <i className='bx bxs-save'></i>
              </button>}
            </div>

            <div className={`${styles.manualBmi}
            ${manualBmi ? styles.active : ''}`}>
              <p>Bmi Calculator</p>
              <h3>{manualCalculatedBMI}</h3>
              <label>Weight</label>
              <input type='text' onChange={(e) => handleManualWeight(e)} />
              <div className={styles.radio}>
                <input type="radio" value="Kg" id='kg'
                 checked={weightUnit === 'Kg'}
                 onChange={() => setWeightUnit('Kg')} /> 
                 <label for='kg'>Kg</label>
                <input type="radio" value="Lb" id='lb'
                 checked={weightUnit === 'Lb'}
                 onChange={() => setWeightUnit('Lb')} />
                 <label for='lb'>Lb</label>
              </div>
              <label>Height</label>
              <input type='text' onChange={(e) => handleManualHeight(e)} />
              <div className={styles.radio}>
                <input type="radio" value="Cm" id="cm"
                 checked={heightUnit === 'Cm'}
                 onChange={() => setHeightUnit('Cm')} /> 
                 <label for='cm'>Cm</label>
                <input type="radio" value="F/I" id='fi'
                 checked={heightUnit === 'F/I'}
                 onChange={() => setHeightUnit('F/I')} />
                 <label for='fi'>F/I</label>
              </div>
              <button onClick={() => handleManualBmi()}>Close</button>
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
