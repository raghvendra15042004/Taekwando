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

    public tieSheetPostScript(thisModel: any) {
        console.log('thisModel', thisModel);
    }

    public onCategoryChange(thisModel: any) {
        console.log('thisModel', thisModel.fieldModel);
        //thisModel.fieldModel.halfPlateText = "";

        // const compareDate = moment(thisModel.fieldModel.dob, "YYYY-MM-DD");
        // const subjuniorStartDate = moment("01/01/2011", "DD/MM/YYYY");
        // const subjuniorEndDate = moment("31/12/2017", "DD/MM/YYYY");
        // const cadetStartDate = moment("01/01/2008", "DD/MM/YYYY");
        // const cadetEndDate = moment("31/12/2009", "DD/MM/YYYY");
        // const juniorStartDate = moment("01/01/2005", "DD/MM/YYYY");
        // const juniorEndDate = moment("31/12/2007", "DD/MM/YYYY");
        // const seniorEndDate = moment("31/12/2004", "DD/MM/YYYY");
        // if (compareDate.isBetween(subjuniorStartDate, subjuniorEndDate)) {
        //     thisModel.fieldModel.categoryName = ["Sub junior"];
        // } else if (compareDate.isBetween(cadetStartDate, cadetEndDate)) {
        //     thisModel.fieldModel.categoryName = ["Cadet"];
        // } else if (compareDate.isBetween(juniorStartDate, juniorEndDate)) {
        //     thisModel.fieldModel.categoryName = ["Junior"];
        // } else if (compareDate.isBefore(seniorEndDate)) {
        //     thisModel.fieldModel.categoryName = ["Senior"];
        // }

        // var a = moment();
        // var b = moment(compareDate, 'YYYY-MM-DD');
        // var age = moment.duration(a.diff(b));
        // var years = age.years();
        // var months = age.months();
        // var days = age.days();
        // thisModel.fieldModel.age = years + " years " + months + " months " + days + " days ";
        this.setWeightDivision(thisModel);
    }

    public onGenderChange(thisModel: any) {
        this.setWeightDivision(thisModel);
    }

    public setWeightDivision(thisModel) {
        let weightDivisionList;
        switch (thisModel.fieldModel.categoryName[0]) {
            case "Sub junior": {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [
                            "Under 18 Kg (Not Exceeding 18 Kgs)",
                            "Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)",
                            "Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)",
                            "Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)",
                            "Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)",
                            "Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)",
                            "Under 32 Kg (Over 29 & Not Exceeding 32 Kgs)",
                            "Over 32 Kg"
                        ];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [
                            "Under 16 Kg (Not Exceeding 16 Kgs)",
                            "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
                            "Under 20 Kg (Over 18 & Not Exceeding 20 Kgs)",
                            "Under 22 Kg (Over 20 & Not Exceeding 22 Kgs)",
                            "Under 24 Kg (Over 22 & Not Exceeding 24 Kgs)",
                            "Under 26 Kg (Over 24 & Not Exceeding 26 Kgs)",
                            "Under 29 Kg (Over 26 & Not Exceeding 29 Kgs)",
                            "Over 29 Kg"
                        ];
                        break;
                    }
                }
                break;
            }
            case "Cadet": {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [
                            "Under 33 Kg (Not Exceeding 33 Kgs)",
                            "Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)",
                            "Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)",
                            "Under 45 Kg (Over 41 & Not Exceeding 45 Kgs)",
                            "Under 49 Kg (Over 45 & Not Exceeding 49 Kgs)",
                            "Under 53 Kg (Over 49 & Not Exceeding 53 Kgs)",
                            "Under 57 Kg (Over 53 & Not Exceeding 57 Kgs)",
                            "Under 61 Kg (Over 57 & Not Exceeding 61 Kgs)",
                            "Under 65 Kg (Over 61 & Not Exceeding 65 Kgs)",
                            "Over 65 Kg"
                        ];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [
                            "Under 29 Kg (Not Exceeding 29 Kgs)",
                            "Under 33 Kg (Over 29 & Not Exceeding 33 Kgs)",
                            "Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)",
                            "Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)",
                            "Under 44 Kg (Over 41 & Not Exceeding 44 Kgs)",
                            "Under 47 Kg (Over 44 & Not Exceeding 47 Kgs)",
                            "Under 51 Kg (Over 47 & Not Exceeding 51 Kgs)",
                            "Under 55 Kg (Over 51 & Not Exceeding 55 Kgs)",
                            "Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)",
                            "Over 59 Kg"
                        ];
                        break;
                    }
                }
                break;
            }
            case "Junior": {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [
                            "Under 45 Kg (Not Exceeding 45 Kgs)",
                            "Under 48 Kg (Over 45 & Not Exceeding 48 Kgs)",
                            "Under 51 Kg (Over 48 & Not Exceeding 51 Kgs)",
                            "Under 55 Kg (Over 51 & Not Exceeding 55 Kgs)",
                            "Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)",
                            "Under 63 Kg (Over 59 & Not Exceeding 63 Kgs)",
                            "Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)",
                            "Under 73 Kg (Over 68 & Not Exceeding 73 Kgs)",
                            "Under 78 Kg (Over 73 & Not Exceeding 78 Kgs)",
                            "Over 78 Kg"
                        ];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [
                            "Under 42 Kg (Not Exceeding 42 Kgs)",
                            "Under 44 Kg (Over 42 & Not Exceeding 44 Kgs)",
                            "Under 46 Kg (Over 44 & Not Exceeding 46 Kgs)",
                            "Under 49 Kg (Over 46 & Not Exceeding 49 Kgs)",
                            "Under 52 Kg (Over 49 & Not Exceeding 52 Kgs)",
                            "Under 55 Kg (Over 52 & Not Exceeding 55 Kgs)",
                            "Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)",
                            "Under 63 Kg (Over 59 & Not Exceeding 63 Kgs)",
                            "Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)",
                            "Over 68 Kg"
                        ];
                        break;
                    }
                }
                break;
            }
            case "Senior": {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [
                            "Under 54 Kg (Not Exceeding 54 Kgs)",
                            "Under 58 Kg (Over 54 & Not Exceeding 58 Kgs)",
                            "Under 63 Kg (Over 58 & Not Exceeding 63 Kgs)",
                            "Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)",
                            "Under 74 Kg (Over 68 & Not Exceeding 74 Kgs)",
                            "Under 80 Kg (Over 74 & Not Exceeding 80 Kgs)",
                            "Under 87 Kg (Over 80 & Not Exceeding 87 Kgs)",
                            "Over 87 Kg"
                        ];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [
                            "Under 46 Kg (Not Exceeding 46 Kgs)",
                            "Under 49 Kg (Over 46 & Not Exceeding 49 Kgs)",
                            "Under 53 Kg (Over 49 & Not Exceeding 53 Kgs)",
                            "Under 57 Kg (Over 53 & Not Exceeding 57 Kgs)",
                            "Under 62 Kg (Over 57 & Not Exceeding 62 Kgs)",
                            "Under 67 Kg (Over 62 & Not Exceeding 67 Kgs)",
                            "Under 73 Kg (Over 67 & Not Exceeding 73 Kgs)",
                            "Over 73 Kg"
                        ];
                        break;
                    }
                }
                break;
            }
            default: {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [];
                        break;
                    }
                }
                break;
            }
        }

        thisModel.templateService.formConfig.tabs[0].fields.find(field => {
            if (field.name == "weightDivision") {
                field.data = weightDivisionList;
                field.properties.dataSource = weightDivisionList;
                return field;
            }
        })
    }
}