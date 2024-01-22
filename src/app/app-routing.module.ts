import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'quest', component: LandingPageComponent},
  {path: 'hideout', component: LandingPageComponent},
  {path: 'maps', component: LandingPageComponent},
  {path: 'flea-market', component: LandingPageComponent},
  {path: 'shopping-list', component: LandingPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
