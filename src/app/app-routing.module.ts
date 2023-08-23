import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AdminrecentComponent } from './adminrecent/adminrecent.component';



const routes: Routes = [
  {path: '' , component: ScannerComponent },
  {path: 'admin' , component: AdminpageComponent },
  {path: 'recent' , component: AdminrecentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
