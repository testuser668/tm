import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {GameService} from "../game.service";
import {DuneGame} from "../duneGame";
import {LeaderWins} from "../leaderWins";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dune',
  templateUrl: './dune.component.html'
})
export class DuneComponent implements OnInit {

  gameData: DuneGame[] = [];
  groupedByLeaderWins: LeaderWins[] = [];
  ixLeaders: LeaderWins[] = [];

  constructor(private db: AngularFireDatabase, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getDuneGamesFromDB().subscribe(data => {
      this.gameData = data.reverse(); // reversed data
      this.groupedByLeaderWins = this.gameService.getLeaderWins(data);
      this.ixLeaders = this.gameService.getIxLeaders();
    })
  }

  toDate(value: string) {
    return new DatePipe('de-DE').transform(value, 'dd.MM.yy');
  }
}
