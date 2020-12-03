import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-line-color',
  templateUrl: './selection-line-color.page.html',
  styleUrls: ['./selection-line-color.page.scss'],
})
export class SelectionLineColorPage implements OnInit {
  colors=[
    {id:0, val: 'verde', coding: "#00ff00" },
    {id:1, val: 'giallo', coding: "#ffff00" },
    {id:2, val: 'rosso', coding: "#ff0000" },
    {id:3, val: 'blu', coding: "#0000ff" },
    {id:4, val: 'viola', coding: "#800080" },
    {id:5, val: 'marrone', coding: "#a52a2a" },
    {id:6, val: 'nero', coding: "#000000" },
    {id:7, val: 'magenta', coding: "#ff00ff" },
    {id:8, val: 'rosa', coding: "#ff69b4" },
    {id:9, val: 'azzurro', coding: "#00ffff" },
    {id:10, val: 'nullo',  coding: "undefinded" }
  ];
  color_A={id:0, val: 'verde', coding: "#00ff00" };
  color_B={id:1, val: 'giallo', coding: "#ffff00" };
  color_C={id:2, val: 'rosso', coding: "#ff0000" };
  constructor() { }

  ngOnInit() {
    if(window.localStorage.getItem("color_A")!=null)
      this.color_A=JSON.parse(window.localStorage.getItem('color_A'));
    if(window.localStorage.getItem("color_B")!=null)
      this.color_B=JSON.parse(window.localStorage.getItem('color_B'));
    if(window.localStorage.getItem("color_C")!=null)
      this.color_C=JSON.parse(window.localStorage.getItem('color_C'));
    
  }
  update_color_A(){
    console.log(this.color_A);
    window.localStorage.setItem('color_A',JSON.stringify(this.color_A));
  }
  update_color_B(){
    console.log(this.color_B);
    window.localStorage.setItem('color_B',JSON.stringify(this.color_B));
  }
  update_color_C(){
    console.log(this.color_C);
    window.localStorage.setItem('color_C',JSON.stringify(this.color_C));
  }
}
