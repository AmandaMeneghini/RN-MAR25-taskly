export interface Subtask {
    id: string;
    text: string;
    isCompleted: boolean;
  }

  export interface Task {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    categories?: string[];
    priority?: number;
    deadline?: string | null | undefined;
    subtasks?: Subtask[];
    createdAt: number;
  }