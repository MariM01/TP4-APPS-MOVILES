import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Toast } from '@capacitor/toast'; // plugin capacitor
import { Preferences } from '@capacitor/preferences';// plugin Preferences

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public personajes: any[] = [];
  public personaje: any;
  public isModalOpen: boolean = false;
  private readonly STORAGE_KEY = 'personajes';

  constructor(private http: HttpClient, private router: Router, private alertController: AlertController) { 
    this.cargarPersonajes();
  }

  // guardo en los preferences
  public async guardarPersonajes() {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this.personajes),
    });
  }

  // cargo de los preferences
  public async cargarPersonajes() {
    try {
      const response = await Preferences.get({ key: this.STORAGE_KEY });
      if (response.value) {
        const result = JSON.parse(response.value);
        console.log(result); // Aquí puedes hacer lo que necesites con el resultado
      }
    } catch (error) {
      console.error('Error al cargar personajes:', error);
    }
  }
}

  public obtenerPersonaje() {
    const id = Math.floor(Math.random() * 671) + 1; // Genera un número aleatorio entre 1 y 671

    this.http.get(`https://rickandmortyapi.com/api/character/${id}`).subscribe((data: any) => {
      this.personajes.push(data);
      this.guardarPersonajes();
    });
  }

  private async mostrarAlerta(header: string, message: string) {
    const toast = async () => {
      await Toast.show({
        text: 'Se a eliminado un personaje!',
      });
    };
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
              this.guardarPersonajes()
            }

            // Mostrar una alerta de eliminación exitosa
            this.mostrarAlerta('Eliminado', 'El personaje ha sido eliminado correctamente.');
          }
        }
      ]
    });

    await alert.present();
  }


  public setOpen(set: boolean, personaje: any) {
    this.isModalOpen = set;
    this.personaje = personaje
  }

  public setClose(set: boolean, personaje: any) {
    this.isModalOpen = set;
    this.personaje = null;
  }
}