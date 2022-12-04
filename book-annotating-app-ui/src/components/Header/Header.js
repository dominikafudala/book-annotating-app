import React from "react";
import styles from "./Header.module.scss";
import logo from "assets/Logo.svg"
import Button from "components/Button/Button";
import SessionService from "services/SessionService";

const Header = () => {

    const isLoggedIn = SessionService.isAccesTokenValid();

    return (
        <header className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <img src = {logo} alt="Papier logo" className={styles.logo} />
            </div>
            <div className={styles.buttonWrapper}>
                {!isLoggedIn ?
                    <>
                        <Button small secondary href={"login"}>Log in</Button>
                        <Button small href = {"signup"}>Sign up</Button>
                    </>
                    : ""
                }
            </div>
        </header>
    )
}

export default Header;