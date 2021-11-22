import React from 'react'
import Nav from '../Navbar/Navbar'
import styles from '../Detail/Detail.module.css'
import { Link } from 'react-router-dom'
import profilepic from '../../Assets/gabriel.png'

const About = () => {
    return (
        <div className={styles.mainContainer}>
            <Nav />
            <div>
                <Link to='/'>
                    <button className={styles.buttonBack}>Go back</button>
                </Link>
            </div>
            <div>
                <div className={styles.cardContainer}>
                    <img className={styles.img} src={profilepic} />
                    <div className={styles.cardInfo}>
                        <h1 className={styles.cardTitle}>Creator: Gabriel Sanchez</h1>
                        <h3 className={styles.cardDescription}>Description: </h3>
                        <h3 className={styles.cardDescription}>Marvelous App is a project made by Gabriel Sanchez as a technical test form MediaMonks on November, 2021. The information brought to you in this project is thanks to Marvel using their developer's section and consuming their API, all rights belong to Marvel Comics.</h3>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About
