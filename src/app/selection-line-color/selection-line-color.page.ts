import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-selection-line-color',
  templateUrl: './selection-line-color.page.html',
  styleUrls: ['./selection-line-color.page.scss'],
})
export class SelectionLineColorPage {
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
    //{ val: 'nullo', coding: "undefinded" }
  ];
  colors_selected = [
    { corsia: 'A', color: this.colors[0], isChecked: true },
    { corsia: 'B', color: this.colors[1], isChecked: true },
    { corsia: 'C1', color: this.colors[2], isChecked: true },
    { corsia: 'C6', color: this.colors[4], isChecked: true },
    { corsia: 'C7', color: this.colors[3], isChecked: true }
  ];

  constructor(private dataService: DataService) { }

  get_colors() {
    this.load_data();
    return this.colors_selected;
  }
  load_data() {
    if (window.localStorage.getItem("colors_selected") != null)
      this.colors_selected = JSON.parse(window.localStorage.getItem('colors_selected'));
    else
      this.setColorsCorsieFromAutorizzazioni();
  }
  ionViewWillEnter() {
    this.load_data();
    this.show_preview_legend();
  }
  update_colors_selected() {
    console.log(this.colors_selected)
    window.localStorage.setItem('colors_selected', JSON.stringify(this.colors_selected));
    this.show_preview_legend();
  }
  show_preview_legend() {
    console.log(this.colors_selected)
    var element = document.getElementById('preview');
    element.innerHTML = this.dataService.createLengendHTMLFromColorsSelected(this.colors_selected);
  }
  consigliatiButton() {
    this.setColorsCorsieFromAutorizzazioni();
    this.update_colors_selected();
  }
  setColorsCorsieFromAutorizzazioni() {
    var corsie = this.dataService.getCorsieFromAutorizzazioni(this.dataService.getListAuthorizzation());
    console.log(corsie);
    for (var i = 0; i < this.colors_selected.length; i++) {
      if (corsie[i] == 'block')
        this.colors_selected[i].isChecked = false;
      else
        this.colors_selected[i].isChecked = true;
    }
  }
}
