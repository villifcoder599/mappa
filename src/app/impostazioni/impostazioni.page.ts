import { Component, OnInit } from '@angular/core';
import {Routes,RouterModule, Router} from '@angular/router'
@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.page.html',
  styleUrls: ['./impostazioni.page.scss'],
})
export class ImpostazioniPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }
  open_details_page(){
    this.router.navigate(['details']);
  }
  open_select_line_color_page(){
    this.router.navigate(['selection-line-color']);
  }
  open_custom_alert_page(){
    this.router.navigate(['custom-alert']);
  }
}
