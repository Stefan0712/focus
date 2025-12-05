import './App.css';
import MainPanel from './components/MainPanel/MainPanel.jsx';
import Pomodoro from './components/Pomodoro/Pomodoro.jsx';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFullscreen } from './store/appSettingsSlice';
import NoSleep from 'nosleep.js';


const noSleep = new NoSleep();

function App() {


  const settings = useSelector((state)=>state.appSettings);

  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
          dispatch(toggleFullscreen(true))
      } else {
          dispatch(toggleFullscreen(false))
      }
    };
    

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
    
  }, []);

  useEffect(() => {
    document.documentElement.className = settings.theme;
    console.log('Theme was changed')
  }, [settings.theme]);

  useEffect(() => {
    if (settings.isScreenAwakeOn) {
        noSleep.enable();
    } else {
        noSleep.disable();
    }
  }, [settings.isScreenAwakeOn]);


  return (
    <div className={`App ${settings.isSwapped ? 'swapped' : ''}`}>
      <MainPanel />
      <Pomodoro />
    </div>
  );
}

export default App;
