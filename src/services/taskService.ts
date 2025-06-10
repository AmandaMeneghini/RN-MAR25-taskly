import { Task, Subtask } from '../interfaces/task';
import apiClient from './apiClient';

/**
* Maps a task object from the frontend format to the format expected by the API for creation.
* This is kept separate as the creation payload might differ from the update payload.
* @param taskData - Task data in frontend format for creation.
* @returns An object ready to be sent to the API.
*/
const mapTaskToApiForCreate = (taskData: Partial<Task>): any => {
  const apiPayload: any = { ...taskData };

  if (apiPayload.isCompleted !== undefined) {
    apiPayload.done = apiPayload.isCompleted;
    delete apiPayload.isCompleted;
  }
  
  if (apiPayload.categories !== undefined) {
    apiPayload.tags = apiPayload.categories;
    delete apiPayload.categories;
  }

  return apiPayload;
};

/**
* Maps a task object returned by the API to the frontend format.
* @param apiTask - Task data in API format.
* @returns A task object in frontend format.
*/
const mapApiToTask = (apiTask: any): Task => {
    const frontendTask: any = { ...apiTask };

    if (frontendTask.done !== undefined) {
      frontendTask.isCompleted = frontendTask.done;
      delete frontendTask.done;
    }

    if (frontendTask.tags !== undefined) {
      frontendTask.categories = frontendTask.tags;
      delete frontendTask.tags;
    }

    if (frontendTask.subtasks) {
        frontendTask.subtasks = frontendTask.subtasks.map((sub: any, index: number) => ({
            id: sub.id || `${Date.now()}-${index}`,
            text: sub.title,
            isCompleted: sub.done,
        }));
    }
  
    return frontendTask as Task;
};


/**
* Fetches all tasks for the authenticated user from the API.
* @returns A promise that resolves to an array of tasks in the frontend format.
*/
export const getTasksAPI = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get('/tasks');
    return response.data.map(mapApiToTask);
  } catch (error) {
    console.error('[taskService] Erro ao buscar tarefas:', error);
    throw error;
  }
};

/**
* Creates a new task in the backend.
* @param taskData - The data of the new task in the frontend format.
* @returns The new task created, already in the frontend format.
*/
export const createTaskAPI = async (taskData: Partial<Task>) => {
  try {
    const apiPayload = mapTaskToApiForCreate(taskData);
    const response = await apiClient.post('/tasks', apiPayload);
    return mapApiToTask(response.data);
  } catch (error) {
    console.error('[taskService] Erro ao criar tarefa:', error);
    throw error;
  }
};

/**
* Updates an existing task in the backend.
* This function is now responsible for ALL frontend-to-backend data mapping for updates.
* @param taskId - The ID of the task to update.
* @param taskUpdateData - The fields of the task to update, in the frontend format.
* @returns The API response.
*/
export const updateTaskAPI = async (taskId: string, taskUpdateData: Partial<Task>) => {
  try {

    const apiPayload: any = { ...taskUpdateData };


    if (apiPayload.isCompleted !== undefined) {
      apiPayload.done = apiPayload.isCompleted;
      delete apiPayload.isCompleted;
    }

    if (apiPayload.categories !== undefined) {
      apiPayload.tags = apiPayload.categories;
      delete apiPayload.categories;
    }

    if (apiPayload.subtasks) {
        apiPayload.subtasks = apiPayload.subtasks.map((sub: Subtask) => ({
            title: sub.text,
            done: sub.isCompleted,
        }));
    }

    const response = await apiClient.put(`/tasks/${taskId}`, apiPayload);
    return response;

  } catch (error) {
    console.error(`[taskService] Erro ao atualizar tarefa ${taskId}:`, error);
    throw error;
  }
};

/**
* Deletes a task from the backend.
* @param taskId - The ID of the task to delete.
* @returns The API response.
*/
export const deleteTaskAPI = async (taskId: string) => {
  try {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    console.error(`[taskService] Erro ao deletar tarefa ${taskId}:`, error);
    throw error;
  }
};
