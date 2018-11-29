import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'users/:id', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
