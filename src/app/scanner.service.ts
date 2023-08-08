import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable()
export class ScannerService {
  private baseUrl = `http://localhost:8080/api/scanner`;

  constructor(private http: HttpClient) {}

  createLog(code: String): Observable<any> {
    return this.http.post(this.baseUrl, code);
  }



}
