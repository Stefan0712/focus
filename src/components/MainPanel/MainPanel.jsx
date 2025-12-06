import styles from './MainPanel.module.css';
import { useState } from 'react';
import Tasks from './Tasks/Tasks.jsx';
import History from './History/History.jsx';
import Settings from '../SideMenu/Settings/Settings.jsx';
import { useSelector } from 'react-redux';
import { IconLibrary } from '../../IconLibrary';
import Menu from './Menu/Menu.jsx';


const MainPanel = () => {
    const [selectedScreen, setSelectedScreen] = useState('tasks');
    const isMinimized = useSelector(state=>state.appSettings.isPomodoroMinimized);
    const [isPanelExpanded, setIsPanelExpanded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    return ( 
        <div className={`${styles.mainPanel} ${isMinimized ? styles['extended'] : ''}`}>
            {showMenu ? <Menu close={()=>setShowMenu(false)} selectScreen={(screen)=>setSelectedScreen(screen)} /> : null}
            <div className={styles.appHeader}>
                <button onClick={()=>setShowMenu(true)}><IconLibrary.Menu className="medium-icon"/></button>
                <h3>{selectedScreen === "tasks" ? "Tasks" : selectedScreen === "history" ? "History" : selectedScreen === "settings" ? "Settings" : selectedScreen === "pomodoro-settings" ? " Pomodoro Settings" : null}</h3>
            </div>
            <div className={styles.content}>
                {isPanelExpanded ?
                    <button className={styles['minimize-panel-button']} onClick={()=>setIsPanelExpanded(false)}>
                        <IconLibrary.Minimize className='small-icon' />
                    </button> 
                : null} 
                {selectedScreen === "tasks" ? <Tasks /> : selectedScreen === "history" ? <History /> : selectedScreen === "settings" ? <Settings />  : <Tasks />}
            </div>
        </div>
     ); 
}
 
export default MainPanel;

