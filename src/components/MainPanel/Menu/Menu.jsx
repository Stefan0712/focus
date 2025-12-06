import { IconLibrary } from '../../../IconLibrary';
import Toggle from '../../common/Toggle';
import styles from './Menu.module.css';
import { enterFullScreen, exitFullScreen, isFullscreen } from '../../../helpers.js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppSetting, toggleScreenAwake } from '../../../store/appSettingsSlice.js';

const Menu = ({close, selectScreen}) => {

    const dispatch = useDispatch();
    const settings = useSelector((state)=>state.appSettings);
    const [isScreenAwakeOn, setIsScreenAwakeOn] = useState(false);

    const toggleIsScreenAwake = () =>{
        if(isScreenAwakeOn) {
            dispatch(toggleScreenAwake(false));
            setIsScreenAwakeOn(false);
        }else if(!isScreenAwakeOn){
            dispatch(toggleIsScreenAwake(true));
            setIsScreenAwakeOn(true)
        }
    }

    const navigateTo = (screen) => {
        selectScreen(screen);
        close();
    }
    return (
        <div className={styles.menu}>
            <div className={styles.menuHeader}>
                <h2>Menu</h2>
                <button onClick={close}><IconLibrary.Close /></button>
            </div>
            <div className={styles.menuSection}>
                <button className={styles.menuBtn} onClick={()=>navigateTo('tasks')}>Tasks</button>
                <button className={styles.menuBtn} onClick={()=>navigateTo('history')}>History</button>
                <button className={styles.menuBtn} onClick={()=>navigateTo('settings')}>Settings</button>
            </div>
            <div className={styles.quickSettings}>
                <div className={styles.setting}>
                    <b>Toggle Fullscreen</b>
                    <Toggle isActive={isFullscreen()} functionToRun={()=>isFullscreen() ? exitFullScreen() : enterFullScreen()}/>
                </div>
                <div className={styles.setting}>
                    <b>Keep Screen Awake</b>
                    <Toggle isActive={isScreenAwakeOn} functionToRun={toggleIsScreenAwake} />
                </div>
                <div className={styles.setting}>
                    <b>Minimize Timer</b>
                    <Toggle isActive={settings.isPomodoroMinimized} functionToRun={()=>dispatch(setAppSetting({property: 'isPomodoroMinimized', value: !settings.isPomodoroMinimized}))} />
                </div>
                {/* <div className={styles.setting}>
                    <b>Maximize Timer</b>
                    <Toggle />
                </div> */}
            </div>
        </div>
    )
}
export default Menu;