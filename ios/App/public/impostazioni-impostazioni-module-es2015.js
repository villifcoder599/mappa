(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["impostazioni-impostazioni-module"],{

/***/ "9NFc":
/*!***************************************************!*\
  !*** ./src/app/impostazioni/impostazioni.page.ts ***!
  \***************************************************/
/*! exports provided: ImpostazioniPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImpostazioniPage", function() { return ImpostazioniPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_impostazioni_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./impostazioni.page.html */ "WvT0");
/* harmony import */ var _impostazioni_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impostazioni.page.scss */ "XP1B");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





let ImpostazioniPage = class ImpostazioniPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    open_details_page() {
        this.router.navigate(['details']);
    }
    open_select_line_color_page() {
        this.router.navigate(['selection-line-color']);
    }
    open_custom_alert_page() {
        this.router.navigate(['custom-alert']);
    }
    open_tutorial_page() {
        this.router.navigate(['tutorial']);
    }
    open_istruzioni() {
        this.router.navigate(['istruzioni-autorizzazioni']);
    }
};
ImpostazioniPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
ImpostazioniPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-impostazioni',
        template: _raw_loader_impostazioni_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_impostazioni_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ImpostazioniPage);



/***/ }),

/***/ "AxIC":
/*!*****************************************************!*\
  !*** ./src/app/impostazioni/impostazioni.module.ts ***!
  \*****************************************************/
/*! exports provided: ImpostazioniPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImpostazioniPageModule", function() { return ImpostazioniPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _impostazioni_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./impostazioni-routing.module */ "ZaOf");
/* harmony import */ var _impostazioni_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./impostazioni.page */ "9NFc");







let ImpostazioniPageModule = class ImpostazioniPageModule {
};
ImpostazioniPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _impostazioni_routing_module__WEBPACK_IMPORTED_MODULE_5__["ImpostazioniPageRoutingModule"]
        ],
        declarations: [_impostazioni_page__WEBPACK_IMPORTED_MODULE_6__["ImpostazioniPage"]]
    })
], ImpostazioniPageModule);



/***/ }),

/***/ "WvT0":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/impostazioni/impostazioni.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header id=\"myHeader\">\n  <ion-toolbar>\n    <ion-title class=\"title\">\n      Impostazioni\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-item-group>\n    <ion-item-divider sticky=true> \n      <ion-label>Personalizzazione</ion-label>\n    </ion-item-divider>\n    <ion-item button (click)=\"open_details_page()\">\n      <ion-label>Seleziona autorizzazioni</ion-label>\n    </ion-item>\n    <ion-item button (click)=\"open_select_line_color_page()\">\n      <ion-label>Seleziona colore linee</ion-label>\n    </ion-item>\n    <ion-item button (click)=\"open_custom_alert_page()\">\n      <ion-label>Personalizza alert</ion-label>\n    </ion-item>\n  </ion-item-group>\n  <ion-item-group>\n    <ion-item-divider sticky=true>\n      <ion-label>Informazioni</ion-label>\n    </ion-item-divider>\n    <ion-item button (click)=\"open_tutorial_page()\">\n      <ion-label>Tutorial</ion-label>\n    </ion-item>\n    <ion-item button (click)=\"open_istruzioni()\">\n      <ion-label>Info autorizzazioni</ion-label>\n    </ion-item>\n  </ion-item-group>\n</ion-content>");

/***/ }),

/***/ "XP1B":
/*!*****************************************************!*\
  !*** ./src/app/impostazioni/impostazioni.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ltcG9zdGF6aW9uaS9pbXBvc3RhemlvbmkucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "ZaOf":
/*!*************************************************************!*\
  !*** ./src/app/impostazioni/impostazioni-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: ImpostazioniPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImpostazioniPageRoutingModule", function() { return ImpostazioniPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _impostazioni_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./impostazioni.page */ "9NFc");




const routes = [
    {
        path: '',
        component: _impostazioni_page__WEBPACK_IMPORTED_MODULE_3__["ImpostazioniPage"]
    }
];
let ImpostazioniPageRoutingModule = class ImpostazioniPageRoutingModule {
};
ImpostazioniPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ImpostazioniPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=impostazioni-impostazioni-module-es2015.js.map