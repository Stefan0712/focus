import { IconLibrary } from '../../IconLibrary';
import { useEffect } from 'react';


const MessageModal = ({data, closeModal}) => {
    const messageModal = {
        width: '100dvw',
        minHeight: '50px',
        maxHeight: '100px',
        gap: '10px',
        display: 'flex',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '60',
        backgroundColor: data.type === 'success' ? '#4CAF50' : data.type === 'info' ? 'var(--secondary-color)' : '#E53935',
        padding: '10px 5px'
    };

    const modalContent = {
        width: 'calc(100% - 60px)',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        fontSize: '20px'
    };
    const modalButton = {
        backgroundColor: 'transparent',
        border: 'none',
        marginLeft: 'auto',
        height: '50px',
        width: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };
    const modalIcon = {
        height: '40px',
        width: '40px'
    };

    useEffect(()=>{
        setTimeout(()=>closeModal(), 3000)
    },[])
    return ( 
        <div style={messageModal} className='slideInFromTop'>
            <div style={modalContent}>
                <p>{data.msg}</p>
            </div>
            <button style={modalButton} onClick={closeModal}><IconLibrary.Close style={modalIcon} /></button>
        </div>
     );
}
 
export default MessageModal;



