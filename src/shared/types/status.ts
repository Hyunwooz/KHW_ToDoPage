export type StatusColor = 'green' | 'blue' | 'red' | 'yellow';
export type Task = { title: string; toDoLists: string[] };

export interface TaskStatus {
  name: string;
  color: StatusColor;
  tasks: Task[];
}
