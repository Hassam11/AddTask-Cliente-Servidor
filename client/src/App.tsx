import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
