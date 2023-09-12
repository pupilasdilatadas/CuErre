import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  dataList: any[] = []

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    let dataJSON = localStorage.getItem('asistencia');
    if (dataJSON) {
      this.dataList = JSON.parse(dataJSON);
    }
  }

}
