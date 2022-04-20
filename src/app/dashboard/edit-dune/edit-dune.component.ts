import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {GameService} from "../../game.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-dune',
  templateUrl: './edit-dune.component.html'
})
export class EditDuneComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private gameService: GameService) {}

  status: boolean = false;
  gameData: any[] = [];

  ngOnInit(): void {
    this.gameService.getDuneGamesFromDBSnapshot().subscribe(data => {
      this.gameData = data;
    });

  }

  remove(key: string) {
    this.gameService.removeDuneGame(key)
      .then( () => {
        document.querySelector('#dashboard-main')!.querySelector('.error')!.innerHTML = '';
      })
      .catch(e => {
        document.querySelector('#dashboard-main')!.querySelector('.error')!.innerHTML = e.message;
      });
  }

  toDate(value: string) {
    return new DatePipe('de-DE').transform(value, 'dd.MM.yy');
  }

}
