import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor() {
        this.optionsOverlay = false;
        this.displayIcon = false;
        this.extraOptions = ['Explore', 'Login'];
        this.displayIcon = !((window.innerWidth - 1 + 1) > 615);
    }
    onResize(eventData) {
        this.displayIcon = !((eventData.target.innerWidth - 1 + 1) > 615);
        this.optionsOverlay = false;
    }
    showOptions() {
        this.optionsOverlay = !this.optionsOverlay;
    }
};
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: [
            './header.component.css',
            './general.component.css'
        ]
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map