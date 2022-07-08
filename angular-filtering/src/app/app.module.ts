import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActivityComponent } from './features/activity/activity.component';
import { UsersComponent } from './features/users/users.component';
import { RoleListComponent } from './features/users/shared/role-list/role-list.component';
import { InputDebouncedComponent } from './features/shared/input-debounced/input-debounced.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ActivityComponent,
    UsersComponent,
    RoleListComponent,
    InputDebouncedComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
