import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-line-color',
  templateUrl: './selection-line-color.page.html',
  styleUrls: ['./selection-line-color.page.scss'],
})
export class SelectionLineColorPage implements OnInit {
  colors = [
    { id: 0, val: 'verde', coding: "#00ff00" },
    { id: 1, val: 'giallo', coding: "#ffff00" },
    { id: 2, val: 'rosso', coding: "#ff0000" },
    { id: 3, val: 'blu', coding: "#0000ff" },
    { id: 4, val: 'viola', coding: "#800080" },
    { id: 5, val: 'marrone', coding: "#a52a2a" },
    { id: 6, val: 'nero', coding: "#000000" },
    { id: 7, val: 'magenta', coding: "#ff00ff" },
    { id: 8, val: 'rosa', coding: "#ff69b4" },
    { id: 9, val: 'azzurro', coding: "#00ffff" },
    { id: 10, val: 'nullo', coding: "undefinded" }
  ];
  colors_selected = [
    {corsia:'A', id: 0, val: 'verde', coding: "#00ff00" },
    {corsia:'B' ,id: 1, val: 'giallo', coding: "#ffff00" },
    {corsia:'C' , id: 2, val: 'rosso', coding: "#ff0000" },
  ]

  constructor() { }

  ngOnInit() {
    if (window.localStorage.getItem("colors_selected") != null)
      this.colors_selected = JSON.parse(window.localStorage.getItem('colors_selected'));
  }
  update_colors_selected() {
    console.log(this.colors_selected);
    window.localStorage.setItem('colors_selected', JSON.stringify(this.colors_selected));
  }

}
