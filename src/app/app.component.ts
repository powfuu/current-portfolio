import { Component, HostListener, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadingScreen: boolean = true;
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    //add finished class
    setTimeout(() => {
      document.querySelector('.logo')?.classList.add('finished');
    }, 1570);
    //stop loading screen after 1800ms
    setTimeout(() => {
      this.loadingScreen = false;
    }, 1800);
  }

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
