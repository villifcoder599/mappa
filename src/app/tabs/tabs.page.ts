import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  unread = 0;
  constructor() {
  }

  ngOnInit() {
    if (window.localStorage.getItem('unread') != null)
      this.unread = JSON.parse(window.localStorage.getItem('unread'));
  }
  clear_badge() {
    this.unread = 0;
    window.localStorage.setItem('unread', JSON.stringify(this.unread));
  }
  update_badge() {
    this.unread++;
    window.localStorage.setItem('unread', JSON.stringify(this.unread));
  }

}
