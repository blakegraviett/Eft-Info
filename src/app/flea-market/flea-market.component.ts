import { Component } from '@angular/core';
import { FleaMarketService } from './flea-market.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flea-market',
  templateUrl: './flea-market.component.html',
  styleUrls: ['./flea-market.component.scss']
})
export class FleaMarketComponent {
  constructor( private fleaMarketService: FleaMarketService) {}
//  Subscriptions for the search bar
  foundItemsSub: Subscription
  foundItemsArray: any

  // Search Bar
  searchItemForm = new FormGroup({
    item: new FormControl('', Validators.required)
    });

    // search DB for the list of items by name when the user types
    onInput(){
      this.fleaMarketService.getItemByNameArray(this.searchItemForm.value.item)
      this.foundItemsSub = this.fleaMarketService.foundItemsSubj.subscribe((updateArray) => this.foundItemsArray = updateArray.data.itemsByName)
    }

  ngOnInit() {
    // Default input when page is loaded
  this.fleaMarketService.getItemByNameArray('labs')
  this.foundItemsSub = this.fleaMarketService.foundItemsSubj.subscribe((updateArray) => this.foundItemsArray = updateArray.data.itemsByName)
  }

  ngOnDestroy() {
    this.foundItemsSub.unsubscribe();
  }
}
