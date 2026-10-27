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

    public participantsPostScript(thisModel: any) {
        console.log('thisModel', thisModel);
    }

    public onPresentBeltChange(thisModel: any) {
        //thisModel.fieldModel.events = [];
        if (thisModel.fieldModel["presentBelt"]) {
        //this.isPresentBeltError = false;
        } else {
        //this.isPresentBeltError = true;
        }
        if(thisModel.fieldModel["presentBelt"] == 'White' || thisModel.fieldModel["presentBelt"] == 'Yellow'){
        //this.showFreshers = true;
        //this.showKyorugi = false;
        } else {
        //this.showFreshers = false;
        //this.showKyorugi = true;
        }
    }
    

    public onDobChange(thisModel: any) {
        console.log('thisModel', thisModel.fieldModel.dob);
        const compareDate = moment(thisModel.fieldModel.dob, "YYYY-MM-DD");

        console.log('compareDate', compareDate);
        const seniorEndDate = moment("31/12/2008", "DD/MM/YYYY");
        const juniorStartDate = moment("01/01/2009", "DD/MM/YYYY");
        const juniorEndDate = moment("31/12/2010", "DD/MM/YYYY");
        const cadetStartDate = moment("01/01/2011", "DD/MM/YYYY");
        const cadetEndDate = moment("31/12/2013", "DD/MM/YYYY");
        const subjuniorStartDate = moment("01/01/2014", "DD/MM/YYYY");
        const subjuniorEndDate = moment("31/12/2016", "DD/MM/YYYY");
        const peeweeStartDate = moment("01/01/2017", "DD/MM/YYYY");
        const peeweeEndDate = moment("01/01/2022", "DD/MM/YYYY");
        
        if (compareDate.isBetween(peeweeStartDate, peeweeEndDate)) {
            thisModel.fieldModel.categoryName = ["Peewee"];
        } else if (compareDate.isBetween(subjuniorStartDate, subjuniorEndDate)) {
            thisModel.fieldModel.categoryName = ["Sub junior"];
        } else if (compareDate.isBetween(cadetStartDate, cadetEndDate)) {
            thisModel.fieldModel.categoryName = ["Cadet"];
        } else if (compareDate.isBetween(juniorStartDate, juniorEndDate)) {
            thisModel.fieldModel.categoryName = ["Junior"];
        } else if (compareDate.isBefore(seniorEndDate)) {
            thisModel.fieldModel.categoryName = ["Senior"];
        }

        var a = moment('2025-12-31');
        var b = moment(compareDate);
        //var b = moment(compareDate, 'YYYY-MM-DD');
        var age = moment.duration(a.diff(b));
        var years = age.years();
        var months = age.months();
        var days = age.days();
        thisModel.fieldModel.age = years + " years " + months + " months " + days + " days ";
        this.setWeightDivision(thisModel);
    }

    public onGenderChange(thisModel: any) {
        thisModel.fieldModel["weight"] = '';
        thisModel.fieldModel["weightDivision"] = [""];
        this.setWeightDivision(thisModel);
    }

    public setWeightDivision(thisModel) {
        let weightDivisionList;
        switch (thisModel.fieldModel.categoryName[0]) {
            case "Peewee": {
                switch (thisModel.fieldModel.gender[0]) {
                  case "Male": {
                    weightDivisionList = [
                      "Under 16 Kg (Not Exceeding 16 Kgs)",
                      "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
                      "Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)",
                      "Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)",
                      "Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)",
                      "Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)",
                      "Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)",
                      "Over 29 Kg"
                    ];
                    break;
                  }
                  case "Female": {
                    weightDivisionList = [
                      "Under 14 Kg (Not Exceeding 14 Kgs)",
                      "Under 16 Kg (Over 14 & Not Exceeding 16 Kgs)",
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
            case "Sub junior": {
                switch (thisModel.fieldModel.gender[0]) {
                    case "Male": {
                        weightDivisionList = [
                            "Under 16 Kg (Not Exceeding 16 Kgs)",
                            "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
                            "Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)",
                            "Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)",
                            "Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)",
                            "Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)",
                            "Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)",
                            "Under 32 Kg (Over 29 & Not Exceeding 32 Kgs)",
                            "Under 35 Kg (Over 32 & Not Exceeding 35 Kgs)",
                            "Under 38 Kg (Over 35 & Not Exceeding 38 Kgs)",
                            "Under 41 Kg (Over 38 & Not Exceeding 41 Kgs)",
                            "Under 44 Kg (Over 41 & Not Exceeding 44 Kgs)",
                            "Under 50 Kg (Over 44 & Not Exceeding 50 Kgs)",
                            "Under 60 Kg (Over 50 & Not Exceeding 60 Kgs)",
                            "Over 60 Kg"
                        ];
                        break;
                    }
                    case "Female": {
                        weightDivisionList = [
                            "Under 14 Kg (Not Exceeding 14 Kgs)",
                            "Under 16 Kg (Over 14 & Not Exceeding 16 Kgs)",
                            "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
                            "Under 20 Kg (Over 18 & Not Exceeding 20 Kgs)",
                            "Under 22 Kg (Over 20 & Not Exceeding 22 Kgs)",
                            "Under 24 Kg (Over 22 & Not Exceeding 24 Kgs)",
                            "Under 26 Kg (Over 24 & Not Exceeding 26 Kgs)",
                            "Under 29 Kg (Over 26 & Not Exceeding 29 Kgs)",
                            "Under 32 Kg (Over 29 & Not Exceeding 32 Kgs)",
                            "Under 35 Kg (Over 32 & Not Exceeding 35 Kgs)",
                            "Under 38 Kg (Over 35 & Not Exceeding 38 Kgs)",
                            "Under 41 Kg (Over 38 & Not Exceeding 41 Kgs)",
                            "Under 47 Kg (Over 41 & Not Exceeding 47 Kgs)",
                            "Under 57 Kg (Over 47 & Not Exceeding 57 Kgs)",
                            "Over 57 Kg"
                        ];
                        break;
                    }
                }
                break;
            }
            case "Cadet": {
                //weightDivisionList = [];
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

    onWeightChange(thisModel: any) {
        console.log('on weight change', thisModel)
        if (thisModel.fieldModel.weight != null) {
            thisModel.fieldModel.weight = parseInt(thisModel.fieldModel.weight);
              if (thisModel.fieldModel.events.length == 0) {
                thisModel.fieldModel.weight = "";
                Swal.fire({
                  title: "Please Select Events.",
                  icon: 'warning',
                  showConfirmButton: true
                });
                return;
              }

              if (thisModel.fieldModel.dob == '') {
                thisModel.fieldModel.weight = "";
                Swal.fire({
                  title: "Please Select D.O.B.",
                  icon: 'warning',
                  showConfirmButton: true
                });
                return;
              }

            switch (thisModel.fieldModel.categoryName[0]) {
                case "Peewee": {
                    switch (thisModel.fieldModel.gender[0]) {
                      case "Male": {
                        if (thisModel.fieldModel.weight <= 16) {
                          thisModel.fieldModel.weightDivision = ["Under 16 Kg (Not Exceeding 16 Kgs)"]
                        } else if (thisModel.fieldModel.weight >= 16 && thisModel.fieldModel.weight <= 18) {
                          thisModel.fieldModel.weightDivision = ["Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 18 && thisModel.fieldModel.weight <= 21) {
                          thisModel.fieldModel.weightDivision = ["Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 21 && thisModel.fieldModel.weight <= 23) {
                          thisModel.fieldModel.weightDivision = ["Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 23 && thisModel.fieldModel.weight <= 25) {
                          thisModel.fieldModel.weightDivision = ["Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 25 && thisModel.fieldModel.weight <= 27) {
                          thisModel.fieldModel.weightDivision = ["Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 27 && thisModel.fieldModel.weight <= 29) {
                          thisModel.fieldModel.weightDivision = ["Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 29) {
                          thisModel.fieldModel.weightDivision = ["Over 29 Kg"]
                        }
                        break;
                      }
                      case "Female": {
                        if (thisModel.fieldModel.weight <= 14) {
                          thisModel.fieldModel.weightDivision = ["Under 14 Kg (Not Exceeding 14 Kgs)"]
                        } else if (thisModel.fieldModel.weight >= 14 && thisModel.fieldModel.weight <= 16) {
                          thisModel.fieldModel.weightDivision = ["Under 16 Kg (Over 14 & Not Exceeding 16 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 16 && thisModel.fieldModel.weight <= 18) {
                          thisModel.fieldModel.weightDivision = ["Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 18 && thisModel.fieldModel.weight <= 20) {
                          thisModel.fieldModel.weightDivision = ["Under 20 Kg (Over 18 & Not Exceeding 20 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 20 && thisModel.fieldModel.weight <= 22) {
                          thisModel.fieldModel.weightDivision = ["Under 22 Kg (Over 20 & Not Exceeding 22 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 22 && thisModel.fieldModel.weight <= 24) {
                          thisModel.fieldModel.weightDivision = ["Under 24 Kg (Over 22 & Not Exceeding 24 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 24 && thisModel.fieldModel.weight <= 26) {
                          thisModel.fieldModel.weightDivision = ["Under 26 Kg (Over 24 & Not Exceeding 26 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 26 && thisModel.fieldModel.weight <= 29) {
                          thisModel.fieldModel.weightDivision = ["Under 29 Kg (Over 26 & Not Exceeding 29 Kgs)"]
                        } else if (thisModel.fieldModel.weight > 29) {
                          thisModel.fieldModel.weightDivision = ["Over 29 Kg"]
                        }
                        break;
                      }
                    }
                    break;
                  }
                case "Sub junior": {
                    switch (thisModel.fieldModel.gender[0]) {
                        case "Male": {
                            if (thisModel.fieldModel.weight <= 18) {
                                thisModel.fieldModel.weightDivision = ["Under 18 Kg (Not Exceeding 18 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 18 && thisModel.fieldModel.weight <= 21) {
                                thisModel.fieldModel.weightDivision = ["Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 21 && thisModel.fieldModel.weight <= 23) {
                                thisModel.fieldModel.weightDivision = ["Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 23 && thisModel.fieldModel.weight <= 25) {
                                thisModel.fieldModel.weightDivision = ["Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 25 && thisModel.fieldModel.weight <= 27) {
                                thisModel.fieldModel.weightDivision = ["Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 27 && thisModel.fieldModel.weight <= 29) {
                                thisModel.fieldModel.weightDivision = ["Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 29 && thisModel.fieldModel.weight <= 32) {
                                thisModel.fieldModel.weightDivision = ["Under 32 Kg (Over 29 & Not Exceeding 32 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 32) {
                                thisModel.fieldModel.weightDivision = ["Over 32 Kg"]
                            }
                            break;
                        }
                        case "Female": {
                            if (thisModel.fieldModel.weight <= 16) {
                                thisModel.fieldModel.weightDivision = ["Under 16 Kg (Not Exceeding 16 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 16 && thisModel.fieldModel.weight <= 18) {
                                thisModel.fieldModel.weightDivision = ["Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 18 && thisModel.fieldModel.weight <= 20) {
                                thisModel.fieldModel.weightDivision = ["Under 20 Kg (Over 18 & Not Exceeding 20 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 20 && thisModel.fieldModel.weight <= 22) {
                                thisModel.fieldModel.weightDivision = ["Under 22 Kg (Over 20 & Not Exceeding 22 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 22 && thisModel.fieldModel.weight <= 24) {
                                thisModel.fieldModel.weightDivision = ["Under 24 Kg (Over 22 & Not Exceeding 24 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 24 && thisModel.fieldModel.weight <= 26) {
                                thisModel.fieldModel.weightDivision = ["Under 26 Kg (Over 24 & Not Exceeding 26 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 26 && thisModel.fieldModel.weight <= 29) {
                                thisModel.fieldModel.weightDivision = ["Under 29 Kg (Over 26 & Not Exceeding 29 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 29) {
                                thisModel.fieldModel.weightDivision = ["Over 29 Kg"]
                            }
                            break;
                        }
                    }
                    break;
                }
                case "Cadet": {
                    switch (thisModel.fieldModel.gender[0]) {
                        case "Male": {
                            if (thisModel.fieldModel.weight <= 33) {
                                thisModel.fieldModel.weightDivision = ["Under 33 Kg (Not Exceeding 33 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 33 && thisModel.fieldModel.weight <= 37) {
                                thisModel.fieldModel.weightDivision = ["Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 37 && thisModel.fieldModel.weight <= 41) {
                                thisModel.fieldModel.weightDivision = ["Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 41 && thisModel.fieldModel.weight <= 45) {
                                thisModel.fieldModel.weightDivision = ["Under 45 Kg (Over 41 & Not Exceeding 45 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 45 && thisModel.fieldModel.weight <= 49) {
                                thisModel.fieldModel.weightDivision = ["Under 49 Kg (Over 45 & Not Exceeding 49 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 49 && thisModel.fieldModel.weight <= 53) {
                                thisModel.fieldModel.weightDivision = ["Under 53 Kg (Over 49 & Not Exceeding 53 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 53 && thisModel.fieldModel.weight <= 57) {
                                thisModel.fieldModel.weightDivision = ["Under 57 Kg (Over 53 & Not Exceeding 57 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 57 && thisModel.fieldModel.weight <= 61) {
                                thisModel.fieldModel.weightDivision = ["Under 61 Kg (Over 57 & Not Exceeding 61 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 61 && thisModel.fieldModel.weight <= 65) {
                                thisModel.fieldModel.weightDivision = ["Under 65 Kg (Over 61 & Not Exceeding 65 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 65) {
                                thisModel.fieldModel.weightDivision = ["Over 65 Kg"]
                            }
                            break;
                        }
                        case "Female": {
                            if (thisModel.fieldModel.weight <= 29) {
                                thisModel.fieldModel.weightDivision = ["Under 29 Kg (Not Exceeding 29 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 29 && thisModel.fieldModel.weight <= 33) {
                                thisModel.fieldModel.weightDivision = ["Under 33 Kg (Over 29 & Not Exceeding 33 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 33 && thisModel.fieldModel.weight <= 37) {
                                thisModel.fieldModel.weightDivision = ["Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 37 && thisModel.fieldModel.weight <= 41) {
                                thisModel.fieldModel.weightDivision = ["Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 41 && thisModel.fieldModel.weight <= 44) {
                                thisModel.fieldModel.weightDivision = ["Under 44 Kg (Over 41 & Not Exceeding 44 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 44 && thisModel.fieldModel.weight <= 47) {
                                thisModel.fieldModel.weightDivision = ["Under 47 Kg (Over 44 & Not Exceeding 47 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 47 && thisModel.fieldModel.weight <= 51) {
                                thisModel.fieldModel.weightDivision = ["Under 51 Kg (Over 47 & Not Exceeding 51 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 51 && thisModel.fieldModel.weight <= 55) {
                                thisModel.fieldModel.weightDivision = ["Under 55 Kg (Over 51 & Not Exceeding 55 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 55 && thisModel.fieldModel.weight <= 59) {
                                thisModel.fieldModel.weightDivision = ["Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 59) {
                                thisModel.fieldModel.weightDivision = ["Over 59 Kg"]
                            }
                            break;
                        }
                    }
                    break;
                }
                case "Junior": {
                    switch (thisModel.fieldModel.gender[0]) {
                        case "Male": {
                            if (thisModel.fieldModel.weight <= 45) {
                                thisModel.fieldModel.weightDivision = ["Under 45 Kg (Not Exceeding 45 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 45 && thisModel.fieldModel.weight <= 48) {
                                thisModel.fieldModel.weightDivision = ["Under 48 Kg (Over 45 & Not Exceeding 48 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 48 && thisModel.fieldModel.weight <= 51) {
                                thisModel.fieldModel.weightDivision = ["Under 51 Kg (Over 48 & Not Exceeding 51 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 51 && thisModel.fieldModel.weight <= 55) {
                                thisModel.fieldModel.weightDivision = ["Under 55 Kg (Over 51 & Not Exceeding 55 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 55 && thisModel.fieldModel.weight <= 59) {
                                thisModel.fieldModel.weightDivision = ["Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 59 && thisModel.fieldModel.weight <= 63) {
                                thisModel.fieldModel.weightDivision = ["Under 63 Kg (Over 59 & Not Exceeding 63 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 63 && thisModel.fieldModel.weight <= 68) {
                                thisModel.fieldModel.weightDivision = ["Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 68 && thisModel.fieldModel.weight <= 73) {
                                thisModel.fieldModel.weightDivision = ["Under 73 Kg (Over 68 & Not Exceeding 73 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 73 && thisModel.fieldModel.weight <= 78) {
                                thisModel.fieldModel.weightDivision = ["Under 78 Kg (Over 73 & Not Exceeding 78 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 78) {
                                thisModel.fieldModel.weightDivision = ["Over 78 Kg"]
                            }
                            break;
                        }
                        case "Female": {
                            if (thisModel.fieldModel.weight <= 42) {
                                thisModel.fieldModel.weightDivision = ["Under 42 Kg (Not Exceeding 42 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 42 && thisModel.fieldModel.weight <= 44) {
                                thisModel.fieldModel.weightDivision = ["Under 44 Kg (Over 42 & Not Exceeding 44 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 44 && thisModel.fieldModel.weight <= 46) {
                                thisModel.fieldModel.weightDivision = ["Under 46 Kg (Over 44 & Not Exceeding 46 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 46 && thisModel.fieldModel.weight <= 49) {
                                thisModel.fieldModel.weightDivision = ["Under 49 Kg (Over 46 & Not Exceeding 49 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 49 && thisModel.fieldModel.weight <= 52) {
                                thisModel.fieldModel.weightDivision = ["Under 52 Kg (Over 49 & Not Exceeding 52 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 52 && thisModel.fieldModel.weight <= 55) {
                                thisModel.fieldModel.weightDivision = ["Under 55 Kg (Over 52 & Not Exceeding 55 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 55 && thisModel.fieldModel.weight <= 59) {
                                thisModel.fieldModel.weightDivision = ["Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 59 && thisModel.fieldModel.weight <= 63) {
                                thisModel.fieldModel.weightDivision = ["Under 63 Kg (Over 59 & Not Exceeding 63 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 63 && thisModel.fieldModel.weight <= 68) {
                                thisModel.fieldModel.weightDivision = ["Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 68) {
                                thisModel.fieldModel.weightDivision = ["Over 68 Kg"]
                            }
                            break;
                        }
                    }
                    break;
                }
                case "Senior": {
                    switch (thisModel.fieldModel.gender[0]) {
                        case "Male": {
                            if (thisModel.fieldModel.weight <= 54) {
                                thisModel.fieldModel.weightDivision = ["Under 54 Kg (Not Exceeding 54 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 54 && thisModel.fieldModel.weight <= 58) {
                                thisModel.fieldModel.weightDivision = ["Under 58 Kg (Over 54 & Not Exceeding 58 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 58 && thisModel.fieldModel.weight <= 63) {
                                thisModel.fieldModel.weightDivision = ["Under 63 Kg (Over 58 & Not Exceeding 63 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 63 && thisModel.fieldModel.weight <= 68) {
                                thisModel.fieldModel.weightDivision = ["Under 68 Kg (Over 63 & Not Exceeding 68 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 68 && thisModel.fieldModel.weight <= 74) {
                                thisModel.fieldModel.weightDivision = ["Under 74 Kg (Over 68 & Not Exceeding 74 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 74 && thisModel.fieldModel.weight <= 80) {
                                thisModel.fieldModel.weightDivision = ["Under 80 Kg (Over 74 & Not Exceeding 80 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 80 && thisModel.fieldModel.weight <= 87) {
                                thisModel.fieldModel.weightDivision = ["Under 87 Kg (Over 80 & Not Exceeding 87 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 87) {
                                thisModel.fieldModel.weightDivision = ["Over 87 Kg"]
                            }
                            break;
                        }
                        case "Female": {
                            if (thisModel.fieldModel.weight <= 46) {
                                thisModel.fieldModel.weightDivision = ["Under 46 Kg (Not Exceeding 46 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 46 && thisModel.fieldModel.weight <= 49) {
                                thisModel.fieldModel.weightDivision = ["Under 49 Kg (Over 46 & Not Exceeding 49 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 49 && thisModel.fieldModel.weight <= 53) {
                                thisModel.fieldModel.weightDivision = ["Under 53 Kg (Over 49 & Not Exceeding 53 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 53 && thisModel.fieldModel.weight <= 57) {
                                thisModel.fieldModel.weightDivision = ["Under 57 Kg (Over 53 & Not Exceeding 57 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 57 && thisModel.fieldModel.weight <= 62) {
                                thisModel.fieldModel.weightDivision = ["Under 62 Kg (Over 57 & Not Exceeding 62 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 62 && thisModel.fieldModel.weight <= 67) {
                                thisModel.fieldModel.weightDivision = ["Under 67 Kg (Over 62 & Not Exceeding 67 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 67 && thisModel.fieldModel.weight <= 73) {
                                thisModel.fieldModel.weightDivision = ["Under 73 Kg (Over 67 & Not Exceeding 73 Kgs)"]
                            } else if (thisModel.fieldModel.weight > 73) {
                                thisModel.fieldModel.weightDivision = ["Over 73 Kg"]
                            }
                            break;
                        }
                    }
                    break;
                }
            }
        } else {
            thisModel.fieldModel.weightDivision = [""];
        }
    }

    // public itemPostScript(thisModel: any) {
    //     //console.log('thisModel',thisModel);
    //     var bundleId = '1002';
    //     var templateName = "CategoryTemplate";
    //     var start = 0;
    //     var limit = 10;
    //     //var query = { "bundleId": 1002 };
    //     var query = "SELECT * FROM item_category";
    //     var sortOrder = [{ "categoryName": -1 }];
    //     var categoryList = [];
    //     this.threadService.getThreads(bundleId, templateName, start, limit, query, sortOrder).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    //         if (res['status'] == 1 && res['data'].length > 0) {
    //             var threadList = res['data'];
    //             _.forEach(threadList, function (value, key) {
    //                 categoryList.push(value.categoryName)
    //             });
    //             //thisModel.templateService.formConfig.tabs[0].fields[1].properties.dataSource = categoryList;

    //             thisModel.templateService.formConfig.tabs[0].fields.find(field => {
    //                 if(field.name == "itemCategory") {
    //                     field.data = categoryList;
    //                     field.properties.dataSource = categoryList;
    //                     return field;
    //                 }
    //             })
    //         }
    //     });
    // }

    // public onChangeItemCategory(thisModel: any) {
    //     //console.log('thisModel',thisModel);
    //     var bundleId = '1003';
    //     var templateName = "SubCategoryTemplate";
    //     var start = 0;
    //     var limit = 10;
    //     //var query = { "bundleId": 1002 };
    //     var query = "SELECT * FROM item_sub_category WHERE categoryName='" + thisModel.fieldModel.itemCategory[0] + "'";
    //     var sortOrder = [{ "categoryName": -1 }];
    //     var subCategoryList = [];
    //     thisModel.threadService.getThreads(bundleId, templateName, start, limit, query, sortOrder).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    //         if (res['status'] == 1 && res['data'].length > 0) {
    //             var threadList = res['data'];
    //             _.forEach(threadList, function (value, key) {
    //                 subCategoryList.push(value.subCategoryName)
    //             });
    //             thisModel.templateService.formConfig.tabs[0].fields.find(field => {
    //                 if(field.name == "itemSubCategory") {
    //                     field.data = subCategoryList;
    //                     field.properties.dataSource = subCategoryList;
    //                     return field;
    //                 }
    //             })

    //             thisModel.fieldModel.itemSubCategory = [];
    //         }
    //     });
    // }

    // public onDeSelectItemCategory(thisModel: any) {
    //     thisModel.templateService.formConfig.tabs[0].fields.find(field => {
    //         if(field.name == "itemSubCategory") {
    //             field.data = [];
    //             field.properties.dataSource = [];
    //             return field;
    //         }
    //     })

    //     thisModel.fieldModel.itemSubCategory = [];
    // }

    // public onChangeMultiPrice(thisModel: any) {
    //     if(thisModel.fieldModel.isMultiPrice == "Yes") {
    //         thisModel.templateService.changeUI(thisModel.templateService.formConfig, ['halfPlateText', 'halfPlatePrice', 'fullPlateText', 'fullPlatePrice'], 'hidden', false);
    //         thisModel.templateService.changeUI(thisModel.templateService.formConfig, ['price'], 'hidden', true);
    //     } else {
    //         thisModel.templateService.changeUI(thisModel.templateService.formConfig, ['halfPlateText', 'halfPlatePrice', 'fullPlateText', 'fullPlatePrice'], 'hidden', true);
    //         thisModel.templateService.changeUI(thisModel.templateService.formConfig, ['price'], 'hidden', false);
    //         thisModel.fieldModel.halfPlateText = "";
    //         thisModel.fieldModel.halfPlatePrice = "";
    //         thisModel.fieldModel.fullPlateText = "";
    //         thisModel.fieldModel.fullPlatePrice = "";
    //     }
    // }
}