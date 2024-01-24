import { Component } from '@angular/core';
import { FleaMarketService } from './flea-market.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flea-market',
  templateUrl: './flea-market.component.html',
  styleUrls: ['./flea-market.component.scss']
})
export class FleaMarketComponent {
  constructor( private fleaMarketService: FleaMarketService) {}

  foundItemsSub: Subscription
  foundItemsArray: any

  ngOnInit() {
  this.fleaMarketService.getItemByNameArray('m4')
  this.foundItemsSub = this.fleaMarketService.foundItemsSubj.subscribe((updateArray) => this.foundItemsArray = updateArray.data.itemsByName)
  }

  ngOnDestroy() {
    this.foundItemsSub.unsubscribe();
  }
}
