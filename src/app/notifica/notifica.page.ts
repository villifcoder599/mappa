import { Component, ViewChild } from '@angular/core';
import { IonList, Platform } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.page.html',
  styleUrls: ['./notifica.page.scss'],
})
export class NotificaPage{
  @ViewChild('listone') lista: IonList;
  listaNotifica = [];
  constructor(private tabsPage: TabsPage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.listaNotifica = JSON.parse(localStorage.getItem('listaNotifica'));
    })
  }

  ionViewDidEnter() {
    this.tabsPage.clear_badge();
    this.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    window.localStorage.setItem('unread', JSON.stringify(0));
  }
  create_notifica(nome, tipo) {
    var data;
    var ora = new Date();
    data = (ora.getDate() + '/' + (ora.getMonth() + 1) + '/' + ora.getFullYear() + '  ' + ora.getHours() + ':' + ora.getMinutes());
    this.addNotifica("Sei transitato in " + nome + ' ,corsia di tipo ' + tipo, data);
    this.tabsPage.update_badge();
  }
  addNotifica(txt, date) {
    if(JSON.parse(window.localStorage.getItem('listaNotifica'))!=undefined)
      this.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    else
      this.listaNotifica=[];
    this.listaNotifica.push({ text: txt, date: date });
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
  }
  remove_all() {
    this.listaNotifica = [];
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
  }
  deleteItem(i) {
    this.lista.closeSlidingItems();
    this.listaNotifica.splice(i, 1);
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
  }
}