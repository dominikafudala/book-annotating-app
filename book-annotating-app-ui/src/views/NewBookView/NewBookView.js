import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NewBookView.module.scss";
import DataService from "services/DataService";
import BookService from "services/BookService";
import BookContext from "contexts/BookContext";
import LocationContext from "contexts/LocationContext";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import GoBack from "components/GoBack/GoBack";
import AddBookForm from "components/AddBookForm/AddBookForm";
import Title from "components/Title/Title";
import Frame from "components/Frame/Frame";
import Button from "components/Button/Button";
import Subeading from "components/Subheading/Subheading";
import Summary from "components/AddBookForm/Summary";
import FormDataContext from "contexts/FormDataContext";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";


const NewBookView = () => {
    // load data of publishers, authors etc from database and set context
    const [isLoadingSeries, setLoadingSeries] = useState(true);
    const [isLoadingAuthors, setLoadingAuthors] = useState(true);

    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [formats, setFormats] = useState([]);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(
        () => {
            const loadData =  async () => {
                DataService.getData("series").then(
                    data => {
                        setSeries([...data]);
                        setLoadingSeries(false);
                    }
                );
                DataService.getData("authors").then(
                    data => {
                        setAuthors([...data]);
                        setLoadingAuthors(false);
                    }
                );
                const publishersReq = await DataService.getData("publishers");
                const languagesReq = await DataService.getData("languages");
                const formatsReq = await DataService.getData("formats");
                const genresReq = await DataService.getData("genres");
                setPublishers([...publishersReq]);
                setLanguages([...languagesReq])
                setFormats([...formatsReq]);
                setGenres([...genresReq]);
            }

            loadData();
        }, []
    )


    const navigate = useNavigate();
    const locationContext = useContext(LocationContext);
    const pages = locationContext.PAGES;

    const [book, setBook] = useState({
        isbn: "",
        title: "",
        series_name: {},
        series_number: "",
        authors: [],
        description: "",
        genres: [],
        publisher: {},
        publication_date: "",
        format: {},
        language: {},
        page_number: ""
    })

    const [formIndex, setFormIndex] = useState({
        formIndex: 0
    })

    const changeBookState = (e) => {
        setBook((prev)=>({
            ...prev,
            [e.target.dataset.name]: 
                e.target.dataset.name === "genres" || e.target.dataset.name === "authors"
                ? [...prev[e.target.dataset.name].map(el => el.id)].includes(e.target.id) 
                    ? [...prev[e.target.dataset.name]].filter(el => el.id !== e.target.id) 
                    : [...prev[e.target.dataset.name], {id: e.target.id, name: e.target.dataset.label}]
                : 
                e.target.value === undefined || e.target.value.includes("on", "off")
                    ? {...prev[e.target.dataset.name]}.id === e.target.id
                    ? {}
                    : {
                        id: e.target.id,
                        name: e.target.dataset.label
                    }
                : e.target.value
    }))
    }

    const context = {changeBookState, book};

    const onClickFnForward = () => {
        if(formIndex.formIndex < 2) {
            setFormIndex((prev)=>({
                formIndex: prev.formIndex + 1
            }))
        }
    }
    
    const onClickFnBackward = () => {
        if(formIndex.formIndex > 0) {
            setFormIndex((prev)=>({
                formIndex: prev.formIndex - 1
            }))
        } else if(formIndex.formIndex === 0){
            navigate("/"+ pages.addBook)
        }
    }

    const changeFormIndex = (num) => {
        setFormIndex({
            formIndex: num
        })
    }

    //add book and show modal with info if book was added
    const [modal, setModal] = useState(false);

    const [modalTitle, setModalTitle] = useState();
    const [modalSubtitle, setModalSubTitle] = useState();
    const [modalButton, setModalButton] = useState();
    const [modalSuccess, setModalSuccess] = useState();

    const addBookFn = async () => {
        await BookService.addBook(book).then(resp => {
            setModal(true);
            if(resp !== -1) {
                setModalTitle("Book added!");
                setModalSubTitle(<>
                    {"Go to the "}
                    <Link onClick={() => window.location.href = "/book/" + resp} to={"/book/"+ resp}>{"book page"}</Link>
                </>);
                setModalButton(<Button href = {pages.login}>Got it</Button>)
                setModalSuccess(true);
            } else{
                setModalTitle("Something went wrong!");
                setModalSubTitle("Check if Title and Pages are filled in and then try again");
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }
        });
    }

    // check if summary should be shown 
    const [bookInfoCount, setBookInfoCount] = useState(0);
    const [requiredInformation, setRequiredInformation] = useState(false)

    const countBookInfo = () => {
        setBookInfoCount(Object.values(book).filter(el => el.length !== 0 && Object.keys(el).length !== 0 ).length);
        if(book.title.length !== 0 && !isNaN(parseInt(book.page_number))){
            setRequiredInformation(true);
        } else{
            setRequiredInformation(false)
        }
    }

    useEffect(
        countBookInfo,
         [book]
    )

    if(isLoadingSeries || isLoadingAuthors) return <Loading/>;
    else
    return(<>
            {modal && <Modal title = {modalTitle} subheading = {modalSubtitle} button = {modalButton} success = {modalSuccess}/>}
            <ContentWrapper>
                <BookContext.Provider value={context}>
                    <LeftContentWrapper>
                        <GoBack onClickFn = {onClickFnBackward}>
                            {
                            {
                                0: "Back to: Find a book",
                                1: "Back to: General",
                                2: "Back to: Plot"
                            }[formIndex.formIndex]
                        }
                            </GoBack>
                        <Title smaller>Add a book</Title>
                        <FormDataContext.Provider value={{publishers, authors, languages, formats, series, genres}}>
                            <AddBookForm formIndex={formIndex.formIndex} changeFormIndexFn = {changeFormIndex}/>
                        </FormDataContext.Provider>
                    </LeftContentWrapper>
                    <Frame>
                        <div className={styles.summary}>
                            
                            {
                                bookInfoCount === 0  //check wheter any element exists in book info
                                ?
                                <Subeading>Fill out the form to see the summary.</Subeading>
                                :
                                <Summary/>
                            }
                            <Button onClickFn = {formIndex.formIndex !== 2 ? onClickFnForward : addBookFn} disabled = {formIndex.formIndex === 2 && !requiredInformation ? true: false}>{
                                {
                                    0: "Next",
                                    1: "Next",
                                    2: "Add a book"
                                }[formIndex.formIndex]  
                            }</Button>
                        </div>
                    </Frame>
                </BookContext.Provider>
            </ContentWrapper>
        </>
        
    )
}

export default NewBookView;