import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../Navbar/Navbar'
import styles from './Detail.module.css'

const Detail = () => {
    const { id } = useParams()
    const getInfo = () => {
        fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=068c85cae96b99ad77391cf8b1439cfe`)
            .then(ans => ans.json())
            .then((json) => {
                setInfo(json.data.results);
            })
    }
    const [info, setInfo] = useState()
    console.log(info)
    useEffect(() => {
        getInfo()
    }, [])
    const marvelUrl = info ? info[0].urls[0].url : ''

    console.log(info)
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
                    <img className={styles.img} src={info ? info[0].thumbnail.path + "." + info[0].thumbnail.extension : ''} />
                    <div className={styles.cardInfo}>
                    <h1 className={styles.cardTitle}>Hero Name: {info ? info[0].name : ''}</h1>
                    <h3 className={styles.cardDescription}>Description: </h3>
                    <h3 className={styles.cardDescription}>{info ? info[0].description : ''}</h3>
                    <a className={styles.linkInfo} href={marvelUrl}>More Info</a>
                    </div>
                    
                </div>


                <div className={styles.listContainer}>
                    <div className={styles.list} >
                        <h2 className={styles.listTitle}>{info ? info[0].name : ''}'s Series</h2>
                        <ul>

                            {info ? info[0].series.items.map(item => (
                                <li className={styles.listItem}>{item.name}</li>

                            )) : ''}
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <h2 className={styles.listTitle}>{info ? info[0].name : ''}'s Stories</h2>
                        <ul>

                            {info ? info[0].stories.items.map(item => (
                                <li className={styles.listItem}>{item.name}</li>

                            )) : ''}
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <h2 className={styles.listTitle}>{info ? info[0].name : ''}'s Comics</h2>
                        <ul>

                            {info ? info[0].comics.items.map(item => (
                                <li className={styles.listItem}>{item.name}</li>

                            )) : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
