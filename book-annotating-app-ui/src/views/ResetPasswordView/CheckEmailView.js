import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";


const CheckEmailView = () => (
    <ContentWrapper>
        <EntryForm 
                title = {"Check your email"}
                page={"check"} 
                subtitle = {"Go to the link we emailed you to reset your password."}
                questionText={"Haven't recieved this email?"}
                actionText= {"Resend"}
            />
    </ContentWrapper>
)

export default CheckEmailView;