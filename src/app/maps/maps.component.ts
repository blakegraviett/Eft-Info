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

constructor( private mapsService: MapsService, private router: Router) {}
  // Search Bar
  searchItemForm = new FormGroup({
    map: new FormControl('', Validators.required)
    });

    async onSubmit() {
      this.mapsService.getMapInfoByName(this.searchItemForm.value.map.toLowerCase())
      this.mapsSub = this.mapsService.mapSubj.subscribe((foundMap) => this.router.navigate([`/maps/${foundMap.id}`]))
    }

    ngOnInit() {

    }

    ngOnDestroy() {
      this.mapsSub.unsubscribe()
    }
}
