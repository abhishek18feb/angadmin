import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _http: HttpClient, private _router: Router) { }
  serverUrl = 'http://localhost:3000/';
  addUser(formData){
   const options = {
              headers: new HttpHeaders().append('Accept', 'application/json')
            }
  	return this._http.post<any>(this.serverUrl+'users/signup', formData);
  }
  	getToken() {
	 return localStorage.getItem('token')
	}
	loginUser(userData){
	    let result = JSON.stringify(userData)
	    return this._http.post<any>(this.serverUrl+'users/login', JSON.parse(result));
	  }
    logoutUser() {
	    localStorage.removeItem('token')
	    this._router.navigate(['/admin/login'])
	}
	loggedIn() {
	    return !!localStorage.getItem('token')
	}
}
