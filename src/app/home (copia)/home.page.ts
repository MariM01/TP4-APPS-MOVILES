import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public personajes: any[] = [];

  constructor(private http: HttpClient) {}

  obtenerPersonaje() {
    const id = Math.floor(Math.random() * 671) + 1; // Genera un número aleatorio entre 1 y 671

    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data: any) => {
      this.personajes.push(data); // Agrega el personaje a la lista
    });
  }
}
