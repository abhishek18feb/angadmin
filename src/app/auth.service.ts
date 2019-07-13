import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public _http: HttpClient, private _router: Router) { }
  serverUrl = 'http://localhost:3000/';
  	getToken() {
	 return localStorage.getItem('token')
	}
}
