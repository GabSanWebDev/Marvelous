import React from 'react'
import Nav from '../Navbar/Navbar';
import { useState, useEffect } from 'react';
import styles from './Home.module.css'
import { Link } from 'react-router-dom';
import marvelous from '../../Assets/Marvelous.png'
import { GoArrowRight, GoArrowLeft } from "react-icons/go";



function Home() {
    const getInfo = () => {
        fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=068c85cae96b99ad77391cf8b1439cfe&hash=77516af36643c3bb5189a95a19a56c28`)
            .then(ans => ans.json())
            .then((json) => {

                let cleanInfo = json.data.results.map(result => ({
                    id: result.id,
                    name: result.name,
                    url: result.urls[0].url,
                    thumbnail: result.thumbnail.path + "." + result.thumbnail.extension,
                    favorite: false
                }))
                setInfo(cleanInfo);
            })
    }

    useEffect(() => {
        getInfo()
    }, [])

    const [info, setInfo] = useState()
    const [name, setName] = useState("");
    const [comic, setComic] = useState("");
    const [series, setSeries] = useState("");
    const [input, setInput] = useState("");
    const [cond, setCond] = useState(false)

    const [page, setPage] = useState(0)//iria de 10 en 10 ejm : 0-10,20,30
    const [page2, setPage2] = useState(12)//19
    const [btnNext, setBtnNext] = useState(false)
    const [btnPrev, setBtnPrev] = useState(false)

    let onViewInfo = info?.slice(page, page2)

    const handleNextPage = () => {
        if (info.length < (page2 + 1)) {
            setBtnNext(true)
        } else {
            setPage(page + 12);
            setPage2(page2 + 12)
            setBtnPrev(false)
        }

    }

    const handlePreviousPage = () => {
        if (page <= 0) {
            setBtnPrev(true)
        } else {
            setPage(page - 12);
            setPage2(page2 - 12)
            setBtnNext(false)
        }

    }
    // 1fb577a3a639728545c72674486338977458cc6a6068c85cae96b99ad77391cf8b1439cfe

    function handleSubmitHero(e) {
        e.preventDefault();
        if (name === '') {
            alert('No Heroes were searched')
        } else {
            setInfo("");
            fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=068c85cae96b99ad77391cf8b1439cfe`)
                .then(ans => ans.json())
                .then((json) => {

                    let cleanInfo = json.data.results.map(hero => ({
                        id: hero.id,
                        name: hero.name,
                        url: hero.urls[0].url,
                        thumbnail: hero.thumbnail.path + "." + hero.thumbnail.extension,
                        favorite: false,
                        edit: true
                    }))
                    setInfo(cleanInfo);
                    setName('');

                })
        }
    }

    function handleSubmitComics(e) {
        e.preventDefault();
        if (comic === '') {
            alert('No Comics were searched')
        } else {
            setInfo("");
            fetch(`https://gateway.marvel.com:443/v1/public/comics?title=${comic}&apikey=068c85cae96b99ad77391cf8b1439cfe`)
                .then(ans => ans.json())
                .then((json) => {

                    let cleanInfo = json.data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        url: result.urls[0].url,
                        thumbnail: result.thumbnail.path + "." + result.thumbnail.extension,
                        favorite: false,
                        edit: false
                    }))
                    setInfo(cleanInfo);
                    setComic('')

                })
        }
    }

    function handleSubmitSeries(e) {
        e.preventDefault();
        if (series === '') {
            alert('No Series were searched')
        } else {
            setInfo("");
            fetch(`https://gateway.marvel.com:443/v1/public/series?title=${series}&apikey=068c85cae96b99ad77391cf8b1439cfe`)
                .then(ans => ans.json())
                .then((json) => {
                    console.log(json)
                    let cleanInfo = json.data.results.map(result => ({
                        id: result.id,
                        name: result.title,
                        url: result.urls[0].url,
                        thumbnail: result.thumbnail.path + "." + result.thumbnail.extension,
                        favorite: false,
                        edit: false
                    }))
                    setInfo(cleanInfo);
                    setSeries('')

                })
        }
    }


    function handleInputHero(e) {
        e.preventDefault();
        setName(e.target.value);
    }
    function handleInputComic(e) {
        e.preventDefault();
        setComic(e.target.value);
    }
    function handleInputSeries(e) {
        e.preventDefault();
        setSeries(e.target.value);
    }

    function handleReload(e) {
        e.preventDefault();
        getInfo();
    }

    function handleDetete(e) {
        setInfo(info.filter(info => info.id !== e))
    }

    function handleEditChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleEdit(e) {
        setInfo(info.filter(info => info.id === e)
        )
        setCond(!cond)
    }

    function handleCond() {
        setCond(!cond)
    }


    return (
        <div className={styles.mainContainer}  >
            <Nav />

            <div>
                <img src={marvelous} className={styles.marvelous} alt="marvelous" />
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.searchDiv}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search Superheroes..."
                        value={name}
                        onChange={(e) => handleInputHero(e)}
                    />

                    <button className={styles.inputBtn} type="submit" onClick={(e) => handleSubmitHero(e)}>Search</button>
                </div>

                <div className={styles.searchDiv}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search Comics..."
                        value={comic}
                        onChange={(e) => handleInputComic(e)}
                    />

                    <button className={styles.inputBtn} type="submit" onClick={(e) => handleSubmitComics(e)}>Search</button>
                </div>

                <div className={styles.searchDiv}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Search Series..."
                        value={series}
                        onChange={(e) => handleInputSeries(e)}
                    />

                    <button className={styles.inputBtn} type="submit" onClick={(e) => handleSubmitSeries(e)}>Search</button>
                </div>


                <div className={styles.reloadBtn}>
                    <button className={styles.allBtn} onClick={(e) => handleReload(e)}>All info</button>
                </div>
            </div>

            <div>


                <div className={styles.paginate}>
                    <button className={styles.paginateBtn} byeBtn={btnPrev} disabled={btnPrev} onClick={handlePreviousPage}><GoArrowLeft/></button>
                    <button className={styles.paginateBtn} byeBtn={btnNext} disabled={btnNext} onClick={handleNextPage}><GoArrowRight/></button>
                </div>

                <div className={styles.cardsContainer}>

                    {onViewInfo ? onViewInfo.map((result) => (

                        <div className={styles.card}>
                            <img className={styles.cardImg} src={result.thumbnail} alt={result.name} />
                            <Link to={`/detail/${result.id}`}>
                                <div name={result.name} className={styles.cardTitle}>{result.name}</div>

                            </Link>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.buttonDelete} onClick={() => handleDetete(result.id)}>Delete</button>
                                <button className={styles.buttonFav}>Add to Favs</button>
                            </div>

                        </div>
                    )) : 'No info Found'}
                </div>
            </div>

        </div>
    )

}

export default Home;
