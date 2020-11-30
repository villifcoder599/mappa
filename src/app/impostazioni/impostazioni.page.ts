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
  openPage(){
    this.router.navigate(['details']);
  }
}
