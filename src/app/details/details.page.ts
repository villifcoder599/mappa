import { Component, OnInit,Injectable } from '@angular/core';
import { MappaPageModule } from '../mappa/mappa.module';
import{ MappaPage} from '../mappa/mappa.page'
@Injectable({providedIn:'root'})
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  tags_name=[];
  html='<ion-list>'
  
  constructor(private mappa:MappaPage) {
    
   }
   ionViewDidEnter(){
    if(this.tags_name.length==0){
      console.log("in");
      for(var i=0;i<this.mappa.tags_name.length;i++)
        this.tags_name[i]={
          val:this.mappa.tags_name[i],
          isChecked:false
        };
    }
    this.tags_name.length=this.mappa.tags_name.length;
    var div=(document.getElementById('list-box'));
    div.insertAdjacentHTML('beforebegin',this.html);
    for(var i=0;i<this.tags_name.length-1;i++){//escudo porta_telematica
      div.insertAdjacentHTML('beforebegin','<ion-item><ion-label>'+this.tags_name[i].val+'</ion-label><ion-checkbox slot="end" [(ngModel)]="entry.isChecked"></ion-checkbox></ion-item>');
    }
    div.insertAdjacentHTML('beforebegin','</ion-list>');
   }
  

}
