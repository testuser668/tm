import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GameService} from "../../game.service";

@Component({
  selector: 'app-add-mars',
  templateUrl: './add-mars.component.html'
})
export class AddMarsComponent implements OnInit {

  formMars: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private gameService: GameService) {}

  ngOnInit(): void {
    this.formMars = this.fb.group({
      playedOn: ['', [Validators.required, Validators.pattern('^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])')]],
      first: ['', Validators.required],
      second: ['', Validators.required],
      third: ['', Validators.required],
      colonies: [false, Validators.nullValidator],
      venus: [false, Validators.nullValidator],
      turmoil: [false, Validators.nullValidator],
      points: ['', [Validators.required, Validators.min(10)]]
    }, { validators: validatePositions});
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formMars.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formMars.invalid) {
      return;
    }
    console.log(this.formMars.value);
    this.gameService.addMarsGame(this.formMars.value)
      .then(() => this.router.navigate(['dashboard/edit-mars']))
      .catch(e => document.querySelector('.form-error')!.innerHTML = e.message);
  }

}

export function validatePositions(control: AbstractControl): ValidationErrors | null {
  if (control && control.get("first") && control.get("second") && control.get("third")) {
    const first = control.get("first")!.value;
    const second = control!.get("second")!.value;
    const third = control!.get("third")!.value;
    return ((first === second || first === third || second === third) && first.length>0 && second.length>0) ? { scoreError: true } : null
  }
  return null;
}
