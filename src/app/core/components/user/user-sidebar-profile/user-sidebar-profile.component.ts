import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar-profile',
  templateUrl: './user-sidebar-profile.component.html',
  styleUrls: ['./user-sidebar-profile.component.css'],
})
export class UserSidebarProfileComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi router chuyển đổi hoàn thành
      }
    });
  }
}
