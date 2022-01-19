import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Game} from "./game";
import {PlayerWins} from "./playerWins";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private path = '/assets/games-data.json';

  constructor(private http : HttpClient) {
    this.getGames();
  }

  getGames() : Observable<Game[]> {
    return this.http.get<Game[]>(this.path);
  }

  getSeason(season: string) : Observable<Game[]> {
    return this.getGames().pipe(
      map((games: Game[]) => games.filter(i => i.PlayedOn.includes(String(season))))
    );
  }

  testReduce(games : Game[]) : any {
    const occure = games.reduce((acc, cur) => {
      // @ts-ignore
      acc[cur.First] ? acc[cur.First]++ : acc[cur.First] = 1
      return acc;
    }, {});
    console.log(occure);
  }

  getPlayerWins(games : Game[]) : PlayerWins[] {
    let bFirst = games.filter(x => x.First === "b").length;
    let rFirst = games.filter(x => x.First === "r").length;
    let yFirst = games.filter(x => x.First === "y").length;
    let bSecond = games.filter(x => x.Second === "b").length;
    let rSecond = games.filter(x => x.Second === "r").length;
    let ySecond = games.filter(x => x.Second === "y").length;
    let bThird = games.filter(x => x.Third === "b").length;
    let rThird = games.filter(x => x.Third === "r").length;
    let yThird = games.filter(x => x.Third === "y").length;

    let groupedByPlayer : PlayerWins[] = [
      { player: "b", first : bFirst, second: bSecond, third: bThird},
      { player: "r", first : rFirst, second: rSecond, third: rThird},
      { player: "y", first : yFirst, second: ySecond, third: yThird}
    ];

    return groupedByPlayer.sort(this.compareBy1st2nd3rd);
  }

  compareBy1st2nd3rd(a : PlayerWins, b : PlayerWins ) {
    if ( a.first < b.first ){
      return 1;
    }
    if ( a.first > b.first ){
      return -1;
    }
    // 1st equal, check 2nd
    if (a.second < b.second) {
      return 1;
    }
    if (a.second > b.second) {
      return -1;
    }
    // 1st & 2nd equal, check 3rd
    if (a.third < b.third) {
      return 1;
    }
    if (a.third > b.third) {
      return -1;
    }
    return 0;
  }
}
