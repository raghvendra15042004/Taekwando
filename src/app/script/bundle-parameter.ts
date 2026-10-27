import { Injectable } from "@angular/core";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BundleParameter {
    @BlockUI() blockUI: NgBlockUI;

    constructor(){

    }

    participantsPreScript(data: any): Observable<any> {
        const simpleObservable = new Observable((observer) => {
            observer.next(data);
            observer.complete();
        });
        return simpleObservable;
    }

    tieSheetPreScript(data: any): Observable<any> {
        const simpleObservable = new Observable((observer) => {
            observer.next(data);
            observer.complete();
        });
        return simpleObservable;
    }

    idcardPreScript(data: any): Observable<any> {
        const simpleObservable = new Observable((observer) => {
            observer.next(data);
            observer.complete();
        });
        return simpleObservable;
    }
}