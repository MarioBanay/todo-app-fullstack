import axios from "axios";
import { API_URL } from '../../Constants.js';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {

        return axios.post(`${API_URL}/authenticate`, {
            username: username,
            password: password
        });
    }

    registerSuccessfulJwtLogin(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }


    executeBasicAuthenticationService(username, password) {

        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        });
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) {
            return false;
        } else {
            return true;
        }
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) {
            return ''
        }
        return user;
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        );
    }

}

export default new AuthenticationService();