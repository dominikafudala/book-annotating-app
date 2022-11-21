import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";
import { useLocation } from "react-router-dom";

const CheckEmailSignupView = () => {

    const mail = useLocation().state.mail;
    const context = useContext(LocationContext);

    console.log(mail);

    return(
        <ContentWrapper>
            <EntryForm 
                    title = {"Check your email"}
                    buttonText={"Sign up"}
                    page={context.PAGES.checkSignup} 
                    subtitle = {"Go to the link we emailed you to verify your account."}
                    questionText={"Haven't recieved this email?"}
                    actionText= {"Resend"}
                />
        </ContentWrapper>
    )
}

export default CheckEmailSignupView;