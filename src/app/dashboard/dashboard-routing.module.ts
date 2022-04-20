import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {EditMarsComponent} from "./edit-mars/edit-mars.component";
import {AddDuneComponent} from "./add-dune/add-dune.component";
import {AddMarsComponent} from "./add-mars/add-mars.component";
import {EditDuneComponent} from "./edit-dune/edit-dune.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: EditMarsComponent},
      { path: 'add-dune', component: AddDuneComponent},
      { path: 'add-mars', component: AddMarsComponent},
      { path: 'edit-dune', component: EditDuneComponent},
      { path: 'edit-mars', redirectTo: '', pathMatch: 'full'},
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
