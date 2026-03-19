import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnapshot } from '../components/Pomodoro/Pomodoro';

export interface PomodoroSettings {
    zenMode: boolean;
    focusDuration: number;
    breakDuration: number;
    longBreakDuration: number;
    longBreakFrequency: number;
    includeLongBreaks: boolean;
    enableNotifications: boolean;
    autoSkip: boolean;
    showTimerRing: boolean;
    showMinimizedTimerProgress: boolean;
    sessionEndAnimation: boolean;
    showMinimizeButton: boolean;
    showSessionCounter: boolean;
    showCurrentSession: boolean;
    showBottomButtons: boolean;
}

export interface AppSettingsState {
    language: string;
    showFullScreenPrompt: boolean;
    isFullscreen: boolean;
    isScreenAwakeOn: boolean;
    showNotifications: boolean;
    showFullscreenButton: boolean;
    pomodoroSettings: PomodoroSettings;
    snapshot: ISnapshot | null;
    theme: string;
    isPomodoroMinimized: boolean;
    isTasksMaximized: boolean;
    isSwapped: boolean;
    showMaximizeButton: boolean;
    showHistoryButton: boolean;
    showHomeButton: boolean;
    showAboutButton: boolean;
    showTasksHistory: boolean;
    showTasksSummary: boolean;
    showWorkHistory: boolean;
}


// Default settings
const initialState: AppSettingsState = {
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
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleFullscreen: (state, action: PayloadAction<boolean>) => {
            state.isFullscreen = action.payload;
        },
        toggleScreenAwake: (state, action: PayloadAction<boolean>) => {
            state.isScreenAwakeOn = action.payload;
        },
        setSetting: (state, action: PayloadAction<{ property: keyof PomodoroSettings; value: any }>) => {
            const { property, value } = action.payload;
            // @ts-ignore 
            state.pomodoroSettings[property] = value; 
        },
        updateSetting: (state, action: PayloadAction<{ settingKey: keyof AppSettingsState; value: any }>) => {
            const { settingKey, value } = action.payload;
            if (state.hasOwnProperty(settingKey)) {
                // @ts-ignore
                state[settingKey] = value;
            }
        },
        setAppSetting: (state, action: PayloadAction<{ property: keyof AppSettingsState; value: any }>) => {
            const { property, value } = action.payload;
            // @ts-ignore
            state[property] = value; 
        },
        saveSnapshot: (state, action: PayloadAction<ISnapshot>) => {
            state.snapshot = action.payload;
        },
        deleteSnapshot: (state) => {
            if (state.snapshot) {
                state.snapshot = null;
                console.log("Snapshot deleted");
            } else {
                console.log("There was no snapshot to remove");
            }
        },
        resetSnapshot: (state) => {
            state.snapshot = null;
        },
        resetAppSettings: () => initialState,
    }
});

export const { 
    resetSnapshot, 
    saveSnapshot, 
    setSetting, 
    setAppSetting, 
    deleteSnapshot, 
    setTheme, 
    toggleScreenAwake, 
    toggleFullscreen, 
    resetAppSettings, 
    updateSetting 
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;