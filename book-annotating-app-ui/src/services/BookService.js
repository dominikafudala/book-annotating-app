import BACKEND_LOCATION from "properties";
import axios from "axios";
import SessionService from "services/SessionService";

class BookService {
    static async addBook(bookModel) {
        if(bookModel.title.length === 0 || bookModel.page_number.length === 0 || isNaN(parseInt(bookModel.page_number))){
            return -1;
        }

        const response = await axios.post(BACKEND_LOCATION+"book/addBook", bookModel, {
            headers: {
                'Authorization': `Bearer ${SessionService.getAccessToken()}`
            }
        });

        if(response.status === 200) return response.data;
        else return -1;
    } 
}

export default BookService;