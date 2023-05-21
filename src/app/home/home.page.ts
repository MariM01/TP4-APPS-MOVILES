import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public personajes: any[] = [];
  public personaje: any;
  public isModalOpen: boolean = false;

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { }


  //constructor() {}
  public obtenerPersonaje() {
    const id = Math.floor(Math.random() * 671) + 1; // Genera un número aleatorio entre 1 y 671

    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data: any) => {this.personajes.push(data);});
  }


  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
  public async eliminarPersonaje(personaje: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este personaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            // Eliminar el personaje
            const index = this.personajes.indexOf(personaje);
            if (index !== -1) {
              this.personajes.splice(index, 1);
            }
  
            // Mostrar una alerta de eliminación exitosa
            this.mostrarAlerta('Eliminado', 'El personaje ha sido eliminado correctamente.');
          }
        }
      ]
    });
  
    await alert.present();
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