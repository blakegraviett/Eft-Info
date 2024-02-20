import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FleaMarketComponent } from './flea-market/flea-market.component';
import { MarketItemComponent } from './flea-market/market-search-item/market-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemInfoComponent } from './flea-market/market-search-item/item-info/item-info.component';
import { MapsComponent } from './maps/maps.component';
import { MapInfoComponent } from './maps/map-info/map-info.component';
import { QuestSearchComponent } from './quest-search/quest-search.component';
import { QuestSearchItemComponent } from './quest-search/quest-search-item/quest-search-item.component';
import { FoundQuestComponent } from './quest-search/quest-search-item/found-quest/found-quest.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    FleaMarketComponent,
    MarketItemComponent,
    ItemInfoComponent,
    MapsComponent,
    MapInfoComponent,
    QuestSearchComponent,
    QuestSearchItemComponent,
    FoundQuestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
