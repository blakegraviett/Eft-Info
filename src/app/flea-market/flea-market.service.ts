import { Injectable } from '@angular/core';
import { TarkovItemModel } from '../models/tarkov-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleaMarketService {
  // All subjects used in the tarkov market feature
  foundItemsSubj = new Subject<any>();
  slectedItemSubj = new Subject<any>();
  foundItemById = new Subject<any>()


  constructor() { }

// Restructores items to a new model
  restructorItem(item) {
    const restructoredItem: TarkovItemModel ={
      id: item.id,
      name: item.name,
      types: [item.types.join(', ')],
      iconLink: item.gridImageLink,
      size: item.width * item.height,
      sellFor: [item.sellFor],
      link: item.wikiLink,
      buyFor: [item.buyFor]
    }
    return restructoredItem;
  }

  // Get all items by there name
  getItemByNameArray(name: String) {
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
        width
        height
        iconLink
        link
        wikiLink
        id
        sellFor {
          price
          source
        }
      }
  }`})
  })
    .then(r => r.json())
    .then(data =>  this.foundItemsSubj.next(data))
    }

  // Get all items by there ID
    getItemByIdArray(id: String) {
      fetch('https://api.tarkov.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{
      itemsByIDs(ids: "${id}") {
        name
        types
        width
        height
        gridImageLink
        wikiLink
        id
        sellFor {
          price
          source
        }
        buyFor {
          price
          source
        }
      }
  }`})
  })
    .then(r => r.json())
    .then(data =>  this.foundItemById.next(data))
    }



  // Checks what trader is a specific item and give them the correct picture
    checkTraderImg(traderName: String) {
      if(traderName === 'prapor') {
         return '../../../../assets/images/traders/prapor.png'
      }
      if(traderName === 'therapist') {
         return'../../../../assets/images/traders/therapist.png'
      }
      if(traderName === 'fence') {
        return'../../../../assets/images/traders/fence.png'
     }
     if(traderName === 'skier') {
      return'../../../../assets/images/traders/Skier.png'
     }
     if(traderName === 'jaeger') {
      return'../../../../assets/images/traders/jaeger.png'
    }
    if(traderName === 'ragman') {
      return'../../../../assets/images/traders/ragman.png'
    }
    if(traderName === 'peacekeeper') {
      return'../../../../assets/images/traders/peacekeeper.png'
    }
    if(traderName === 'mechanic') {
      return'../../../../assets/images/traders/mechanic.png'
    }
    if(traderName === 'fleaMarket') {
      return'../../../../assets/images/traders/flea.png'
    }
  }
}
