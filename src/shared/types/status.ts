export type StatusColor = 'green' | 'blue' | 'red' | 'yellow';

export interface TaskStatus {
  name: string;
  totalTasks: number;
  color: StatusColor;
  toDoLists: string[];
}
