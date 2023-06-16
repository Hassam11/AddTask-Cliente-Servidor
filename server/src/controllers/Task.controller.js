import { pool } from "../../db.js";

export const getTasks = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM tasks");
  res.json(result);
  console.log(result);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  // console.log(req.params)
  const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", id);
  res.json(result[0]);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description]
  );
//   console.log(rows);
  res.send({
    id: rows.insertId,
    title,
    description,
  });
  // console.log(title, description)
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  // console.log("Edit ", title, description, " and edit id ", id)
  const [result] = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
    req.body,
    id,
  ]);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  return res.send({
    id,
    title,
    description,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
//   console.log("Eliminado id: " + id);
  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", id);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  return res.sendStatus(204);
};
