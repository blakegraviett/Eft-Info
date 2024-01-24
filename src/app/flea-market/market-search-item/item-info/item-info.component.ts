import { Component } from '@angular/core';
import { FleaMarketService } from '../../flea-market.service';
import { Subscription } from 'rxjs';
import { TarkovItemModel } from 'src/app/models/tarkov-item.model';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent {
  constructor( private fleaMarketService: FleaMarketService,  private route: ActivatedRoute,
    private router: Router,) {}
  slectedItemSub: Subscription
  selectedItem: TarkovItemModel


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const itemName = params['name'];
      this.fleaMarketService.getItemByNameArray(itemName);
      this.slectedItemSub = this.fleaMarketService.foundItemsSubj.subscribe((item) => this.selectedItem = this.fleaMarketService.restructorItem(item.data.itemsByName[0]))
    })
  }

  ngOnDestroy() {
    this.slectedItemSub.unsubscribe()
  }
}
