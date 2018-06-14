
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/auth.module';
import { AppRoutesModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Services
import { AuthGuard } from './guards/auth.guard.service';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AdminModule} from './admin/admin.module';
import { UserModule } from './user/user.module';
import {AdminGuard} from './guards/admin.guard.service'






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactsComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    AppRoutesModule,
    AdminModule,
    UserModule,
   
  ],
  providers: [
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
