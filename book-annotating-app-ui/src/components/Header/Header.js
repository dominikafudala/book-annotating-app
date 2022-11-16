import React from "react";
import styles from "./Header.module.scss";
import logo from "assets/Logo.svg"
import Button from "components/Button/Button";

const Header = () => {

    return (
        <header className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <img src = {logo} alt="Papier logo" className={styles.logo} />
            </div>
            <div className={styles.buttonWrapper}>
                <Button small secondary href={"login"}>Log in</Button>
                <Button small href = {"signup"}>Sign up</Button>
            </div>
        </header>
    )
}

export default Header;