import React from "react";
import styles from "./Button.module.scss";
import googleIcon from "assets/google_icon.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";
import checkedIcon from "assets/checked.svg";

const Button = ({children, small, secondary, google, checked, href, onClickFn, params, ...rest}) => {

    const buttonClassSize = small ? styles.small : styles.big;
    const buttonClassSecondary = secondary ? styles.secondary : styles.primary;
    const context = useContext(LocationContext);

    return (
        <>
            {
                href ?
                (
                    <Link to={'/' + href}
                    state = {{
                        params: params
                    }
                    }
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
                        <button className={`${styles.button} ${buttonClassSize} ${buttonClassSecondary}`} type = {"submit"} onClick = {onClickFn} {...rest}>
                            {
                                google ?
                                <img className = {styles.googleIcon} src={googleIcon} alt="Google Icon" /> :
                                null
                            }
                            {
                                checked ?
                                <img className = {styles.checkedIcon} src={checkedIcon} alt="checked icon" /> :
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