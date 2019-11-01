import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
let AppMaterialModule = class AppMaterialModule {
};
AppMaterialModule = tslib_1.__decorate([
    NgModule({
        declarations: [],
        exports: [
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatDatepickerModule,
            MatNativeDateModule,
            NgxMaterialTimepickerModule,
            MatButtonModule,
            MatToolbarModule,
            MatDialogModule
        ]
    })
], AppMaterialModule);
export { AppMaterialModule };
//# sourceMappingURL=app-material.module.js.map