import { Component } from '@angular/core';
import { MapsService } from '../maps.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TarkovMapModel } from 'src/app/models/tarkov-map.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss']
})
export class MapInfoComponent {
  constructor( private mapsService: MapsService,  private route: ActivatedRoute) {}
  selectedMap: TarkovMapModel
  selectedMapSub: Subscription;


  //Check to see if woods or groundzero
  checkMapHeight(name) {
    if(name == 'Woods') {
      return true
    }
    if(name == 'Ground Zero') {
      return true
    }
  }

  checkMapKey(name) {
    if(name == 'Factory') {
      return true
    }
    if(name == 'Ground Zero') {
      return true
    }
    if(name == 'Woods') {
      return true
    }
  }

  // Removes any duplicates of keys
  removeDuplicates(keyArr) {
     const filterArr = keyArr.filter((obj, index) => keyArr.findIndex((item) => item.key.name === obj.key.name) === index
    );
    return filterArr;
  }

  ngOnInit() {
    // Get the selected item's ID and search the DB for the chosen item
    this.route.params.subscribe((params: Params) => {
      const mapId = params['id'];
      this.mapsService.getMapInfoByID(mapId);
      this.selectedMapSub = this.mapsService.mapIdSubj.subscribe((item) => this.selectedMap = item)
    })
  }

  ngOnDestroy() {
    this.selectedMapSub.unsubscribe();
  }
}
