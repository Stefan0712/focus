import Dexie from "dexie";

export const db = new Dexie('MyTaskDatabase');

db.version(2).stores({
  tasks: 'id, title, createdAt, isCompleted',
  log: 'createdAt'
});