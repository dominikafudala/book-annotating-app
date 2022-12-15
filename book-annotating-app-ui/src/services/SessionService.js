import { ReactSession } from 'react-client-session';
import BACKEND_LOCATION from "properties";
import axios from "axios";

class SessionService {

    static getAccessToken(){
        ReactSession.setStoreType("localStorage");
        return ReactSession.get("access_token");
    }

    static logout(){
        ReactSession.setStoreType("localStorage");
        ReactSession.remove("access_token");
    }

    static parseJson(){
        const access_token = this.getAccessToken();
        if(!access_token) return false;
        
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    static isAccesTokenValid (){
        const jsonParsed = this.parseJson();

        if(jsonParsed.exp > Date.now()/1000) return true;

        return false;
    }

    static getRole(){
        const jsonParsed = this.parseJson();

        return jsonParsed.role[0];

    }

    static async getUsername(){
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"username",{
                headers: {
                    'Authorization': `Bearer ${this.getAccessToken()}`
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }
}

export default SessionService;