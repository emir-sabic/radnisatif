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

  scans: ScannerModel[] = [];
  searchBarcode: string = '';
  searchAttendanceType: string = '';
  searchCurrentState: string = '';
  filteredScans: any[] = [];

  constructor(private http: HttpClient, private scannerservice : ScannerService) {}

  createUser() {
      this.scannermodel.barcode = (<HTMLInputElement>document.getElementById('barcode')).value;
      this.scannermodel.attendancetype = "redovno"
      this.scannermodel.scanDateTime = new Date().toLocaleString();
      this.scannermodel.currentstate = "odsutan";

    this.scannerservice.createScan(this.scannermodel).subscribe();
  }


  applyFilter() {
    this.filteredScans = this.scans.filter(scan =>
      this.matchesSearch(scan)
    );
  }

  matchesSearch(scan: ScannerModel): boolean {
    return this.matchesBarcode(scan) && this.matchesAttendanceType(scan) && this.matchesCurrentState(scan);
  }

  matchesBarcode(scan: ScannerModel): boolean {
    return !this.searchBarcode || scan.barcode === this.searchBarcode;
  }

  matchesAttendanceType(scan: ScannerModel): boolean {
    return !this.searchAttendanceType || scan.attendancetype.includes(this.searchAttendanceType);
  }

  matchesCurrentState(scan: ScannerModel): boolean {
    return !this.searchCurrentState || scan.currentstate.includes(this.searchCurrentState);
  }

  ngOnInit() {
      this.fetchScans();
    }

   fetchScans() {
    this.scannerservice.getScans().subscribe(
      (data) => {
        this.scans = data;
        this.applyFilter();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }






}
