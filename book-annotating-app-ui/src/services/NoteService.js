import BACKEND_LOCATION from "properties";
import axios from "axios";
import SessionService from "services/SessionService";

class NoteService {
    static #mapping = "note"

    static async getPublicNotes(bookId) {

        let response;

        try{
            response = await axios.get(BACKEND_LOCATION+this.#mapping+"/"+bookId);
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return -1;
    }
}

export default NoteService;