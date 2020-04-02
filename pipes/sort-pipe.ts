import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args1?: any, args2?: any): any {
    console.log('val',value,'args1',args1,'args2',args2);
    if(!value) return null;
    if(!args1) return value;
    if(args1 == 'distance' && !args2) {
      return _.orderBy(value, ['queryMetadata.distance'], ['asc']);
    }
    if(args2 && args1 == 'distance') {
      let temp = value.filter(el => el.isOnline);
      return _.orderBy(temp, ['queryMetadata.distance'], ['asc']);
    }
    if(args1 == 'rating' && !args2) {
      value.forEach((el: any, i) => {
        if(!el.totalAvarage) {
          value[i] = {...value[i], totalAvarage: 0};
        }
      });
      return _.orderBy(value, ['totalAvarage'], ['desc']);
    }
    if(args1 == 'rating' && args2) {
      value.forEach((el: any, i) => {
        if(!el.totalAvarage) {
          value[i] = {...value[i], totalAvarage: 0};
        }
      });
      let temp1 =  _.orderBy(value, ['totalAvarage'], ['desc']);
      let temp2 = temp1.filter(el => el.isOnline);
      return temp2;
    }
    else {
      return value;
    }
  }
}
