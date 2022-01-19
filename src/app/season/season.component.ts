import { Component, OnInit } from '@angular/core';
import {Game} from "../game";
import {PlayerWins} from "../playerWins";
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html'
})
export class SeasonComponent implements OnInit {

  title = "";
  gameData : Game[] = [];
  groupedByPlayerWins : PlayerWins[] = [];

  constructor(private gameService : GameService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSeason(params['season']);
      this.title = "Season " + params['season'];
    })
  }

  toDate (value : string) {
    const datePipe = new DatePipe('de-DE');
    return datePipe.transform(value, 'dd.MM.yy');
  }

  getSeason(season: string) {
    this.gameService.getSeason(season).subscribe(data => {
      this.gameData = data;
      this.groupedByPlayerWins = this.gameService.getPlayerWins(data);
    });
  }

  hideLeaderboard() : boolean {
    return this.gameData.length < 6;
  }


  groupBy(objectArray : Game[], property : any) {
    return objectArray.reduce(function (acc : any, obj : any) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }


}
