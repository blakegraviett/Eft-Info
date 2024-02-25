import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FleaMarketComponent } from './flea-market/flea-market.component';
import { ItemInfoComponent } from './flea-market/market-search-item/item-info/item-info.component';
import { MapsComponent } from './maps/maps.component';
import { MapInfoComponent } from './maps/map-info/map-info.component';
import { QuestSearchComponent } from './quest-search/quest-search.component';
import { FoundQuestComponent } from './quest-search/quest-search-item/found-quest/found-quest.component';
import { HideoutComponent } from './hideout/hideout.component';
import { StationComponent } from './hideout/station/station.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'quest', component: QuestSearchComponent},
  {path: 'quest/:id', component: FoundQuestComponent},
  {path: 'hideout', component: HideoutComponent},
  {path: 'hideout/:id', component: StationComponent},
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
