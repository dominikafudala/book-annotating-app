import BookContext from "contexts/BookContext";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import styles from "./Summary.module.scss";
import StepDesc from "./StepDesc";


const Summary = () => {

    const context = useContext(BookContext);
    const book = context.book;

    // groups with keys in state in titles for summary
    const groups = {
        "general": {
            "isbn": "ISBN",
            "title": "Title",
            "series_name": "Series",
            "series_number": "Series number",
            "authors": "Authors",
            "imgUrl": "Cover"
        },
        "plot" :{
            "description": "Description",
            "genres": "Genres"
        },
        "specification" :{
            "publisher": "Publisher",
            "publication_date": "Publication date",
            "page_number": "Pages",
            "format": "Format",
            "language": "Language"
        }
    }

    const [groupGeneral, setGeneral] = useState({});
    const [groupPlot, setPlot] = useState({});
    const [groupSpecification, setSpecification] = useState({});

    const setSpecificGroup = (group, setGroup) => {
        for(let [key, value] of Object.entries(group)){
            const bookKey = book[key];
            if(bookKey.length !== 0 && Object.keys(bookKey).length !== 0){
                setGroup((prev)=>({
                    ...prev,
                    [value] : bookKey
                }))
            }else{
                setGroup(
                    prev => {
                        let rest = prev;
                        delete rest[value];
                        return rest;
                    }
                )
            }
        }
    }
    
    const setGroups = () => {
        setSpecificGroup(groups.general, setGeneral);
        setSpecificGroup(groups.plot, setPlot);
        setSpecificGroup(groups.specification, setSpecification);
    }

    useEffect(
        setGroups, [book]
    )

    const [generalElements, setGeneralElements] = useState([]);
    const [plotElements, setPlotElements] = useState([]);
    const [specificationElements, setSpecificationElements] = useState([]);

    // render summary for step
    const setStep = (title, group, setGroupFn) => {
        if(Object.keys(group).length === 0) 
        {
            setGroupFn([]);
            return;
        }
        const stepArr = [];
        
        stepArr.push(
            <div key = {"title"} className={styles.stepSummary}>
                <div className={styles.title}>
                    <div className={styles.line}></div>
                    <StepDesc smaller>{title}</StepDesc>
                </div>
            </div>
        )

        const sortingArr = Object.entries(groups[title]).map(el => el[1]);

        const s = Object.keys(group).sort((a, b) => sortingArr.indexOf(a) - sortingArr.indexOf(b));

        for(let key of s){
            if(key === "Series number") continue;
            const value = group[key];
            let valueDesc = [];
            if(Array.isArray(value)){
                value.forEach(element => {
                    valueDesc.push(element.name);
                });
            } else if(typeof value === "object"){
                valueDesc.push(value.name);
            }else{
                valueDesc.push(value)
            }

            stepArr.push(
                <div key = {key} className={styles.element}>
                    <p>{key}:</p>
                    <p>{valueDesc.join(", ")} {key === "Series" && group["Series number"] !== undefined ? `#${group["Series number"]}`: ""}</p>
                </div>
            )
        }

        setGroupFn(stepArr);
    }

    const setAllSteps = () => {
        setStep("general", groupGeneral, setGeneralElements);
        setStep("plot", groupPlot, setPlotElements);
        setStep("specification", groupSpecification, setSpecificationElements);
    }

    useEffect(
        setAllSteps, [groupGeneral, groupPlot, groupSpecification]
    )


    return(
        <div className={styles.summary}>
            {generalElements}
            {plotElements}
            {specificationElements}
        </div>
    )

}

export default Summary;