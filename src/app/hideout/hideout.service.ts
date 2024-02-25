import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideoutService {

  constructor() { }

foundStationsSubj = new Subject<any>();

  getHideoutStations() {
  fetch('https://api.tarkov.dev/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: `{
    hideoutStations {
      name
      id
      imageLink
      levels {
        level
        description
        constructionTime
        itemRequirements {
          item {
            name
            id
            buyFor {
              source
              price
  }
  }
  }
        crafts {
          requiredItems {
            item {
              name
              id
  }
  }
          rewardItems {
            item {
              name
              id
  }
          }
  }
        bonuses {
          name
          type
          value
          skillName
  }
      }
  }
}`})
})
  .then(r => r.json())
  .then(data =>  this.foundStationsSubj.next(data))
  }
}
