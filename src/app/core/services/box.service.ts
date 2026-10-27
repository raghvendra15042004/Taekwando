import { Injectable } from '@angular/core';
import { BoxConfig } from '../config/box.config';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor() { }

  public getBox(boxId: Number) {
    return ((new BoxConfig().defaults).filter(b => b.id == boxId))
  }
}
