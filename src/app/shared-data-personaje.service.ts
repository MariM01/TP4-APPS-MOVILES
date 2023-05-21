import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class SharedDataService {
  private personaje: any;

  constructor() {}

  setPersonaje(personaje: any) {
    this.personaje = personaje;
  }

  getPersonaje() {
    return this.personaje;
  }
}
