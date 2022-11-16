import React from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import EntryForm from "components/EntryForm/EntryForm";

const SetNewPasswordView = () => (
    <ContentWrapper>
        <EntryForm 
                title = {"set new password"}
                buttonText={"Set new password"}
                page={"set"} 
                subtitle = {"Enter a new password."}
            />
    </ContentWrapper>
)

export default SetNewPasswordView;