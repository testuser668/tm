import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverallComponent} from "./overall/overall.component";
import {SeasonComponent} from "./season/season.component";
import {DuneComponent} from "./dune/dune.component";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {path: '', redirectTo:'season/2022', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  {path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {path: 'overall', component: OverallComponent},
  {path: 'season/:season', component: SeasonComponent},
  {path: 'dune', component: DuneComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
