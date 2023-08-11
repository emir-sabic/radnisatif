import { Component, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ScannerService } from '../scanner.service';
import { ScannerModel } from '../scanner.model';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {

  public scannermodel: ScannerModel = {
    barcode: '',
    attendancetype: '',
    scanDateTime: '',
    currentstate: '',
  };


  constructor(private http: HttpClient, private scannerservice : ScannerService) {}

  createUser() {
      this.scannermodel.barcode = (<HTMLInputElement>document.getElementById('barcode')).value;
      this.scannermodel.attendancetype = "redovno"
      this.scannermodel.scanDateTime = new Date().toLocaleString();
      this.scannermodel.currentstate = "odsutan";

    this.scannerservice.createScan(this.scannermodel).subscribe();
  }



}
