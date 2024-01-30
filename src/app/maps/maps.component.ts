import { Component } from '@angular/core';
import { MapsService } from './maps.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {
mapsSub: Subscription
map: {}

constructor( private mapsService: MapsService, private router: Router) {}
  // Search Bar
  searchMapForm = new FormGroup({
    map: new FormControl('', Validators.required)
    });

     onSubmit() {
      this.mapsService.getMapInfoByName(this.searchMapForm.value.map.toLowerCase())
      this.mapsSub = this.mapsService.mapSubj.subscribe((foundMap) => this.router.navigate([`/maps/${foundMap.id}`]))
    }

    ngOnInit() {
      this.mapsSub = this.mapsService.mapSubj.subscribe((foundMap) => this.map = foundMap)
    }

    ngOnDestroy() {
      this.mapsSub.unsubscribe()
    }
}
