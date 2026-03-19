import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './Tasks.module.css';
import { db, ITask } from '../../../db';
import { v4 as uuidv4 } from 'uuid';


const NewTask = ({data, resetEdit}: {data: ITask | null, resetEdit: ()=>void}) => {

    const [title, setTitle] = useState(data?.title ?? '');
    const [priority, setPriority] = useState(data?.priority ?? 'normal');

    const addNewTask = async () => {
        if(title.length < 2) return;
        try {
            const newTask: ITask = {
                id: data?.id ?? uuidv4(),
                createdAt: data?.createdAt ?? new Date(),
                isCompleted: data?.isCompleted ??  false,
                priority,
                title,
                editMode: data?.editMode ?? false,
                isPinned: data?.isPinned ?? false,
                isDeleted: data?.isDeleted ?? false
            }
            await db.tasks.put(newTask);
            resetEdit();
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        if(data && data.title && data.priority) {
            setTitle(data.title)
            setPriority(data.priority)
        }
    },[data])

    const cancelEdit = () => {
        resetEdit();
        setTitle('')
        setPriority('normal')
    }
    return (
        <div className={styles.newTask} style={data ? {gridTemplateColumns: '40px 2fr 1fr 40px'} : {}}>
            {data ? <button onClick={cancelEdit}><IconLibrary.Close /></button> : null}
            <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                minLength={2}
                maxLength={50}
                placeholder='Task title...'
            />
            <select name='priority' onChange={(e)=>setPriority(e.target.value)} value={priority}>
                <option value={'low'}>Low</option>
                <option value={'normal'}>Normal</option>
                <option value={'high'}>High</option>
            </select>
            <button onClick={addNewTask}>{data ? <IconLibrary.Save /> : <IconLibrary.Plus />}</button>
        </div>
    )
}

export default NewTask;