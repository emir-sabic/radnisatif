import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environments';
import { ScannerService } from '../scanner.service';
import { ScannerModel } from '../scanner.model';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {

  public scannermodel: ScannerModel = {
    barcode: '',
    attendancetype: '',
    scanDateTime: '',
    currentstate: '',
  };

  public fetchedScan: ScannerModel = {
    barcode: '',
    attendancetype: '',
    scanDateTime: '',
    currentstate: '',
  };

  feedbackMessage: string = '';
  public code: string = '';
  private scanTimeout: any;
  public selectedAttendanceType: string = '';
  public htmlispis: string = '';

  private baseUrl: string = `http://localhost:8080/api/scanner`;

  @ViewChild('codeInput') codeInput!: ElementRef;

  constructor(private http: HttpClient, private scannerservice: ScannerService, private renderer: Renderer2) {}

  handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.code = inputElement.value;
    clearTimeout(this.scanTimeout);
    this.scanTimeout = setTimeout(() => {
      this.retrieveScannedCode();
    }, 3000);
  }

  retrieveScannedCode(): void {
    this.scannerservice.searchByBarcode(this.code).subscribe(
          (fetchscan: ScannerModel) => {
            this.fetchedScan = fetchscan;

                  if (this.fetchedScan.currentstate === "prisutan") {
                    this.scannermodel.currentstate = "odsutan";

                  } else {
                    this.scannermodel.currentstate = "prisutan";
                  }

                  this.processScannedCode();
          },
          error => {
                  this.feedbackMessage = 'No user in database';
                  this.scannerservice.showFeedback(this.feedbackMessage);
                  this.clearInput();
          }
        );

  }

  changeAttendanceType(newType: string) {
    this.selectedAttendanceType = newType;
    this.scannermodel.attendancetype = newType;
    this.focusInput();
  }


  processScannedCode(): void {

    if (!this.scannermodel.attendancetype) {
      this.feedbackMessage = 'Please chose attendance type';
      this.scannerservice.showFeedback(this.feedbackMessage);
      return;
    }

    this.scannermodel.barcode = this.code;
    this.scannermodel.attendancetype = this.selectedAttendanceType;
    this.scannermodel.scanDateTime = new Date().toLocaleString();

    this.scannerservice.createScan(this.scannermodel).subscribe(
    response => {
              this.feedbackMessage = 'Scan created successfully';
              this.scannerservice.showFeedback(this.feedbackMessage);

            },
            error => {
              this.feedbackMessage = 'Scan not created';
              this.scannerservice.showFeedback(this.feedbackMessage);
            }
    );
    this.clearInput();
  }

  clearInput(): void {
    if (this.codeInput) {
      this.codeInput.nativeElement.value = '';
      this.code = '';
    }
  }

   focusInput(): void {
     if (this.codeInput) {
       this.renderer.selectRootElement(this.codeInput.nativeElement).focus();
     }
   }


}
