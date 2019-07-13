import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$(document).ready(function(){
  		 $('body').addClass('login')
  	})
  }

}
