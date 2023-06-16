import axios, { AxiosResponse } from 'axios';

// Definir la URL base de tu API
const baseURL = 'http://localhost:4000/api';

// Configurar instancia de Axios con la URL base
const api = axios.create({
  baseURL,
});

// Definir funciones para realizar las llamadas a la API
export const getTasks = async (): Promise<AxiosResponse> => {
  return api.get('/tasks');
};

export const getTask = async (id: number): Promise<AxiosResponse> => {
    return api.get(`/tasks/${id}`);
  };

export const createTask = (taskData: object): Promise<AxiosResponse> => {
  return api.post('/tasks', taskData);
};

export const updateTask = (taskId: string, taskData: object): Promise<AxiosResponse> => {
  return api.put(`/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId: number): Promise<AxiosResponse> => {
  return api.delete(`/tasks/${taskId}`);
};
