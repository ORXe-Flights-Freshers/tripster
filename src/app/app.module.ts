import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule} from './common/common.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import {HeaderComponent} from './common/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
