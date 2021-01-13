import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedColor]'
})
export class RedColorDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.color = 'red';
  }

}
