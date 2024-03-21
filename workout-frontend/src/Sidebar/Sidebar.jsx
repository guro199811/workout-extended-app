import styles from './Sidebar.module.css';

function Sidebar() {

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        alert("Logged out & Token removed");
        }

    return (
        <div className={styles.sidebar}>
            <a>My Data</a>
            <a>My Goals</a>
            <a>My Schedule</a>
            <button onClick={() => handleLogout()}>Log-Out</button>
        </div>
        )
}

export default Sidebar
