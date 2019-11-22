import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlannerModule} from './modules/planner/planner.module';
import {TimePickerThemeService} from './services/TimePickerTheme.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1047010521344-45llkt5qr16ftg6m26j4priocs1ke487.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7nHY9ATxaMUjyB_RZfjTwvFC4XVCoWVI',
      libraries: ['places']
    }),
    HttpClientModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PlannerModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [TimePickerThemeService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {
}
