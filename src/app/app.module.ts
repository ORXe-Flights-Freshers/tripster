import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlannerModule } from './modules/planner/planner.module';
import {TimePickerThemeService} from './services/TimePickerTheme.service';
import { FormsModule } from '@angular/forms';
 import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2LnC7a1z5MDzBjx4Us9qo9Z4Yupum03A',
      libraries: ['places']
    }),
    HttpClientModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PlannerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TimePickerThemeService],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
