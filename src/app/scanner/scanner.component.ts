import { Component, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environments';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  public code: string = '';
  private scanTimeout: any;
  private readonly baseUrl: string = `http://localhost:8080/api/scanner`;

  @ViewChild('codeInput') codeInput: any;

  constructor(private http: HttpClient) {}


  handleInput(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    this.code = inputElement.value;
    console.log('Scanned Code111:', this.code);

    clearTimeout(this.scanTimeout);
    this.scanTimeout = setTimeout(() => {
      this.processScannedCode();
    }, 1000);
  }

  processScannedCode(): void {
    console.log('Scanned Code:', this.code);
    this.http.post<String>(`${this.baseUrl}/new`, this.code);
    this.clearInput();
  }

    clearInput(): void {
      if (this.codeInput) {
        this.codeInput.nativeElement.value = '';
        this.code = '';
      }
    }
}
