import styles from './Settings.module.css';
import { enterFullScreen, exitFullScreen } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks } from '../../../store/tasksSlice';
import { resetAppSettings, resetSnapshot, setAppSetting, setSetting, toggleScreenAwake } from '../../../store/appSettingsSlice';
import Toggle from '../../common/Toggle';
import { IconLibrary } from '../../../IconLibrary';
import { useState } from 'react';


const Settings = () => {

    const dispatch = useDispatch();
    
    const settings = useSelector((state)=>state.appSettings);
    const timerSettings = settings.pomodoroSettings;

    const [confirmDelete, setConfirmDelete] = useState(null);

    const toggleScreenAwakeOn = () =>{
        dispatch(toggleScreenAwake(true))

    }
    const toggleScreenAwakeOff = () =>{
        dispatch(toggleScreenAwake(false))
    }
    const handleDelete = settingName =>{
        if(settingName === 'settings'){
            dispatch(resetAppSettings())
        }else if(settingName === 'tasks'){
            dispatch(resetTasks())
        }
        setConfirmDelete(null);
    }
    const updateValue = (property, value) => {
        dispatch(setSetting({property, value}))
    }
    return ( 
        <div className={`${styles.settings} ${settings.isPomodoroMinimized ? styles['extended-settings'] : ''}`}>
            <div className={styles.settingsSection}>
                <b>General Settings</b>
                <div className={styles.setting}>
                    <h3>Fullscreen</h3>
                    <div className={styles['setting-buttons']}>
                        <Toggle isActive={settings.isFullscreen} functionToRun={settings.isFullscreen ? exitFullScreen : enterFullScreen} />
                    </div>
                </div>
                <div className={styles.setting}>
                    <h3>Keep Screen Awake</h3>
                    <Toggle isActive={settings.isScreenAwakeOn} functionToRun={settings.isScreenAwakeOn ? toggleScreenAwakeOff : toggleScreenAwakeOn} />  
                </div>
                <div className={styles.setting}>
                    <h3>Swap Panels</h3>
                    <Toggle isActive={settings.isSwapped} functionToRun={()=>dispatch(setAppSetting({property: 'isSwapped', value: !settings.isSwapped}))} />  
                </div>
                <h3>Theme</h3>
                <select className={styles.themeSelector} onChange={(e)=>dispatch(setAppSetting({ property: 'theme', value: e.target.value }))} value={settings.theme}>
                    <option value={'dark-theme'}>Dark</option>
                    <option value={'light-theme'}>Light</option>
                    <option value={'amoled-theme'}>Amoled</option>
                    <option value={'sakura-theme'}>Sakura</option>
                    <option value={'miku-theme'}>Miku</option>
                </select>
            </div>
            <div className={styles.settingsSection}>
                <b>Reset</b>
                <div className={styles.setting}>
                    <button className={styles['theme-button']} onClick={()=>dispatch(resetSnapshot())}><p>Reset Snapshot</p></button>
                </div>
                <div className={styles.setting}>
                    <button onClick={()=>setConfirmDelete('settings')}>Settings</button>
                    {confirmDelete === 'settings' ? 
                    <div className={styles['confirm-delete-buttons']}>
                        <button onClick={()=>handleDelete('settings')}><IconLibrary.Checkmark className={'medium-icon'} /></button>
                        <button onClick={()=>setConfirmDelete(null)}><IconLibrary.Close className={'medium-icon'} /></button>
                    </div>
                    : null}
                </div>
                <div className={styles.setting}>
                    <button onClick={()=>setConfirmDelete('tasks')}>Tasks</button>
                    {confirmDelete === 'tasks' ? 
                    <div className={styles['confirm-delete-buttons']}>
                        <button onClick={()=>handleDelete('tasks')}><IconLibrary.Checkmark className={'medium-icon'} /></button>
                        <button onClick={()=>setConfirmDelete(null)}><IconLibrary.Close className={'medium-icon'} /></button>
                    </div>
                    : null}
                </div>
            </div>
            <div className={styles.settingsSection}>
                <b>Timer Settings</b>
                <div className={styles['setting']}>
                    <p>Duration of Focus Sessions: (min)</p>
                    <input type='number' min={0} value={timerSettings.focusDuration} onChange={(e)=>updateValue('focusDuration',e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Duration of Break Sessions: (min)</p>
                    <input type='number' min={0} value={timerSettings.breakDuration} onChange={(e)=>updateValue('breakDuration', e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Include long break</p>
                    <Toggle isActive={timerSettings.includeLongBreaks} functionToRun={()=>updateValue('includeLongBreaks', !timerSettings.includeLongBreaks)} />
                </div>
                {timerSettings.includeLongBreaks ? 
                    <div className={styles['setting']}>
                        <p>Duration of Long Breaks: (min)</p>
                        <input type='number' name='longBreak' min={0} value={timerSettings.longBreakDuration} onChange={(e)=>updateValue('longBreakDuration', e.target.value)}></input>
                    </div> 
                : null}
                <div className={styles['setting']}>
                    <p>Long Break each </p>
                    <input type='number' min={3} value={timerSettings.longBreakFrequency} onChange={(e)=>updateValue('longBReakFrequency',e.target.value)}></input>
                </div>
            </div>
            <div className={styles.settingsSection}>
                <b>Customize TImer</b>
                <div className={styles['setting']}>
                    <p>Enable Notifications</p>
                    <Toggle isActive={timerSettings.enableNotifications} functionToRun={()=>updateValue('enableNotifications', !timerSettings.enableNotifications)} />
                </div>
                <div className={styles['setting']}>
                    <p>Auto Skip Sessions</p>
                    <Toggle isActive={timerSettings.autoSkip} functionToRun={()=>updateValue('autoSkip', !timerSettings.autoSkip)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Timer Progress</p>
                    <Toggle isActive={timerSettings.showTimerRing} functionToRun={()=>updateValue('showTimerRing', !timerSettings.showTimerRing)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Minimized Timer Progress</p>
                    <Toggle isActive={timerSettings.showMinimizedTimerProgress} functionToRun={()=>updateValue('showMinimizedTimerProgress', !timerSettings.showMinimizedTimerProgress)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Sessions Counter</p>
                    <Toggle isActive={timerSettings.showSessionCounter} functionToRun={()=>updateValue('showSessionCounter', !timerSettings.showSessionCounter)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Current Session</p>
                    <Toggle isActive={timerSettings.showCurrentSession} functionToRun={()=>updateValue('showCurrentSession', !timerSettings.showCurrentSession)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Buttons</p>
                    <Toggle isActive={timerSettings.showBottomButtons} functionToRun={()=>updateValue('showBottomButtons', !timerSettings.showBottomButtons)} />
                </div>
            </div>
        </div>
     );
}
 
export default Settings;