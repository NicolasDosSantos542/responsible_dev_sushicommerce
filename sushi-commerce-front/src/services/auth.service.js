import jwt from 'jwt-decode'
import axios from "axios";
const API_URL = 'http://localhost:4242/user/';

class AuthService {

    logout() {
        localStorage.removeItem("letShopToken");
    }

    getCurrentAuth() {
        if(localStorage.getItem('letShopToken')) {
            return localStorage.getItem('letShopToken');
        } else {
            return false;
        }

    }

    getId() {
        if(localStorage.getItem('letShopToken')) {
            return jwt(localStorage.getItem('letShopToken')).id;
        } else {
            return false;
        }
    }

    isLogin() {
        const token = localStorage.getItem("letShopToken");
        if(token){
            let tokenExpiration = jwt(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                this.logout();
                return false;
            }else{
               return true;
            }
        } else {
            return false;
        }
    }

    isAdmin() {
        const token = localStorage.getItem("letShopToken");
        if(token){
            let tokenExpiration = jwt(token).exp;
            let dateNow = new Date();

            if(tokenExpiration < dateNow.getTime()/1000){
                this.logout();
                return false;
            } else if (jwt(token).admin) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    async getUser() {
        return  await axios.get(API_URL + 'user/');
    }
}

export default new AuthService();
