import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {
  categoryName;
  transform(value: any, args?: any): any {
    //return null;
    if(!args){
    	return value;
    }else{
    	args = args.toUpperCase();

    }
    return value.filter(items=>{
    	this.categoryName = items.categoryName.toUpperCase();
    	return this.categoryName.startsWith(args)===true
    })
  }

}
