import { useState, useEffect, useMemo } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../db';




const Tasks = () => {



    const isMaximized = useSelector(state=>state.appSettings.isPomodoroMinimized);


    const [tasks, setTasks] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCompleted, setShowCompleted] = useState(false);


    const filteredTasks = useMemo(() => {
        if (!tasks) return [];
        if (selectedCategory === 'all') {
            return tasks;
        }
        if (selectedCategory === 'pinned') {
            return tasks.filter(item => item.isPinned);
        }
        if (selectedCategory === 'deleted') {
            return tasks.filter(item => item.isDeleted);
        }
        return tasks;
    }, [tasks, selectedCategory]);

    const getTasks = async () =>{
        try{
            const response = await db.tasks.toArray();
            if(response && response.length > 0){
                setTasks(response);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{getTasks()},[]);
    
    const addNewTask = async () => {
        try {
            const newTask = {
                id: uuidv4(),
                createdAt: new Date(),
                isCompleted: false,
                priority: 'normal',
                title: '',
                editMode: true,
                isPinned: false,
                isDeleted: false
            }
            setTasks(prev=>[newTask, ...prev]);
            await db.tasks.add(newTask);
        } catch (error) {
            console.error(error);
        }
    };


   const handleUpdate = (item) => {
        setTasks(prev => {
            const exists = prev.some(i => i.id === item.id);
            if (exists) {
                return prev.map(i => i.id === item.id ? item : i);
            } else {
                return [...prev, item];
            }
        });
    };
    const safeTasks = filteredTasks || [];
    const notDeletedTasks = safeTasks.filter(task => selectedCategory !== "deleted" ? !task.isDeleted : task);
    const activeTasks = notDeletedTasks.filter(task => !task.isCompleted);
    const completedTasks = notDeletedTasks.filter(task => task.isCompleted);

    return ( 
        <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''}`}>  
            <div className={`${styles.header} `}>
                <div className={styles.categories}>
                    <button className={selectedCategory === "all" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('all')}>All</button>
                    <button className={selectedCategory === "pinned" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('pinned')}>Pinned</button>
                    <button className={selectedCategory === "deleted" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('deleted')}>Deleted</button>
                </div>
                <button className={styles.newTaskButton} onClick={addNewTask}>
                    <IconLibrary.Plus className='small-icon'/>
                </button>
            </div>
            <div className={styles.container}>
                {activeTasks.length > 0 ? (
                    activeTasks.map(task => (
                        <Task 
                            data={task} 
                            key={task.id} 
                            handleUpdate={handleUpdate} 
                        />
                    ))
                    ) : (
                    completedTasks.length === 0 && <p>No tasks</p>
                )}
                {completedTasks.length > 0 && (
                    <div className={styles.completedTasks}>
                        <div className={styles.completedTasksHeader} onClick={() => setShowCompleted(!showCompleted)} style={{ cursor: 'pointer' }}>
                            <b>Completed tasks ({completedTasks.length})</b>
                            <IconLibrary.ExpandLeft className="small-icon" style={{ transform: showCompleted ? 'rotate(-90deg)' : 'rotate(0deg)' }}/>
                        </div>
                        {showCompleted && completedTasks.map(task => (
                            <Task 
                                data={task} 
                                key={task.id} 
                                handleUpdate={handleUpdate} 
                            />
                        ))}
                    </div>
                )}
            
            </div>
        </div>
    );
   
}
 
export default Tasks;