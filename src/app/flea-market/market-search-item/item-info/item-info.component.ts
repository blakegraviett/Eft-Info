import { Component } from '@angular/core';
import { FleaMarketService } from '../../flea-market.service';
import { Subscription } from 'rxjs';
import { TarkovItemModel } from 'src/app/models/tarkov-item.model';
import { ActivatedRoute, Params,} from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent {
  constructor( private fleaMarketService: FleaMarketService,  private route: ActivatedRoute) {}

  slectedItemSub: Subscription
  traderImg: String
  selectedItem

   sortByPrice() {
    let highestItem = this.selectedItem.sellFor[0][0];

    this.selectedItem.sellFor[0].forEach(item => {
      if (item.price > highestItem.price) {
        highestItem = item;
      }
    })
     return {
      source: highestItem.source,
      pricePerSlot: Math.round(highestItem.price / this.selectedItem.size)
    }
  }

  ngOnInit() {
    // Get the selected item's ID and search the DB for the chosen item
    this.route.params.subscribe((params: Params) => {
      const itemId = params['id'];
      this.fleaMarketService.getItemByIdArray(itemId);
      this.slectedItemSub = this.fleaMarketService.foundItemById.subscribe((item) => this.selectedItem = this.fleaMarketService.restructorItem(item.data.itemsByIDs[0]))
    })
  }

  ngOnDestroy() {
    this.slectedItemSub.unsubscribe()
  }
}
