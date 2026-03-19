import Dexie, { type Table } from "dexie";

export interface ITask {
  id: string; 
  createdAt: Date;
  isCompleted: boolean;
  priority: string;
  title: string;
  editMode: boolean;
  isPinned: boolean;
  isDeleted: boolean;
}

export interface ILog {
  id?: number;
  startTime: string | null,
  createdAt: Date,
  totalTimeElapsed: number,
  longBreaks: number,
  breaks: number,
  focusSessions: number,
}

export class FocusDatabase extends Dexie {
  tasks!: Table<ITask, string>; 
  logs!: Table<ILog, number>;

  constructor() {
    super('MyTaskDatabase');
    this.version(4).stores({
      tasks: 'id, createdAt, isCompleted, isPinned, priority',
      logs: 'createdAt' 
    });
  }
}

export const db = new FocusDatabase();