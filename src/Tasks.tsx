import { useState } from "react";
import { Button } from "react-bootstrap";
import Queue from './Queue';

type TasksProps = {
  exerciseQueue: Queue<string>;
  setExerciseQueue: React.Dispatch<React.SetStateAction<Queue<string>>>;
};

export default function Tasks({ exerciseQueue, setExerciseQueue }: TasksProps) {
  const [currentExercise, setCurrentExercise] = useState<string>("");

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (currentExercise.trim()) {
      exerciseQueue.enqueue(currentExercise);
      setExerciseQueue(new Queue<string>(exerciseQueue.getItems())); 
      setCurrentExercise("");
    }
    console.log(exerciseQueue.getItems());
  }

  return (
    <div id="tasksField" className="form-group">
      <form id="formTasks">
        <input
          type="text"
          className="form-control"
          id="exerInput"
          placeholder="Enter the name of your exercise"
          value={currentExercise}
          onChange={(e) => setCurrentExercise(e.target.value)}
        />
        <div>
          <Button onClick={handleAdd}>Queue</Button>
          <Button
            onClick={() => {
              if (exerciseQueue.size() > 0) {
                exerciseQueue.dequeue();
                setExerciseQueue(new Queue<string>(exerciseQueue.getItems()));
              }
            }}
            className="ms-1"
          >
            Dequeue
          </Button>
        </div>
      </form>
      <div className="mt-4">
        <h5>Current Exercise Queue:</h5>
        <ul>
          {exerciseQueue.getItems().map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
