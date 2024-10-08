import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ScannerService } from './scanner.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminrecentComponent } from './adminrecent/adminrecent.component';




@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    AdminpageComponent,
    AdminrecentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [ScannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
