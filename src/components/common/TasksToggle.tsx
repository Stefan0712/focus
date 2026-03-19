import styles from './TasksToggle.module.css';


interface TasksToggleProps {
    currentCategory: string;
    selectCategory: (category: string) => void;
}
const TasksToggle: React.FC<TasksToggleProps> = ({currentCategory, selectCategory}) => {



    return (
        <div className={styles.toggleContainer}>
            <button onClick={()=>selectCategory('all')} className={`${currentCategory === 'all' ? styles.selectedBtn : ''} ${styles.btn}`}>All</button>
            <button onClick={()=>selectCategory('pinned')} className={`${currentCategory === 'pinned' ? styles.selectedBtn : ''} ${styles.btn}`}>Pinned</button>
        </div>
    )
}

export default TasksToggle;