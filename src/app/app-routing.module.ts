import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverallComponent} from "./overall/overall.component";
import {SeasonComponent} from "./season/season.component";

const routes: Routes = [
  {path: 'overall', component: OverallComponent},
  {path: 'season/:season', component: SeasonComponent},
  {path: '**', redirectTo: 'season/2022', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
