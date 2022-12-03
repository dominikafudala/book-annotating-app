import SessionService from "services/SessionService";
import BACKEND_LOCATION from "properties";
import axios from "axios";

class DataService {
    static async getData(data) {
        const req = await axios.get(BACKEND_LOCATION+"book/" + data, {
            headers: {
                'Authorization': `Bearer ${SessionService.getAccessToken()}`
            }
        });

        return req.data;
    }
}

export default DataService;