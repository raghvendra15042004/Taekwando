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
import { CustomThreadService } from 'src/app/core/services/custom-thread.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tie-sheet',
  templateUrl: './tie-sheet.component.html',
  styleUrls: ['./tie-sheet.component.scss']
})
export class TieSheetComponent implements OnInit {

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
  public uploadPath = "";

  public totalData: number = 0;
  public pazeSize: number = 50;
  public page: number = 1;
  public templateName;

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;
  filterConfig: any = {};

  filterEvent = "Freshers";
  filterCategory = "Sub junior";
  filterGender = "Male";
  filterWeightDivision = "Under 18 Kg (Not Exceeding 18 Kgs)";
  isFilter = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private boxService: BoxService,
    private bundleService: BundleService,
    private threadService: ThreadService,
    private appService: AppService,
    private bundleParameter: BundleParameter,
    private customThreadService: CustomThreadService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  public showGenerateButton = false;
  weightDivisionList;
  ngOnInit() {
    this.weightDivisionList = [
      "Under 18 Kg (Not Exceeding 18 Kgs)",
      "Under 21 Kg (Over 18 & Not Exceeding 21 Kgs)",
      "Under 23 Kg (Over 21 & Not Exceeding 23 Kgs)",
      "Under 25 Kg (Over 23 & Not Exceeding 25 Kgs)",
      "Under 27 Kg (Over 25 & Not Exceeding 27 Kgs)",
      "Under 29 Kg (Over 27 & Not Exceeding 29 Kgs)",
      "Under 32 Kg (Over 29 & Not Exceeding 32 Kgs)",
      "Over 32 Kg"
    ];

    this.boxId = 100;
    this.bundleId = 1002;
    this.blockUI.start("Loading...");
    this.boxItem = this.boxService.getBox(this.boxId);
    this.inboxItems = this.bundleService.getBundlesByBoxId(this.boxId);
    this.uploadPath = this.appService.getApiPath() + 'uploads/';

    this.bundle = this.bundleService.getBundle(this.bundleId);
    this.templateName = this.bundle[0].defaultTemplate.name;
    this.countTieups();
    this.loadList();
  }

  countTieups() {
    this.customThreadService.countTieups(this.filterConfig).subscribe(result => {
      if (result['status'] == 1) {
        this.totalData = parseInt(result['threads']);
        if(this.totalData == 0 && this.bundle[0].inboxUIConfig.showAddBtn)
          this.showGenerateButton = true;
        else
          this.showGenerateButton = false;
      }
    })
  }

  loadList() {
    this.threadList = [];
    this.gridConfig = this.bundle[0]['inboxUIConfig']['gridViewConfg'];
    this.customThreadService.getTieups(this.start, this.limit, this.filterConfig).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.blockUI.stop();
      if (res['status'] == 1 && res['data'].length > 0) {
        this.threadList = res['data'];
      }
    });
  }

  createNewThread() {
    this.blockUI.start("Loading...");
    this.customThreadService.createTieup().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.blockUI.stop();
      if (data && data['status'] == 1) {
        var popupText = "Successfully Added.";
        Swal.fire({
          title: "Success",
          text: popupText,
          icon: "success",
          showConfirmButton: true,
          showCancelButton: false
        }).then((status) => {
          if (status.value) {
            this.blockUI.start("Loading...");
            this.countTieups();
            this.loadList();
          }
        });
      } else {
        let msg = "";
        if (data['message'] == 'UNIQUE-CONSTRAINT') {
          msg = "This mobile no is already exist.";
        } else {
          msg = data['message'];
        }
        Swal.fire({
          title: msg,
          icon: "error",
          showConfirmButton: true
        })
      }
    }, error => {
      this.blockUI.stop();
      Swal.fire({
        title: "Please try later",
        icon: "error",
        showConfirmButton: true
      })
    })
  }

  redirect(path) {
    this.router.navigate([path + '/' + this.bundleId]);
  }

  loadPage(pageNo) {
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
    return '0423' + String(threadId).padStart(3, '0');
  }

  showSlNo() {
    return 1;
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
      case "Sub junior": {
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
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
            this.weightDivisionList = [
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
        switch (this.filterGender) {
          case "Male": {
            this.weightDivisionList = [
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
            this.weightDivisionList = [
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

  filterTieups() {
    this.isFilter = true;
    if (this.filterEvent == "") {
      Swal.fire({
        title: 'Choose Event',
        icon: 'warning',
      })
      return;
    }

    if (this.filterCategory == "") {
      Swal.fire({
        title: 'Choose Category',
        icon: 'warning',
      })
      return;
    }

    if (this.filterGender == "") {
      Swal.fire({
        title: 'Choose Gender',
        icon: 'warning',
      })
      return;
    }

    if (this.filterWeightDivision == "") {
      Swal.fire({
        title: 'Choose Weight Division',
        icon: 'warning',
      })
      return;
    }

    this.filterConfig = {
      event: this.filterEvent,
      categoryName: this.filterCategory,
      gender: this.filterGender,
      weightDivision: this.filterWeightDivision
    };
    this.blockUI.start("Loading...");
    this.countTieups();
    this.loadList();
  }

  resetFilter() {
    this.isFilter = false;
    this.filterConfig = {};
    this.blockUI.start("Loading...");
    this.countTieups();
    this.loadList();
  }

  downloadCsv() {
    this.blockUI.start("Loading...");
    var dataList = [];
    var start = 0;
    var limit = this.totalData;
    this.customThreadService.getTieups(start, limit, this.filterConfig).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.blockUI.stop();
      if (res['status'] == 1 && res['data'].length > 0) {
        dataList = res['data'];
        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        var csvHeader = {
          ai_id: 'SL No.',
          firstParticipantRegistrationId: '1st Participant Registration Id',
          firstParticipantName: '1st Participant Name',
          firstParticipantDistrict: '1st Participant District',
          firstParticipantWeight: '1st Participant Weight',
          secondParticipantRegistrationId: '2nd Participant Registration Id',
          secondParticipantName: '2nd Participant Name',
          secondParticipantDistrict: '2nd Participant District',
          secondParticipantWeight: '2nd Participant Weight',
          event: 'Event',
          categoryName: 'Category',
          gender: 'Gender',
          weightDivision: 'Weight Division'
        }
        const headerKeys = Object.keys(csvHeader);
        const headerValues = Object.values(csvHeader);
        const csv = dataList.map((row) =>
          headerKeys
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(',')
        );
        csv.unshift(headerValues.join(','));
        const csvArray = csv.join('\r\n');

        const a = document.createElement('a');
        const blob = new Blob([csvArray], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'tieup_sheet.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    });
  }

}
