import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'app/shared/footer/footer.module';
import { NavbarModule } from 'app/shared/navbar/navbar.module';
import { SidebarModule } from 'app/sidebar/sidebar.module';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminLayoutComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
})
export class CommonsModule { }
