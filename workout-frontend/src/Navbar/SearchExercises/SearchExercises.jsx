import { useState, useEffect } from "react";
import styles from "./SearchExercises.module.css";

function SearchExercises({ onClose }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");

  useEffect(() => {
    fetch("http://localhost:8000/exercise/sorted/exercise_type")
      .then((response) => response.json())
      .then((data) => {
        setData(data.exercises);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (event) => {
    setSearchField(event.target.value);
  };

  const filteredData = data.filter((exercise) =>
    exercise[searchField] &&
     typeof exercise[searchField] === 'string' &&
      exercise[searchField].toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
      <div className={styles.bg} onClick={ onClose }>
        <div className={styles.window}>
          <input type="text" placeholder="Search By" onChange={ handleSearch } />
          <select onChange={ handleSelect }>
            <option value="exercise_name">Name</option>
            <option value="exercise_type_name">Type</option>
          </select>


          <div className={styles.search}>
            {filteredData.map((exercise) => (
              <div key={exercise.exercise_id}>{exercise.exercise_name}</div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default SearchExercises;

