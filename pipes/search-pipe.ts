import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    // console.log('val',value,'args',args);
    if(!value) return null;
    if(!args) return value;
    var srcStr = args.toLowerCase();
    var retArr = [];
    value.forEach(e => {
      if(e.firstName && e.lastName) {
          e = {...e, fullName: `${e.firstName} ${e.lastName}`};
        if(e.fullName.toLowerCase().includes(srcStr)) {
          retArr.push(e);
        }
      }
    });
    return retArr;
  }
}
