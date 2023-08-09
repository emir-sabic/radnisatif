import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class ScannerService {
  private readonly baseUrl: string = `http://localhost:8080/api/scanner`;

  constructor(private http: HttpClient) {}

  createLog(code: any): Observable<any> {
     return this.http.post<any>(`${this.baseUrl}/new`, code);
  }



}
