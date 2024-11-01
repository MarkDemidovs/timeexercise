import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

class Queue {
    private data: any[]; 

    constructor(q: any[] = []) {
        this.data = q;
    }

    enqueue(value: any): void {
        this.data.push(value); 
    }

    size(): number {
        return this.data.length; 
    }

    dequeue(): any {
        if (this.size() < 1) {
            throw new Error("Empty Queue");
        }
        return this.data.shift();
    }

    peek(): any {
        if (this.size() < 1) {
            return null;
        }
        return this.data[0];
    }

    getItems(): any[] {
        return this.data;
    }
}

export default function Tasks() {
  const [currentExercise, setCurrentExercise] = useState<string>("");
  const [exerciseQueue, setExerciseQueue] = useState<Queue>(new Queue());

  function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (currentExercise.trim()) {
      exerciseQueue.enqueue(currentExercise);
      setExerciseQueue(new Queue(exerciseQueue.getItems()));
      setCurrentExercise(""); 
    }

    console.log(exerciseQueue.getItems());
  }

  function handleDequeue() {
    if (exerciseQueue.size() > 0) {
      const removedExercise = exerciseQueue.dequeue();
      setExerciseQueue(new Queue(exerciseQueue.getItems()));
      console.log(`Removed exercise: ${removedExercise}`);
    } else {
      console.log("Queue is empty.");
    }
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
            <Button onClick={handleDequeue} className="ms-1">Dequeue</Button>
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
