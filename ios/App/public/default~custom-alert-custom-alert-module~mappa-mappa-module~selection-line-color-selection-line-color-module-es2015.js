(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~custom-alert-custom-alert-module~mappa-mappa-module~selection-line-color-selection-line-color-module"],{

/***/ "FWyR":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/custom-alert/custom-alert.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Scelta alert</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-radio-group (ionChange)=\"radioGroupChange($event)\" #radio_gruppo>\n      <ion-item *ngFor=\"let entry of list_alert\">\n        <ion-label>{{entry.name}}</ion-label>\n        <ion-radio slot=\"end\" [value]=\"entry\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n</ion-content>");

/***/ }),

/***/ "fLLL":
/*!***************************************************************************!*\
  !*** ./node_modules/@ionic-native/native-audio/__ivy_ngcc__/ngx/index.js ***!
  \***************************************************************************/
/*! exports provided: NativeAudio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeAudio", function() { return NativeAudio; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "C6fG");




var NativeAudio = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NativeAudio, _super);
    function NativeAudio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeAudio.prototype.preloadSimple = function (id, assetPath) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "preloadSimple", {}, arguments); };
    NativeAudio.prototype.preloadComplex = function (id, assetPath, volume, voices, delay) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "preloadComplex", {}, arguments); };
    NativeAudio.prototype.play = function (id, completeCallback) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "play", { "successIndex": 1, "errorIndex": 2 }, arguments); };
    NativeAudio.prototype.stop = function (id) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "stop", {}, arguments); };
    NativeAudio.prototype.loop = function (id) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "loop", {}, arguments); };
    NativeAudio.prototype.unload = function (id) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "unload", {}, arguments); };
    NativeAudio.prototype.setVolumeForComplexAsset = function (id, volume) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordova"])(this, "setVolumeForComplexAsset", {}, arguments); };
    NativeAudio.pluginName = "NativeAudio";
    NativeAudio.plugin = "cordova-plugin-nativeaudio";
    NativeAudio.pluginRef = "plugins.NativeAudio";
    NativeAudio.repo = "https://github.com/floatinghotpot/cordova-plugin-nativeaudio";
    NativeAudio.platforms = ["Android", "Browser", "iOS"];
NativeAudio.ɵfac = function NativeAudio_Factory(t) { return ɵNativeAudio_BaseFactory(t || NativeAudio); };
NativeAudio.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NativeAudio, factory: function (t) { return NativeAudio.ɵfac(t); } });
var ɵNativeAudio_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](NativeAudio);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NativeAudio, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, null); })();
    return NativeAudio;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AaW9uaWMtbmF0aXZlL3BsdWdpbnMvbmF0aXZlLWF1ZGlvL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztBQUN4RTtBQUUyQixJQW1DTSwrQkFBaUI7QUFBQztBQUU5QjtBQUF5RTtBQUFNLElBTWxHLG1DQUFhLGFBQUMsRUFBVSxFQUFFLFNBQWlCO0FBS3pCLElBU2xCLG9DQUFjLGFBQUMsRUFBVSxFQUFFLFNBQWlCLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxLQUFhO0FBS3hFLElBU25CLDBCQUFJLGFBQUMsRUFBVSxFQUFFLGdCQUEyQjtBQU0zQixJQUlqQiwwQkFBSSxhQUFDLEVBQVU7QUFLTixJQUtULDBCQUFJLGFBQUMsRUFBVTtBQUtOLElBS1QsNEJBQU0sYUFBQyxFQUFVO0FBS04sSUFNWCw4Q0FBd0IsYUFBQyxFQUFVLEVBQUUsTUFBYztBQUlqQjtBQUE0QztBQUF1RDtBQUFtRDtBQUF1RjtJQWpGcFEsV0FBVyx3QkFEdkIsVUFBVSxFQUFFLFFBQ0EsV0FBVzs7Ozs7MEJBQUU7QUFBQyxzQkF2QzNCO0FBQUUsRUF1QytCLGlCQUFpQjtBQUNqRCxTQURZLFdBQVc7QUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuLyoqXG4gKiBAbmFtZSBOYXRpdmUgQXVkaW9cbiAqIEBkZXNjcmlwdGlvbiBOYXRpdmUgQXVkaW8gUGxheWJhY2tcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgTmF0aXZlQXVkaW8gfSBmcm9tICdAaW9uaWMtbmF0aXZlL25hdGl2ZS1hdWRpby9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgbmF0aXZlQXVkaW86IE5hdGl2ZUF1ZGlvKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLm5hdGl2ZUF1ZGlvLnByZWxvYWRTaW1wbGUoJ3VuaXF1ZUlkMScsICdwYXRoL3RvL2ZpbGUubXAzJykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICogdGhpcy5uYXRpdmVBdWRpby5wcmVsb2FkQ29tcGxleCgndW5pcXVlSWQyJywgJ3BhdGgvdG8vZmlsZTIubXAzJywgMSwgMSwgMCkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICpcbiAqIHRoaXMubmF0aXZlQXVkaW8ucGxheSgndW5pcXVlSWQxJykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICpcbiAqIC8vIGNhbiBvcHRpb25hbGx5IHBhc3MgYSBjYWxsYmFjayB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZmlsZSBpcyBkb25lIHBsYXlpbmdcbiAqIHRoaXMubmF0aXZlQXVkaW8ucGxheSgndW5pcXVlSWQxJywgKCkgPT4gY29uc29sZS5sb2coJ3VuaXF1ZUlkMSBpcyBkb25lIHBsYXlpbmcnKSk7XG4gKlxuICogdGhpcy5uYXRpdmVBdWRpby5sb29wKCd1bmlxdWVJZDInKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gKlxuICogdGhpcy5uYXRpdmVBdWRpby5zZXRWb2x1bWVGb3JDb21wbGV4QXNzZXQoJ3VuaXF1ZUlkMicsIDAuNikudGhlbihvblN1Y2Nlc3Msb25FcnJvcik7XG4gKlxuICogdGhpcy5uYXRpdmVBdWRpby5zdG9wKCd1bmlxdWVJZDEnKS50aGVuKG9uU3VjY2VzcyxvbkVycm9yKTtcbiAqXG4gKiB0aGlzLm5hdGl2ZUF1ZGlvLnVubG9hZCgndW5pcXVlSWQxJykudGhlbihvblN1Y2Nlc3Msb25FcnJvcik7XG4gKlxuICogYGBgXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTmF0aXZlQXVkaW8nLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1uYXRpdmVhdWRpbycsXG4gIHBsdWdpblJlZjogJ3BsdWdpbnMuTmF0aXZlQXVkaW8nLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2Zsb2F0aW5naG90cG90L2NvcmRvdmEtcGx1Z2luLW5hdGl2ZWF1ZGlvJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnQnJvd3NlcicsICdpT1MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlQXVkaW8gZXh0ZW5kcyBJb25pY05hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBMb2FkcyBhbiBhdWRpbyBmaWxlIGludG8gbWVtb3J5LiBPcHRpbWl6ZWQgZm9yIHNob3J0IGNsaXBzIC8gc2luZ2xlIHNob3RzICh1cCB0byBmaXZlIHNlY29uZHMpLiBDYW5ub3QgYmUgc3RvcHBlZCAvIGxvb3BlZC5cbiAgICogQHBhcmFtIGlkIHtzdHJpbmd9IHVuaXF1ZSBJRCBmb3IgdGhlIGF1ZGlvIGZpbGVcbiAgICogQHBhcmFtIGFzc2V0UGF0aCB7c3RyaW5nfSAgdGhlIHJlbGF0aXZlIHBhdGggb3IgYWJzb2x1dGUgVVJMIChpbmx1ZGluZyBodHRwOi8vKSB0byB0aGUgYXVkaW8gYXNzZXQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHByZWxvYWRTaW1wbGUoaWQ6IHN0cmluZywgYXNzZXRQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhbiBhdWRpbyBmaWxlIGludG8gbWVtb3J5LiBPcHRpbWl6ZWQgZm9yIGJhY2tncm91bmQgbXVzaWMgLyBhbWJpZW50IHNvdW5kLiBVc2VzIGhpZ2hsZXZlbCBuYXRpdmUgQVBJcyB3aXRoIGEgbGFyZ2VyIGZvb3RwcmludC4gKGlPUzogQVZBdWRpb1BsYXllcikuIENhbiBiZSBzdG9wcGVkIC8gbG9vcGVkIGFuZCB1c2VkIHdpdGggbXVsdGlwbGUgdm9pY2VzLiBDYW4gYmUgZmFkZWQgaW4gYW5kIG91dCB1c2luZyB0aGUgZGVsYXkgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gaWQge3N0cmluZ30gdW5pcXVlIElEIGZvciB0aGUgYXVkaW8gZmlsZVxuICAgKiBAcGFyYW0gYXNzZXRQYXRoIHtzdHJpbmd9ICB0aGUgcmVsYXRpdmUgcGF0aCBvciBhYnNvbHV0ZSBVUkwgKGlubHVkaW5nIGh0dHA6Ly8pIHRvIHRoZSBhdWRpbyBhc3NldC5cbiAgICogQHBhcmFtIHZvbHVtZSB7bnVtYmVyfSB0aGUgdm9sdW1lIG9mIHRoZSBwcmVsb2FkZWQgc291bmQgKDAuMSB0byAxLjApXG4gICAqIEBwYXJhbSB2b2ljZXMge251bWJlcn0gdGhlIG51bWJlciBvZiBtdWx0aWNoYW5uZWwgdm9pY2VzIGF2YWlsYWJsZVxuICAgKiBAcGFyYW0gZGVsYXkge251bWJlcn1cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgcHJlbG9hZENvbXBsZXgoaWQ6IHN0cmluZywgYXNzZXRQYXRoOiBzdHJpbmcsIHZvbHVtZTogbnVtYmVyLCB2b2ljZXM6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIGFuIGF1ZGlvIGFzc2V0XG4gICAqIEBwYXJhbSBpZCB7c3RyaW5nfSB1bmlxdWUgSUQgZm9yIHRoZSBhdWRpbyBmaWxlXG4gICAqIEBwYXJhbSBjb21wbGV0ZUNhbGxiYWNrIHtGdW5jdGlvbn0gb3B0aW9uYWwuIENhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBhdWRpbyBpcyBkb25lIHBsYXlpbmdcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBzdWNjZXNzSW5kZXg6IDEsXG4gICAgZXJyb3JJbmRleDogMixcbiAgfSlcbiAgcGxheShpZDogc3RyaW5nLCBjb21wbGV0ZUNhbGxiYWNrPzogRnVuY3Rpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBwbGF5aW5nIGFuIGF1ZGlvXG4gICAqIEBwYXJhbSBpZCB7c3RyaW5nfSB1bmlxdWUgSUQgZm9yIHRoZSBhdWRpbyBmaWxlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHN0b3AoaWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb3BzIGFuIGF1ZGlvIGFzc2V0IGluZmluaXRlbHksIHRoaXMgb25seSB3b3JrcyBmb3IgY29tcGxleCBhc3NldHNcbiAgICogQHBhcmFtIGlkIHtzdHJpbmd9IHVuaXF1ZSBJRCBmb3IgdGhlIGF1ZGlvIGZpbGVcbiAgICogQHJldHVybiB7UHJvbWlzZTxhbnk+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBsb29wKGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbmxvYWRzIGFuIGF1ZGlvIGZpbGUgZnJvbSBtZW1vcnlcbiAgICogQHBhcmFtIGlkIHtzdHJpbmd9IHVuaXF1ZSBJRCBmb3IgdGhlIGF1ZGlvIGZpbGVcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgdW5sb2FkKGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoZSB2b2x1bWUgZm9yIHByZWxvYWRlZCBjb21wbGV4IGFzc2V0cy5cbiAgICogQHBhcmFtIGlkIHtzdHJpbmd9IHVuaXF1ZSBJRCBmb3IgdGhlIGF1ZGlvIGZpbGVcbiAgICogQHBhcmFtIHZvbHVtZSB7bnVtYmVyfSB0aGUgdm9sdW1lIG9mIHRoZSBhdWRpbyBhc3NldCAoMC4xIHRvIDEuMClcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgc2V0Vm9sdW1lRm9yQ29tcGxleEFzc2V0KGlkOiBzdHJpbmcsIHZvbHVtZTogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "n2rX":
/*!*************************************************************!*\
  !*** ./src/app/custom-alert/custom-alert-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: CustomAlertPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomAlertPageRoutingModule", function() { return CustomAlertPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _custom_alert_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-alert.page */ "p5u7");




const routes = [
    {
        path: '',
        component: _custom_alert_page__WEBPACK_IMPORTED_MODULE_3__["CustomAlertPage"]
    }
];
let CustomAlertPageRoutingModule = class CustomAlertPageRoutingModule {
};
CustomAlertPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CustomAlertPageRoutingModule);



/***/ }),

/***/ "p5u7":
/*!***************************************************!*\
  !*** ./src/app/custom-alert/custom-alert.page.ts ***!
  \***************************************************/
/*! exports provided: CustomAlertPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomAlertPage", function() { return CustomAlertPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_custom_alert_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./custom-alert.page.html */ "FWyR");
/* harmony import */ var _custom_alert_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-alert.page.scss */ "vELX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/native-audio/ngx */ "fLLL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






let CustomAlertPage = class CustomAlertPage {
    constructor(alertController, nativeAudio, platform) {
        this.alertController = alertController;
        this.nativeAudio = nativeAudio;
        this.platform = platform;
        this.list_alert = [{
                id: 0,
                name: 'Default',
                css_class: '',
                div_class: 'msg_custom',
                ion_icon_class: '',
                ion_icon_name: ''
            }, {
                id: 1,
                name: 'Divieto accesso',
                css_class: 'container',
                div_class: "text " + 'msg_custom',
                ion_icon_class: 'alert',
                ion_icon_name: 'alert'
            }, {
                id: 2,
                name: 'Quadrato',
                css_class: 'rounded-2-class',
                div_class: 'msg_custom',
                ion_icon_class: 'alert',
                ion_icon_name: 'alert'
            }];
        this.selected_radio = this.list_alert[0];
        this.platform.ready().then(() => {
            var app = JSON.parse(window.localStorage.getItem('selected_radio'));
            if (app != null)
                this.selected_radio = app;
            this.nativeAudio.preloadSimple('notification_sound', 'assets/sounds/notification_sound.mp3');
        });
        //this.radio_group.value = this.selected_radio;
    }
    ionViewDidEnter() {
        this.count = -1;
        var app = JSON.parse(window.localStorage.getItem('selected_radio'));
        if (app != null)
            this.selected_radio = app;
        this.radio_group.value = this.selected_radio;
    }
    ngOnInit() {
    }
    radioGroupChange(event) {
        this.selected_radio = this.list_alert[event.detail.value.id];
        window.localStorage.setItem('selected_radio', JSON.stringify(this.selected_radio));
        this.radio_group.value = this.selected_radio;
        if (this.count > 0)
            this.show_alert();
        else
            this.count++;
    }
    show_alert() {
        var div = '<div class="' + this.selected_radio.div_class + '">';
        var icon = '<ion-icon name="' + this.selected_radio.ion_icon_name + '" class="' + this.selected_radio.ion_icon_class + '"></ion-icon>';
        var txt = 'Non sei autorizzato a transitare su questa corsia<br><div class="sub_msg">';
        var msg = this.selected_radio.ion_icon_name == '' ? msg = div + txt : msg = div + icon + txt;
        var time = 100000;
        this.alertController.create({
            cssClass: this.selected_radio.css_class,
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
};
CustomAlertPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _ionic_native_native_audio_ngx__WEBPACK_IMPORTED_MODULE_4__["NativeAudio"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"] }
];
CustomAlertPage.propDecorators = {
    radio_group: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['radio_gruppo',] }]
};
CustomAlertPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-custom-alert',
        template: _raw_loader_custom_alert_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_custom_alert_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CustomAlertPage);



/***/ }),

/***/ "vELX":
/*!*****************************************************!*\
  !*** ./src/app/custom-alert/custom-alert.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".alert-wrapper.ion-overlay-wrapper.sc-ion-alert-md {\n  border-radius: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY3VzdG9tLWFsZXJ0L2N1c3RvbS1hbGVydC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBQTtBQUNKIiwiZmlsZSI6InNyYy9hcHAvY3VzdG9tLWFsZXJ0L2N1c3RvbS1hbGVydC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWxlcnQtd3JhcHBlci5pb24tb3ZlcmxheS13cmFwcGVyLnNjLWlvbi1hbGVydC1tZHtcbiAgICBib3JkZXItcmFkaXVzOiAxNXB4O1xufSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=default~custom-alert-custom-alert-module~mappa-mappa-module~selection-line-color-selection-line-color-module-es2015.js.map