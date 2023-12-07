import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  bgNav: any;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (document.documentElement.scrollTop > 0) {
      this.bgNav = {
        'background-color': 'bg-dark'
      };
    } else {
      this.bgNav = {};
    }
  }
}
