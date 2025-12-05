import { setSetting } from '../../store/appSettingsSlice';
import Toggle from '../common/Toggle';
import styles from './Pomodoro.module.css';
import { useSelector, useDispatch } from 'react-redux';

const PomodoroSettings = () => {

    const dispatch = useDispatch();
    const settings = useSelector(state=>state.appSettings.pomodoroSettings);


    const updateValue = (property, value) => {
        console.log(property, value)
        dispatch(setSetting({property, value}))
    }
    return ( 
        <div className={styles.settings}>
            <div className={styles['settings-container']}>
                <div className={styles['setting']}>
                    <p>Duration of Focus Sessions: (min)</p>
                    <input type='number' min={0} value={settings.focusDuration} onChange={(e)=>updateValue('focusDuration',e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Duration of Break Sessions: (min)</p>
                    <input type='number' min={0} value={settings.breakDuration} onChange={(e)=>updateValue('breakDuration', e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Include long break</p>
                    <Toggle isActive={settings.includeLongBreaks} functionToRun={()=>updateValue('includeLongBreaks', !settings.includeLongBreaks)} />
                </div>
                {settings.includeLongBreaks ? 
                    <div className={styles['setting']}>
                        <p>Duration of Long Breaks: (min)</p>
                        <input type='number' name='longBreak' min={0} value={settings.longBreakDuration} onChange={(e)=>updateValue('longBreakDuration', e.target.value)}></input>
                    </div> 
                : null}
                <div className={styles['setting']}>
                    <p>Long Break each </p>
                    <input type='number' min={3} value={settings.longBreakFrequency} onChange={(e)=>updateValue('longBReakFrequency',e.target.value)}></input>
                </div>
                <div className={styles['setting']}>
                    <p>Enable Notifications</p>
                    <Toggle isActive={settings.enableNotifications} functionToRun={()=>updateValue('enableNotifications', !settings.enableNotifications)} />
                </div>
                <div className={styles['setting']}>
                    <p>Auto Skip Sessions</p>
                    <Toggle isActive={settings.autoSkip} functionToRun={()=>updateValue('autoSkip', !settings.autoSkip)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Timer Progress</p>
                    <Toggle isActive={settings.showTimerRing} functionToRun={()=>updateValue('showTimerRing', !settings.showTimerRing)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Minimized Timer Progress</p>
                    <Toggle isActive={settings.showMinimizedTimerProgress} functionToRun={()=>updateValue('showMinimizedTimerProgress', !settings.showMinimizedTimerProgress)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Sessions Counter</p>
                    <Toggle isActive={settings.showSessionCounter} functionToRun={()=>updateValue('showSessionCounter', !settings.showSessionCounter)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Current Session</p>
                    <Toggle isActive={settings.showCurrentSession} functionToRun={()=>updateValue('showCurrentSession', !settings.showCurrentSession)} />
                </div>
                <div className={styles['setting']}>
                    <p>Show Buttons</p>
                    <Toggle isActive={settings.showBottomButtons} functionToRun={()=>updateValue('showBottomButtons', !settings.showBottomButtons)} />
                </div>
            </div>
        </div>
     );
}
 
export default PomodoroSettings;