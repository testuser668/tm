import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Game} from "./game";
import {PlayerWins} from "./playerWins";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {DuneGame} from "./duneGame";
import {LeaderWins} from "./leaderWins";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private path = '/assets/mars-games-data.json';
  leaders: {name: string, stars: string}[] = [ // 8 leaders
    {name: "Duke Leto Atreides", stars: "&#x2B22;&#x2B22;"},
    {name: "Baron Harkonnen", stars: "&#x2B22;&#x2B22;&#x2B22;"},
    {name: "Countess Ariana Thorvald", stars: "&#x2B22;&#x2B22;&#x2B22;"},
    {name: "Earl Memnon Thorvald", stars: "&#x2B22;"},
    {name: "Count Ilban Richese", stars: "&#x2B22;"},
    {name: "Helena Richese", stars: "&#x2B22;&#x2B22;"},
    {name: "Paul Atreides", stars: "&#x2B22;"},
    {name: "Glossu Beast Rabban", stars: "&#x2B22;"}
  ]

  ixLeaders: {name: string, stars: string}[] = [ // 6 leaders
    {name: "Viscount Hundro Moritani", stars: "&#x2B22;"},
    {name: "Princess Yuna Moritani", stars: "&#x2B22;&#x2B22;"},
    {name: "Achduke Armand Ecaz", stars: "&#x2B22;&#x2B22;"},
    {name: "Ilesa Ecaz", stars: "&#x2B22;&#x2B22;&#x2B22;"},
    {name: "Tessia Vernius", stars: "&#x2B22;&#x2B22;&#x2B22;&#x2B22;"},
    {name: "Prince Rhombur Vernius", stars: "&#x2B22;"},
  ]

  constructor(private http : HttpClient, private db: AngularFireDatabase) {
    this.getGamesJson();
  }

  getGamesJson() : Observable<Game[]> {
    return this.http.get<Game[]>(this.path);
  }

  getGamesFromDB() : Observable<Game[]> {
    return this.db.list<Game>("mars-games",
        ref => ref.orderByChild('playedOn')).valueChanges();
  }

  getGamesFromDBSnapshot() : Observable<any[]> {
    return this.db.list("mars-json-games",
      ref => ref.orderByChild('playedOn')).snapshotChanges();
  }

  getDuneGamesFromDBSnapshot() : Observable<any[]> {
    return this.db.list("dune-json-games",
      ref => ref.orderByChild('playedOn')).snapshotChanges();
  }


  getDuneGamesFromDB() : Observable<DuneGame[]> {
    return this.db.list<DuneGame>("dune-games",
        ref => ref.orderByChild('playedOn')).valueChanges();
  }

  addDuneGame(game: DuneGame) {
    const ref = this.db.list<DuneGame>("dune-json-games");
    return ref.push(game);
  }

  addMarsGame(game: Game) {
    const ref = this.db.list<Game>("mars-json-games");
    return ref.push(game);
  }

  addMarsGameRandom() {
    const ref = this.db.list<Game>("mars-json-games");
    return ref.push({ playedOn : "2299-12-31",
       first : this.getRandom1st(),
       second : "rr",
       third : "yy",
       venus : true,
       colonies : true,
       turmoil : true,
       points : this.getRandomInt(30,600),
       map : "blue"});
  }

  addjsonMars(games: Game[]) {
    const ref = this.db.list("mars-json-games");
    games.forEach( e => {
      ref.push(e)
        .then(_ => console.log('success json'))
        .catch(e => console.log("json error " + e.message))
    });
  }

  removeMarsGame(key: string) {
    return this.db.list<Game>("mars-json-games").remove(key);
  }

  removeDuneGame(key: string) {
    return this.db.list<Game>("dune-json-games").remove(key);
  }

  removeAllMarsGames() {
    const ref =  this.db.list<Game>("mars-json-games");
    ref.remove()
      .then()
      .catch(e => console.log(e.message));
  }

  getSeason(season: string) : Observable<Game[]> {
    return this.getGamesFromDB().pipe(
      map((games: Game[]) => games.filter(i => i.playedOn.includes(String(season))))
    );
  }

  testReduce(games : Game[]) : any {
    const occur = games.reduce((acc, cur) => {
      // @ts-ignore
      acc[cur.first] ? acc[cur.first]++ : acc[cur.first] = 1
      return acc;
    }, {});
    console.log(occur);
  }

  getLeaderWins(games: DuneGame[]) : LeaderWins[] {
    let groupedByLeader : LeaderWins[] = [];
    for (const leader of this.leaders) {
      let total = games.filter(x => x.leaderY === leader.name || x.leaderB === leader.name).length;
      let wins = games.filter(x =>
        ((x.leaderY === leader.name && x.winner === "y") || (x.leaderB === leader.name && x.winner === "b"))).length;
      groupedByLeader.push({leader : leader.name, stars: leader.stars, wins: wins, total: total});
    }

    return groupedByLeader.sort(
      function(a,b){
        if(isFinite(b.wins/b.total-a.wins/a.total)) {
          return b.wins/b.total-a.wins/a.total;
        } else {
          return isFinite(a.wins/a.total) ? -1 : 1;
        }
      });
  }

  getIxLeaders(): LeaderWins[] {
    let ixLeader: LeaderWins[] = [];
    for (const leader of this.ixLeaders) {
      ixLeader.push({leader: leader.name, stars: leader.stars, wins: 0, total: 0});
    }
    return ixLeader;
  }

  getPlayerWins(games : Game[]) : PlayerWins[] {
    let bFirst = games.filter(x => x.first === "b").length;
    let rFirst = games.filter(x => x.first === "r").length;
    let yFirst = games.filter(x => x.first === "y").length;
    let bSecond = games.filter(x => x.second === "b").length;
    let rSecond = games.filter(x => x.second === "r").length;
    let ySecond = games.filter(x => x.second === "y").length;
    let bThird = games.filter(x => x.third === "b").length;
    let rThird = games.filter(x => x.third === "r").length;
    let yThird = games.filter(x => x.third === "y").length;

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

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  getRandom1st() {
    let winners = ["b", "y", "r"];
    return winners[Math.floor(Math.random() * winners.length)];
  }
}
