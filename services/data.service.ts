import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSrc = new BehaviorSubject(null);
  
  currentSrc = this.dataSrc.asObservable();

  /**
   * @constructor{{DI will be pushed here}}
   */
  constructor() { }

  /**
   * @function{{change}}
   * @description{{change the data source}}
   */
  change(data: any) {
    this.dataSrc.next(data);
  }
  
}
