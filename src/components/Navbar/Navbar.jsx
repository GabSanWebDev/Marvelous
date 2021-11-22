import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Marvel_Logo.jpg'
import styles from './Navbar.module.css';

function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link to='/' >
          <img alt="logo" src={logo} className={styles.logo} />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link className={styles.link} to='/about' ><h4>About</h4></Link>
      </div>
      <div div className={styles.navLinks}>
        <Link className={styles.link} to='/favs' ><h4>Favorites</h4></Link>
      </div>
    </div>
  );
};

export default Nav;