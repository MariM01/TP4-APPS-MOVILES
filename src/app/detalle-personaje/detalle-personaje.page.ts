import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '..//shared-data-personaje.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.page.html',
  styleUrls: ['./detalle-personaje.page.scss'],
})
export class DetallePersonajePage implements OnInit {
  personaje: any;

    
  constructor(private sharedDataService: SharedDataService, private navCtrl: NavController) {}

  ngOnInit() {
    this.personaje = this.sharedDataService.getPersonaje();
  }

  volverAInicio() {
    this.navCtrl.navigateBack('/home');
  }

}
