import { Injectable } from "@angular/core";
import { ThreadService } from "../../core/services/thread.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import _ from 'lodash';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class templateScript {
    private onDestroy$: Subject<void> = new Subject<void>();
    constructor(
        public threadService: ThreadService
    ) {

    }

    public idcardPostScript(thisModel: any) {
        console.log('thisModel', thisModel);
    }
}