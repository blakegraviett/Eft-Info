import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HideoutService } from './hideout.service';

@Component({
  selector: 'app-hideout',
  templateUrl: './hideout.component.html',
  styleUrls: ['./hideout.component.scss']
})
export class HideoutComponent {
  hideoutStationsSub: Subscription
  stationsArr: any

  constructor(private hideoutService: HideoutService) { }

  ngOnInit() {
    this.hideoutService.getHideoutStations()
    this.hideoutStationsSub = this.hideoutService.foundStationsSubj.subscribe((stations) => this.stationsArr = stations.data.hideoutStations)
  }

  ngOnDestroy() {
    this.hideoutStationsSub.unsubscribe()
  }

  log() {
    console.log(this.stationsArr)
  }
}
