import * as tslib_1 from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { SearchComponent } from './search/search.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
const routes = [
    {
        path: '',
        component: HomePageComponent
    }
];
let HomePageModule = class HomePageModule {
};
HomePageModule = tslib_1.__decorate([
    NgModule({
        declarations: [HomePageComponent, SearchComponent],
        imports: [
            SharedModule,
            AppMaterialModule,
            RouterModule.forChild(routes),
            CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MatIconModule
        ],
        exports: [HomePageComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
], HomePageModule);
export { HomePageModule };
//# sourceMappingURL=home-page.module.js.map