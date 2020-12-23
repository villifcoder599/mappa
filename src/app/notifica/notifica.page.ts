import { Component, Injectable, ViewChild } from '@angular/core';
import { IonList, Platform } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.page.html',
  styleUrls: ['./notifica.page.scss'],
})
export class NotificaPage {
  @ViewChild('listone') lista: IonList;

  listaNotifica = [{ text: "", date: "" }];
  constructor(private tabsPage: TabsPage, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log("costruttore");
      var old = JSON.parse(localStorage.getItem('listaNotifica'));
      if (old != undefined) {
        console.log("!=undefined");
        old.forEach(element => {
          this.listaNotifica.push(element);
        });
      }
    })
  }

  ionViewDidEnter() {
    console.log(this.listaNotifica);
    this.tabsPage.clear_badge();
    this.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    window.localStorage.setItem('unread', JSON.stringify(0));
    console.log(this.listaNotifica);
  }
  addNotifica(txt, date) {
    this.listaNotifica.push({ text: txt, date: date });
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
  }
  remove_all() {
    this.listaNotifica = [];
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
    console.log("rimosse" + this.listaNotifica);
  }
  deleteItem(i) {
    this.lista.closeSlidingItems();
    console.log(i);
    this.listaNotifica.splice(i, 1);
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
    console.log("rimosse" + this.listaNotifica);

  }
}