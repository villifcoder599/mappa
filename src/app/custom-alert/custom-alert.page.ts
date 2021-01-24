import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AlertController, IonRadioGroup, Platform } from '@ionic/angular'
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.page.html',
  styleUrls: ['./custom-alert.page.scss'],
})
export class CustomAlertPage {
  @ViewChild('radio_gruppo') radio_group: IonRadioGroup;
  list_alert = [{
    id: 0,
    name: 'Default',
    css_class: '',
    div_class: 'msg_custom',
    ion_icon_class: '',
    ion_icon_name: '',
  }, {
    id: 1,
    name: 'Divieto accesso',
    css_class: 'container',
    div_class: "text " + 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert',
  }, {
    id: 2,
    name: 'Quadrato',
    css_class: 'rounded-2-class',
    div_class: 'msg_custom',
    ion_icon_class: 'alert',
    ion_icon_name: 'alert',
  }];
  count; //non mostro subito la preview dell'alert e lo iniz. a -1
  checkbox_closestreet = this.dataService.getCheckboxclose_street();

  constructor(private dataService: DataService, private alertController: AlertController, private nativeAudio: NativeAudio, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log(this.checkbox_closestreet)
      this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
      this.load_data();
    })

    //this.radio_group.value = this.selected_radio;
  }
  ionViewWillEnter() {
    // this.count = -1;
    // this.load_data();
    // this.radio_group.value = this.selected_radio;
    //this.radio_group.value = this.dataService.getSelectedFormAlert();
    this.radioGroupChange(this.dataService.getSelectedFormAlert())
  }
  click_item(e){
    console.log('click');
    console.log(e)
  }
  ngOnInit() {

  }
  radioGroupChange(event) {
    //console.log(event)
    this.dataService.setSelectedFormAlert(event);
    window.localStorage.setItem('selected_radio', JSON.stringify(this.dataService.getSelectedFormAlert()));
    this.radio_group.value = event.id;
    //console.log(this.radio_group.value)
    this.show_alert();
  }
  show_alert() {
    // this.selected_radio = this.dataService.getSelectedFormAlert;
    console.log(this.dataService.getSelectedFormAlert())
    var div = '<div class="' + this.dataService.getSelectedFormAlert().div_class + '">';
    var icon = '<ion-icon name="' + this.dataService.getSelectedFormAlert().ion_icon_name + '" class="' + this.dataService.getSelectedFormAlert().ion_icon_class + '"></ion-icon>';
    var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
    var msg = this.dataService.getSelectedFormAlert().ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
    var time = 1000;
    this.alertController.create({
      cssClass: this.dataService.getSelectedFormAlert().css_class,
      message: msg + (time + 1000) / 1000 + '</div></div>',
    }).then((alert) => {
      this.nativeAudio.play('notification_sound');
      alert.present();
      var intervall = setInterval(() => {
        alert.message = msg + time / 1000 + '</div></div>';
        if (time == 0) {
          alert.remove();
          clearInterval(intervall);
        }
        time = time - 1000;
      }, time);
    });
  }
  load_data() {
    var app = JSON.parse(window.localStorage.getItem('selected_radio'));
    if (app != null)
      this.dataService.setSelectedFormAlert(app);
    else
      this.dataService.setSelectedFormAlert(this.list_alert[0]);
    //this.selected_radio = this.dataService.getSelectedFormAlert();
    console.log(this.dataService.getSelectedFormAlert());
    //this.selected_radio = app;
  }
  // setSelectedRadio(data){
  //   this.selected_radio=data;
  //   this.dataService.setSelectedFormAlert(data);
  // }
  // getSelectedRadio(){
  //   return this.dataService.getSelectedFormAlert()
  // }
  save_data_checkbox() {
    window.localStorage.setItem('checkboxclose_street', JSON.stringify(this.checkbox_closestreet));
  }
  instruction_closeStreet() {
    if (!this.checkbox_closestreet.isChecked)
      this.alertController.create({
        cssClass: '',
        message: '<div class=' + this.list_alert[0].div_class + '>In prossimita di una corsia riservata verrai avvisato tramite un segnale acustico. Questa opzione puo rallentare l\' applicazione</div>'
      }).then((alert) => alert.present());
  }
}
