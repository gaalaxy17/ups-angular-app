import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CommonsModule } from './commons/commons.module';
import { NotifierModule } from 'angular-notifier';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonsModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: "right"
        },
        vertical: {
          position: "top"
        }

      },
      theme: "material"
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
