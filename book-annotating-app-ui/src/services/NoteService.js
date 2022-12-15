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

    static async getUserNotes(bookId) {

        let response;

        try{
            response = await axios.get(BACKEND_LOCATION+this.#mapping+"/user/"+bookId,{
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

    static async getBuddyNotes(bookId) {

        let response;

        try{
            response = await axios.get(BACKEND_LOCATION+this.#mapping+"/buddy/"+bookId,{
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

    static async addNote(note) {

        let response;

        try{
            response = await axios.post(BACKEND_LOCATION+this.#mapping+"/addnote",note,{
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

    static async getReplies(noteid) {

        let response;

        try{
            response = await axios.get(BACKEND_LOCATION+this.#mapping+"/replies/"+noteid,{
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

export default NoteService;