import React from "react";
import styles from "./DashboardView.module.scss";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import Title from "components/Title/Title";
import SessionService from "services/SessionService";
import { useState } from "react";
import UserDashboard from "components/UserDashboard/UserDashboard";

const DashboardView = () => {
    const role = SessionService.getRole();
    const [username, setUsername] = useState();

    const getUsername = async() => await SessionService.getUsername().then(resp => setUsername(resp));

    getUsername();
    return (
        <>
            <ContentWrapper>
                <LeftContentWrapper>
                    <Title>Hello {role === "user" ? "again, " : "chief, "} {username}</Title>
                </LeftContentWrapper>
            </ContentWrapper>
            {role === "user" ? <UserDashboard/> : null}
        </>
    )
}

export default DashboardView;