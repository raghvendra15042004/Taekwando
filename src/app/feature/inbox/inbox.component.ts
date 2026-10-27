import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BoxConfig } from '../../core/config/box.config';
import { AppService, BoxService, BundleService, ThreadService } from '../../core/services';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { BundleParameter } from 'src/app/script/bundle-parameter';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  private onDestroy$: Subject<void> = new Subject<void>();
  public boxId: Number;
  public bundleId: Number;
  public boxItem;
  public inboxItem;
  public inboxItems;
  public bundle: any = [];
  public gridConfig: any = [];
  private start = 0;
  private limit = 50;
  private sortingOrderConfig: any;
  public threadList = [];
  public uploadPath ="";

  public totalData: number;
  public pazeSize: number = 50;
  public page: number = 1;
  public templateName;
  //public searchText;
  public searchText = "";

  closeResult: string;
  modalOptions: NgbModalOptions;
  filterConfig: any = {};

  filterEvent = "";
  filterCategory = "";
  filterGender = "";
  filterWeightDivision = "";
  isFilter = false;
  weightDivisionList;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private boxService: BoxService,
    private bundleService: BundleService,
    private threadService: ThreadService,
    private appService: AppService,
    private bundleParameter: BundleParameter,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.activeRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      console.log('param', param)
      this.boxId = param.boxId;
      this.bundleId = param.inboxId;
    });

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    this.weightDivisionList = [];
    this.blockUI.start("Loading...");
    this.boxItem = this.boxService.getBox(this.boxId);
    this.inboxItems = this.bundleService.getBundlesByBoxId(this.boxId);
    this.uploadPath = this.appService.getApiPath() + 'uploads/';

    this.bundle = this.bundleService.getBundle(this.bundleId);
    this.templateName = this.bundle[0].defaultTemplate.name;
    this.countThread();
    this.loadList();
  }

  countThread() {
    this.threadService.countThreads(this.bundleId, this.templateName, this.filterConfig, this.searchText).subscribe(result => {
      if (result['status'] == 1) {
        this.totalData = parseInt(result['threads']);
      }
    })
  }

  loadList() {
    this.threadList = [];
    this.gridConfig = this.bundle[0]['inboxUIConfig']['gridViewConfg'];
    var hasFilterButton = this.bundle[0]['inboxUIConfig']['hasFilterButton'];
    var filterConfig = this.bundle[0]['inboxUIConfig']['filterConfig'];
    this.sortingOrderConfig = this.bundle[0]['inboxUIConfig']['sortConfig'];
    this.threadService.getThreads(this.bundleId, this.templateName, this.start, this.limit, this.filterConfig, this.sortingOrderConfig, this.searchText).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.blockUI.stop();
      if (res['status'] == 1 && res['data'].length > 0) {
        this.threadList = res['data'];
      }
    });
  }

  loadSubMenu(event) {
    this.bundleId = event.id;
    this.loadList();
  }

  createNewThread() {
    this.router.navigate(['feature/' + this.boxId + '/inbox/' + this.bundleId + '/newthreads']);
  }

  view(thread) {
    this.router.navigate(['feature/' + this.boxId + '/inbox/' + this.bundleId + '/view/' + thread.ai_id]);
  }

  edit(thread) {
    this.router.navigate(['feature/' + this.boxId + '/inbox/' + this.bundleId + '/edit/' + thread.ai_id]);
  }

  oponApplicationForm(thread: any) {
    this.router.navigate(['feature/registration-form/' + thread.ai_id]);
  }

  oponIdCard(thread: any) {
    this.router.navigate(['feature/id-card-preview/' + thread.ai_id]);
  }

  delete(thread: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let templateName = this.bundle[0].defaultTemplate.name;
        console.log('thread', thread)
        this.threadService.deleteThread(templateName, thread.ai_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          Swal.fire({
            title: "Deleted!",
            text: "Successfully Deleted.",
            icon: "success",
            showConfirmButton: true,
            showCancelButton: false
          }).then((status) => {
            if (status.value) {
              this.loadList();
            }
          });
        })
      }
    })
  }
  
  redirect(path: any) {
    this.router.navigate([ path + '/' + this.bundleId ]);
  }

  loadPage(pageNo: any) {
    this.blockUI.start("Loading...");
    this.start = this.limit * (pageNo - 1)
    this.page = pageNo;
    this.loadList();
  }

  showDate(dateString, dateFormat) {
    return moment(dateString).format(dateFormat.toUpperCase());
  }

  getFilterBody(filter) {
    console.log('Testtt', filter)
  }

  showRegistrationId(threadId) {
    return environment.registrationIdPrefix + String( threadId ).padStart(3, '0');
  }

  showSlNo() {
    return 1;
  }
  isSearchClicked = false;
  search() {
    this.filterConfig = {};
    this.isSearchClicked = true;
    this.blockUI.start("Loading...");
    console.log('this.searchText', this.searchText)
    this.countThread();
    this.loadList();
  }

  
  reset() {
    this.isSearchClicked = false;
    this.blockUI.start("Loading...");
    this.searchText = "";
    this.countThread();
    this.loadList();
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setWeightDivision() {
    this.filterWeightDivision = "";
    //if (this.registerModel.events == 'Kyorugi' || this.registerModel.events == 'Freshers') {
    switch (this.filterCategory) {
      case "Peewee": {
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
              "Under 16 Kg (Not Exceeding 16 Kgs)",
              "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
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
            this.weightDivisionList = [
              "Under 14 Kg (Not Exceeding 14 Kgs)",
              "Under 16 Kg (Over 14 & Not Exceeding 16 Kgs)",
              "Under 18 Kg (Over 16 & Not Exceeding 18 Kgs)",
              "Under 20 Kg (Over 18 & Not Exceeding 20 Kgs)",
              "Under 22 Kg (Over 20 & Not Exceeding 22 Kgs)",
              "Under 24 Kg (Over 22 & Not Exceeding 24 Kgs)",
              "Under 26 Kg (Over 24 & Not Exceeding 26 Kgs)",
              "Under 29 Kg (Over 26 & Not Exceeding 29 Kgs)",
              "Under 31 Kg (Over 29 & Not Exceeding 31 Kgs)",
              "Over 31 Kg"
            ];
            break;
          }
        }
        break;
      }
      case "Sub junior": {
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
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
            this.weightDivisionList = [
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
        this.weightDivisionList = [];
        // switch (this.filterGender) {
        //   case "Male": {
        //     this.weightDivisionList = [
        //       "Under 33 Kg (Not Exceeding 33 Kgs)",
        //       "Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)",
        //       "Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)",
        //       "Under 45 Kg (Over 41 & Not Exceeding 45 Kgs)",
        //       "Under 49 Kg (Over 45 & Not Exceeding 49 Kgs)",
        //       "Under 53 Kg (Over 49 & Not Exceeding 53 Kgs)",
        //       "Under 57 Kg (Over 53 & Not Exceeding 57 Kgs)",
        //       "Under 61 Kg (Over 57 & Not Exceeding 61 Kgs)",
        //       "Under 65 Kg (Over 61 & Not Exceeding 65 Kgs)",
        //       "Over 65 Kg"
        //     ];
        //     break;
        //   }
        //   case "Female": {
        //     this.weightDivisionList = [
        //       "Under 29 Kg (Not Exceeding 29 Kgs)",
        //       "Under 33 Kg (Over 29 & Not Exceeding 33 Kgs)",
        //       "Under 37 Kg (Over 33 & Not Exceeding 37 Kgs)",
        //       "Under 41 Kg (Over 37 & Not Exceeding 41 Kgs)",
        //       "Under 44 Kg (Over 41 & Not Exceeding 44 Kgs)",
        //       "Under 47 Kg (Over 44 & Not Exceeding 47 Kgs)",
        //       "Under 51 Kg (Over 47 & Not Exceeding 51 Kgs)",
        //       "Under 55 Kg (Over 51 & Not Exceeding 55 Kgs)",
        //       "Under 59 Kg (Over 55 & Not Exceeding 59 Kgs)",
        //       "Over 59 Kg"
        //     ];
        //     break;
        //   }
        // }
        break;
      }
      case "Junior": {
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
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
            this.weightDivisionList = [
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
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
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
            this.weightDivisionList = [
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
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [];
            break;
          }
          case "Female": {
            this.weightDivisionList = [];
            break;
          }
        }
        break;
      }
    }
  }

  filterThread() {
    this.searchText = "";
    this.isFilter = true;
    this.filterConfig = {
      events: this.filterEvent,
      categoryName: this.filterCategory,
      gender: this.filterGender,
      weightDivision: this.filterWeightDivision
    };
    this.blockUI.start("Loading...");
    this.countThread();
    this.loadList();
  }

  resetFilter() {
    this.isFilter = false;
    this.filterConfig = {};
    this.filterEvent = "";
    this.filterCategory = "";
    this.filterGender = "";
    this.filterWeightDivision = "";
    this.blockUI.start("Loading...");
    this.countThread();
    this.loadList();
  }

  downloadCsv() {
    this.blockUI.start("Loading...");
    var dataList = [];
    var start = 0;
    var limit = this.totalData;
    this.threadService.getThreads(this.bundleId, this.templateName, start, limit, this.filterConfig, this.sortingOrderConfig, this.searchText).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.blockUI.stop();
      if (res['status'] == 1 && res['data'].length > 0) {
        dataList = res['data'];
        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        var csvHeader = {
          slNo: 'SL No.',
          ai_id: 'Registration Id',
          name: 'Name',
          tShirtSize: 'T-Shirt Size',
          mobile: 'Mobile Number',
          whatsapp: 'Whatsapp Number',
          emailId: 'Email Id',
          state: 'State',
          district: 'District',
          instituteName: 'Institute Name',
          presentBelt: 'Present Belt',
          dob: 'D.O.B.',
          age: 'Age',
          events: 'Event',
          categoryName: 'Category',
          gender: 'Gender',
          physicalChallenged: 'Physical Challenged',
          weight: 'Weight (Kg)',
          height: 'Height (cms)',
          weightDivision: 'Weight Division',
          paymentStatus: 'Payment Status',
          coachName: 'Coach Name',
          coachMobile: 'Coach Mobile',
          coachWhatsapp: 'Coach Whatsapp No',
          coachEmailId: 'Coach Email Id',
          managerName: 'Manager Name',
          managerMobile: 'Manager Mobile'
        }
        const headerKeys = Object.keys(csvHeader);
        const headerValues = Object.values(csvHeader);
        let i = 0;
        const csv = dataList.map((row) =>
          {
            i++;
            return headerKeys
              .map((fieldName) => {
                let columnValue: any = "";
                if(fieldName == 'slNo') {
                  columnValue = i;
                } else if(fieldName == 'ai_id') {
                  columnValue = environment.registrationIdPrefix + String( row[fieldName] ).padStart(3, '0');
                } else if(fieldName == 'name') {
                  columnValue = row['firstName'] + ' ' + row['middleName'] + ' ' + row['lastName'];
                } else if(fieldName == 'events') {
                  if(this.filterEvent != "") {
                    columnValue = this.filterEvent;
                  } else {
                    columnValue = row[fieldName];
                  }
                } else {
                  columnValue = row[fieldName];
                }
                return JSON.stringify(columnValue, replacer)
              })
              .join(',')
          }
        );
        csv.unshift(headerValues.join(','));
        const csvArray = csv.join('\r\n');
        const a = document.createElement('a');
        const blob = new Blob([csvArray], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'participant_sheet.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    });
  }
}
