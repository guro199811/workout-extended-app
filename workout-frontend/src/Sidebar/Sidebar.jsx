import { useState, useEffect } from 'react'
import styles from './Sidebar.module.css';

function Sidebar() {


    const [wrapper, setWrapper] = useState(false);
    const [logout, setLogout] = useState(false);


    const logoutDiv = () => {
        setWrapper(true);
        setTimeout(() => {
            setLogout(true);
        }, 150);
        
    }

    const logoutNo = () => {
        setLogout(false);
        setTimeout(() => {
            setWrapper(false);
        }, 300);
    }

    const logoutYes = () => {
        setWrapper(false);
        handleLogout();
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.reload();
    }

    return (
        <>
        <div className={styles.sidebar}>
            <a>My Data</a>
            <a>My Goals</a>
            <a>My Schedule</a>
            <button onClick={() => logoutDiv()}>Log-Out</button>
        </div>
            {wrapper &&
            <div className={`wrapper
                ${wrapper ? 'active' : ''}`}>
                <div className={`${styles.logoutBg}
                    ${logout ? styles.active : ''}`}>
                    <div className={`${styles.logoutWindow}
                    ${logout ? styles.active : ''}`}>
                        {logout && 
                        <div>
                        <h2>Are you sure you want to Log-out? </h2>
                        <section>
                            <button onClick={() => logoutYes()}
                            className={styles.yesBtn}>Yes</button>
                            <button onClick={() => logoutNo()}
                            className={styles.noBtn}>No</button>
                        </section>
                        </div>
                        }
                    </div>
                </div>
            </div>
            }
        </>
    
    )
}

export default Sidebar

