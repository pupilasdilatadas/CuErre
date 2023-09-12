import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  dataList: any[] = []

  constructor(private alertController: AlertController,private router: Router) { }

  ngOnInit() {
    let dataJSON = localStorage.getItem('asistencia');
    if (dataJSON) {
      this.dataList = JSON.parse(dataJSON);
    }
    this.mostrarExitoso();
  }

  ngOnDestroy(){
    localStorage.removeItem('asistencia');
  }

  backHome(){
    this.router.navigate(['/login']);
  }

  async mostrarExitoso() {
    const alert = await this.alertController.create({
      header: 'Quedaste Presente!',
      message: 'Asistencia Registrada con exito!',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
