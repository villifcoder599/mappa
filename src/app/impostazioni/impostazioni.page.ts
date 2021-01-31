import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router'
import {CustomAlertPage} from '../custom-alert/custom-alert.page'
@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.page.html',
  styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  constructor(private router:Router,private customAlert:CustomAlertPage) { }

  ngOnInit() {

  }
  open_details_page(){
    this.router.navigate(['details']);
  }
  open_select_line_color_page(){
    this.customAlert.createTextAlertCheckbox('Attenzione: Se deselezioni le corsie visualizzate su mappa non riceverai gli avvisi relativi a quella corsia')
    this.router.navigate(['selection-line-color']);
  }
  open_custom_alert_page(){
    this.router.navigate(['custom-alert']);
  }
  open_tutorial_page(){
    this.router.navigate(['tutorial']);
  }
  open_istruzioni(){
    this.router.navigate(['istruzioni-autorizzazioni']);
  }
}
