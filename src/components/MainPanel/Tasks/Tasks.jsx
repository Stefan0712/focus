import { useState, useEffect } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './Tasks.module.css';
import Task from './Task/Task';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../db';




const Tasks = () => {



    const isMaximized = useSelector(state=>state.appSettings.isPomodoroMinimized);


    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]); 

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showDeleted, setShowDeleted] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);




    const getTasks = async () =>{
        try{
            const response = await db.tasks.toArray();
            if(response && response.length > 0){
                setTasks(response)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{getTasks()},[]);
    
    const addNewTask = () => {
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
        setTasks(prev=>[...prev, newTask]);
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

    return ( 
        <div className={`${styles.tasks} ${isMaximized ? styles['extended-tasks'] : ''}`}>  
            <div className={`${styles.header} `}>
                <div className={styles.categories}>
                    <button className={selectedCategory === "all" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('all')}>All</button>
                    <button className={selectedCategory === "not-completed" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('not-completed')}>Not Completed</button>
                    <button className={selectedCategory === "pinned" ? styles.selectedCategory : ''} onClick={()=>setSelectedCategory('pinned')}>Pinned</button>
                </div>
                <button className={styles.newTaskButton} onClick={addNewTask}>
                    <IconLibrary.Plus className='small-icon'/>
                </button>
            </div>
            <div className={styles.container}>
                {tasks && tasks.length > 0 ? 
                    tasks?.map(task=>(<Task data={task} key={task.id} handleUpdate={handleUpdate} />))
                : <p>No tasks</p>}
            </div>
        </div>
    );
   
}
 
export default Tasks;