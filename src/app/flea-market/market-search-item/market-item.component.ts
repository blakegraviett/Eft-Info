import { Component, Input } from '@angular/core';
import { FleaMarketService } from '../flea-market.service';
import { TarkovItemModel } from 'src/app/models/tarkov-item.model';

@Component({
  selector: 'app-market-item',
  templateUrl: './market-item.component.html',
  styleUrls: ['./market-item.component.scss']
})
export class MarketItemComponent {
  constructor( private fleaMarketService: FleaMarketService) {}
 @Input() item

}
