import React from "react";
import EntryForm from "components/EntryForm/EntryForm";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import Frame from "components/Frame/Frame";
import Heading from "components/Heading/Heading";
import Subeading from "components/Subheading/Subheading";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

const SignUpView = () => {
    return (
        <ContentWrapper>
            <EntryForm 
                title = {"Join the bookworm community"}
                buttonText={"Sign up"}
                page={"signup"}
                questionText={"Already have an account?"}
                actionText= {"Log in"}
                link={"login" } 
            />
            <Frame>
                    <Heading size = {24}>Are you an author?</Heading>
                    <Subeading>Leave us your email, we will contact you!</Subeading>
                    <Input name = {"email"} label = {"Email"} type = {"email"}/>
                    <Button>Submit</Button>
            </Frame>
        </ContentWrapper>
    )
}

export default SignUpView;