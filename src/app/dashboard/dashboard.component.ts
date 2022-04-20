import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../core/services/auth.service";
import {GameService} from "../game.service";
import {Game} from "../game";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private gameService: GameService) {}

  status: boolean = false;
  gameDataJson: Game[];
  gameData: any[] = [];

  ngOnInit(): void {
    this.gameService.getGamesFromDBSnapshot().subscribe(data => {
      this.gameData = data;
    });
    this.gameService.getGamesJson().subscribe(data => {
      this.gameDataJson = data;
    })
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  add() {
    this.gameService.addMarsGameRandom()
      .then( () => {
        document.querySelector('#dashboard-main')!.querySelector('.error')!.innerHTML = '';
      })
      .catch(e => {
        document.querySelector('#dashboard-main')!.querySelector('.error')!.innerHTML = e.message;
      });
  }

  addjson() {
    this.gameService.addjsonMars(this.gameDataJson);
  }


  deleteAllMarsGames() {
    this.gameService.removeAllMarsGames();
  }

  getUserInfo() {
    return this.authService.userInfo;
  }

  clickEvent(){
    this.status = !this.status;
  }

  daysSinceLastGame(): number {
    if (this.gameData.length > 0) {
      const now = new Date();
      let lastGame = this.gameData[this.gameData.length-1].payload.val().playedOn;
      const last = new Date(lastGame);
      const oneDay = 1000 * 60 * 60 * 24;
      // Calculating the time difference between two dates
      const diffInTime = now.getTime() - last.getTime();
      // Calculating the no. of days between two dates
      return Math.round(diffInTime / oneDay);
    } else {
      return 0;
    }
  }

}
