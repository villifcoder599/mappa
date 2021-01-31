import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-selection-line-color',
  templateUrl: './selection-line-color.page.html',
  styleUrls: ['./selection-line-color.page.scss'],
})
export class SelectionLineColorPage {
  colors = [
    { val: 'verde', coding: "#00ff00", isChoose: true },
    { val: 'giallo', coding: "#ffff00", isChoose: true },
    { val: 'rosso', coding: "#ff0000", isChoose: true },
    { val: 'blu', coding: "#0000ff", isChoose: true },
    { val: 'viola', coding: "#800080", isChoose: true },
    { val: 'marrone', coding: "#a52a2a", isChoose: false },
    { val: 'nero', coding: "#000000", isChoose: false },
    { val: 'magenta', coding: "#ff00ff", isChoose: false },
    { val: 'rosa', coding: "#ff69b4", isChoose: false },
    { val: 'azzurro', coding: "#00ffff", isChoose: false },
  ];
  colors_selected = [
    { corsia: 'A', color: this.colors[0], isChecked: true },
    { corsia: 'B', color: this.colors[1], isChecked: true },
    { corsia: 'C1', color: this.colors[2], isChecked: true },
    { corsia: 'C6', color: this.colors[4], isChecked: true },
    { corsia: 'C7', color: this.colors[3], isChecked: true }
  ];

  constructor(private dataService: DataService) { 
    this.load_data()
  }

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
    window.localStorage.setItem('colors_selected', JSON.stringify(this.colors_selected));
    this.show_preview_legend();
  }
  show_preview_legend() {
    var element = document.getElementById('preview');
    element.innerHTML = this.dataService.createLengendHTMLFromColorsSelected(this.colors_selected);
  }
  consigliatiButton() {
    this.setColorsCorsieFromAutorizzazioni();
    this.update_colors_selected();
  }
  setColorsCorsieFromAutorizzazioni() {
    var corsie = this.dataService.getCorsieFromAutorizzazioni(this.dataService.getListAuthorizzation());
    for (var i = 0; i < this.colors_selected.length; i++) {
      if (corsie[i] == 'block')
        this.colors_selected[i].isChecked = false;
      else
        this.colors_selected[i].isChecked = true;
    }
  }
  setViewColors(colorSelected) {
    this.colors.forEach(element => {
      element.isChoose = false;
    });
    this.colors_selected.forEach(el => {
      if (el.isChecked) {
        var index = this.colors.indexOf(el.color);
        if (index != -1 && el.color != colorSelected)
          this.colors[index].isChoose = true;
      }
    });
  }
}
