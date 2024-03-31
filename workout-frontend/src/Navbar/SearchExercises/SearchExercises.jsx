import { useState, useEffect } from "react";
import styles from "./SearchExercises.module.css";

function SearchExercises() {
  useEffect(() => {
    fetch("http://localhost:8000/exercise/sorted/exercise_type")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <div className={styles.bg}>
      <div className={styles.window}>
        <input type="text" placeholder="Search By" />
        <select>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <div className={styles.search} >
          {/* Populated from searchbox */}
        </div>
      </div>
    </div>
    </>
  );
}

export default SearchExercises;
