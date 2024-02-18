import { Component } from '@angular/core';
import { QuestService } from './quest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quest-search',
  templateUrl: './quest-search.component.html',
  styleUrls: ['./quest-search.component.scss']
})
export class QuestSearchComponent {
  constructor( private questService: QuestService) {}
  foundQuestArray
  foundQuestsSub: Subscription
// Search Bar
searchQuestForm = new FormGroup({
  quest: new FormControl('', Validators.required)
  });

  // search DB for the list of items by name when the user types
  onInput(){
    this.foundQuestArray = this.questService.getQuestByName(this.searchQuestForm.value.quest)
    this.foundQuestsSub = this.questService.foundQuestsSubj.subscribe((updatedQuestArr) => this.foundQuestArray = updatedQuestArr)
  }

  ngOnInit() {
    this.foundQuestArray = this.questService.getQuestByName('Tark')
    this.foundQuestsSub = this.questService.foundQuestsSubj.subscribe((updatedQuestArr) => this.foundQuestArray = updatedQuestArr)
  }

  ngOnDestroy() {
    this.foundQuestsSub.unsubscribe()
  }
}
