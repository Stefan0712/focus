import { useState } from 'react';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './Task.module.css';
import {db} from '../../../../db';

const Task = ({data, handleUpdate}) => {

    const [expandTask, setExpandTask] = useState(false);
    const [editMode, setEditMode] = useState(data.editMode ?? false);

    // Used for editing a task
    const [title, setTitle] = useState(data.title ?? 'No title')
    const [priority, setPriority] = useState(data.priority ?? 'normal')

    const saveUpdate = async (updates) => {
        console.log(updates)
        try {
            await db.tasks.update(data.id, {...updates});
            handleUpdate({...data, ...updates});
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
        
    }
    return ( 
        <div className={styles.task}>
            {editMode ? 
                <div className={styles.editTask}>
                    <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Task...' minLength={2} />
                    <select type='priority' name='priority' onChange={(e)=>setPriority(e.target.value)} value={priority}>
                        <option value={'low'}>Low</option>
                        <option value={'normal'}>Normal</option>
                        <option value={'high'}>High</option>
                    </select>
                    <button className={styles.confirmEdit} onClick={()=>saveUpdate({title, priority, editMode: false})}><IconLibrary.Checkmark className="medium-icon" /></button>
                </div> :
                <div className={styles.main}>
                    <h4 style={data.isCompleted ? {textDecoration: 'line-through'} : null}  onClick={()=>setExpandTask(prev=>!prev)}>{data.title}</h4>
                    {data.isPinned ? <IconLibrary.Pin className={`${styles['task-pin-icon']}`} /> : <div />}
                    {data.isCompleted ? 
                        <button className={styles.checkedButton} onClick={()=>handleUpdate({...data, isCompleted: !data.isCompleted})}><IconLibrary.Checkmark className='small-icon' /></button> : 
                        <input type='checkbox' onChange={()=>handleUpdate({...data, isCompleted: !data.isCompleted})} checked={data.isCompleted}></input>
                    }
                </div>
            }   
            { expandTask && !editMode ? 
                <div className={styles.buttons}>
                    <button onClick={()=>saveUpdate({isPinned: !data.isPinned})}><IconLibrary.Pin className="medium-icon" /> {data.isPinned ? 'Unpin' : 'Pin'}</button>
                    <button onClick={()=>saveUpdate({isDeleted: !data.isDeleted})}>{data.isDeleted ? <><IconLibrary.Delete className="medium-icon" />  Restore</> : <><IconLibrary.Delete className="medium-icon" /> Delete</> }</button>
                    <button onClick={()=>setEditMode(true)}><IconLibrary.Edit className="medium-icon" /> Edit</button>
                </div> : 
            null}
        </div>
     );
}
 
export default Task;