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
    <div>
      <h2>Añadir Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Add Task"
          onChange={handleChange}
          value={task.title}
        />
        <textarea
          name="description"
          placeholder="Add Description"
          rows={3}
          onChange={handleChange}
          value={task.description}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
