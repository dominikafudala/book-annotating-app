import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";


const ResetPasswordView = () => {
    const context = useContext(LocationContext);

    return(
    <ContentWrapper>
        <EntryForm 
                title = {"Reset password"}
                buttonText={"Reset my password"}
                page={context.PAGES.reset} 
                subtitle = {"Enter your email to get a link to set a new password."}
            />
    </ContentWrapper>
)
    }

export default ResetPasswordView;