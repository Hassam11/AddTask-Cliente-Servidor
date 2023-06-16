import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <h2 className="font-bold text-3xl dark:bg-slate-900 dark:text-white py-3 uppercase text-center">AddTask Cliente-Servidor</h2>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
