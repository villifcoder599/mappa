(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tutorial-tutorial-module"], {
    /***/
    "5o7k":
    /*!*******************************************!*\
      !*** ./src/app/tutorial/tutorial.page.ts ***!
      \*******************************************/

    /*! exports provided: TutorialPage */

    /***/
    function o7k(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TutorialPage", function () {
        return TutorialPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_tutorial_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./tutorial.page.html */
      "8bPp");
      /* harmony import */


      var _tutorial_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./tutorial.page.scss */
      "m29k");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var TutorialPage = /*#__PURE__*/function () {
        function TutorialPage(platform, router) {
          _classCallCheck(this, TutorialPage);

          this.platform = platform;
          this.router = router;
          this.platform.ready().then(function () {
            var slides = document.querySelector('ion-slides');
            slides.options = {
              initialSlide: 0,
              speed: 400,
              zoom: false
            };
          });
        }

        _createClass(TutorialPage, [{
          key: "readyToPlay",
          value: function readyToPlay() {
            window.localStorage.setItem('tutorial', JSON.stringify(true));
            this.router.navigate(['/tabs/mappa']);
          }
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {}
        }]);

        return TutorialPage;
      }();

      TutorialPage.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }];
      };

      TutorialPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-tutorial',
        template: _raw_loader_tutorial_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_tutorial_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })
      /*
        slide1->Intro app cosa fa
        slede2->esempio corsia riservata sulla mappa CSS-> border-radius:5%; magin 50px 0 0
        slide3->alert e notifiche
        slide4->Centro notifiche
      */
      ], TutorialPage);
      /***/
    },

    /***/
    "6MGo":
    /*!*********************************************!*\
      !*** ./src/app/tutorial/tutorial.module.ts ***!
      \*********************************************/

    /*! exports provided: TutorialPageModule */

    /***/
    function MGo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TutorialPageModule", function () {
        return TutorialPageModule;
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


      var _tutorial_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./tutorial-routing.module */
      "SF65");
      /* harmony import */


      var _tutorial_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./tutorial.page */
      "5o7k");

      var TutorialPageModule = function TutorialPageModule() {
        _classCallCheck(this, TutorialPageModule);
      };

      TutorialPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _tutorial_routing_module__WEBPACK_IMPORTED_MODULE_5__["TutorialPageRoutingModule"]],
        declarations: [_tutorial_page__WEBPACK_IMPORTED_MODULE_6__["TutorialPage"]]
      })], TutorialPageModule);
      /***/
    },

    /***/
    "8bPp":
    /*!***********************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tutorial/tutorial.page.html ***!
      \***********************************************************************************/

    /*! exports provided: default */

    /***/
    function bPp(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n  <ion-content fullscreen class=\"ion-padding\" scroll-y=\"false\">\n    <ion-slides pager=\"true\">\n\n      <ion-slide class=\"slide-1\">\n        <div class=\"slide\">\n          <img src=\"../../assets/images/slide-1.png\"/>\n          <h2>Benvenuto</h2>\n          <p>Questa app è stata sviluppata per segnalare le corsie riservate nella città di Firenze</p>\n        </div>\n      </ion-slide>\n\n      <ion-slide class=\"slide-2\">\n        <img src=\"../../assets/images/slide-2.png\"/>\n        <h2>Come appare</h2>\n        <p>Nella mappa sarranno identificate, con diversi colori, le tipologie di corsie riservate in modo da renderle visibili durante i tuoi spostamenti</p>\n      </ion-slide>\n\n      <ion-slide class=\"slide-3\">\n        <img src=\"../../assets/images/slide-3.png\"/>\n        <h2>Segnalazione</h2>\n        <p>Se passi in una corsia in cui non sei autorizzato a transitare verrai avvisato tramite un alert e inoltre verranno inviati i dettagli della strada appena percorsa nella sezione notifiche.\n            In impostazioni puoi selezionare le autorizzazioni in tuo possesso in base al veicolo che guidi </p>\n      </ion-slide>\n\n      <ion-slide class=\"slide-4\">\n        <img src=\"../../assets/images/slide-4.png\"/>\n        <h2>Pronto per iniziare?</h2>\n        <br>\n        <ion-button fill=\"clear\" (click)=\"readyToPlay()\">Continua <ion-icon slot=\"end\" name=\"arrow-forward\"></ion-icon></ion-button>\n      </ion-slide>\n\n    </ion-slides>\n  </ion-content>\n\n";
      /***/
    },

    /***/
    "SF65":
    /*!*****************************************************!*\
      !*** ./src/app/tutorial/tutorial-routing.module.ts ***!
      \*****************************************************/

    /*! exports provided: TutorialPageRoutingModule */

    /***/
    function SF65(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TutorialPageRoutingModule", function () {
        return TutorialPageRoutingModule;
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


      var _tutorial_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./tutorial.page */
      "5o7k");

      var routes = [{
        path: '',
        component: _tutorial_page__WEBPACK_IMPORTED_MODULE_3__["TutorialPage"]
      }];

      var TutorialPageRoutingModule = function TutorialPageRoutingModule() {
        _classCallCheck(this, TutorialPageRoutingModule);
      };

      TutorialPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], TutorialPageRoutingModule);
      /***/
    },

    /***/
    "m29k":
    /*!*********************************************!*\
      !*** ./src/app/tutorial/tutorial.page.scss ***!
      \*********************************************/

    /*! exports provided: default */

    /***/
    function m29k(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-content {\n  --ion-background-color:#fff;\n}\n\nion-slides {\n  height: 100%;\n}\n\nion-slides .swiper-slide {\n  display: block;\n}\n\nion-slides .swiper-slide h2 {\n  margin-top: 0.8rem;\n}\n\nion-slides .swiper-slide {\n  max-height: 100%;\n  max-width: 100%;\n  margin: 50px 0 0px;\n  pointer-events: none;\n}\n\nion-slides .slide-1 img {\n  max-height: 66%;\n  max-width: 66%;\n}\n\nion-slides .slide-2 img {\n  max-height: 100%;\n  max-width: 100%;\n}\n\nion-slides b {\n  font-weight: 500;\n}\n\nion-slides p {\n  padding: 0 40px;\n  font-size: 14px;\n  line-height: 1.5;\n  color: var(--ion-color-step-600, #60646b);\n}\n\nion-slides p b {\n  color: var(--ion-text-color, #000000);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdHV0b3JpYWwvdHV0b3JpYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkJBQUE7QUFDSjs7QUFFQTtFQUNJLFlBQUE7QUFDSjs7QUFDQTtFQUNJLGNBQUE7QUFFSjs7QUFDQTtFQUNJLGtCQUFBO0FBRUo7O0FBQ0E7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0FBRUo7O0FBQUE7RUFDSSxlQUFBO0VBQ0EsY0FBQTtBQUdKOztBQURBO0VBQ0ksZ0JBQUE7RUFDQSxlQUFBO0FBSUo7O0FBRkE7RUFDSSxnQkFBQTtBQUtKOztBQUZBO0VBQ0ksZUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0FBS0o7O0FBRkE7RUFDSSxxQ0FBQTtBQUtKIiwiZmlsZSI6InNyYy9hcHAvdHV0b3JpYWwvdHV0b3JpYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnR7XG4gICAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjojZmZmO1xufVxuLy9zdGlsZSBzbGlkZXNcbmlvbi1zbGlkZXMge1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuaW9uLXNsaWRlcyAgLnN3aXBlci1zbGlkZSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cblxuaW9uLXNsaWRlcyAgLnN3aXBlci1zbGlkZSBoMiB7XG4gICAgbWFyZ2luLXRvcDogMC44cmVtO1xuICB9XG5cbmlvbi1zbGlkZXMgIC5zd2lwZXItc2xpZGUgIHtcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDUwcHggMCAwcHg7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cbmlvbi1zbGlkZXMgLnNsaWRlLTEgaW1ne1xuICAgIG1heC1oZWlnaHQ6IDY2JTtcbiAgICBtYXgtd2lkdGg6IDY2JTtcbn1cbmlvbi1zbGlkZXMgLnNsaWRlLTIgaW1ne1xuICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xufVxuaW9uLXNsaWRlcyAgYiB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuXG5pb24tc2xpZGVzICBwIHtcbiAgICBwYWRkaW5nOiAwIDQwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCwgIzYwNjQ2Yik7XG4gIH1cblxuaW9uLXNsaWRlcyBwIGIge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvciwgIzAwMDAwMCk7XG4gIH0iXX0= */";
      /***/
    }
  }]);
})();
//# sourceMappingURL=tutorial-tutorial-module-es5.js.map