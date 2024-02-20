import { Component } from '@angular/core';
import { QuestService } from '../../quest.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-found-quest',
  templateUrl: './found-quest.component.html',
  styleUrls: ['./found-quest.component.scss']
})
export class FoundQuestComponent {
  constructor( private questService: QuestService,  private route: ActivatedRoute, public sanitizer: DomSanitizer, private router: Router) {}
  foundQuestsSub: Subscription
  foundTarkovDevQuestSub: Subscription
  foundQuest
  foundQuestID
  foundQuestYtLink

  ngOnInit() {
    // Subscribe to the route to get the id
    this.route.params.subscribe(async (params: Params) => {
      const itemId = params['id'];
      // Find the single quest by ID in my own DB to get YT link and name
      this.questService.getQuestByID(itemId);
      this.foundQuestsSub =  this.questService.foundQuestsSubj.subscribe(
        (quest) => {
          // Use the name to get the right quest from the Tarkov.dev DB to get other information an
          this.questService.getQuestFromTarkovDev(quest.data.quest.name)
          // Return the YT link from my DB
          this.foundQuestYtLink = this.getYtVideoId(quest.data.quest.ytLink);
        }
      )
      // Subscribe to get the found quest
      this.foundTarkovDevQuestSub = this.questService.foundQuestsFromTarkovDevSubj.subscribe((quest) => this.foundQuest = quest[0]);
    })
  }

  ngOnDestroy() {
    this.foundQuestsSub.unsubscribe()
    this.foundTarkovDevQuestSub.unsubscribe()
  }

  // GET THE ID FROM THE LINK AND CHECK IF THERE IS A LINK
  getYtVideoId(ytLink) {
    console.log(ytLink)
    if(ytLink != 'NA') {
    return ytLink.split('=').pop()
    }
    if(ytLink === 'NA') {
      return 'NA'
    }
  }

  async getQuestIdByName(questName) {
    const quest = await this.questService.getSingleQuestByName(questName)
    console.log(quest.data.quest[0]._id)
    this.router.navigate([`/quest/${quest.data.quest[0]._id}`]);
  }

}
