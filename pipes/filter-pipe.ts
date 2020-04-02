import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: any, price?: any, distance?: any, date?: any): any {
        console.log('filter this', value, 'price', price, 'distance', distance, 'date', date);
        if (!value) return null;
        if (date && !price && price == 0 && !distance) {
            let dayOfWeek = moment(date).format('dddd').toLowerCase();
            let filtered = [];
            value.forEach((bsns: any, i) => {
                let index = bsns.businessDays.findIndex(d => d.day == dayOfWeek);
                if (index != -1) {
                    if (!bsns.businessDays[index].isClosed) {
                        filtered.push(bsns);
                    }
                }
            });
            console.log("filtered by date : ", filtered);
            return filtered;
        }
        if (distance && !price && price == 0 && !date) {
            let dist = (distance != 'any') ? distance : 50;
            let distInKm = dist * 1.60934;
            let filByDist = [];
            value.forEach((el: any, i) => {
                if (el.queryMetadata.distance <= distInKm) {
                    filByDist.push(el);
                }
            });
            console.log('filtered by dist', filByDist);
            return filByDist;
        }
        if (price && price != 0 && !distance && !date) {
            let filByPrice = [];
            value.forEach((el: any, i) => {
                if (el.appointmentPrice <= price) {
                    filByPrice.push(el);
                }
            });
            return filByPrice;
        }
        if (distance && date && !price && price == 0) {
            let dist = (distance != 'any') ? distance : 50;
            let distInKm = dist * 1.60934;
            let filByDist = [];
            value.forEach((el: any, i) => {
                if (el.queryMetadata.distance <= distInKm) {
                    filByDist.push(el);
                }
            });
            let dayOfWeek = moment(date).format('dddd').toLowerCase();
            let filteredDistDate = [];
            filByDist.forEach((bsns: any, i) => {
                let index = bsns.businessDays.findIndex(d => d.day == dayOfWeek);
                if (index != -1) {
                    if (!bsns.businessDays[index].isClosed) {
                        filteredDistDate.push(bsns);
                    }
                }
            });
            console.log('filtered by date & distance', filteredDistDate);
            return filteredDistDate;
        }
        if (distance && price && price != 0 && !date) {
            let dist = (distance != 'any') ? distance : 50;
            let distInKm = dist * 1.60934;
            let filByDist = [];
            value.forEach((el: any, i) => {
                if (el.queryMetadata.distance <= distInKm) {
                    filByDist.push(el);
                }
            });
            let filByPriceDist = [];
            filByDist.forEach((el: any, i) => {
                if (el.appointmentPrice <= price) {
                    filByPriceDist.push(el);
                }
            });
            return filByPriceDist;
        }
        if (price && price != 0 && date && !distance) {
            let dayOfWeek = moment(date).format('dddd').toLowerCase();
            let filDate = [];
            value.forEach((bsns: any, i) => {
                let index = bsns.businessDays.findIndex(d => d.day == dayOfWeek);
                if (index != -1) {
                    if (!bsns.businessDays[index].isClosed) {
                        filDate.push(bsns);
                    }
                }
            });
            let filByDatePrice = [];
            filDate.forEach((el: any, i) => {
                if (el.appointmentPrice <= price) {
                    filByDatePrice.push(el);
                }
            });
            return filByDatePrice;
        }
        if (price && price != 0 && date && distance) {
            let dayOfWeek = moment(date).format('dddd').toLowerCase();
            let filDate = [];
            value.forEach((bsns: any, i) => {
                let index = bsns.businessDays.findIndex(d => d.day == dayOfWeek);
                if (index != -1) {
                    if (!bsns.businessDays[index].isClosed) {
                        filDate.push(bsns);
                    }
                }
            });
            let filByDatePrice = [];
            filDate.forEach((el: any, i) => {
                if (el.appointmentPrice <= price) {
                    filByDatePrice.push(el);
                }
            });
            let dist = (distance != 'any') ? distance : 50;
            let distInKm = dist * 1.60934;
            let filByPriceDateDist = [];
            filByDatePrice.forEach((el: any, i) => {
                if (el.queryMetadata.distance <= distInKm) {
                    filByPriceDateDist.push(el);
                }
            });
            return filByPriceDateDist;
        }
        else {
            return value;
        }
    }
}
