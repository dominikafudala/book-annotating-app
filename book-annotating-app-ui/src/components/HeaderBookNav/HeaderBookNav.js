import React from "react";
import styles from "./HeaderBookNav.module.scss";
import GoBack from "components/GoBack/GoBack";
import { useNavigate } from "react-router-dom";
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";

const HeaderBookNav = ({bookTitle, bookAuthors, location}) => {
    const navigate = useNavigate();
    const context = useContext(LocationContext);
    return (
        <div className={styles.wrapper}>
            <GoBack onClickFn={() => {context.setLocation({location: location}); navigate(-1); }}>Go back</GoBack>
            <div className={styles.bookInfo}>
                <p>{bookTitle !== undefined && bookTitle}</p>
                <p>{bookAuthors !== undefined && bookAuthors.map(el => el.name).join(", ")}</p>
            </div>
        </div>
    )
}

export default HeaderBookNav;