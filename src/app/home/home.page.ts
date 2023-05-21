import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public personajes: any[] = [];
  public personaje: any;
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  //constructor() {}
  public obtenerPersonaje() {
    const id = Math.floor(Math.random() * 671) + 1; // Genera un número aleatorio entre 1 y 671

    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data: any) => {this.personajes.push(data);});
  }

  public eliminarPersonaje(personaje: any) {
    // Ejemplo de implementación:
    const index = this.personajes.indexOf(personaje);
    if (index !== -1) {
      this.personajes.splice(index, 1); // Elimina el personaje del arreglo
    }
  }

  public setOpen(set:boolean, personaje:any)
  {
    this.isModalOpen = set;
    this.personaje = personaje
  }

  public setClose(set:boolean, personaje:any)
  {
    this.isModalOpen = set;
    this.personaje = null;
  }
}