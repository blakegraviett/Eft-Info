import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FleaMarketComponent } from './flea-market/flea-market.component';
import { ItemInfoComponent } from './flea-market/market-search-item/item-info/item-info.component';
import { MapsComponent } from './maps/maps.component';
import { MapInfoComponent } from './maps/map-info/map-info.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'quest', component: LandingPageComponent},
  {path: 'hideout', component: LandingPageComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'maps/:id', component: MapInfoComponent},
  {path: 'flea-market', component: FleaMarketComponent},
  {path: 'flea-market/item/:id', component: ItemInfoComponent},
  {path: 'shopping-list', component: LandingPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
