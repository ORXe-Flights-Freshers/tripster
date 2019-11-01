import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { PlaceAutocompleteComponent } from './components/place-autocomplete/place-autocomplete.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../modules/app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
let SharedModule = class SharedModule {
};
SharedModule = tslib_1.__decorate([
    NgModule({
        declarations: [HeaderComponent, PlaceAutocompleteComponent],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            AppMaterialModule,
            CommonModule,
            MatIconModule,
            HttpClientModule
        ],
        exports: [HeaderComponent, PlaceAutocompleteComponent]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map