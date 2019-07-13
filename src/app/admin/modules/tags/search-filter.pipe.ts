import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  tagName
  transform(value: any, args?: any): any {
    if(!args){
    	return value;
    }else{
    	args = args.toUpperCase();
    }

    return value.filter(item=>{
    	this.tagName = item.tagName.toUpperCase();
    	return this.tagName.startsWith(args)===true
    })
  } 

}
