import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {GameService} from "../../game.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-dune',
  templateUrl: './add-dune.component.html'
})
export class AddDuneComponent implements OnInit {

  formDune: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private gameService: GameService) {}

  ngOnInit(): void {
    this.formDune = this.fb.group({
      playedOn: ['', [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])')]],
      leaderB: ['', Validators.required],
      leaderY: ['', Validators.required],
      winner: ['', Validators.required],
      points: ['', [Validators.min(10),Validators.max(20)]]
    }, { validators: validateLeaders});
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formDune.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formDune.invalid) {
      return;
    }
    this.gameService.addDuneGame(this.formDune.value)
      .then(() => this.router.navigate(['dashboard/edit-dune']))
      .catch(e => document.querySelector('.form-error')!.innerHTML = e.message);
  }

//  TODO: fix authmodule signup logout for navbar getAuth auth????

  getLeaders() {
    return this.gameService.leaders.sort((a, b) =>
      a.name.localeCompare(b.name));
  }

  resetForm() {
    this.formDune.reset( {
      date: '',
      leaderY: '',
      leaderB: '',
      winner: '',
      points: ''
    })
  }

}

export function validateLeaders(control: AbstractControl): ValidationErrors | null {
  if (control && control.get("leaderB") && control.get("leaderY")) {
    const leaderB = control.get("leaderB")!.value;
    const leaderY = control!.get("leaderY")!.value;
    return (leaderB === leaderY && leaderB.length > 0) ? { scoreError: true } : null
  }
  return null;
}
