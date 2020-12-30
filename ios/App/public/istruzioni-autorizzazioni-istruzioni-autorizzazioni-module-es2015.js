(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["istruzioni-autorizzazioni-istruzioni-autorizzazioni-module"],{

/***/ "LNJZ":
/*!***************************************************************************************!*\
  !*** ./src/app/istruzioni-autorizzazioni/istruzioni-autorizzazioni-routing.module.ts ***!
  \***************************************************************************************/
/*! exports provided: IstruzioniAutorizzazioniPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IstruzioniAutorizzazioniPageRoutingModule", function() { return IstruzioniAutorizzazioniPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _istruzioni_autorizzazioni_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./istruzioni-autorizzazioni.page */ "MxNc");




const routes = [
    {
        path: '',
        component: _istruzioni_autorizzazioni_page__WEBPACK_IMPORTED_MODULE_3__["IstruzioniAutorizzazioniPage"]
    }
];
let IstruzioniAutorizzazioniPageRoutingModule = class IstruzioniAutorizzazioniPageRoutingModule {
};
IstruzioniAutorizzazioniPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], IstruzioniAutorizzazioniPageRoutingModule);



/***/ }),

/***/ "MxNc":
/*!*****************************************************************************!*\
  !*** ./src/app/istruzioni-autorizzazioni/istruzioni-autorizzazioni.page.ts ***!
  \*****************************************************************************/
/*! exports provided: IstruzioniAutorizzazioniPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IstruzioniAutorizzazioniPage", function() { return IstruzioniAutorizzazioniPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_istruzioni_autorizzazioni_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./istruzioni-autorizzazioni.page.html */ "inhd");
/* harmony import */ var _istruzioni_autorizzazioni_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./istruzioni-autorizzazioni.page.scss */ "VrjZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let IstruzioniAutorizzazioniPage = class IstruzioniAutorizzazioniPage {
    constructor() { }
    ngOnInit() {
    }
};
IstruzioniAutorizzazioniPage.ctorParameters = () => [];
IstruzioniAutorizzazioniPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-istruzioni-autorizzazioni',
        template: _raw_loader_istruzioni_autorizzazioni_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_istruzioni_autorizzazioni_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], IstruzioniAutorizzazioniPage);



/***/ }),

/***/ "VrjZ":
/*!*******************************************************************************!*\
  !*** ./src/app/istruzioni-autorizzazioni/istruzioni-autorizzazioni.page.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".box {\n  padding: 0.8rem;\n  border-radius: 25px;\n  margin: 0.8rem 0;\n  background-color: #fff;\n  margin: 30px 10px;\n}\n\n.box h2 {\n  font-size: 2.8rem;\n}\n\n.box h3 {\n  margin: 0px;\n}\n\n.box ul {\n  -webkit-padding-start: 30px;\n          padding-inline-start: 30px;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaXN0cnV6aW9uaS1hdXRvcml6emF6aW9uaS9pc3RydXppb25pLWF1dG9yaXp6YXppb25pLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGVBQUE7RUFFQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUVBO0VBQ0ksaUJBQUE7QUFDSjs7QUFDQTtFQUNJLFdBQUE7QUFFSjs7QUFBQTtFQUNJLDJCQUFBO1VBQUEsMEJBQUE7RUFDQSxlQUFBO0FBR0oiLCJmaWxlIjoic3JjL2FwcC9pc3RydXppb25pLWF1dG9yaXp6YXppb25pL2lzdHJ1emlvbmktYXV0b3JpenphemlvbmkucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJveHtcbiAgICBwYWRkaW5nOiAwLjhyZW07XG4gICAgLy9ib3JkZXI6IHNvbGlkICMzRDg5RkYgMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIG1hcmdpbjogMC44cmVtIDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICBtYXJnaW46IDMwcHggMTBweDtcbn1cbi5ib3ggaDJ7XG4gICAgZm9udC1zaXplOiAyLjhyZW07XG59XG4uYm94IGgze1xuICAgIG1hcmdpbjowcHg7XG59XG4uYm94IHVse1xuICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAzMHB4O1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbn0iXX0= */");

/***/ }),

/***/ "inhd":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/istruzioni-autorizzazioni/istruzioni-autorizzazioni.page.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Info autorizzazioni</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <div class=\"box\">\n    <h2>Corsia A</h2>\n    <h3>PERIODO E ORARIO DI VIGENZA</h3>\n     <h4>Tutti i giorni feriali e festivi, dalle ore 00,00 alle ore 24,00</h4>\n     <h4>Corsie riservate ai mezzi pubblici di trasporto non comprese nella zona a traffico limitato:</h4>\n     <ul>\n      <li>Autobus di linea urbani;</li>\n      <li>Autobus di linea extraurbani;</li>\n      <li>Taxi e veicoli a noleggio con conducente (NCC) limitatamente alle categorie M1 ed N1;</li>\n      <li>Veicoli adibiti a servizi di polizia e soccorso (art. 177, comma 1 C.d.S.);</li>\n      <li>Veicoli Forze Armate;</li>\n      <li>Veicoli operativi dei servizi postali e di igiene ambientale (raccolta rifiuti e pulizia strade).</li>\n    </ul>\n  </div>\n  <div class=\"box\">\n    <h2>Corsia B</h2>\n    <h3>  PERIODO E ORARIO DI VIGENZA</h3>\n     <h4> Tutti i giorni feriali e festivi, dalle ore 00,00 alle ore 24,00 </h4>\n     <h4>Corsie riservate ai mezzi pubblici di trasporto comprese\n      nella zona a traffico limitato:</h4>\n    <ul>\n      <li>Autobus di linea urbani;</li>\n      <li>Autobus di linea extraurbani;</li>\n      <li>Taxi e veicoli a noleggio con conducente (NCC) limitatamente alle categorie M1 ed N1;</li>\n      <li>Veicoli adibiti a servizi di polizia e soccorso (art. 177, comma 1 C.d.S.);</li>\n      <li>Veicoli Forze Armate;</li>\n      <li>Veicoli operativi dei servizi postali e di igiene ambientale (raccolta rifiuti e pulizia strade).</li>\n    </ul>\n  </div>\n  <div class=\"box\">\n    <h2>Corsia C1</h2>\n    \n    <h3>  PERIODO E ORARIO DI VIGENZA</h3>\n    <h4>Tutti i giorni feriali e festivi, dalle ore 00,00 alle ore 24,00</h4>\n    <h4>Corsie riservate ai mezzi di trasporto pubblico locale:</h4>\n    <ul>\n      <li>Autobus di linea urbani;</li>\n    </ul>\n  </div>\n  <div class=\"box\">\n  <h2>Corsia C6</h2>\n  \n  <h3>  PERIODO E ORARIO DI VIGENZA</h3>\n  <h4>Tutti i giorni feriali e festivi, dalle ore 00,00 alle ore 24,00</h4>\n  <h4>Corsie riservate a:</h4>\n  <ul>\n    <li>Veicoli di soccorso</li>\n  </ul>\n\n  </div>\n  <div class=\"box\">\n    <h2>Corsia C7</h2>\n    \n    <h3>  PERIODO E ORARIO DI VIGENZA</h3>\n    <h4>Tutti i giorni feriali e festivi, dalle ore 00,00 alle ore 24,00</h4>\n    <h4>Corsie riservate a:</h4>\n    <ul>\n      <li>Veicoli adibiti a servizi di polizia e soccorso (art. 177, comma 1 C.d.S.);</li>\n      <li>Veicoli operativi dei servizi postali e di igiene ambientale (raccolta rifiuti e pulizia strade).</li>\n      <li>veicoli diretti agli accessi carrabili posti lungo la corsia o da essi provenienti</li>\n    </ul>\n  </div>\n</ion-content>");

/***/ }),

/***/ "n5mC":
/*!*******************************************************************************!*\
  !*** ./src/app/istruzioni-autorizzazioni/istruzioni-autorizzazioni.module.ts ***!
  \*******************************************************************************/
/*! exports provided: IstruzioniAutorizzazioniPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IstruzioniAutorizzazioniPageModule", function() { return IstruzioniAutorizzazioniPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _istruzioni_autorizzazioni_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./istruzioni-autorizzazioni-routing.module */ "LNJZ");
/* harmony import */ var _istruzioni_autorizzazioni_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./istruzioni-autorizzazioni.page */ "MxNc");







let IstruzioniAutorizzazioniPageModule = class IstruzioniAutorizzazioniPageModule {
};
IstruzioniAutorizzazioniPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _istruzioni_autorizzazioni_routing_module__WEBPACK_IMPORTED_MODULE_5__["IstruzioniAutorizzazioniPageRoutingModule"]
        ],
        declarations: [_istruzioni_autorizzazioni_page__WEBPACK_IMPORTED_MODULE_6__["IstruzioniAutorizzazioniPage"]]
    })
], IstruzioniAutorizzazioniPageModule);



/***/ })

}]);
//# sourceMappingURL=istruzioni-autorizzazioni-istruzioni-autorizzazioni-module-es2015.js.map