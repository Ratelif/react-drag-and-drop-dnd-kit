import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Tartalom 1" },
    { id: 2, title: "Tartalom 2" },
    { id: 3, title: "Tartalom 3" },
    { id: 4, title: "Tartalom 4" },
    { id: 5, title: "Tartalom 5" },
    { id: 6, title: "Tartalom 6" },
    { id: 7, title: "Tartalom 7" },
    { id: 8, title: "Tartalom 8" },
    { id: 9, title: "Tartalom 9" },
    { id: 10, title: "Tartalom 10" },
    { id: 11, title: "Tartalom 11" },
    { id: 12, title: "Tartalom 12" },
    { id: 13, title: "Tartalom 13" },
  ]);

  const addTask = (title) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title }]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const showTaks = () => {
    console.log(tasks)
  }

  return (
    <div className="App">
      {/* <h1>My Tasks ✅</h1> */}
      
      <button onClick={showTaks} className="show-tasks">Lista konzolba</button>
      {/* <Input onSubmit={addTask} /> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column id="toDo" tasks={tasks} />
      </DndContext>
    </div>
  );
}
