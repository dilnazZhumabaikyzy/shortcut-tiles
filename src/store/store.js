import { makeAutoObservable } from "mobx";
import AutService from "../services/AuthService";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this); 
    }

    setAuth(bool){
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    async login(email, password){
        try {
            const response = await AutService.login(email, password);
            console.log(response);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async registration(email, password){
        try {
            const response = await AutService.registration(email, password);
            localStorage.setItem('token',response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async logout(email, password){
        try {
            const response = await AutService.logout(email, password);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    
}