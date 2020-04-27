import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
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
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    NgMatSearchBarModule,
    MatSelectModule
  ]
})
export class AppMaterialModule {
}
