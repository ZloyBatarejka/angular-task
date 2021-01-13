import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface IItem {
  key: number,
  title: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public items: IItem[] = [];
  public loadingUser = false;
  private unsub$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  /** инициализация */
  ngOnInit(): void {
    this.loadItems();
    this.form = new FormGroup({
      control: new FormControl('', [Validators.required])
    })
  }

  /** уничтожение */
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  /** сабмит формы */
  public submit(): void {
    this.addItem(this.form.value.control);
    this.form.reset();
  }

  /** удаление из итемов */
  public onDelete(key: number) {
    this.items = this.items.filter(item => item.key !== key);
    this.saveItems();
  }

  /** загрузить итем */
  public getItem(): void {
    this.loadingUser = true;
    this.http.get<any>('https://randomuser.me/api').pipe(takeUntil(this.unsub$)).subscribe(({results}): void => {
      const item = results[0].name.first;
      this.addItem(item);
      this.loadingUser = false;
    })
  }
  /** добавить итем */
  private addItem(name: string) {
    const newItem: IItem = {
      key: Date.now(),
      title: name
    }
    this.items.push(newItem);
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
