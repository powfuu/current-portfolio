import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionChevronUp,
  ionClose,
  ionDownload,
  ionLogoLinkedin,
  ionMail,
} from '@ng-icons/ionicons';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(
      HttpClientModule,
      NgIconsModule.withIcons({
        ionLogoLinkedin,
        ionMail,
        ionClose,
        ionDownload,
        ionChevronUp,
      })
    ),
  ],
}).catch((err) => console.error(err));
