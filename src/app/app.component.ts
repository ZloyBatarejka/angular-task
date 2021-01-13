import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup;


  /** инициализация */
  ngOnInit(): void {
    this.form = new FormGroup({
      control: new FormControl('', [Validators.required])
    })
  }

  /** сабмит формы */
  public submit(): void {
    console.log(this.form.value);
    this.form.reset();
  }


}
