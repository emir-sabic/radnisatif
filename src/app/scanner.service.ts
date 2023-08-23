import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ScannerModel} from "./scanner.model";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ScannerService {
  private readonly baseUrl: string = `http://localhost:8080/api/scanner`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  createScan(scannermodel: ScannerModel): Observable<ScannerModel> {
    return this.http.post<ScannerModel>(`${this.baseUrl}/new`, scannermodel);
  }

  showFeedback(message: string){
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  searchByBarcode(barcode: string): Observable<ScannerModel>{
   return this.http.get<ScannerModel>(`${this.baseUrl}/search/${barcode}`);
  }


  getScans(barcode?: string): Observable<ScannerModel[]> {
      return this.http.get<ScannerModel[]>(`${this.baseUrl}`);
    }
}
