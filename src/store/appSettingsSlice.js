import { createSlice } from '@reduxjs/toolkit';

// Default settings
const initialState = {
    language: 'en',
    selectedProject: null,
    selectedTask: null,
    showFullScreenPrompt: true,
    isFullscreen: false,
    isScreenAwakeOn: false,
    showNotifications: true,
    showFullscreenButton: true,
    pomodoroSettings: {
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
        showBottomButtons: true

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
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setFocusSessions: (state, action)=>{
            state.focusSessions = action.payload;
        },
        setBreakSessions: (state, action)=>{
            state.breakSessions = action.payload;
        },
        updatePomodoroSettings: (state, action)=>{
            state.pomodoroSettings = action.payload;
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
        updatePomodoroSetting: (state, action) =>{
            const { settingKey, value } = action.payload;
            console.log(settingKey, value)
            if (state.pomodoroSettings.hasOwnProperty(settingKey)) {
                console.log(action.payload)
                state.pomodoroSettings[settingKey] = value;
            }
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

export const { resetSnapshot, saveSnapshot, setSetting, deleteSnapshot, toggleTheme, setTheme, setLanguage,updatePomodoroSetting, updateSetting, setFocusSessions, toggleScreenAwake, toggleFullscreen, setBreakSessions, resetAppSettings, updatePomodoroSettings } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
