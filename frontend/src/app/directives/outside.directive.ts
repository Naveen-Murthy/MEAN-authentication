import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appOutside]',
})
export class OutsideDirective {
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();
  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  toggle(event: any) {
    if (this._elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(false);
    } else {
      this.clickOutside.emit(true);
    }
  }
}
