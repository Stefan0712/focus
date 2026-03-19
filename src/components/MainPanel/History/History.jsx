import { useEffect, useState } from 'react';
import styles from './History.module.css';
import { db } from '../../../db';

const History = () => {

    const [logs, setLogs] = useState([]);

    const getLogs = async () => {
        try {
            const response = await db.logs.toArray();
            if(response && response.length > 0) {
                setLogs(response);
                console.log(response)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{getLogs()},[]);

    const getHour = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };
    const getDuration = (start, finish) =>{
        const startTime = new Date(start);
        const finishTime = new Date(finish);
        const durationMs = finishTime - startTime;

        const seconds = Math.floor((durationMs / 1000) % 60);
        const minutes = Math.floor((durationMs / 1000 / 60) % 60);
        const hours = Math.floor((durationMs / 1000 / 60 / 60));

        return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds}`;
    }
    const formatDate = (dateInput) => {
        const date = new Date(dateInput);
        return date.toLocaleString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        }).replace(',', ''); 
    };
    return ( 
        <div className={styles.history}>
             {logs?.length > 0 ? logs.map((session, index) => (
                    <div className={styles.log} key={index}>
                        <div className={styles.logHeader}>
                            <p className={styles.duration}> From {getHour(session.startTime)} to {getHour(session.createdAt)} for {getDuration(session.startTime, session.createdAt)}</p>
                            <p className={styles.timestamp}>{formatDate(session.createdAt)}</p>
                        </div>
                        <div className={styles.sessions}>
                            <p>Focus: {session.focusSessions}</p>
                            <p>Short Breaks: {session.breaks}</p>
                            <p>Long Breaks: {session.longBreaks}</p>
                        </div>
                    </div>
                ))
            : (<p>No history available</p>)}
        </div>
    );
}
 
export default History;