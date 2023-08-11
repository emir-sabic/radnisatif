import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';
import { AdminpageComponent } from './adminpage/adminpage.component';



const routes: Routes = [
  {path: '' , component: ScannerComponent },
  {path: 'admin' , component: AdminpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
