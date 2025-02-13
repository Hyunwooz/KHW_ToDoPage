import { Board } from './board';

export type StatusColor = 'green' | 'blue' | 'red' | 'yellow';
export interface Status {
  statusNo: number;
  name: string;
  color: StatusColor;
  boards: Board[];
}
