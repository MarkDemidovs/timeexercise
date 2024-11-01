import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from './Tasks';
import Queue from './Queue';


let exerciseLength = 60; // in seconds
let pause = 100; // in seconds

export default function App() {
  const [exerciseQueue, setExerciseQueue] = useState<Queue<string>>(new Queue<string>());
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        handleDequeue();
      }, exerciseLength * 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, exerciseQueue]);

  function handleDequeue() {
    if (exerciseQueue.size() > 0) {
      const dequeuedExercise = exerciseQueue.dequeue();
      setExerciseQueue(new Queue<string>(exerciseQueue.getItems())); // Update queue
      setCurrentExercise(dequeuedExercise ?? null); // Update the current exercise
    } else {
      console.log("Queue is empty.");
      setIsRunning(false); // Stop if queue is empty
    }
  }

  return (
    <div id="appMain">
      <h1 className="display-3">{currentExercise || "00:00"}</h1>
      <div id="screenBtn">
        <Button variant="primary" onClick={() => setIsRunning(true)}>Start</Button>
        <Button variant="danger" onClick={() => setIsRunning(false)}>Stop</Button>
        <Button variant="success" onClick={handleDequeue}>Next</Button>
      </div>
      <Tasks exerciseQueue={exerciseQueue} setExerciseQueue={setExerciseQueue} />
    </div>
  );
}
