import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  		$(document).ready(function(){
	  		 $('body').removeClass('login')
	  		 $('body').addClass('nav-md')
	  	})
  }

}
