import React from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import EntryForm from "components/EntryForm/EntryForm";

const LoginView = () => (
    <ContentWrapper>
        <EntryForm 
                title = {"Welcome back"}
                buttonText={"Log in"}
                page={"login"} 
                questionText={"Don't have an account?"}
                actionText= {"Sign up"}
                link={"signup"}
            />
    </ContentWrapper>
)

export default LoginView;