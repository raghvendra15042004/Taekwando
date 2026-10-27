import { Injectable } from '@angular/core';
import { BundleConfig } from '../config/bundle.config';

@Injectable({
  providedIn: 'root'
})
export class BundleService {

  constructor() { }

  public getBundle(bundleId: Number) {
    return ((new BundleConfig().defaults).filter(b => b.id == bundleId))
  }

  public getBundlesByBoxId(boxId: Number) {
    return ((new BundleConfig().defaults).filter(b => b.boxId == boxId))
  }
}
