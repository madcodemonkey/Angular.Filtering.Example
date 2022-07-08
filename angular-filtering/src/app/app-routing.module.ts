import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './features/activity/activity.component';
import { UsersComponent } from './features/users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
