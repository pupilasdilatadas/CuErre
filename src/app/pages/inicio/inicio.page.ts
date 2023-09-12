import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  formatsEnabled: BarcodeFormat[]=[BarcodeFormat.QR_CODE];

  nombreBienvenido: string="";
  listaUsuarios: any[] = [];
  listaDatos: any[] = [];

  constructor(private router: Router) {
    const usuariosStorage = localStorage.getItem('BIENVENIDO');
    if (usuariosStorage) {
      this.listaUsuarios = JSON.parse(usuariosStorage);
    }
  }

  ngOnInit() {

    const nombreUsuarioIngresado = this.listaUsuarios;

    const usuarioEncontrado = this.listaUsuarios.find(
      (user) => user.username === nombreUsuarioIngresado
    );


    this.nombreBienvenido = `${nombreUsuarioIngresado}`;
  }

  ngOnDestroy() {
    localStorage.removeItem('BIENVENIDO');
  }
  nombre(){
    localStorage.setItem('BIENVENIDO',JSON.stringify(''));
    console.log("Hola!")
  }

  handleQrCodeResult(event:any){
    this.extractText(event);
    this.router.navigate(['/asistencia']);
  }

  extractText(qrStr:string){
    const regex = /([^:]+):\s*([^,]+)/g;
    const valores = [];
    let match;
    while ((match = regex.exec(qrStr)) !== null) {
      const clave = match[1].trim();
      const valor = match[2].trim();
      valores.push(valor);
    }
    let datosUsuario;
    let usersJSON = localStorage.getItem('users');
    if (usersJSON){
      let usersList = JSON.parse(usersJSON);
      console.log(usersList);
      let user = usersList.find((object: { username: string; }) => object.username === this.nombreBienvenido);
      this.listaDatos.push({
        nombreProfesor: valores[0],
        hora: valores[1],
        sala: valores[2],
        dia: valores[3],
        alumno: user.nombre,
        rutAlumno: user.rut
      });
      localStorage.setItem('asistencia',JSON.stringify(this.listaDatos));
      this.listaDatos=[];
    }
  }

}
