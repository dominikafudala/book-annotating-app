import React from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import EntryForm from "components/EntryForm/EntryForm";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";

const SetNewPasswordView = () => {
    const context = useContext(LocationContext);

    return(
    <ContentWrapper>
        <EntryForm 
                title = {"set new password"}
                buttonText={"Set new password"}
                page={context.PAGES.set} 
                subtitle = {"Enter a new password."}
            />
    </ContentWrapper>
    )
}

export default SetNewPasswordView;