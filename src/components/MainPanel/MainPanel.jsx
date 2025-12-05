import styles from './MainPanel.module.css';
import { useState } from 'react';
import Tasks from './Tasks/Tasks.jsx';
import History from './History/History.jsx';
import Settings from '../SideMenu/Settings/Settings.jsx';
import { useSelector } from 'react-redux';
import { enterFullScreen, exitFullScreen, isFullscreen } from '../../helpers';
import { IconLibrary } from '../../IconLibrary';


const MainPanel = () => {
    const [selectedScreen, setSelectedScreen] = useState('home');
    const isMinimized = useSelector(state=>state.appSettings.isPomodoroMinimized);
    const settings = useSelector((state)=>state.appSettings);
    const [isPanelExpanded, setIsPanelExpanded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    return ( 
        <div className={`${styles.mainPanel} ${isMinimized ? styles['extended'] : ''} ${isPanelExpanded ? styles['hide-nav'] : ''}`}>
            {showMenu ? <QuickMenu close={()=>setShowMenu(false)} hideNavigation={()=>setIsPanelExpanded(true)} /> : null}
            <div className={`${styles.navigation} ${isPanelExpanded ? styles.hide : ''}`}>
                <div className={styles.buttons}>
                    <button onClick={()=>setSelectedScreen('tasks')} className={selectedScreen === "tasks" ? styles.selected : ''}>Tasks</button>
                    <button onClick={()=>setSelectedScreen('history')} className={selectedScreen === "history" ? styles.selected : ''}>History</button>
                    <button onClick={()=>setSelectedScreen('settings')} className={selectedScreen === "settings" ? styles.selected : ''}>Settings</button>
                </div>
                <button className={styles['menu-button']} onClick={()=>setShowMenu(prev=>!prev)}>
                    <IconLibrary.Dots className='small-icon' />
                </button> 
            </div>
            <div className={styles.content}>
                {isPanelExpanded ?
                    <button className={styles['minimize-panel-button']} onClick={()=>setIsPanelExpanded(false)}>
                        <IconLibrary.Minimize className='small-icon' />
                    </button> 
                : null} 
                {selectedScreen === "tasks" ? <Tasks /> : selectedScreen === "history" ? <History /> : selectedScreen === "settings" ? <Settings /> : <Tasks />}
            </div>
        </div>
     );
}
 
export default MainPanel;

const QuickMenu = ({close, hideNavigation}) => {

    return (
        <div className={styles.quickMenu}>
            <button onClick={isFullscreen() ? exitFullScreen : enterFullScreen}>{isFullscreen() ? 'Disable ' : 'Enable '} Fullscreen</button>
            <button>Minimize Timer</button>
            <button onClick={hideNavigation}>Hide Navigation</button>
            <button onClick={close}>Close</button>
        </div>
    )
}