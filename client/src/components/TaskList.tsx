import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../api/api";
import { Task } from "../interface/Task";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigate = useNavigate();

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
    <div className="h-screen bg-slate-900">
      <div className="flex justify-end container gap-10">
      <h2 className="text-white text-3xl font-bold ">Tareas: {tasks.length}</h2>
        <Link
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4  text-xl uppercase rounded"
          to="create-task"
        >
          Crear
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="container p-4 flex justify-center ">
          <div className="grid grid-cols-3 gap-4 w-4/5">
            {tasks.map(({ id, title, description, datetime }: Task) => {
              return (
                <div
                  className=" bg-white shadow-md rounded-lg p-6 flex flex-col"
                  key={id}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {title.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 mb-4">{description}</p>
                  <p className="text-gray-400 text-sm">{datetime}</p>
                  <div className="mt-auto">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 text-sm uppercase rounded mr-2"
                      onClick={() => handleEdit(id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 text-sm uppercase rounded"
                      onClick={() => handleDelete(id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;

