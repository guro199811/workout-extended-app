import { useState, useRef } from 'react';

import styles from './Navbar.module.css';
import Auth from '../Auth/Auth.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import logo from '../assets/logo.png';
import { useAuth } from "../AuthContext.jsx"

function Navbar() {

  const [showAuthPage, setShowAuthPage] = useState(false);
  const [authComponent, setAuthComponent] = useState(false);
  const [wrapper, setWrapper] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const { userToken } = useAuth()

  function login(){
    setWrapper(true);
    setAuthComponent(true);
    setTimeout(() => {
      setShowAuthPage(true);
    }, 150);
  }
  

  function closeAuth() {
    setShowAuthPage(false);
    setTimeout(() => {
      setWrapper(false);
    }, 300);
    setAuthComponent(false);
  }

  function toggleSidebar() {
    setWrapper(false);
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
        <a className={styles.sidebarBtn} onClick={() => toggleSidebar()}>
          { showSidebar ? <i class='bx bx-menu-alt-right'></i> : <i className='bx bx-menu'></i> }</a> : 
        <a className={styles.loginBtn} onClick={login}>Log-In</a> }
      </div>
    </div>

    { wrapper &&
      <div className={`wrapper
          ${wrapper ? 'active' : ''}`}> 
        <div className={`${styles.container}
              ${showAuthPage ? styles.active : '' }`}>
          {authComponent && <Auth onClose={ closeAuth } />}
        </div>
      </div>
    }
    <div className={`${styles.sidebar} ${showSidebar ? styles.active : ''}`}> <Sidebar /> </div>
    </>
  )
}
  
export default Navbar;
