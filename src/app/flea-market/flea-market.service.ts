import { Injectable } from '@angular/core';
import { TarkovItemModel } from '../models/tarkov-item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleaMarketService {
  foundItemsSubj = new Subject<any>();
  slectedItemSubj = new Subject<any>();
  foundItemById = new Subject<any>()


  constructor() { }

  restructorItem(item) {
    const restructoredItem: TarkovItemModel ={
      id: item.id,
      name: item.name,
      types: [item.types.join(', ')],
      iconLink: item.gridImageLink,
      size: item.width.toString() + 'x' + item.height.toString(),
      sellFor: [item.sellFor],
      link: item.wikiLink
    }
    return restructoredItem;
  }

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
        avg24hPrice
        basePrice
        width
        height
        changeLast48hPercent
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
      }
  }`})
  })
    .then(r => r.json())
    .then(data =>  this.foundItemById.next(data))
    }




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
