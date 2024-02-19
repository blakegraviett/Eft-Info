import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  foundQuestsSubj = new Subject<any>()
  foundQuestsFromTarkovDevSubj = new Subject<any>()

  constructor() { }
// Get the quest by Name from my own DB (with autocompleted search tool)
  async getQuestByName(searchedName) {
    const response = await fetch(`https://eft-info.onrender.com/api/v1/quests?name=${searchedName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const quests = await response.json()
    this.foundQuestsSubj.next(quests)
}

// Get single quest by ID from my own DB
async getQuestByID(id) {
  const response = await fetch(`https://eft-info.onrender.com/api/v1/quests/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const quests = await response.json()
  this.foundQuestsSubj.next(quests)
}

// Get the quest by name from the Tarkov.Dev DB for additional information
getQuestFromTarkovDev(name: String) {
   fetch('https://api.tarkov.dev/graphql', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
},
body: JSON.stringify({query: `{
  tasks {
    name
    wikiLink
    taskImageLink
    minPlayerLevel
    experience
    map {
      name
      id
}
    objectives {
    description
    }
    trader {
      name
      imageLink
}
    finishRewards {
      craftUnlock {
        level
        rewardItems {
          item {
            name
            id
}
}
        station{
        name
}
}
      offerUnlock{
        item {
          name
          id
}
        level
        trader{
          name
          imageLink
}
      }
      items {
        quantity
        item{
        name
        id
}
}
}
    taskRequirements{
      task {
        name
      }
}
}
}`})
})
.then(r => r.json())
.then(data =>  this.foundQuestsFromTarkovDevSubj.next(data.data.tasks.filter((quest) => quest.name === name)))
}

}
