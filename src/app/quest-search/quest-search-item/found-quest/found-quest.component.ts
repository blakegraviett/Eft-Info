import { Component } from '@angular/core';
import { QuestService } from '../../quest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-found-quest',
  templateUrl: './found-quest.component.html',
  styleUrls: ['./found-quest.component.scss']
})
export class FoundQuestComponent {
  constructor( private questService: QuestService,  private route: ActivatedRoute) {}
  foundQuestsSub: Subscription
  foundTarkovDevQuestSub: Subscription
  foundQuest
  foundQuestYtLink

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      const itemId = params['id'];
      this.questService.getQuestByID(itemId);
      this.foundQuestsSub =  this.questService.foundQuestsSubj.subscribe(
        (quest) => {
          this.questService.getQuestFromTarkovDev(quest.data.quest.name)
          this.foundQuestYtLink = quest.data.quest.ytLink;

        }
      )
      this.foundTarkovDevQuestSub = this.questService.foundQuestsFromTarkovDevSubj.subscribe((quest) => this.foundQuest = quest);
    })
  }

  ngOnDestroy() {
    this.foundQuestsSub.unsubscribe()
    this.foundTarkovDevQuestSub.unsubscribe()
  }

  log(){
    console.log(this.foundQuestYtLink);
  }

}
