import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../api/api";
import { Task } from "../interface/Task";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await getTasks();
        setTasks(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      // Eliminar la tarea de la lista localmente
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async (taskId: number) => {
    navigate(`/edit-task/${taskId}`);
  };

  return (
    <div>
      <h2>Listar Tareas</h2>
      <div>
        <div>
          <Link to="create-task">Crear</Link>
        </div>
        <div>
          {tasks.map(({ id, title, description, datetime }: Task) => {
            return (
              <div key={id}>
                <span>{title.toUpperCase()}</span>
                <p>{description}</p>
                <p>{datetime}</p>
                <div>
                  <button onClick={() => handleEdit(id)}>Editar</button>
                  <button onClick={() => handleDelete(id)}>Eliminar</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
