import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import {Game} from "../game";
import {GameService} from "../game.service";
import {DatePipe} from "@angular/common";
import {PlayerWins} from "../playerWins";


export type SortColumn = keyof Game | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number | boolean, v2: string | number | boolean) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'overall',
  templateUrl: './overall.component.html'
})
export class OverallComponent implements OnInit {

  title = "TM all time stats";
  gameDataConst: Game[] = [];
  gameData: Game[] = [];
  groupedByPlayerWins: PlayerWins[] = [];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getGames().subscribe(data => {
      this.gameData = data;
      this.gameDataConst = data;
      this.groupedByPlayerWins = this.gameService.getPlayerWins(data);
    })
  }

  toDate(value: string) {
    const datePipe = new DatePipe('de-DE');
    return datePipe.transform(value, 'dd.MM.yy');
  }

  onSort({column, direction} : SortEvent) {
    // sorting games
    if (direction === '' || column === '') {
      this.gameData = this.gameDataConst;
    } else {
      this.gameData = [...this.gameData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

