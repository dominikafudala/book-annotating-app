import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import styles from "./SelectInput.module.scss";
import arrow from "assets/arrow_select.svg";
import { useState } from "react";

const SelectInput = ({name, label, placeholder, setStateFn, values, single, noAdd, startValues}) => {
    const [newValues, setNewValues] =  useState([...startValues.filter(el => el.id < 0)]);
    const [checkedValues, setCheckedValues] = useState(startValues.length > 0 && Object.keys(startValues[0]).length > 0 ? [...startValues] : []);
    const [renderedCheck, setRenderedCheck] = useState([]);
    let newIndex = -1;

    const toggleCheckedValue = (e) => {
        if(checkIfIdExists(e.id)){
            setCheckedValues([...checkedValues.filter(el => el.id !== e.id)]);
        }else{
            single ?
            setCheckedValues([
                    {
                    id: e.id,
                    name: e.dataset.label
                    }
            ])
            :
            setCheckedValues(prev => ([
                ...prev,
                {
                id: e.id,
                name: e.dataset.label
                }
            ]))
        }
    }

    const checkIfIdExists = (id) => {
        const checkedValuesIds = [...checkedValues.map(el => el.id)];

        return checkedValuesIds.includes(id)
    }

    const onClickFn = (e) => {
        e.preventDefault();
        setStateFn(e);
        toggleCheckedValue(e.target);
    }

    //render checked items
    const renderChecked = () => {
        const checkedDivs = [];

        for(let i = 0; i < checkedValues.length; i++){
            const c = checkedValues[i];
            checkedDivs.push(
                <div data-name = {name} data-label = {c.name} id = {c.id} className={single ? styles.checkedOptionSingle : styles.checkedOption} key = {c.id} onMouseDown = {onClickFn}>
                        <p data-name = {name} data-label = {c.name} id = {c.id} >{c.name}</p>
                        <div data-name = {name} data-label = {c.name} id = {c.id}  className={styles.close}>
                        <div data-name = {name} data-label = {c.name} id = {c.id}  className={styles.img}></div>
                        </div>
                    </div>
            )
        }

        setRenderedCheck(checkedDivs)        
    }

    useEffect(
        renderChecked, [checkedValues]
    )


    //check if dropdown should be shown
    const [focused, setFocused] = useState(false);

    const toggleResults = () => {
        const inputElement = document.querySelector(`.${styles.input}`);
        if(!focused){
            inputElement.focus();
        } else{
            inputElement.blur();
        }
    }

    const onFocusFn = () => {
        setFocused(true);
    }

    const onBlurFn = () => {
        setFocused(false);
    }

    //render what options should be in dropdown
    const [options, setOptions] = useState([
        ...newValues,
        ...values
    ]);

    const [optionsElements, setOptionsElements] = useState([]);

    const renderOptions = () => {
        setOptionsElements([]);
        for(let o of options){
            setOptionsElements((prev) => [
                ...prev,
                <div className={styles.option} key = {o.id} onMouseDown = {onClickFn}>
                    <p data-name ={name} data-label = {o.name} id = {o.id}>{o.name}</p>
                </div>
            ])
        }
    }

    useEffect(
        renderOptions, [options, checkedValues]
    )

    // after input search options and create new option from input
    const onKeyUpFn = (e) => {
        setNewValues([...checkedValues.filter(el => el.id < 0)]);

        newIndex = Math.min([...newValues.map(el => el.id)])-1;

        const value = e.target.value.trim();
        if(!value && noAdd) {
            setOptions([
                ...values
            ])
            return;
        }
        const searchedValues = [...newValues, ...values].filter(el => el.name.toLowerCase().includes(value.toLowerCase()));

        if (value === "" && options[0].id < 0) {
            setOptions([
                ...newValues,
                ...values
            ])
        } else if(value === ""){
            return;
        } else {
            // if inputted option is on the list
            if([...searchedValues.map(el => el.name.toLowerCase())].includes(value.toLowerCase()) || noAdd){
                setOptions([
                    ...searchedValues
                ])
            } else if(!noAdd){
                setOptions([
                    {
                        id: newIndex,
                        name: e.target.value
                    },
                    ...searchedValues
                ])
            }
        }
    }

    return (
        <div className={styles.formItem}>
            <div className={styles.select}>
                <div className={styles.checkedOptions}>
                    {renderedCheck}
                </div>
                <input type="text" className={styles.input} placeholder = {placeholder} onBlur = {onBlurFn}  onFocus = {onFocusFn} onKeyUp = {onKeyUpFn}/>          
                <label 
                    className={styles.label}
                    htmlFor = {label}
                >
                    {label}
                </label>
            </div>
            <div className={focused ? styles.arrowWrapperFocus : styles.arrowWrapper} onMouseDown = {toggleResults}>
                <img src={arrow} alt={"Arrow"} />
            </div>
            <div className={styles.options}>
                <div className={styles.inner}>
                    <div className={styles.overlay}>
                    </div>
                    {optionsElements}
                </div>
            </div>
        </div>
    )
}

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    setStateFn: PropTypes.func.isRequired,
    values: PropTypes.array.isRequired,
    startValues:  PropTypes.array.isRequired
}

export default SelectInput;