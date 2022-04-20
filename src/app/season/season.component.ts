import {Component, OnInit} from '@angular/core';
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
  season = "";
  gameData : Game[] = [];
  groupedByPlayerWins : PlayerWins[] = [];

  constructor(private gameService : GameService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getSeason(params['season']);
      this.title = "Season " + params['season'];
      this.season = params['season'];
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

  hideLeaderboard(): boolean {
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

  daysSinceLastGame(): number {
    if (this.gameData.length > 0 && this.isCurrentSeason()) {
      const now = new Date();
      const last = new Date(this.gameData[this.gameData.length - 1].playedOn);
      const oneDay = 1000 * 60 * 60 * 24;
      // Calculating the time difference between two dates
      const diffInTime = now.getTime() - last.getTime();
      // Calculating the no. of days between two dates
      return Math.floor(diffInTime / oneDay);
    } else {
      return 0;
    }
  }

  isCurrentSeason(): boolean {
    const a = new Date().getFullYear().toString();
    const b = this.gameData[this.gameData.length - 1].playedOn.substr(0, 4);
    return a === b;
  }

}
