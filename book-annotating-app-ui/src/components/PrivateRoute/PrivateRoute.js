import React from "react";
import SessionService from "services/SessionService";
import { Outlet , Navigate} from "react-router-dom";

const PrivateRoute = ({element, ...rest}) => {

    const isLoggedIn = SessionService.isAccesTokenValid();

    return isLoggedIn ? <Outlet/> : <Navigate to = "/login"/>;
}

export default PrivateRoute;