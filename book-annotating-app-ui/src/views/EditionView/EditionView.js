import React from "react";
import HeaderBookNav from "components/HeaderBookNav/HeaderBookNav";
import {useLocation} from 'react-router-dom';
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import Loading from "components/Loading/Loading";
import { useState } from "react";
import BookService from "services/BookService";
import { useEffect } from "react";
import BookList from "components/BookList/BookList";
import SelectInput from "components/Input/SelectInput";
import Input from "components/Input/Input";
import styles from "./EditionView.module.scss";
import DataService from "services/DataService";

const EditionView = () => {

    const location = useLocation();
    const [isLoading, setLoading] = useState(true);

    const editionId = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    const [checkedData, setCheckedData] = useState();
    const [sorteddata, setSortedData]= useState();

    const [languages, setLanguages] = useState();
    const [isLoadingLanguages, setLoadingLanguages] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const sortingValues = [{
        id: 1,
        name: "Latest published",
    },
    {
        id:2,
        name: "Earliest published"
    }
    ]

    const setSorting = (e) => {
        parseInt(e.target.id) === 1 ?
       setSortedData(checkedData.sort((a, b) => {
            if(a.publication_date === null) return 1;
            if(b.publication_date === null) return -1;
            return new Date(b.publication_date) - new Date(a.publication_date);
        }))
        :
        setSortedData(checkedData.sort((a, b) => 
        {
            if(a.publication_date === null) return 1;
            if(b.publication_date === null) return -1;
            return new Date(a.publication_date) - new Date(b.publication_date);
        }))
        setCheckedData(prev => ([...prev]));
    }

    const formatValues = [
        {
            id: 1,
            name: "Hardcover"
        }, {
            id: 2,
            name: "Paperback"
        },
        {
            id: 3,
            name: "Ebook"
        }
    ]

    const filterFormat = (languageNull, languageName) => {
        const selectedFormats = document.querySelectorAll("[name = 'formats']:checked");        
        const selectedFormatNames = [...selectedFormats].map(el => el.id.toLowerCase());
        if(selectedFormats.length !== 0){
            setCheckedData([...sorteddata]
                .filter(el => !languageNull === true  ? el.language.name == languageName : true)
                .filter(el => el.format !== null ? selectedFormatNames.includes(el.format.name.toLowerCase()):false))
        }else{
            setCheckedData(sorteddata.filter(el => !languageNull === true? el.language.name == languageName : true));
        }
    }

    const formatCheckbox = [];
    for(let f of formatValues){
        const format = <Input    
                    name = {"formats"} 
                    label = {f.name} 
                    id = {f.name} type = {"checkbox"} 
                    defaultChecked = {false} 
                    key = {f.name} 
                    onChange = {filterFormat}
        />;
        formatCheckbox.push(format)
    }


    const setFilteringLanguages = (e) => {
        if(e.target.dataset.label === selectedLanguage){
            setSelectedLanguage(null)
            filterFormat(true);
        }else{
            setSelectedLanguage(e.target.dataset.label);
            filterFormat(false, e.target.dataset.label);
        }
    }

    useEffect(
        () => {
            const loadBooks = async () =>{
                await BookService.getAllBookEditions(editionId).then(resp => {
                    // TODO: strona 404
                    if(resp === -1) console.log("nie znaleziono");
                    else{
                        setCheckedData(resp.sort((a, b) => a.publication_date === null ? 1 : b.publication_date === null ? -1 : new Date(b.publication_date) - new Date(a.publication_date)));
                        setSortedData(resp.sort((a, b) => a.publication_date === null ? 1 : b.publication_date === null ? -1 : new Date(b.publication_date) - new Date(a.publication_date)));
                    }
                    setLoading(false);
                })

                await DataService.getData("languages").then(
                    resp => {
                        setLanguages(resp);
                        setLoadingLanguages(false);
                    }
                )
            };
            loadBooks();
        }, []
    )

    if(isLoading || isLoadingLanguages) return <Loading/>
    return(
        <>
            <HeaderBookNav bookAuthors={location.state ? location.state.bookAuthors : []} bookTitle = {location.state ? location.state.bookTitle: ""}/>
            <ContentWrapper>
                    <div className={styles.filters}>
                        <p>Filters</p>
                        <div className={styles.wrapper}>
                        <SelectInput 
                            name = {"sort"} 
                            label = {"Sort by"} 
                            placeholder = {""} 
                            values = {sortingValues} 
                            startValues = {[sortingValues[0]]}
                            setStateFn = {(e) => setSorting(e)}
                            single
                            noAdd
                            key = {"sorting"}
                        />
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>Formats</legend>
                            {formatCheckbox}
                        </fieldset>
                        <SelectInput 
                            name = {"languages"} 
                            label = {"Language"} 
                            placeholder = {""} 
                            values = {languages} 
                            startValues = {[]}
                            setStateFn = {(e) => setFilteringLanguages(e)}
                            single
                            noAdd
                            key = {"languages"}
                        />
                        </div>
                    </div>
                <BookList data = {checkedData}/>
            </ContentWrapper>
        </>
    )
}

export default EditionView;

