import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-line-color',
  templateUrl: './selection-line-color.page.html',
  styleUrls: ['./selection-line-color.page.scss'],
})
export class SelectionLineColorPage implements OnInit {
  colors = [
    { val: 'verde', coding: "#00ff00" },
    { val: 'giallo', coding: "#ffff00" },
    { val: 'rosso', coding: "#ff0000" },
    { val: 'blu', coding: "#0000ff" },
    { val: 'viola', coding: "#800080" },
    { val: 'marrone', coding: "#a52a2a" },
    { val: 'nero', coding: "#000000" },
    { val: 'magenta', coding: "#ff00ff" },
    { val: 'rosa', coding: "#ff69b4" },
    { val: 'azzurro', coding: "#00ffff" },
    { val: 'nullo', coding: "undefinded" }
  ];
  colors_selected = [
    { corsia: 'A', color: this.colors[0] },
    { corsia: 'B', color: this.colors[1] },
    { corsia: 'C1', color: this.colors[2] },
    { corsia: 'C2', color: this.colors[10] },
    { corsia: 'C6', color: this.colors[4] },
    { corsia: 'C7', color: this.colors[3] }
  ];
  constructor() {
  }
  get_colors() {
    this.load_data();
    return this.colors_selected;
  }
  load_data() {
    if (window.localStorage.getItem("colors_selected") != null)
      this.colors_selected = JSON.parse(window.localStorage.getItem('colors_selected'));
  }
  ngOnInit() {
    this.load_data();
    this.show_preview_legend();
  }
  update_colors_selected() {
    window.localStorage.setItem('colors_selected', JSON.stringify(this.colors_selected));
    this.show_preview_legend();
  }


  show_preview_legend() {
    var element = document.getElementById('preview');
    element.innerHTML = "";
    for (var i = 0; i < this.colors_selected.length; i++) {
      if (this.colors_selected[i].color.val != 'nullo')
        element.innerHTML +=
          '<div class="row"> <i class ="color" style="background:' + this.colors_selected[i].color.coding + '"></i> ' + '<p id="testo">' +
          'Corsia ' + this.colors_selected[i].corsia + ' </p></div>';
    }
  }
}
