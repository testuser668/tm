import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from "@angular/forms";
import { EditMarsComponent} from "./edit-mars/edit-mars.component";
import { EditDuneComponent } from './edit-dune/edit-dune.component';
import {AddDuneComponent} from "./add-dune/add-dune.component";
import { AddMarsComponent } from './add-mars/add-mars.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddDuneComponent,
    EditMarsComponent,
    EditDuneComponent,
    AddMarsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
