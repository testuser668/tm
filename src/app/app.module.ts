import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CommonModule, registerLocaleData} from "@angular/common";
import localeDe from "@angular/common/locales/de";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { OverallComponent, NgbdSortableHeader } from './overall/overall.component';
import { GameService } from "./game.service";
import { HttpClientModule } from "@angular/common/http";
import { SeasonComponent } from "./season/season.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { AngularFireModule } from "@angular/fire/compat";
import { DuneComponent } from "./dune/dune.component";
import { AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";


registerLocaleData(localeDe);


@NgModule({
  declarations: [
    AppComponent,
    OverallComponent,
    NgbdSortableHeader,
    SeasonComponent,
    DuneComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  exports: [OverallComponent],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
