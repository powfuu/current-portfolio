import { Component, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(private ngZone: NgZone) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.updatePosition());
  }

  updatePosition() {
    requestAnimationFrame(() => {
      this.ngZone.run(() => {
        this.updatePosition();
      });
    });
  }
}
