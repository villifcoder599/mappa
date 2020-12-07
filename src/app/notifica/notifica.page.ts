import { Component, Injectable, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.page.html',
  styleUrls: ['./notifica.page.scss'],
})
export class NotificaPage {
  @ViewChild('listone') lista: IonList;

  listaNotifica = [];
  constructor() {
    console.log("costruttore");
    var old = JSON.parse(localStorage.getItem('listaNotifica'));
    if(old!=undefined){
      console.log("!=undefined");
      old.forEach(element => {
        this.listaNotifica.push(element);       
      });
    }
  }

  ionViewDidEnter() {
    console.log(this.listaNotifica);
    this.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
    console.log(this.listaNotifica);
  }
  addNotifica(val) {
    this.listaNotifica.push(val);
    console.log(this.listaNotifica);
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
  }
  remove_all(){
    this.listaNotifica=[];
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
    console.log("rimosse"+this.listaNotifica);
  }
  deleteItem(i){
    this.lista.closeSlidingItems();
    console.log(i);
    this.listaNotifica.splice(i,1);
    window.localStorage.setItem("listaNotifica", JSON.stringify(this.listaNotifica));
    console.log("rimosse"+this.listaNotifica);

  }
}