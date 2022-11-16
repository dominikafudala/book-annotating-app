import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";


const ResetPasswordView = () => (
    <ContentWrapper>
        <EntryForm 
                title = {"Reset password"}
                buttonText={"Reset my password"}
                page={"reset"} 
                subtitle = {"Enter your email to get a link to set a new password."}
            />
    </ContentWrapper>
)

export default ResetPasswordView;