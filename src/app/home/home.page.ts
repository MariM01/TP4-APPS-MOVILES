import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedDataService } from '../shared-data-personaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public personajes: any[] = [];

  constructor(private http: HttpClient, private router: Router,
    private navCtrl: NavController,
    private sharedDataService: SharedDataService) {}
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

  verDetalles(personaje: any) {
    this.sharedDataService.setPersonaje(personaje);
    this.navCtrl.navigateForward('/detalle-personaje');
  }
}
