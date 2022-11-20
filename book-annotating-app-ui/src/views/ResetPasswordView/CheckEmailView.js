import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";


const CheckEmailView = () => {
    const context = useContext(LocationContext);

    return(
    <ContentWrapper>
        <EntryForm 
                title = {"Check your email"}
                page={context.PAGES.check} 
                subtitle = {"Go to the link we emailed you to reset your password."}
                questionText={"Haven't recieved this email?"}
                actionText= {"Resend"}
            />
    </ContentWrapper>
)
    }

export default CheckEmailView;