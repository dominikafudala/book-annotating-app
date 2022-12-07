import React from "react";
import styles from "./Modal.module.scss";
import Title from "components/Title/Title";
import Subeading from "components/Subheading/Subheading";
import successIcon from "assets/success_icon.svg";


const Modal = ({title, subheading, button, success, children}) => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                {success 
                    && 
                <div className={styles.success}>
                    <img src={successIcon} alt={"Success icon"} className={styles.icon} />
                </div>
                }
                <Title smaller>{title}</Title>
                <Subeading>{subheading}</Subeading>
                {children}
                <div className={styles.buttonWrapper}>
                    {button}
                </div>
            </div>
        </div>
    )
}

export default Modal;