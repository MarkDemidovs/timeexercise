import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from './Tasks';
import Queue from './Queue';

let exerciseLength = 35; // seconds
let pause = 60; // seconds

export default function App() {
  const [exerciseQueue, setExerciseQueue] = useState<Queue<string>>(new Queue<string>());
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(exerciseLength);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning && (exerciseQueue.size() > 0 || isResting)) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);

        if (timer <= 0) {
          handleNext();  
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isResting, timer, exerciseQueue]);

  function handleDequeue() {
    if (exerciseQueue.size() > 0) {
      const dequeuedExercise = exerciseQueue.dequeue();
      setExerciseQueue(new Queue<string>(exerciseQueue.getItems()));
      setCurrentExercise(dequeuedExercise ?? null);
      setTimer(exerciseLength);
    } else {
      console.log("Queue is empty.");
      setIsRunning(false);
      setCurrentExercise("00:00");
    }
  }

  function handleStart() {
    if (!isRunning && currentExercise === null && exerciseQueue.size() > 0) {
      handleDequeue();  
      setTimer(exerciseLength);
    }
    setIsRunning(true);
  }

  function handleNext() {
    if (isResting) {
      setIsResting(false);
      handleDequeue();
    } else {
      setIsResting(true);
      setCurrentExercise("Resting...");
      setTimer(pause); 
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  return (
    <div id="appMain">
      <h1 className="display-3">
        {currentExercise ? `${currentExercise} - ${formatTime(timer)}` : "00:00"}
      </h1>
      <div id="screenBtn">
        <Button variant="primary" onClick={handleStart}>Start</Button>
        <Button variant="danger" onClick={() => setIsRunning(false)}>Stop</Button>
        <Button variant="success" onClick={handleNext}>Next</Button>
      </div>
      <Tasks exerciseQueue={exerciseQueue} setExerciseQueue={setExerciseQueue} />
    </div>
  );
}
