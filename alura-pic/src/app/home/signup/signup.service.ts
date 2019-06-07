import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from '../../../environments/environment';

const API = environment.ApiUrl;

@Injectable()
export class SignUpService {

    constructor(private http: HttpClient) {}

    checkUserNameTake(userName: string) {
        return this.http.get(`${API}/user/exists/${userName}`);
    }

    signup(newUser: NewUser) {
        return this.http.post(`${API}/user/signup`, newUser);
    }
}