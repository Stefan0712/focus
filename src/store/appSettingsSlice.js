import { createSlice } from '@reduxjs/toolkit';

// Default settings
const initialState = {
    language: 'en',
    showFullScreenPrompt: true,
    isFullscreen: false,
    isScreenAwakeOn: false,
    showNotifications: true,
    showFullscreenButton: true,
    pomodoroSettings: {
        zenMode: false,
        focusDuration: 25,
        breakDuration: 5,
        longBreakDuration: 30,
        longBreakFrequency: 3,
        includeLongBreaks: true,
        enableNotifications: false,
        autoSkip: false,
        showTimerRing: true,//
        showMinimizedTimerProgress: true,
        sessionEndAnimation: true,
        showMinimizeButton: true,
        showSessionCounter: true,
        showCurrentSession: true,
        showBottomButtons: true,
    },
    snapshot: null,
    theme: 'dark-theme',
    isPomodoroMinimized: false,
    isTasksMaximized: false,
    isSwapped: false,
    showMaximizeButton: true,
    showHistoryButton: true,
    showHomeButton: true,
    showAboutButton: true,
    showTasksHistory: true,
    showTasksSummary: true,
    showWorkHistory: true,


};

const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleFullscreen: (state, action) =>{
            state.isFullscreen = action.payload
        },
        toggleScreenAwake: (state, action) =>{
            state.isScreenAwakeOn = action.payload
        },
        setSetting: (state, action) => {
            const { property, value } = action.payload;
            state.pomodoroSettings[property] = value; 
        },
        updateSetting: (state, action) =>{
            const { settingKey, value } = action.payload;
            // Ensure the settingKey is valid 
            if (state.hasOwnProperty(settingKey)) {
                console.log(action.payload)
                state[settingKey] = value;
            }
        },
        setAppSetting: (state, action) => {
            const { property, value } = action.payload;
            state[property] = value; 
        },
        saveSnapshot: (state, action) =>{
            const snapshot = action.payload;
            if(!state.snapshot){
                state.snapshot = null;
            }
            state.snapshot = snapshot;
        },
        deleteSnapshot: (state) =>{
            if(!state.snapshot){
                state.snapshot = null;
            }
            if( state.snapshot){
                state.snapshot = null;
                console.log("Snapshot deleted")
            }else{
                console.log("There was no snapshot to remove")
            }
        },
        resetSnapshot: (state) =>{
            state.snapshot = null;
        },
        resetAppSettings: () => initialState,
    }
});

export const { resetSnapshot, saveSnapshot, setSetting, setAppSetting, deleteSnapshot, setTheme, toggleScreenAwake, toggleFullscreen, resetAppSettings, updatePomodoroSettings } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
