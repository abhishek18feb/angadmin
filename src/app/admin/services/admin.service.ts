import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AdminService {

	serverUrl = 'http://localhost:3000/';
  	constructor(public _http: HttpClient, private _router: Router) { }
  	saveCategory(formData){
	  		const options = {
	              headers: new HttpHeaders().append('Accept', 'application/json')
	            }
	  		return this._http.post<any>(this.serverUrl+'categories', formData, options)
	}
	getAllCategory(){
		return this._http.get<any>(this.serverUrl+'categories')
	}
	deleteCategory(id){
		return this._http.delete<any>(this.serverUrl+'categories/'+id)
	}
	changeCategoryStatus(id){
		console.log(id)
		return this._http.get<any>(this.serverUrl+'categories/change_status/'+id)
	}
	getSingleCategory(id){
		console.log(id)
		return this._http.get<any>(this.serverUrl+'categories/'+id, { observe: 'response' })
	}
	updateCategory(formdata, id){
		const options = {
	              headers: new HttpHeaders().append('Accept', 'application/json').append('observe', 'response')
	            }
		return this._http.put<any>(this.serverUrl+'categories/'+id, formdata, options)
	}
	saveSubCategory(formdata){
		return this._http.post<any>(this.serverUrl+'subcategories', formdata, { observe: 'response' })
	}
	getAllSubCategory(){
		return this._http.get<any>(this.serverUrl+'subcategories', {observe: 'response'})
	}
	deleteSubCategory(id){
		return this._http.delete<any>(this.serverUrl+'subcategories/'+id)
	}
	changeSubCategoryStatus(id){
		return this._http.get<any>(this.serverUrl+'subcategories/change_status/'+id)
	}
	getSingleSubCategory(id){
		return this._http.get<any>(this.serverUrl+'subcategories/'+id, {observe: 'response'})
	}
	updateSubCategory(formdata, id){
		return this._http.patch<any>(this.serverUrl+'subcategories/'+id, formdata, {observe: 'response'})
	}
	saveBrand(formdata){
		return this._http.post<any>(this.serverUrl+'brand', formdata, {observe: 'response'})
	}
	getAllBrand(){
		return this._http.get<any>(this.serverUrl+'brand', {observe:'response'})
	}
	deleteBrand(id){
		return this._http.delete<any>(this.serverUrl+'brand/'+id,{observe: 'response'})
	}
	changeBrandStatus(id){
		return this._http.get<any>(this.serverUrl+'brand/change_status/'+id)
	}
	updateBrand(formdata, id){
		return this._http.patch<any>(this.serverUrl+'brand/'+id, formdata, {observe: 'response'})
	}
	getSingleBrand(id){
		return this._http.get<any>(this.serverUrl+'brand/'+id, {observe:'response'})
	}
	saveBanner(formdata){
		const options = {
	              headers: new HttpHeaders().append('Accept', 'application/json')
	            }
		return this._http.post<any>(this.serverUrl+'banners/', formdata, options)
	}
	getAllBanners(){
		return this._http.get<any>(this.serverUrl+'banners/', {observe:'response'})
	}
	changeBannerStatus(id){
		return this._http.get<any>(this.serverUrl+'banners/change_status/'+id)
	}
	deleteBanner(id){
		return this._http.delete<any>(this.serverUrl+'banners/'+id)
	}
	getSingleBanner(id){
		return this._http.get<any>(this.serverUrl+'banners/'+id, {observe:'response'})
	}
	updateBanner(formdata, id){
		const options = {
	              headers: new HttpHeaders().append('Accept', 'application/json').append('observe', 'response')
	            }
		return this._http.put<any>(this.serverUrl+'banners/'+id, formdata, options)
	}
	saveTag(formdata){
		return this._http.post<any>(this.serverUrl+'tags/', formdata, {observe:'response'})
	}
	getAllTags(){
		return this._http.get<any>(this.serverUrl+'tags', {observe:'response'})
	}
	changeTagsStatus(id){
		return this._http.get<any>(this.serverUrl+'tags/change_status/'+id)
	}
	deleteTag(id){
		return this._http.delete<any>(this.serverUrl+'tags/'+id)
	}
	getSingleTags(id){
		return this._http.get<any>(this.serverUrl+'tags/'+id, {observe:'response'})
	}
	UpdateTag(formdata, id){
		return this._http.patch<any>(this.serverUrl+'tags/'+id, formdata, {observe: 'response'})
	}
}
