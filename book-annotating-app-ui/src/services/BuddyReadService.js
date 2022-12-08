import BACKEND_LOCATION from "properties";
import axios from "axios";
import SessionService from "services/SessionService";

class BuddyReadService {
    static #mapping = "buddy";

    static async getBuddyReads(bookId) {

        let response;

        try{
            response = await axios.get(BACKEND_LOCATION+this.#mapping+"/"+bookId,{
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return -1;
    }
}

export default BuddyReadService;