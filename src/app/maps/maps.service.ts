import { Injectable } from '@angular/core';
import { TarkovMapModel } from '../models/tarkov-map.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  mapSubj = new Subject<TarkovMapModel>();
  mapIdSubj = new Subject<TarkovMapModel>();

  constructor() { }

  // Restructure map to TarkovMapModel
  restructuredMap(map: any) {
    const restructoredItem: TarkovMapModel = {
      id: map.id,
      name: map.name,
      raidTime: map.raidDuration,
      numPlayers: map.players,
      enemies: map.enemies,
      keys: map.locks,
      mapImageLink: this.findMapImageLink(map.name)
    }
    return restructoredItem;
  }

  // Get map info from api by name
  getMapInfoByName(mapName){
     fetch('https://api.tarkov.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: `{
      maps {
        id
        name
      }
  }`})
  })
    .then(r => r.json())
    .then(data => this.mapSubj.next(this.restructuredMap(data.data.maps.filter(function (el) {
      return el.name.toLowerCase() == mapName.toLowerCase();
    })[0])))
}

  // Get map info from api by ID
getMapInfoByID(mapId){
  fetch('https://api.tarkov.dev/graphql', {
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
 },
 body: JSON.stringify({query: `{
  maps {
    name
    id
    enemies
    raidDuration
    players
    locks{
      key{
        name
        id
        iconLink
  }
  }
  }
}`})
})
 .then(r => r.json())
 .then(data => this.mapIdSubj.next(this.restructuredMap(data.data.maps.filter(function (el) {
   return el.id == mapId;
 })[0])))
}

// Search for what Image link to send to map model
findMapImageLink(mapName) {
  if(mapName == 'Factory') {
    return 'https://tarkov.dev/maps/factory-3d.jpg';
  }
  if(mapName == 'Customs') {
    return 'https://tarkov.dev/maps/customs-2d.jpg';
  }
  if(mapName == 'Ground Zero') {
    return 'https://tarkov.dev/maps/ground-zero-2d.jpg';
  }
  if(mapName == 'Interchange') {
    return 'https://tarkov.dev/maps/interchange-2d.jpg';
  }
  if(mapName == 'Lighthouse') {
    return 'https://tarkov.dev/maps/lighthouse-2d-landscape.jpg';
  }
  if(mapName == 'Reserve') {
    return 'https://tarkov.dev/maps/reserve-2d.jpg';
  }
  if(mapName == 'Streets of Tarkov') {
    return 'https://tarkov.dev/maps/streets-2d.jpg';
  }
  if(mapName == 'Shoreline') {
    return 'https://tarkov.dev/maps/shoreline-2d.jpg';
  }
  if(mapName == 'The Lab') {
    return 'https://tarkov.dev/maps/labs-2d.jpg';
  }
  if(mapName == 'Woods') {
    return 'https://tarkov.dev/maps/woods-2d.jpg';
  }
}
}

