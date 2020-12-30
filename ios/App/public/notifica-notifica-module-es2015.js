(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["notifica-notifica-module"],{

/***/ "6SoF":
/*!*****************************************************!*\
  !*** ./src/app/notifica/notifica-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: NotificaPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificaPageRoutingModule", function() { return NotificaPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _notifica_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifica.page */ "VwHv");




const routes = [
    {
        path: '',
        component: _notifica_page__WEBPACK_IMPORTED_MODULE_3__["NotificaPage"]
    }
];
let NotificaPageRoutingModule = class NotificaPageRoutingModule {
};
NotificaPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], NotificaPageRoutingModule);



/***/ }),

/***/ "VwHv":
/*!*******************************************!*\
  !*** ./src/app/notifica/notifica.page.ts ***!
  \*******************************************/
/*! exports provided: NotificaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificaPage", function() { return NotificaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_notifica_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./notifica.page.html */ "fUhu");
/* harmony import */ var _notifica_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifica.page.scss */ "nxnO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tabs/tabs.page */ "MJr+");






let NotificaPage = class NotificaPage {
    constructor(tabsPage, platform) {
        this.tabsPage = tabsPage;
        this.platform = platform;
        this.listaNotifica = [];
        this.platform.ready().then(() => {
            this.listaNotifica = JSON.parse(localStorage.getItem('listaNotifica'));
        });
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
        if (JSON.parse(window.localStorage.getItem('listaNotifica')) != undefined)
            this.listaNotifica = JSON.parse(window.localStorage.getItem('listaNotifica'));
        else
            this.listaNotifica = [];
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
};
NotificaPage.ctorParameters = () => [
    { type: _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_5__["TabsPage"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"] }
];
NotificaPage.propDecorators = {
    lista: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['listone',] }]
};
NotificaPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-notifica',
        template: _raw_loader_notifica_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_notifica_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NotificaPage);



/***/ }),

/***/ "fUhu":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/notifica/notifica.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n    <ion-toolbar>\n        <ion-title style=\"font-size: x-large;\">Notifiche</ion-title>\n        <ion-buttons slot=\"end\">\n            <ion-button (click)=\"remove_all()\" fill=\"clear\" style=\"font-size: small;\">Cancella tutto</ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-list #listone>\n        <ion-item-sliding *ngFor=\"let entry of listaNotifica; let i = index\">\n            <ion-item>\n                <div id=\"notifica\">\n                    <div class=\"text_label\">{{entry.text}}</div>\n                    <div class=\"date_label\">{{entry.date}}</div>\n                </div>\n            </ion-item>\n\n            <ion-item-options side=\"end\" (ionSwipe)=\"deleteItem(i)\">\n                <ion-item-option color=\"danger\" (click)=\"deleteItem(i)\" expandable>\n                    <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n                </ion-item-option>\n            </ion-item-options>\n\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>");

/***/ }),

/***/ "nxnO":
/*!*********************************************!*\
  !*** ./src/app/notifica/notifica.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-content, ion-header {\n  --ion-background-color:#eeeeee;\n}\n\nion-item {\n  --ion-background-color:#fff;\n  border-radius: 20px;\n  margin: 3px 9px;\n}\n\nion-item-option {\n  margin: 4px 0;\n  border-top-right-radius: 20px;\n  border-bottom-right-radius: 20px;\n  margin-right: 9px;\n  padding-left: 70%;\n}\n\n#notifica {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  padding: 10px 0;\n}\n\n#notifica .text_label {\n  align-self: flex-start;\n  font: 500 18px Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n#notifica .date_label {\n  align-self: flex-end;\n  font: 150 10px Roboto, \"Helvetica Neue\", sans-serif;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbm90aWZpY2Evbm90aWZpY2EucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksOEJBQUE7QUFDSjs7QUFDQTtFQUNJLDJCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBRUo7O0FBQUE7RUFDSSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7QUFHSjs7QUFBQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0FBR0o7O0FBREE7RUFDSSxzQkFBQTtFQUNBLG1EQUFBO0FBSUo7O0FBRkE7RUFDSSxvQkFBQTtFQUNBLG1EQUFBO0FBS0oiLCJmaWxlIjoic3JjL2FwcC9ub3RpZmljYS9ub3RpZmljYS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCxpb24taGVhZGVye1xuICAgIC0taW9uLWJhY2tncm91bmQtY29sb3I6I2VlZWVlZTtcbn1cbmlvbi1pdGVte1xuICAgIC0taW9uLWJhY2tncm91bmQtY29sb3I6I2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgIG1hcmdpbjozcHggOXB4O1xufVxuaW9uLWl0ZW0tb3B0aW9ue1xuICAgIG1hcmdpbjo0cHggMDtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMjBweDtcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDlweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDcwJTtcbn1cbi8vbm90aWZpY2FcbiNub3RpZmljYXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTBweCAwO1xufVxuI25vdGlmaWNhIC50ZXh0X2xhYmVse1xuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gICAgZm9udDogNTAwIDE4cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG4jbm90aWZpY2EgLmRhdGVfbGFiZWx7XG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgZm9udDogMTUwIDEwcHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59Il19 */");

/***/ }),

/***/ "qDrr":
/*!*********************************************!*\
  !*** ./src/app/notifica/notifica.module.ts ***!
  \*********************************************/
/*! exports provided: NotificaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificaPageModule", function() { return NotificaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _notifica_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifica-routing.module */ "6SoF");
/* harmony import */ var _notifica_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notifica.page */ "VwHv");







let NotificaPageModule = class NotificaPageModule {
};
NotificaPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _notifica_routing_module__WEBPACK_IMPORTED_MODULE_5__["NotificaPageRoutingModule"],
        ],
        declarations: [_notifica_page__WEBPACK_IMPORTED_MODULE_6__["NotificaPage"]]
    })
], NotificaPageModule);



/***/ })

}]);
//# sourceMappingURL=notifica-notifica-module-es2015.js.map