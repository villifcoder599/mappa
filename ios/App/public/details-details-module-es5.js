(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["details-details-module"], {
    /***/
    "A03k":
    /*!***************************************************!*\
      !*** ./src/app/details/details-routing.module.ts ***!
      \***************************************************/

    /*! exports provided: DetailsPageRoutingModule */

    /***/
    function A03k(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailsPageRoutingModule", function () {
        return DetailsPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _details_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./details.page */
      "vgIa");

      var routes = [{
        path: '',
        component: _details_page__WEBPACK_IMPORTED_MODULE_3__["DetailsPage"]
      }];

      var DetailsPageRoutingModule = function DetailsPageRoutingModule() {
        _classCallCheck(this, DetailsPageRoutingModule);
      };

      DetailsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], DetailsPageRoutingModule);
      /***/
    },

    /***/
    "QR/W":
    /*!*******************************************!*\
      !*** ./src/app/details/details.module.ts ***!
      \*******************************************/

    /*! exports provided: DetailsPageModule */

    /***/
    function QRW(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailsPageModule", function () {
        return DetailsPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _details_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./details-routing.module */
      "A03k");
      /* harmony import */


      var _details_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./details.page */
      "vgIa");

      var DetailsPageModule = function DetailsPageModule() {
        _classCallCheck(this, DetailsPageModule);
      };

      DetailsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _details_routing_module__WEBPACK_IMPORTED_MODULE_5__["DetailsPageRoutingModule"]],
        declarations: [_details_page__WEBPACK_IMPORTED_MODULE_6__["DetailsPage"]]
      })], DetailsPageModule);
      /***/
    },

    /***/
    "tDqb":
    /*!*******************************************!*\
      !*** ./src/app/details/details.page.scss ***!
      \*******************************************/

    /*! exports provided: default */

    /***/
    function tDqb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldGFpbHMvZGV0YWlscy5wYWdlLnNjc3MifQ== */";
      /***/
    },

    /***/
    "vgIa":
    /*!*****************************************!*\
      !*** ./src/app/details/details.page.ts ***!
      \*****************************************/

    /*! exports provided: DetailsPage */

    /***/
    function vgIa(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DetailsPage", function () {
        return DetailsPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_details_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./details.page.html */
      "z71o");
      /* harmony import */


      var _details_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./details.page.scss */
      "tDqb");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var DetailsPage = /*#__PURE__*/function () {
        function DetailsPage() {
          _classCallCheck(this, DetailsPage);

          this.init = false;
          this.autoriz_user = [{
            id: 'bus_urb',
            val: 'Bus Urbano',
            isChecked: false
          }, {
            id: 'bus_extra',
            val: 'Bus Extraurbano',
            isChecked: false
          }, {
            id: 'hand',
            val: 'Handicap',
            isChecked: false
          }, {
            id: 'taxi',
            val: 'Taxi',
            isChecked: false
          }, {
            id: 'ncc',
            val: 'Ncc',
            isChecked: false
          }, {
            id: 'pol_socc',
            val: 'Servizi di polizia e soccorso',
            isChecked: false
          }, {
            id: 'ff_armate',
            val: 'Forze armate',
            isChecked: false
          }, {
            id: 'mezzi_op',
            val: 'Mezzi operativi',
            isChecked: false
          }, {
            id: 'autorizz',
            val: 'Autorizzazioni',
            isChecked: false
          }, {
            id: 'deroga',
            val: 'Deroga',
            isChecked: false
          }, {
            id: 'soccorso',
            val: 'Soccorso',
            isChecked: false
          }];
        }

        _createClass(DetailsPage, [{
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            this.load_data();
          }
        }, {
          key: "update_data",
          value: function update_data(event) {
            window.localStorage.setItem('autoriz_user', JSON.stringify(this.autoriz_user));
          }
        }, {
          key: "get_authorization_user",
          value: function get_authorization_user() {
            this.load_data();
            return this.autoriz_user;
          }
        }, {
          key: "load_data",
          value: function load_data() {
            var app = JSON.parse(window.localStorage.getItem('autoriz_user'));

            if (app != undefined) {
              for (var i = 0; i < app.length; i++) {
                if (app[i].isChecked) this.autoriz_user[i].isChecked = true;
              }
            }
          }
        }]);

        return DetailsPage;
      }();

      DetailsPage.ctorParameters = function () {
        return [];
      };

      DetailsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-details',
        template: _raw_loader_details_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_details_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], DetailsPage);
      /***/
    },

    /***/
    "z71o":
    /*!*********************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/details/details.page.html ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function z71o(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button defaultHref=\"/\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Autorizzazioni</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor=\"let entry of autoriz_user\" (click)=\"update_data(entry)\">\n      <ion-label>{{entry.val}}</ion-label>\n      <ion-checkbox slot=\"end\" [(ngModel)]=\"entry.isChecked\"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=details-details-module-es5.js.map