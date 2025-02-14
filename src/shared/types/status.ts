import { Board } from './board';

export type StatusColor = 'green' | 'blue' | 'red' | 'gray';
export interface Status {
  statusNo: number;
  name: string;
  color: StatusColor;
  boards: Board[];
}
