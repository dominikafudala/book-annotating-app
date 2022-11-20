import React from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import EntryForm from "components/EntryForm/EntryForm";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";

const LoginView = () => {

    const context = useContext(LocationContext);
    return(
        <ContentWrapper>
        <EntryForm 
                title = {"Welcome back"}
                buttonText={"Log in"}
                page={context.PAGES.login} 
                questionText={"Don't have an account?"}
                actionText= {"Sign up"}
                link={"signup"}
            />
        </ContentWrapper>
    )
}

export default LoginView;