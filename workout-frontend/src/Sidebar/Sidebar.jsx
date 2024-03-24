import { useState, useEffect } from 'react'
import styles from './Sidebar.module.css';

function Sidebar() {


    const [wrapper, setWrapper] = useState(false);
    const [logout, setLogout] = useState(false);
    const [sidebarItem, setSidebarItem] = useState(null);



    const sidebarItemSelector = (sidebar) => {
        setWrapper(true);
        setTimeout(() => {
            setSidebarItem(sidebar);
        }, 5);
    }

    const closeBg = () => {
        setSidebarItem(null);
        setTimeout(() => {
            setWrapper(false);
        }, 500);
    }

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
            <a onClick={() => sidebarItemSelector('My Data')}>My Data</a>
            <a onClick={() => sidebarItemSelector('My Goals')}>My Goals</a>
            <a onClick={() => sidebarItemSelector('My Schedule')}>My Schedule</a>
            <button onClick={() => logoutDiv()}>Log-Out</button>
        </div>
            {wrapper &&
            <div className={`wrapper
            ${wrapper ? 'active' : ''}`}>
                {sidebarItem ?
                    <div className={`${styles.bg}
                    ${sidebarItem ? styles.active : ''}`}
                    onClick={() => closeBg()}>

                        {sidebarItem === 'My Data' && (
                        <div className={`${styles.dataContainer} 
                        ${sidebarItem == 'My Data' ? styles.active : '' }`}
                            onClick={(e) => e.stopPropagation()}>
                        </div>
                        )}
                        {sidebarItem === 'My Goals' && (
                        <div className={`${styles.goalContainer} 
                        ${sidebarItem == 'My Goals' ? styles.active : '' }`}
                            onClick={(e) => e.stopPropagation()}>
                        </div>
                        )}
                        {sidebarItem === 'My Schedule' && (
                        <div className={`${styles.scheduleContainer} 
                        ${sidebarItem == 'My Schedule' ? styles.active : '' }`}
                            onClick={(e) => e.stopPropagation()}>
                        </div>
                        )}

                    </div>
                :
                    <div className={`${styles.bg}
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
                }
            </div>
            }
        </>
    
    )
}

export default Sidebar

