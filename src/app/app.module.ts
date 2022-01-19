import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CommonModule, registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverallComponent, NgbdSortableHeader } from './overall/overall.component';
import { GameService } from "./game.service";
import { HttpClientModule } from "@angular/common/http";
import { SeasonComponent } from './season/season.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent,
    OverallComponent,
    NgbdSortableHeader,
    SeasonComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [OverallComponent],
  providers: [GameService],
  bootstrap: [AppComponent, OverallComponent]
})
export class AppModule { }
