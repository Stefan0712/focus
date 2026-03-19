import { useState, useMemo } from 'react';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector } from 'react-redux';
import { db } from '../../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import NewTask from './NewTask';
import {ITask} from '../../../db';
import { useAppSelector } from '../../../hooks/hooks';




const Tasks = ({selectedCategory}: {selectedCategory: string}) => {
    const isMaximized = useAppSelector(state=>state.appSettings.isPomodoroMinimized);
    const [editTask, setEditTask] = useState<ITask | null>(null);
    
    const tasks = useLiveQuery(async () => {
        const allTasks = await db.tasks.toArray();
        return allTasks.sort((a, b) => {
            // Move completed tasks to the bottom
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1; 
            }
            // Move pinned tasks at the top
            if (a.isPinned !== b.isPinned) {
                return a.isPinned ? -1 : 1; 
            }
            // Sort tasks that are not completed and pinned by createdAt and keep them in the middle
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    });

    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        if (selectedCategory === 'all') {
            return tasks;
        }
        if (selectedCategory === 'pinned') {
            return tasks.filter(item => item.isPinned);
        }
        return tasks;
    }, [tasks, selectedCategory]);



    return ( 
        <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''}`}>  
            <div className={styles.container}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <Task 
                            data={task} 
                            key={task.id} 
                            onEdit={()=>setEditTask(task)}
                        />
                    ))
                    ) : (
                    <p>No tasks</p>
                )}
            </div>
            <NewTask data={editTask} resetEdit={()=>setEditTask(null)}/>
        </div>
    );
   
}
 
export default Tasks;