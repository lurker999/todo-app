export interface Task {
    id: number;
    title: string;
    createdAt: number;
    updatedAt: number;
  }

  export interface TaskPage {
    content: Task[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
  }