import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  brandName
  transform(value: any, args?: any): any {
    if(!args){
    	return value;
    }else{
    	args = args.toUpperCase();
    }

    return value.filter(item=>{
    	this.brandName = item.brandName.toUpperCase();
    	return this.brandName.startsWith(args)===true
    })
  }

}
