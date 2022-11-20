import React from "react";
import styles from "./Button.module.scss";
import googleIcon from "assets/google_icon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";

const Button = ({children, small, secondary, google, href}) => {

    const buttonClassSize = small ? styles.small : styles.big;
    const buttonClassSecondary = secondary ? styles.secondary : styles.primary;
    const context = useContext(LocationContext);

    return (
        <>
            {
                href ?
                (
                    <Link to={href}
                    className={`${styles.buttonLink} ${buttonClassSize} ${buttonClassSecondary}`}
                    onClick = {() =>{
                        context.setLocation(
                            {
                                location : "/"+href
                            }
                        )
                    }}    
                    >
                        {children}
                    </Link>
                    ) : (
                        <button className={`${styles.button} ${buttonClassSize} ${buttonClassSecondary}`} type = {"submit"}>
                            {
                                google ?
                                <img className = {styles.googleIcon} src={googleIcon} alt="Google Icon" /> :
                                null
                            }
                            {children}
                        </button>
                    )
            }
        </>
    )
}

export default Button;