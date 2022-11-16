import React from "react";
import styles from "./EntryForm.module.scss";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import GoBack from "components/GoBack/GoBack";
import OptionInfo from "./OptionInfo";
import Subeading from "components/Subheading/Subheading";

const EntryForm = ({title, buttonText, page, questionText, actionText, link, subtitle}) => {
    return (
        <div className={styles.wrapper}>
            <GoBack/>
            <Title>{title}</Title>
            {
                page !== "signup" && page !== "login"
                ?
                <Subeading size={20}>{subtitle}</Subeading>
                :
                null
            }
            <div className={styles.action}>
                {
                    page === "signup" || page === "login" ?
                    <>
                        <Button secondary google>Sign in with Google</Button>
                        <div className={styles.orLine}>
                            <div></div>
                            <p className={styles.orText}>or</p>
                            <div></div>
                        </div>
                    </> :
                    null
                }
                {
                    page !== "check" ?
                    <form action="" className={styles.form}>
                        {
                            page === "signup" ?
                            <Input name = {"username"} label = {"Username"} /> :
                            null
                        }
                        {
                            page !== "set" ?
                            <Input name = {"email"} label = {"Email"} type = {"email"}/>
                            :
                            null
                        }
                        {
                            page !== "reset" ?
                            <Input name = {"password"} label = {"Password"} type = {"password"}/>
                            :
                            null
                        }
                        {
                            page === "set" ?
                            <Input name = {"repeat"} label = {"Repeat password"} type = {"password"}/>
                            :
                            null
                        }
                        {
                            page === "login" ?
                            <a href="reset" className={styles.forgotPassword}>Forgot password?</a>:
                            null
                        }
                        <Button>{buttonText}</Button>
                    </form>
                    :
                    null
                }
                {
                    page !== "reset" ?
                    <OptionInfo question={questionText} action = {actionText} link = {link} left/> 
                    :
                    null
                }
            </div>
        </div>
    )
}

export default EntryForm;