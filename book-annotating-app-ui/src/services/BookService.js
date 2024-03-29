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

    static async changeEdition(bookId) {
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"edition/change",bookId, {
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

    static async saveBook(bookId) {
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/save",bookId, {
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

    static async isBookSaved(bookId) {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/saved/"+ bookId, {
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

    static async getTop() {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/top");
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }

    static async getAllBooks(skip) {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"edition/all/"+ skip, {
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

    static async search(search) {
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/search",search, {
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`,
                    'Access-Control-Allow-Origin': "*"
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }

    static async getCurrentlyReading() {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/currentlyreading", {
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

    static async getSaved() {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/saved", {
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

    static async getToReview() {
        let response;
        try{
            response = await axios.get(BACKEND_LOCATION+"book/toreview", {
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

    static async delete(id) {
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/delete",id, {
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`,
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'application/json'
                }
            });
        }catch (err){
            return -1;
        }

        if(response.status === 200) return response.data;
        else return 0;
    }
    static async accept(id) {
        let response;
        try{
            response = await axios.post(BACKEND_LOCATION+"book/accept",id, {
                headers: {
                    'Authorization': `Bearer ${SessionService.getAccessToken()}`,
                    'Access-Control-Allow-Origin': "*",
                    'Content-Type': 'application/json'
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