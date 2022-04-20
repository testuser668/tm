import { Component, OnInit } from '@angular/core';
import { GameService } from "./game.service";
import { Game } from "./game";
import { Router } from "@angular/router";
import { getAuth } from "@angular/fire/auth";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TM';
  gameData : Game[] = [];

  constructor(
    // private readonly authService: AuthService,
    private router: Router,
    private gameService : GameService) {
  }

  ngOnInit() {
   this.gameService.getGamesJson().subscribe(data => this.gameData = data);
  }

  getUser() {
    return getAuth().currentUser?.email;
  }

  logout() {
    getAuth().signOut()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
