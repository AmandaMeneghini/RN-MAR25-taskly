import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../Screens/Home'; // ajuste o caminho se necessário

const TASKS_KEY = 'tasks';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
    throw error;
  }
};

export const updateTask = async (
  taskId: string,
  updateFn: (task: Task) => Task
): Promise<void> => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updated = updateFn(task);
        if (!updated) throw new Error('updateFn retornou undefined');
        return updated;
      }
      return task;
    });

    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error(`Erro ao atualizar tarefa ${taskId}:`, error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(updatedTasks);
  } catch (error) {
    console.error(`Erro ao deletar tarefa ${taskId}:`, error);
    throw error;
  }
};
