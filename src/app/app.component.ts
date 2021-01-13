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
    const newItem: IItem = {
      key: Date.now(),
      title: this.form.value.control
    }
    this.items.push(newItem);
    this.form.reset();
  }


}
