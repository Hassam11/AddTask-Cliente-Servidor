import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createTask, getTask, updateTask } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTaks] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaks({
      ...task,
      [e.target.name]: e.target.value,
    });
    // console.log({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Estudiar por que pasa esto
    const currentDate = new Date();

    // Formatear la fecha y hora en el formato adecuado (YYYY-MM-DD HH:mm:ss)
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const updatedTaskData = {
      ...task,
      datetime: formattedDate,
    };

    if (id) {
      await updateTask(id, updatedTaskData);
    } else {
      await createTask(task);
    }
    navigate("/");
  };

  useEffect(() => {
    async function getTaskById(id: number) {
      try {
        const response = await getTask(id);
        const taskData = response.data;
        setTaks(taskData); // Actualiza el estado con los detalles de la tarea obtenidos
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }

    if (id) {
      getTaskById(Number(id)); // Convierte el ID a número y llama a la función
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 ">
      <div className="text-2xl bg-slate-800 p-4 rounded-md ">
        {id ? (
          <h2 className="font-bold uppercase text-4xl text-white py-5 text-center">Editar Tarea</h2>
        ) : (
          <h2 className="font-bold uppercase text-4xl text-white py-5 text-center">Añadir Tarea</h2>
        )}
        <form onSubmit={handleSubmit} className="text-center flex flex-col">
          <input
            name="title"
            type="text"
            placeholder="Add Task"
            onChange={handleChange}
            value={task.title}
            className="mb-4 px-3 py-3 rounded font-mono"
          />
          <textarea
            name="description"
            placeholder="Add Description"
            rows={3}
            onChange={handleChange}
            value={task.description}
            className="mb-4 px-4 py-2 rounded font-mono"
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
