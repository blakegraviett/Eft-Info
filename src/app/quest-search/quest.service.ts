import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  foundQuestsSubj = new Subject<any>()
  foundQuestsFromTarkovDevSubj = new Subject<any>()

  constructor() { }


  async getQuestByName(searchedName) {
    const response = await fetch(`https://eft-info.onrender.com/api/v1/quests?name=${searchedName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const quests = await response.json()
    console.log(quests)
    this.foundQuestsSubj.next(quests)
}

async getQuestByID(id) {
  const response = await fetch(`https://eft-info.onrender.com/api/v1/quests/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const quests = await response.json()
  console.log(quests)
  this.foundQuestsSubj.next(quests)
}

getQuestFromTarkovDev(name: String) {
  console.log(name)
   fetch('https://api.tarkov.dev/graphql', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
},
body: JSON.stringify({query: `{
  tasks {
    name
}
}`})
})
.then(r => r.json())
.then(data =>  this.foundQuestsFromTarkovDevSubj.next(data.data.tasks.filter((quest) => quest.name === name)))
}


}
