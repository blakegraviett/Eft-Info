import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quest-search-item',
  templateUrl: './quest-search-item.component.html',
  styleUrls: ['./quest-search-item.component.scss']
})
export class QuestSearchItemComponent {
  // Import the searched for item
  @Input() quest
}
