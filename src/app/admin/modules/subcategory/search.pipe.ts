import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform { 
  SubCategoryName;
  categoryName
  transform(value: any, args?: any): any {
    //return null;
    if(!args){
    	return value;
    }else{
    	args = args.toUpperCase();
	}
    console.log(args)

    return value.filter(items=>{
    	this.SubCategoryName = items.SubCategoryName.toUpperCase();
    	this.categoryName = items.categoryName.categoryName.toUpperCase();
    	return this.SubCategoryName.startsWith(args)===true || this.categoryName.startsWith(args)===true
    })
  }

}

//https://www.techbeamers.com/sql-query-questions-answers-for-practice/
