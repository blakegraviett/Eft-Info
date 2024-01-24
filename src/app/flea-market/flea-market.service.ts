import { Injectable } from '@angular/core';
import { TarkovItemModel } from '../models/tarkov-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleaMarketService {
  foundItemsSubj = new Subject<any>();

  foundItems = [];

  constructor() { }


  getItemByNameArray(name) {

      fetch('https://api.tarkov.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{
      itemsByName(name: "${name}") {
        name
        types
        avg24hPrice
        basePrice
        width
        height
        changeLast48hPercent
        iconLink
        link
        sellFor {
          price
          source
        }
      }
  }`})
  })
    .then(r => r.json())
    .then(data =>  this.foundItemFunc(data))
    }

    foundItemFunc(data: any) {
      console.log(data)
      this.foundItemsSubj.next(data)
    }

  }

