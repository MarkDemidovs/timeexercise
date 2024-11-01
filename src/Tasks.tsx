import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Tasks() {
  const [currentExercise, setCurrentExercise] = useState<string>("");
  const [exercises, setExercises] = useState<string[]>([]);

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (currentExercise.trim()) {
      console.log(currentExercise);
      setExercises((prevExercises) => [...prevExercises, currentExercise]);
      setCurrentExercise("");
    }
    console.log(exercises);
  }

  return (
    <div id="tasksField" className="form-group">
      <form id="formTasks">
        <input
          type="email"
          className="form-control"
          id="exerInput"
          aria-describedby="emailHelp"
          placeholder="Enter the name of your exercise"
          onChange={(e) => setCurrentExercise(e.target.value)}
        ></input>
        <Button onClick={handleAdd}>Add</Button>
      </form>
    </div>
  );
}
