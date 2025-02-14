import { Todo } from './todo';

export interface Board {
  boardNo: number;
  statusNo: number;
  title: string;
  todos: Todo[];
}
