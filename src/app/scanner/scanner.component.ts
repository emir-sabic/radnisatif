import { Component, ViewChild } from '@angular/core';
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
  scannermodel: ScannerModel = {
    barcode: '',
    attendancetype: '',
    scanDateTime: '',
  };
  public fetchedScan: ScannerModel = {} as ScannerModel;
  feedbackMessage: string = '';
  public code: string = '';
  private scanTimeout: any;
  public selectedAttendanceType: string = '';

  private baseUrl: string = `http://localhost:8080/api/scanner`;


  @ViewChild('codeInput') codeInput: any;

  constructor(private http: HttpClient, private scannerservice : ScannerService) {}


  handleInput(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    this.code = inputElement.value;
    clearTimeout(this.scanTimeout);
    this.scanTimeout = setTimeout(() => {
      this.processScannedCode();
    }, 1000);
  }

  processScannedCode(): void {
    this.scannermodel.barcode = this.code;
    this.scannermodel.attendancetype = this.selectedAttendanceType;
    this.scannermodel.scanDateTime = new Date().toLocaleString();

    this.scannerservice.createScan(this.scannermodel).subscribe(
    response => {
              this.feedbackMessage = 'Scan created successfully';
              this.scannerservice.showSuccessFeedback(this.feedbackMessage);
            },
            error => {
              this.feedbackMessage = 'Error creating scan';
              console.error('Error creating scan', error);
            }
    );

// TRENUTNO NE RADI
//     this.scannerservice.fetchScan(this.code).subscribe(
//           data => {
//             this.fetchedScan = data;
//           },
//           error => {
//             console.error('Error fetching data:', error);
//           }
//         );

    this.clearInput();
  }

    clearInput(): void {
      if (this.codeInput) {
        this.codeInput.nativeElement.value = '';
        this.code = '';
      }
    }

}
