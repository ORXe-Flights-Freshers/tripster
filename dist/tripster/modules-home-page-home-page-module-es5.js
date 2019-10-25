(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-home-page-home-page-module"], {
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/home-page.component.html": 
        /*!**************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/home-page.component.html ***!
          \**************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<img\r\n  src=\"assets/img/homepage-background.jpg\"\r\n  alt=\"homepage-background\"\r\n>\r\n<app-search></app-search>\r\n");
            /***/ 
        }),
        /***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/search/search.component.html": 
        /*!******************************************************************************************************!*\
          !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/search/search.component.html ***!
          \******************************************************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("<form\r\n  (ngSubmit)=\"onSubmit()\"\r\n  [ngStyle]=\"{\r\n    marginTop: '86px'\r\n  }\"\r\n>\r\n  <mat-card class=\"search-card\">\r\n    <div class=\"source\">\r\n      <app-place-autocomplete\r\n        class=\"input-field\"\r\n        placeholder=\"Source\"\r\n        (onPlaceChange)=\"handleSourceChange($event)\"\r\n      ></app-place-autocomplete>\r\n    </div>\r\n    <div class=\"destination\">\r\n      <app-place-autocomplete\r\n        class=\"input-field\"\r\n        placeholder=\"Destination\"\r\n        (onPlaceChange)=\"handleDestinationChange($event)\"\r\n      ></app-place-autocomplete>\r\n    </div>\r\n    <span class=\"date-time\">\r\n      <span>\r\n        <mat-form-field class=\"date input-field\" appearance=\"outline\">\r\n          <mat-label>Date</mat-label>\r\n          <input\r\n            matInput\r\n            style=\"width: 100%\"\r\n            [matDatepicker]=\"myDatepicker\"\r\n            (dateChange)=\"handleDateSet($event)\"\r\n            [value]=\"tripDate\"\r\n            [min]=\"getMinDate()\"\r\n            readonly\r\n          />\r\n          <mat-datepicker-toggle\r\n            matSuffix\r\n            [for]=\"myDatepicker\"\r\n          ></mat-datepicker-toggle>\r\n          <mat-datepicker #myDatepicker></mat-datepicker>\r\n        </mat-form-field>\r\n      </span>\r\n      <span>\r\n        <mat-form-field class=\"time input-field\" appearance=\"outline\">\r\n          <mat-label>Time</mat-label>\r\n          <input\r\n            matInput\r\n            style=\"width: 100%\"\r\n            [ngxTimepicker]=\"endTime\"\r\n            [format]=\"12\"\r\n            [value]=\"tripTime\"\r\n            readonly\r\n          />\r\n          <mat-icon matSuffix style=\"color: gray\">access_time</mat-icon>\r\n        </mat-form-field>\r\n\r\n        <ngx-material-timepicker\r\n          (timeSet)=\"handleTimeSet($event)\"\r\n          #endTime\r\n        ></ngx-material-timepicker>\r\n      </span>\r\n      <button\r\n        class=\"button\"\r\n        type=\"submit\"\r\n        mat-raised-button\r\n        color=\"primary\"\r\n        [disabled]=\"!searchForm.valid\"\r\n      >\r\n        Go\r\n      </button>\r\n    </span>\r\n    <hr />\r\n    <mat-form-field class=\"mileage input-field\" appearance=\"outline\">\r\n      <mat-label>Mileage (in kms per litre)</mat-label>\r\n      <input matInput placeholder=\"Enter Mileage(Km/l)\" />\r\n    </mat-form-field>\r\n  </mat-card>\r\n</form>\r\n");
            /***/ 
        }),
        /***/ "./src/app/models/Time.ts": 
        /*!********************************!*\
          !*** ./src/app/models/Time.ts ***!
          \********************************/
        /*! exports provided: Time */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Time", function () { return Time; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            var Time = /** @class */ (function () {
                function Time() {
                }
                Time.parseTimeStringToTime = function (timeString) {
                    var _a = timeString
                        .substr(0, timeString.length - 3)
                        .split(':')
                        .map(Number), hours = _a[0], minutes = _a[1];
                    var time = new Time();
                    time.hours = hours;
                    if (timeString.includes('PM') && hours !== 12) {
                        time.hours += 12;
                    }
                    time.minutes = minutes;
                    return time;
                };
                return Time;
            }());
            /***/ 
        }),
        /***/ "./src/app/modules/home-page/home-page.component.css": 
        /*!***********************************************************!*\
          !*** ./src/app/modules/home-page/home-page.component.css ***!
          \***********************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = ("img {\r\n  position: absolute;\r\n  padding: 0;\r\n  height: 200px;\r\n  width: 100%;\r\n}\r\n\r\n@media screen and (max-width: 1300px) and (min-width: 600px) {\r\n  img {\r\n    height: 289px;\r\n  }\r\n}\r\n\r\n@media screen and (max-width: 600px) {\r\n  img {\r\n    height: 700px;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ob21lLXBhZ2UvaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7QUFDRiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvaG9tZS1wYWdlL2hvbWUtcGFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcGFkZGluZzogMDtcclxuICBoZWlnaHQ6IDIwMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMzAwcHgpIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xyXG4gIGltZyB7XHJcbiAgICBoZWlnaHQ6IDI4OXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcclxuICBpbWcge1xyXG4gICAgaGVpZ2h0OiA3MDBweDtcclxuICB9XHJcbn1cclxuIl19 */");
            /***/ 
        }),
        /***/ "./src/app/modules/home-page/home-page.component.ts": 
        /*!**********************************************************!*\
          !*** ./src/app/modules/home-page/home-page.component.ts ***!
          \**********************************************************/
        /*! exports provided: HomePageComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageComponent", function () { return HomePageComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            var HomePageComponent = /** @class */ (function () {
                function HomePageComponent() {
                }
                HomePageComponent.prototype.ngOnInit = function () {
                };
                return HomePageComponent;
            }());
            HomePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: 'app-home-page',
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home-page.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/home-page.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home-page.component.css */ "./src/app/modules/home-page/home-page.component.css")).default]
                })
            ], HomePageComponent);
            /***/ 
        }),
        /***/ "./src/app/modules/home-page/home-page.module.ts": 
        /*!*******************************************************!*\
          !*** ./src/app/modules/home-page/home-page.module.ts ***!
          \*******************************************************/
        /*! exports provided: HomePageModule */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function () { return HomePageModule; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
            /* harmony import */ var _home_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home-page.component */ "./src/app/modules/home-page/home-page.component.ts");
            /* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search/search.component */ "./src/app/modules/home-page/search/search.component.ts");
            /* harmony import */ var _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app-material/app-material.module */ "./src/app/modules/app-material/app-material.module.ts");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
            var routes = [
                {
                    path: '',
                    component: _home_page_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"]
                }
            ];
            var HomePageModule = /** @class */ (function () {
                function HomePageModule() {
                }
                return HomePageModule;
            }());
            HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
                    declarations: [_home_page_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"], _search_search_component__WEBPACK_IMPORTED_MODULE_4__["SearchComponent"]],
                    imports: [
                        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                        _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                        _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild(routes),
                        _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"]
                    ],
                    exports: [_home_page_component__WEBPACK_IMPORTED_MODULE_3__["HomePageComponent"]],
                    schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
                })
            ], HomePageModule);
            /***/ 
        }),
        /***/ "./src/app/modules/home-page/search/search.component.css": 
        /*!***************************************************************!*\
          !*** ./src/app/modules/home-page/search/search.component.css ***!
          \***************************************************************/
        /*! exports provided: default */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony default export */ __webpack_exports__["default"] = (".search-card {\r\n  margin: 20px auto;\r\n  width: 80%;\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n.input-field {\r\n  margin-left: 1.5%;\r\n}\r\n.timepicker {\r\n  width: 30px;\r\n}\r\n.button {\r\n  position: absolute;\r\n  margin-top: 0.3%;\r\n  margin-left: 2%;\r\n  height: 60px;\r\n  width: 10%;\r\n}\r\n.source,\r\n.destination {\r\n  display: inline-flex;\r\n  width: 25%;\r\n  margin-left: 1%;\r\n}\r\n.source *,\r\n.destination * {\r\n  width: 100%;\r\n}\r\n.time,\r\n.date {\r\n  width: 15%;\r\n}\r\nhr {\r\n  border: 0;\r\n  height: 0;\r\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\r\n  border-bottom: 1px solid rgba(255, 255, 255, 0.3);\r\n}\r\n@media screen and (max-width: 1300px) and (min-width: 600px) {\r\n  .date-time {\r\n    display: block;\r\n  }\r\n\r\n  .source,\r\n  .destination {\r\n    width: 40%;\r\n  }\r\n\r\n  .date,\r\n  .time {\r\n    width: 39.5%;\r\n  }\r\n\r\n  .button {\r\n    margin-top: 0.8%;\r\n  }\r\n}\r\n@media screen and (max-width: 1000px) and (min-width: 600px) {\r\n  .button {\r\n    margin-top: 0.5%;\r\n  }\r\n}\r\n@media screen and (max-width: 600px) {\r\n  .source,\r\n  .destination {\r\n    width: 97%;\r\n  }\r\n\r\n  .date,\r\n  .time,\r\n  .button,\r\n  .mileage {\r\n    margin-left: 2%;\r\n    width: 96%;\r\n  }\r\n\r\n  .time {\r\n    /*margin-bottom: 10%;*/\r\n  }\r\n\r\n  .button {\r\n    display: block;\r\n  }\r\n\r\n  hr {\r\n    margin-top: 80px;\r\n  }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ob21lLXBhZ2Uvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLFVBQVU7RUFDVixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLFdBQVc7QUFDYjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsWUFBWTtFQUNaLFVBQVU7QUFDWjtBQUVBOztFQUVFLG9CQUFvQjtFQUNwQixVQUFVO0VBQ1YsZUFBZTtBQUNqQjtBQUVBOztFQUVFLFdBQVc7QUFDYjtBQUVBOztFQUVFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsU0FBUztFQUNULFNBQVM7RUFDVCx3Q0FBd0M7RUFDeEMsaURBQWlEO0FBQ25EO0FBRUE7RUFDRTtJQUNFLGNBQWM7RUFDaEI7O0VBRUE7O0lBRUUsVUFBVTtFQUNaOztFQUVBOztJQUVFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGO0FBRUE7RUFDRTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGO0FBRUE7RUFDRTs7SUFFRSxVQUFVO0VBQ1o7O0VBRUE7Ozs7SUFJRSxlQUFlO0lBQ2YsVUFBVTtFQUNaOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsY0FBYztFQUNoQjs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9ob21lLXBhZ2Uvc2VhcmNoL3NlYXJjaC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlYXJjaC1jYXJkIHtcclxuICBtYXJnaW46IDIwcHggYXV0bztcclxuICB3aWR0aDogODAlO1xyXG4gIHBhZGRpbmctbGVmdDogMDtcclxuICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG59XHJcbi5pbnB1dC1maWVsZCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEuNSU7XHJcbn1cclxuLnRpbWVwaWNrZXIge1xyXG4gIHdpZHRoOiAzMHB4O1xyXG59XHJcbi5idXR0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW4tdG9wOiAwLjMlO1xyXG4gIG1hcmdpbi1sZWZ0OiAyJTtcclxuICBoZWlnaHQ6IDYwcHg7XHJcbiAgd2lkdGg6IDEwJTtcclxufVxyXG5cclxuLnNvdXJjZSxcclxuLmRlc3RpbmF0aW9uIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxuICB3aWR0aDogMjUlO1xyXG4gIG1hcmdpbi1sZWZ0OiAxJTtcclxufVxyXG5cclxuLnNvdXJjZSAqLFxyXG4uZGVzdGluYXRpb24gKiB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi50aW1lLFxyXG4uZGF0ZSB7XHJcbiAgd2lkdGg6IDE1JTtcclxufVxyXG5cclxuaHIge1xyXG4gIGJvcmRlcjogMDtcclxuICBoZWlnaHQ6IDA7XHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMzAwcHgpIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xyXG4gIC5kYXRlLXRpbWUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG5cclxuICAuc291cmNlLFxyXG4gIC5kZXN0aW5hdGlvbiB7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gIH1cclxuXHJcbiAgLmRhdGUsXHJcbiAgLnRpbWUge1xyXG4gICAgd2lkdGg6IDM5LjUlO1xyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbiB7XHJcbiAgICBtYXJnaW4tdG9wOiAwLjglO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KSBhbmQgKG1pbi13aWR0aDogNjAwcHgpIHtcclxuICAuYnV0dG9uIHtcclxuICAgIG1hcmdpbi10b3A6IDAuNSU7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gIC5zb3VyY2UsXHJcbiAgLmRlc3RpbmF0aW9uIHtcclxuICAgIHdpZHRoOiA5NyU7XHJcbiAgfVxyXG5cclxuICAuZGF0ZSxcclxuICAudGltZSxcclxuICAuYnV0dG9uLFxyXG4gIC5taWxlYWdlIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAyJTtcclxuICAgIHdpZHRoOiA5NiU7XHJcbiAgfVxyXG5cclxuICAudGltZSB7XHJcbiAgICAvKm1hcmdpbi1ib3R0b206IDEwJTsqL1xyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbiB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG4gIGhyIHtcclxuICAgIG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgfVxyXG59XHJcbiJdfQ== */");
            /***/ 
        }),
        /***/ "./src/app/modules/home-page/search/search.component.ts": 
        /*!**************************************************************!*\
          !*** ./src/app/modules/home-page/search/search.component.ts ***!
          \**************************************************************/
        /*! exports provided: SearchComponent */
        /***/ (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function () { return SearchComponent; });
            /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
            /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
            /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
            /* harmony import */ var _models_Time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../models/Time */ "./src/app/models/Time.ts");
            /* harmony import */ var src_app_services_trip_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/trip.service */ "./src/app/services/trip.service.ts");
            /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
            var SearchComponent = /** @class */ (function () {
                function SearchComponent(tripService, router) {
                    this.tripService = tripService;
                    this.router = router;
                    this.tripDate = new Date(Date.now());
                    this.tripTime = "11:00 am";
                    this.searchForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                        mileage: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]()
                    });
                }
                SearchComponent.prototype.ngOnInit = function () { };
                SearchComponent.prototype.handleSourceChange = function (place) {
                    this.origin = place;
                    console.log(place);
                };
                SearchComponent.prototype.handleDestinationChange = function (place) {
                    this.destination = place;
                };
                SearchComponent.prototype.handleTimeSet = function (time) {
                    this.tripTime = time;
                };
                SearchComponent.prototype.handleDateSet = function (date) {
                    this.tripDate = new Date(date.value);
                };
                SearchComponent.prototype.getMinDate = function () {
                    return new Date(Date.now());
                };
                SearchComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var time = _models_Time__WEBPACK_IMPORTED_MODULE_3__["Time"].parseTimeStringToTime(this.tripTime);
                    this.tripDate.setHours(time.hours);
                    this.tripDate.setMinutes(time.minutes);
                    var trip = this.generateTrip();
                    console.log(trip);
                    this.tripService.createTrip(trip).subscribe(function (data) {
                        console.log(data);
                        // this.tripService.trip = data as Trip;
                        // @ts-ignore
                        _this.router.navigate(["/", "planner", data.id]);
                        // console.log(data);
                        console.log(new Date(data.destination.arrival));
                    });
                    // this.tripService.trip = trip;
                    // this.router.navigate(["/", "planner", 123]);
                    // console.log(this.tripDate);
                };
                SearchComponent.prototype.generateTrip = function () {
                    var trip;
                    trip = {
                        source: {
                            location: {
                                latitude: this.origin.geometry.location.lat(),
                                longitude: this.origin.geometry.location.lng()
                            },
                            // @ts-ignore
                            stopId: this.origin.id,
                            name: this.origin.name,
                            // @ts-ignore
                            arrival: this.tripDate.toString(),
                            // @ts-ignore
                            departure: this.tripDate.toString(),
                            places: []
                        },
                        destination: {
                            location: {
                                latitude: this.destination.geometry.location.lat(),
                                longitude: this.destination.geometry.location.lng()
                            },
                            // @ts-ignore
                            stopId: this.destination.id,
                            name: this.destination.name,
                            // @ts-ignore
                            arrival: this.tripDate.toString(),
                            // @ts-ignore
                            departure: this.tripDate.toString(),
                            places: []
                        },
                        stops: [],
                        mileage: this.vehicleMileage
                    };
                    return trip;
                };
                return SearchComponent;
            }());
            SearchComponent.ctorParameters = function () { return [
                { type: src_app_services_trip_service__WEBPACK_IMPORTED_MODULE_4__["TripService"] },
                { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
            ]; };
            SearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
                    selector: "app-search",
                    template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./search.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/modules/home-page/search/search.component.html")).default,
                    styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./search.component.css */ "./src/app/modules/home-page/search/search.component.css")).default]
                })
            ], SearchComponent);
            /***/ 
        })
    }]);
//# sourceMappingURL=modules-home-page-home-page-module-es2015.js.map
//# sourceMappingURL=modules-home-page-home-page-module-es5.js.map
//# sourceMappingURL=modules-home-page-home-page-module-es5.js.map