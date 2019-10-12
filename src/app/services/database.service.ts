import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs';

export interface Report {
  id: number,
  masa: any[],
  temperature: number[],
  humidity: number,
  moisture: number

}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
}
