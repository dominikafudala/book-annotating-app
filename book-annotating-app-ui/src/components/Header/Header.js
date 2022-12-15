import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "assets/Logo.svg"
import Button from "components/Button/Button";
import SessionService from "services/SessionService";
import Nav from "./Nav";
import { useState } from "react";
import logOutIcon from "assets/log_out.svg"

const Header = () => {

    const isLoggedIn = SessionService.isAccesTokenValid();
    const [classBackground, setClassBackground] = useState(false);
    
    useEffect(
        () => {
            window.addEventListener("scroll", () => window.scrollY > 96 ? setClassBackground(true) : setClassBackground(false));
        }
        ,[]
    )

    const logout = () => {
        SessionService.logout();
        window.location.pathname = "/";
    }

    return (
        <header className={`${styles.wrapper} ${classBackground ? styles.background : ""}`}>
            <div className={styles.contentWrapper}>
            <div className={styles.logoWrapper}>
                <img src = {logo} alt="Papier logo" className={styles.logo} />
                <Nav isLoggedIn={isLoggedIn}/>
            </div>
            <div className={styles.buttonWrapper}>
                {!isLoggedIn ?
                    <>
                        <Button small secondary href={"login"}>Log in</Button>
                        <Button small href = {"signup"}>Sign up</Button>
                    </>
                    : <div className={styles.logOut} onClick = {logout}>
                        <img src={logOutIcon} alt="Log out icon" />
                    </div>
                }
            </div>
            </div>
        </header>
    )
}

export default Header;