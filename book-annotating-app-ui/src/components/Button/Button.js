import React from "react";
import styles from "./Button.module.scss";
import googleIcon from "assets/google_icon.svg";

const Button = ({children, small, secondary, google, href}) => {

    const buttonClassSize = small ? styles.small : styles.big;
    const buttonClassSecondary = secondary ? styles.secondary : styles.primary;

    return (
        <>
            {
                href ?
                (
                    <a href={href}
                    className={`${styles.buttonLink} ${buttonClassSize} ${buttonClassSecondary}`}
                    rel="noreferrer"
                    >
                        {children}
                    </a>
                    ) : (
                        <button className={`${styles.button} ${buttonClassSize} ${buttonClassSecondary}`}>
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