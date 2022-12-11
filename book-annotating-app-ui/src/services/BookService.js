import BACKEND_LOCATION from "properties";
import axios from "axios";
import SessionService from "services/SessionService";

class BookService {
    static async addBook(bookModel) {
        console.log(bookModel);
        if(bookModel.title.length === 0 || bookModel.page_number.length === 0 || isNaN(parseInt(bookModel.page_number))){
            return -1;
        }

        let response;

        try{
            response = await axios.post(BACKEND_LOCATION+"book/addBook", bookModel, {
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

    static async addBookByIsbn(isbn){
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/findbyisbn", isbn, {
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

    static async findBookById(bookId){
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/"+bookId,{
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

    static async checkIsbn(isbn){
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/checkIsbn",isbn,{
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`
                }
            });
        }catch (err){
            return false;
        }

        if(response.status === 200) return response.data;
        else return false;
    }

    static async getLanguageFromIsbn(isbn){
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/getLanguageFromIsbn",isbn,{
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`
                }
            });
        }catch (err){
            return false;
        }

        if(response.status === 200) return response.data;
        else return false;
    }

    static async getBookProgress(bookId){
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/getbookprogress/"+bookId,{
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }
    
    static async updateBookProgress(newProgress, bookId){
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/updateprogress/"+bookId, newProgress, {
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`,
                    'Content-Type': 'application/json'
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }

    static async getAllBookEditions(editionId){
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"edition/"+editionId, {
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }
}

export default BookService;