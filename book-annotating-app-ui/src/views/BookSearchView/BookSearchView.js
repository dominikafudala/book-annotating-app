import React from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import Title from "components/Title/Title";
import styles from "./BookSearchView.module.scss";
import SelectInput from "components/Input/SelectInput";
import BookSummaryCard from "components/BookSummaryCard/BookSummaryCard";
import { useState } from "react";
import Loading from "components/Loading/Loading";
import { useEffect } from "react";
import BookService from "services/BookService";
import arrow from "assets/arrow_scroll.svg";
import DataService from "services/DataService";
import Input from "components/Input/Input";

const BookSearchView = () => {
    const [popularLoading, setPopularLoading] = useState(true);
    const [popularAll, setPopularAll] = useState();
    const [popular24, setPopular24] = useState();
    const [popularBooks, setPopularBooks] = useState([]);

    const changePopularBooks = (models) => {
        const modelArr = [];
        models.forEach(m => modelArr.push(<BookSummaryCard bookModel = {m} key = {m.bookModel.bookId}/>));
        setPopularBooks(modelArr);
    }

    const viewMostPopularTime = (e) => {
        if(e.target.id == 1) // most popular last 24 hours
        {
            changePopularBooks(popular24);
        }else{
            changePopularBooks(popularAll);
        }
    }

    useEffect(
        ()=> {
            const loadPopular = async () => {
                await BookService.getTop().then(resp => {
                    setPopularAll(resp[0]);
                    setPopular24(resp[1]);
                    changePopularBooks(resp[1]);
                    setPopularLoading(false);
                });
            }

            loadPopular();
        }, []
    )

    let scroll = 0;
    const scrollChange = 233 + 48 +233/2;

    //calculate scroll
    const scrollBooks = (e, forward) => {
        const parentScroll = document.querySelector(`.${styles.bookCards}`);
        const positioning = parentScroll.getBoundingClientRect();
        const gapValue = parseInt(window.getComputedStyle(parentScroll).gap.replace("px", ""));
        const backwardDiv = document.querySelector(`.${styles.backwardArrow}`);
        const forwardDiv = document.querySelector(`.${styles.arrow}`);
        let elemNum = 0;
        let wholeWidth = 0;
        [...parentScroll.children].forEach(c => {
            if(c.classList.contains(styles.arrow) || c.classList.contains(styles.backwardArrow)) return;
            elemNum++;
            wholeWidth += parseInt(window.getComputedStyle(c).width.replace("px", ""));
        })
        wholeWidth += (elemNum-1) * gapValue;

        if(forward) {
            scroll -= scrollChange;
            backwardDiv.style.display = "flex";
            backwardDiv.style.left = (-scroll - 30) + "px";
            if(wholeWidth + scroll - positioning.width <= 0){
                parentScroll.style.transform = "translateX("+(-(wholeWidth - positioning.width))+"px)";
                scroll = positioning.width - wholeWidth;
                forwardDiv.style.display = "none";
                backwardDiv.style.left = (-scroll - 30) +"px";
            }
            else{
                parentScroll.style.transform = "translateX("+scroll+"px)";
                if(e.target.nodeName === "DIV")
                    e.target.style.transform = "translateX("+(-scroll)+"px)";
                else{
                    e.target.parentElement.style.transform = "translateX("+(-scroll)+"px)";
                }
            }
        }else{
            scroll += scrollChange;
            forwardDiv.style.display = "flex";
            forwardDiv.style.transform = "translateX("+(-scroll)+"px)"
            if(scroll > 0){
                parentScroll.style.transform = "translateX(0)";
                scroll = 0;
                backwardDiv.style.display = "none";
                forwardDiv.style.transform = "translateX(0)"
            }
            else{
                parentScroll.style.transform = "translateX("+scroll+"px)";
                if(e.target.nodeName === "DIV")
                    e.target.style.left = (-scroll - 30) + "px";
                else{
                    e.target.parentElement.style.left = (-scroll - 30) + "px";
                }
            }
        }
    }

    const [genres, setGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true);

    const filterByGenres = (e) => {
        console.log(e);
    }

    const loadGenres = (genres) => {
        const genresCheckbox = []
        for(let g of genres){
            const checkbox = <Input    
                        name = {"genres"} 
                        label = {g.name} 
                        id = {g.name} type = {"checkbox"} 
                        defaultChecked = {false} 
                        key = {g.name} 
                        onChange = {(e) => filterByGenres(e)}
            />;
            genresCheckbox.push(checkbox)
        }
        setGenres(genresCheckbox);
        setLoadingGenres(false);
    }

    useEffect(
        () => {
            const loadCategories = async () => {
                await DataService.getData("genres").then(resp => {
                    loadGenres(resp);
                })
            } 

            loadCategories();
        },[]
    )

if(popularLoading || loadingGenres) return <Loading/>
return(
    <>
    <ContentWrapper>
        <div className={styles.topWrapper}>
        <LeftContentWrapper>
            <Title>Find your book, take notes</Title>
        </LeftContentWrapper>
        </div>
    </ContentWrapper>
    <section className={styles.top}>
        <div className={styles.heading}>
            <p>Most popular</p>
            <div className={styles.option}>
                <SelectInput 
                    name = {"date"} 
                    label = {""} 
                    placeholder = {""} 
                    values = {[{id:1, name: "Last 24 hours"}, {id:2, name: "All time"}]} 
                    startValues = {[{id:1, name: "Last 24 hours"}]}
                    setStateFn = {(e) => viewMostPopularTime(e)}
                    single
                    noAdd
                    noInput
                    key = {"date"}
                />
            </div>
        </div>
        <div className={styles.bookCards}>
        <div className={styles.backwardArrow} onClick={(e) => scrollBooks(e, false)}>
                <img src={arrow} alt="Arrow scroll"/>
            </div>
            {popularBooks}
             <div className={styles.arrow} onClick={(e) => scrollBooks(e, true)}>
                <img src={arrow} alt="Arrow scroll"/>
            </div>
        </div>
    </section>
    <section className={styles.categories}>
        <div className={styles.heading}>
                <p>Categories</p>
        </div>
        <div className={styles.genres}>
            {genres}
        </div>
    </section>
    </>
)
}

export default BookSearchView;