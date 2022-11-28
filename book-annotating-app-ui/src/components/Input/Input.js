import React from "react";
import PropTypes from 'prop-types';
import styles from "./Input.module.scss";


const Input = ({name, label, type, inputQuantity, ...props}) => {
    const inputs = [];
    for(let i = 0; i < inputQuantity; i++){
        inputs.push(
            <input
                type={type} 
                name = {name}
                id = {name} 
                className = {styles.input} 
                placeholder = " "
                key = {`${name}${i}`}
                required
                {...props}
            />
        );
    }

    const multipleInputsClassName = inputQuantity > 1 ? styles.multipleInputs : "";

    return(
        <div className={`${styles.formItem} ${multipleInputsClassName}`}>
            {inputs}            
            <label 
                className={styles.label}
                htmlFor = {name}
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
    inputQuantity: PropTypes.number
};


Input.defaultProps = {
    type: "text",
    inputQuantity: 1
}

export default Input;