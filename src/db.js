import Dexie from 'dexie';

export const db = new Dexie('MyTaskDatabase');

db.version(1).stores({
  tasks: '++id, title, isDone, createdAt, isCompleted',
  log: 'createdAt'
});