import { Component } from '@angular/core';
import { MapsService } from './maps.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {
mapsSub: Subscription
map

constructor( private mapsService: MapsService) {}
  // Search Bar
  searchItemForm = new FormGroup({
    map: new FormControl('', Validators.required)
    });

    log() {
      console.log(this.map)
    }

    onSubmit() {
      this.mapsService.getMapInfoByName(this.searchItemForm.value.map.toLowerCase())
      this.mapsSub = this.mapsService.mapSubj.subscribe((foundMap) => this.map = foundMap)
    }

    ngOnInit() {

    }

    ngOnDestroy() {
      this.mapsSub.unsubscribe()
    }
}
