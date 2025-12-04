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


    return ( 
        <div className={`${styles.mainPanel} ${isMinimized ? styles['extended'] : ''} ${isPanelExpanded ? styles['hide-nav'] : ''}`}>
            <div className={`${styles.navigation} ${isPanelExpanded ? styles.hide : ''}`}>
                {settings.showFullscreenButton && window.innerWidth < 1000  ? <button className={styles['fullscreen-button']} onClick={isFullscreen() ? exitFullScreen : enterFullScreen} >
                    <img className='small-icon' src={isFullscreen() ? IconLibrary.DisableFullscreen : IconLibrary.EnableFullscreen} alt='enable fullscreen' /></button> : null}
                <div className={styles.buttons}>
                    <button onClick={()=>setSelectedScreen('tasks')} className={selectedScreen === "tasks" ? styles.selected : ''}>Tasks</button>
                    {settings.showHistoryButton ? (<button onClick={()=>setSelectedScreen('history')} className={selectedScreen === "history" ? styles.selected : ''}>History</button>) : null}
                    <button onClick={()=>setSelectedScreen('settings')} className={selectedScreen === "settings" ? styles.selected : ''}>Settings</button>
                </div>
                   {settings.showMaximizeButton ? (
                    <button className={styles['maximize-panel-button']} onClick={()=>setIsPanelExpanded(true)}>
                        <img className='small-icon' src={IconLibrary.Maximize} alt='toggle panel maximize'></img>
                    </button> 
                   ) : null}
            </div>
            <div className={styles.content}>
                    {isPanelExpanded ?
                        <button className={styles['minimize-panel-button']} onClick={()=>setIsPanelExpanded(false)}>
                            <img className='small-icon' src={IconLibrary.Minimize} alt='minimize panel'></img>
                        </button> 
                    : null} 
                {selectedScreen === "tasks" ? <Tasks /> : selectedScreen === "history" ? <History /> : selectedScreen === "settings" ? <Settings /> : <Tasks />}
            </div>
        </div>
     );
}
 
export default MainPanel;