webpackJsonp([1,4],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    // data = { "coord":{"lon":13.41,"lat":52.52},
    //           "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
    //           "base":"stations",
    //           "main":{"temp":20.49,"pressure":1008,"humidity":64,"temp_min":20,"temp_max":21},
    //           "visibility":10000,
    //           "wind":{"speed":2.1,"deg":70},
    //           "clouds":{"all":0},
    //           "dt":1499671200,
    //           "sys":{"type":1,"id":4892,"message":0.0021,"country":"DE","sunrise":1499655377,"sunset":1499714801},
    //           "id":2950159,
    //           "name":"Berlin",
    //           "cod":200 }
    function AppComponent(http) {
        this.inputChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* EventEmitter */]();
        this.title = 'Weather in your City!';
        this.weather = false;
        this.emptyInput = false;
        this.showForecast = false;
        this.fDays = [];
        this.forecustButton = 'Show Forecast';
        this.forecast = {
            list: []
        };
        this.scroll = false;
        this.zoom = 5;
        this.mapMarker = './src/app/images/marker.png';
        this.j = 0;
        this.http = http;
    }
    AppComponent.prototype.changeInput = function (newInput) {
        this.input = newInput;
        this.inputChange.emit(newInput);
        if (newInput == '') {
            this.closeWeather();
        }
    };
    AppComponent.prototype.clearInput = function () {
        this.input = '';
        this.emptyInput = false;
    };
    AppComponent.prototype.closeWeather = function () {
        this.weather = false;
        this.fDays = [];
        this.showForecast = false;
        this.inputValue = '';
        this.input = '';
    };
    AppComponent.prototype.getWeather = function (input) {
        var _this = this;
        if (input) {
            this.emptyInput = false;
            this.cityName = input;
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ withCredentials: true });
            this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9&units=metric').subscribe(function (response) {
                _this.data = response.json();
                _this.weatherImag = './src/app/images/' + _this.data.weather[0].icon + '.png';
                _this.temp = _this.data.main.temp;
                _this.weather = true;
                _this.country = _this.data.name;
                _this.countryCode = _this.data.sys.country;
                _this.lon = _this.data.coord.lon;
                _this.lat = _this.data.coord.lat;
            });
        }
        else if (input = ' ') {
            this.emptyInput = true;
        }
    };
    // getWeather(input: string) {
    //   if (input) {
    //       this.emptyInput = false;
    //       this.cityName = input;
    //       this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
    //       this.temp = this.data.main.temp;
    //       console.log('data', this.data);
    //       this.weather = true;
    //       this.country = this.data.name;
    //       this.countryCode = this.data.sys.country;
    //       this.lon = this.data.coord.lon;
    //       this.lat = this.data.coord.lat;
    //   } else if (input = ' ') {
    //       this.emptyInput = true;
    //   }
    // }
    AppComponent.prototype.showWeatherForecast = function () {
        this.showForecast = !this.showForecast;
        if (this.showForecast == true) {
            this.fDays.length = 0;
            this.forecustButton = 'Hide Forecast';
            this.getForecast();
        }
        else {
            this.forecustButton = 'Show Forecast';
        }
    };
    AppComponent.prototype.getForecast = function () {
        var _this = this;
        this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9&units=metric')
            .subscribe(function (res) {
            _this.forecast = res.json();
            for (var i = 0; i < _this.forecast.list.length; i += 8) {
                var day = {
                    date: new Date(_this.forecast.list[i].dt * 1000).toString().slice(4, 11),
                    temp: _this.forecast.list[i].main.temp.toFixed(0),
                    icon: './src/app/images/' + _this.forecast.list[i].weather[0].icon + '.png'
                };
                _this.fDays.push(day);
            }
        });
    };
    // google map api key = AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8
    // map code https://maps.googleapis.com/maps/api/js?key=AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8&callback=initMap
    AppComponent.prototype.changeMarker = function () {
        var mapMarkerIcons = ['marker3.png', 'marker2.png', 'marker.png'];
        this.mapMarker = './src/app/images/' + mapMarkerIcons[this.j];
        if (this.j < mapMarkerIcons.length) {
            this.j += 1;
        }
        if (this.j === mapMarkerIcons.length) {
            this.j = 0;
        }
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])(),
    __metadata("design:type", String)
], AppComponent.prototype, "input", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Output */])(),
    __metadata("design:type", Object)
], AppComponent.prototype, "inputChange", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(162),
        styles: [__webpack_require__(161)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__agm_core__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__colors__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__drag_drop__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__colors__["a" /* ColorSpectrumDirective */],
            __WEBPACK_IMPORTED_MODULE_7__drag_drop__["a" /* DragDropComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8'
            })
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorSpectrumDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorSpectrumDirective = (function () {
    function ColorSpectrumDirective(el, render) {
        this.el = el;
        this.render = render;
        this._defaulColor = 'lavender';
    }
    ColorSpectrumDirective.prototype.methodToHandleMouseEnterAction = function () {
        console.log(this.highlightColor);
        this.changecolor(this.highlightColor || this._defaulColor);
    };
    ColorSpectrumDirective.prototype.changecolor = function (color) {
        this.render.setElementStyle(this.el.nativeElement, 'background-color', color);
    };
    return ColorSpectrumDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* Input */])('color-spectrum'),
    __metadata("design:type", String)
], ColorSpectrumDirective.prototype, "highlightColor", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* HostListener */])('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColorSpectrumDirective.prototype, "methodToHandleMouseEnterAction", null);
ColorSpectrumDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Directive */])({
        selector: '[color-spectrum]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer */]) === "function" && _b || Object])
], ColorSpectrumDirective);

var _a, _b;
//# sourceMappingURL=colors.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DragDropComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DragDropComponent = (function () {
    function DragDropComponent(renderer) {
        this.renderer = renderer;
        this.mouseDown = false;
    }
    DragDropComponent.prototype.ngOnInit = function () {
        this.container = this.canvas.nativeElement;
        this.movableEl = this.element.nativeElement;
        this.moveBorder = {
            left: this.container.offsetLeft + (40 / 2),
            right: this.container.clientWidth + this.container.offsetLeft - (40 / 2) + 2,
            top: this.container.offsetTop + (40 / 2) + 85,
            bottom: this.container.clientHeight + this.container.offsetTop - (40 / 2) + 87,
        };
    };
    DragDropComponent.prototype.onMouseup = function (event) {
        this.mouseDown = false;
        event.stopPropagation();
    };
    DragDropComponent.prototype.onMousedown = function (event) {
        event.preventDefault();
        this.mouseDown = true;
        this.mouseMove = event;
    };
    DragDropComponent.prototype.onMousemove = function (event) {
        if (this.mouseDown && this.InsideBorderEvent(event)) {
            this.renderer.setElementStyle(this.movableEl, 'left', event.clientX - (40 / 2) + "px");
            this.renderer.setElementStyle(this.movableEl, 'top', event.clientY - (40 / 2) + "px");
        }
    };
    DragDropComponent.prototype.InsideBorderEvent = function (event) {
        return event.clientX > this.moveBorder.left &&
            event.clientX < this.moveBorder.right &&
            event.clientY > this.moveBorder.top &&
            event.clientY < this.moveBorder.bottom;
    };
    return DragDropComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], DragDropComponent.prototype, "canvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('element'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], DragDropComponent.prototype, "element", void 0);
DragDropComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'drag-drop',
        template: "<div #canvas (mousemove)='onMousemove($event)' class='canvas'>\n                    <div #element class='element' (mouseup)='onMouseup($event)' (mousedown)='onMousedown($event)'>\n                        <img (mouseenter)=\"hover=true;\" (mouseleave)=\"hover=false;\" src='./src/app/images/sun.png'>\n                        <span *ngIf='hover'>Move me</span>\n                    </div>\n                </div>",
        styles: ["\n        .canvas {\n            border: 1px solid green;\n            width: 500px;\n            height: 200px;\n            margin: 45px auto;\n        }\n        .element {\n            position: absolute;\n            width: 40px;\n            height: 40px;\n            cursor: move;\n        }\n        img {\n            width: 40px;\n            height: 40px;\n            objekt-fit: cover;\n        }\n        span {\n            font-size: 14px;\n        }\n        "]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Renderer */]) === "function" && _c || Object])
], DragDropComponent);

var _a, _b, _c;
//# sourceMappingURL=drag-drop.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(57)();
// imports


// module
exports.push([module.i, ".content {\n    width: 80%;\n    margin: 2em auto;\n    padding: 1em 1em 2em 1em;\n    text-align: center;\n    background-color: lavender;\n    border-radius: 5px;\n}\ninput {\n    margin: 10px;\n    padding: 6px;\n    border: 1px solid lightsteelblue;\n    border-radius: 4px;\n}\nh1, p {\n    font-family: sans-serif;\n    color: darkslategray;\n    margin: 1em;\n}\nimg {\n    width: 100%;\n}\n.bold-span {\n    font-weight: bold;\n}\n.notification-span {\n    color: mediumvioletred;\n}\nbutton {\n    width: 50px;\n    padding: 7px;\n    background-color: lightsteelblue;\n    color: darkslategray;\n    border: none;\n    border-radius: 5px;\n    cursor: pointer;\n}\nbutton:hover {\n    background-color: darkslategray;\n    color: white;\n}\n.weather-container button {\n    width: 100px;\n    height: 50px;\n    position: relative;\n    top: -12px;\n    border: 1px solid white;\n}\n.weather-container {\n    position: relative;\n    width: 70%;\n    height: 18em;\n    padding: 0.6em;\n    margin: 1em auto;\n    border-radius: 10px;\n    background-color: lightsteelblue;\n    z-index: 1;\n}\n.weather {\n    width: 100%;\n}\n.weather div {\n    display: inline-block;\n    font-family: sans-serif;\n    word-wrap: break-word;\n    width: 25%;\n    line-height: 1em;\n    vertical-align: middle;\n    margin: 0 0.5em;\n    color: darkslategray;\n}\n.weather img {\n    width: 70%;\n}\n.weather-forecast {\n    background-color: lightsteelblue;\n    width: 70%;\n    margin: 0 auto;\n    border-radius: 10px;\n}\n.weather-forecast__row {\n    width: 100%;\n    margin: 0 auto;\n}\n.weather-forecast__row:nth-of-type(1) {\n    padding-top: 20px;\n}\n.weather-forecast__row span {\n    padding: 0 0.8em;\n}\n.weather-forecast img {\n    width: 10%;\n    vertical-align: middle;\n}\n.close {\n    position: relative;\n    float: right;\n    width: 1em;\n    cursor: pointer;\n    font-family: sans-serif;\n    color: lavender;\n    z-index: 1;\n}\n.close:hover {\n    color: darkslategrey;\n}\n.colors {\n    position: absolute;\n    top: 4%;\n    width: 8em;\n    right: 2.6em;\n}\n.colors div {\n    width: 20px;\n    height: 20px;\n    border-radius: 3px;\n    display: inline-block;\n    border: 1px solid lightsteelblue;\n}\n@media (max-width: 450px) {\n    h1 {\n        font-size: 1.8em;\n    }\n    .weather div {\n        width: 80%;\n        height: auto;\n        line-height: 4em;\n    }\n    img {\n        width: 80%;\n    }\n}\n@media (min-width: 450px) and (max-width: 768px) {\n    h1 {\n        font-size: 2em;\n    }\n    .weather-container {\n        height: 5em;\n    }\n    .weather {\n        width: 92%;\n        height: 5em;\n        line-height: 5em;\n    }\n    .weather-forecast {\n        width: 60%;\n    }\n    .colors {\n        right: 4.4em;\n    }\n}\n@media (min-width: 768px) and (max-width: 1200px) {\n    h1 {\n        font-size: 2.5em;\n    }\n    .weather-container {\n        height: 8em;\n    }\n    .weather {\n        width: 95%;\n        height: 8em;\n        line-height: 8em;\n    }\n    .weather-forecast {\n        width: 56%;\n    }\n    .weather-forecast__row span {\n        padding: 0 1.5em;\n    }\n    .colors {\n        right: 7.4em;\n    }\n}\n@media (min-width: 1200px) {\n    .content {\n        width: 935px;\n    }\n    .weather-container {\n        height: 9em;\n    }\n    .weather {\n        width: 650px;\n        height: 9em;\n        line-height: 9em;\n    }\n    .weather div {\n        width: 28%;\n    }\n    .weather-forecast {\n        width: 50%;\n    }\n    .weather-forecast__row span {\n        padding: 0 30px;\n    }\n    .colors {\n        position: relative;\n        left: 805px;\n        top: 0;\n    }\n}\n/*Google map*/\nagm-map {\n    position: relative;\n    top: 20px;\n    height: 300px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" [color-spectrum]=\"color\">\n    <div class=\"colors\">\n        <div (click)=\"color='#ffd4e3'\" [ngStyle]=\"{'background-color': '#ffd4e3'}\"></div>\n        <div (click)=\"color='#d7d7fc'\" [ngStyle]=\"{'background-color': '#d7d7fc'}\"></div>\n        <div (click)=\"color='#fffad1'\" [ngStyle]=\"{'background-color': '#fffad1'}\"></div>\n        <div (click)=\"color='#dcffdc'\" [ngStyle]=\"{'background-color': '#dcffdc'}\"></div>\n        <div (click)=\"color='#e6e6fa'\" [ngStyle]=\"{'background-color': '#e6e6fa'}\"></div>\n    </div>\n    <div>\n        <h1>{{title}}</h1>\n        <input [(ngModel)]='input' (ngModelChange)='changeInput($event)'\n                (click)='clearInput()' [value]=\"inputValue\"\n                type=\"text\" placeholder=\"your location...\"/>\n        <button (click)='getWeather(input)' type=\"button\">Show</button>\n        <p>\n            <span *ngIf='!emptyInput'>Weather in </span>\n            <span class='bold-span'>{{input}}</span>\n            <span *ngIf='emptyInput' class='notification-span'>Choose a city</span>\n        </p>\n\n        <div *ngIf='weather' class=\"weather-container\">\n            <div (click)='closeWeather()' class=\"close\">X</div>\n            <div class=\"weather\">\n                <div>{{country}}, {{countryCode}}</div>\n                <div>{{temp}} <span>°C</span></div>\n                <div>\n                    <img [src]=\"weatherImag\" alt=\"weather_img\">\n                </div>\n            </div>\n            <button (click)='showWeatherForecast()' type=\"button\" name=\"forecastButton\">{{forecustButton}}</button>\n        </div>\n\n        <div *ngIf='showForecast' class=\"weather-forecast\">\n            <div class=\"weather-forecast__row-content\">\n                <div *ngFor='let fDay of fDays' class=\"weather-forecast__row\">\n                    <span>{{fDay.date}}</span>\n                    <span><img [src]='fDay.icon'></span>\n                    <span>{{fDay.temp}} °C</span>\n                </div>\n            </div>\n        </div>\n\n        <agm-map *ngIf='weather' [longitude]=\"lon\" [latitude]=\"lat\" [zoom]=\"zoom\" [scrollwheel]=\"scroll\" [backgroundColor]=\"color\">\n            <agm-marker #marker (markerClick)=\"changeMarker()\" [longitude]=\"lon\" [latitude]=\"lat\" [iconUrl]='mapMarker' ></agm-marker>\n        </agm-map>\n\n    </div>\n    <drag-drop></drag-drop>\n\n\n</div>\n"

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(92);


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 91;


/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(107);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ })

},[187]);
//# sourceMappingURL=main.bundle.js.map