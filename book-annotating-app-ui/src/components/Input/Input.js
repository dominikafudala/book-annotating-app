import React from "react";
import PropTypes from 'prop-types';
import styles from "./Input.module.scss";


const Input = ({name, label, type, ...props}) => {
    return(
        <div className={styles.formItem}>
            <input
                type={type} 
                name = {name}
                id = {name} 
                className = {styles.input} 
                placeholder = " "
                required
                {...props}
            />
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
    maxLength: PropTypes.number
};


Input.defaultProps = {
    type: "text",
    maxLength: 250
}

export default Input;