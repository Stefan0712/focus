import { useState } from 'react';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './Task.module.css';
import {db, ITask} from '../../../../db';



const Task = ({data, onEdit}: {data: ITask, onEdit: ()=>void}) => {

    const [expandTask, setExpandTask] = useState(false);
    const deleteTask = async () => {
        try {
            await db.tasks.delete(data.id)
        } catch (error) {
            console.error(error);
        }
    }
    const toggleCompletion = async (newState: boolean) =>{
        try{
            await db.tasks.update(data.id, {isCompleted: newState})
        } catch (error) {
            console.error(error)
        }
    }
    const togglePin = async (newState: boolean) =>{
        try{
            await db.tasks.update(data.id, {isPinned: newState})
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <div className={styles.task} style={data.isCompleted ? {opacity: '0.5'} : {}}>
            <div className={styles.main}>
                <h4 onClick={()=>setExpandTask(prev=>!prev)}>{data.title}</h4>
                {data.isPinned ? <IconLibrary.Pin className={`${styles['task-pin-icon']}`} /> : <div />}
                {data.isCompleted ? 
                    <button className={styles.checkedButton} onClick={()=>toggleCompletion(!data.isCompleted)}><IconLibrary.Checkmark className='small-icon' /></button> : 
                    <input type='checkbox' onChange={()=>toggleCompletion(!data.isCompleted)} checked={data.isCompleted}></input>
                }
            </div>
            {expandTask ? 
                <div className={styles.buttons} style={data.isCompleted ? {display: 'flex'} : {}}>
                    {!data.isCompleted ? <button onClick={()=>togglePin(!data.isPinned)}><IconLibrary.Pin className="medium-icon" /> {data.isPinned ? 'Unpin' : 'Pin'}</button> : null}
                    <button onClick={deleteTask}><><IconLibrary.Delete className="medium-icon"/> Delete</></button>
                    {!data.isCompleted ? <button onClick={onEdit}><IconLibrary.Edit className="medium-icon" /> Edit</button> : null}
                </div> : 
            null}
        </div>
     );
}
 
export default Task;