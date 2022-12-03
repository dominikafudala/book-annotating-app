import { ReactSession } from 'react-client-session';

class SessionService {

    static getAccessToken(){
        ReactSession.setStoreType("localStorage");
        return ReactSession.get("access_token");
    }
}

export default SessionService;