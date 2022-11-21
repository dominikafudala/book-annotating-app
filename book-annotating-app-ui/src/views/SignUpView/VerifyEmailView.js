import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import BACKEND_LOCATION from "properties";
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import EntryForm from "components/EntryForm/EntryForm";
import { useState } from "react";
import { useEffect } from "react";

const VerifyEmailView = () => {
    const context = useContext(LocationContext);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [title, setTitle] = useState();

    const verifyToken =  async (token) => {
        await axios.get(BACKEND_LOCATION+'verifyMail?token='+token).then(
            res => setTitle(res.data))
    }

    useEffect(() =>
    {
        verifyToken(token);
    },[token])


    return(
        <ContentWrapper>
             <EntryForm 
                    title = {title}
                    buttonText={"Log in"}
                    page={context.PAGES.verifyEmail} 
                    href = {context.PAGES.login}
                />
        </ContentWrapper>
    )
}

export default VerifyEmailView;