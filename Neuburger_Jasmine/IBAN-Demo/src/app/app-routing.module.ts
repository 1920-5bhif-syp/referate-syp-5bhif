import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IbanComponent } from './iban/iban.component';


const routes: Routes = [
  {
    path: 'iban',
    component: IbanComponent
  },
  {
    path: '',
    redirectTo: '/iban',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
