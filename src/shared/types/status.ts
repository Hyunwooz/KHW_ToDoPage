export type StatusColor = 'green' | 'blue' | 'red' | 'yellow';
export type Task = { title: string; index: number; toDoLists: string[] };

export interface TaskStatus {
  name: string;
  totalTasks: number;
  color: StatusColor;
  tasks: Task[];
}
