import { useState, useEffect, useRef } from "react";
import styles from "./Home.module.css";

function Home() {
  const [data, setData] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isOuterDivActive, setIsOuterDivActive] = useState(false);
  const [isInnerDivActive, setIsInnerDivActive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/exercise/sorted/exercise_type")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err))
  }, []);
  
  const handleClick = (type) => {
    setIsOuterDivActive(true);
    setIsInnerDivActive(true);
    setSelectedType(type);
  };

  const closeOuterDiv = () => {
    setIsOuterDivActive(false);
    setIsInnerDivActive(false);
    setSelectedType(null);
  };

  const selectedExercises = data?.exercises.filter(
    (exercise) => exercise.exercise_type_name === selectedType
  );

  return (
    <div className={styles.content}>
      <div className={styles.infoDiv}>
        <p>
          This Website Is designed to empower users to achieve their fitness
          goals. It offers a secure authentication system, personalized goal
          tracking, customizable schedule creation, weight tracking, and a
          library of preset exercises, as time progresses new exerciese will be
          added soon.
        </p>
      </div>
      <div className={styles.exerciseType}>
        <div
          className={styles.exerciseTypeDiv}
          onClick={() => handleClick("Endurence")}
        >
          <a>Endurance</a>
        </div>
        <div
          className={styles.exerciseTypeDiv}
          onClick={() => handleClick("Strength")}
        >
          <a>Strength</a>
        </div>
        <div
          className={styles.exerciseTypeDiv}
          onClick={() => handleClick("Balance")}
        >
          <a>Balance</a>
        </div>
        <div
          className={styles.exerciseTypeDiv}
          onClick={() => handleClick("Flexibility")}
        >
          <a>Flexibility</a>
        </div>
      </div>

      <div
        className={`${styles.exerciseOuterDiv}
            ${isOuterDivActive ? styles.active : ""}`}
        onClick={() => closeOuterDiv()}
      >
        <div
          className={`${styles.exerciseInnerDiv}
                ${isInnerDivActive ? styles.active : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {selectedExercises?.map((exercise) => (
            <div key={exercise.exercise_name}>
              <h2>{exercise.exercise_name}</h2>
              <p>Description: {exercise.description}</p>
              <p>Instructions: {exercise.instructions}</p>
              <p>Target Muscles: {exercise.target_muscles}</p>
              <p>Difficulty: {exercise.difficulty}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
