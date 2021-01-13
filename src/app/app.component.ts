import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface IItem {
  key: number,
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup;
  public items: IItem[] = [];


  /** инициализация */
  ngOnInit(): void {
    this.loadItems();
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
    this.saveItems();
    this.form.reset();
  }

  /** удаление из итемов */
  public onDelete(key: number) {
    this.items = this.items.filter(item => item.key !== key);
    this.saveItems();
  }

  /** сохранить изменения */
  private saveItems(): void {
    localStorage.setItem('angular-items', JSON.stringify(this.items));
  }

  /** загрузить итемы */
  private loadItems(): void {
    this.items = JSON.parse(localStorage.getItem('angular-items') || '[]');
  }

}
