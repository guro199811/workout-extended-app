import { useState } from 'react';

import styles from './Navbar.module.css';
import Auth from '../Auth/Auth.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import logo from '../assets/logo.png';
import { useAuth } from "../AuthContext.jsx"

function Navbar() {

  const [showAuthPage, setShowAuthPage] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const { userToken } = useAuth()

  function login(){
    setShowAuthPage(!showAuthPage);
  }
  

  function closeAuth() {
    setShowAuthPage(false);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }


  return (
    <>
    <div className={styles.navbar}>
      <a href="/" className={styles.logo}><img src={logo} /></a>
      <div className={styles.links}>
        <a href="/">Home</a>
        <a href="/">Search in Exercises</a>
        { userToken ? 
        <a className={styles.sidebarBtn} onClick={() => toggleSidebar()}><i className='bx bx-menu'></i></a> : 
        <a className={styles.loginBtn} onClick={login}>Log-In</a> }
      </div>
    </div>
    
    { showSidebar && 
    <div className={styles.sidebar}> <Sidebar /> </div> }
    
    <div className={`${styles.container}
          ${showAuthPage ? styles.active : '' }`}>
      {showAuthPage && <Auth onClose={ closeAuth } />}
    </div>
    </>
  )
}
  
export default Navbar;
