import BACKEND_LOCATION from "properties";
import axios from "axios";
import SessionService from "services/SessionService";

class BookService {
    static async addBook(bookModel) {
        if(bookModel.title.length === 0 || bookModel.page_number.length === 0 || parseInt(bookModel.page_number) === NaN){
            return false;
        }
    } 
}

export default BookService;