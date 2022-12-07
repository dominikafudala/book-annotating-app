import React from "react";
import PropTypes from 'prop-types';
import styles from "./Input.module.scss";


const Input = ({name, label, id, type, inputQuantity, tag:Tag, labelTop, errorInput, ...props}) => {
    const labelClass = labelTop ? styles.labelTop : styles.label;
    const inputs = [];
   const erroraClassInput = errorInput ? styles.errorInput : "";

    for(let i = 0; i < inputQuantity; i++){
        inputs.push(
            <Tag
                type={type} 
                name = {name}
                id = {id ? id : label} 
                data-name = {name}
                data-label = {label}
                className = {`${Tag === "input" ? (type === "checkbox" ? styles.checkbox : styles.input) : styles.textarea} ${erroraClassInput}`} 
                placeholder = " "
                key={`${label}${i}`}
                {...props}
            />
        );
    }

    const multipleInputsClassName = inputQuantity > 1 ? styles.multipleInputs : "";
    const radioClass = type === "radio" ? styles.radio: "";

    return(
        <div className={`${styles.formItem} ${multipleInputsClassName} ${radioClass} ${erroraClassInput}`}>
            {inputs}            
            <label 
                className={labelClass}
                htmlFor = {id ? id : label} 
            >
                {label}
            </label>
        </div>
    )
};


Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    inputQuantity: PropTypes.number,
    tag: PropTypes.string
};


Input.defaultProps = {
    type: "text",
    inputQuantity: 1,
    tag: "input"
}

export default Input;