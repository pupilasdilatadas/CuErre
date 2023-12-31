import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController desde Ionic

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  username: string = '';
  rut: string = '';
  usuariosLista: any[] = [];

  constructor(
    private router: Router, //para navegar entre pages
    private alertController: AlertController) {
    const usuariosStorage = localStorage.getItem('users');
    if (usuariosStorage) {
      this.usuariosLista = JSON.parse(usuariosStorage);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.username = '';
    this.rut = '';
  }

  async mostrarMensajeUsuario(contrasena: string, usuario: string) {
    const alert = await this.alertController.create({
      header: 'Usuario Encontrado',
      message: `El nombre de usuario es: ${usuario} y la contraseña es: ${contrasena}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async mostrarMensajeNo(usuario: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `El usuario ${usuario} no existe!`,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async mostrarMensajeNoRut() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El Rut ingresado es erroneo',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  recuperar(){
    if (this.username){
      const usuarioExistente = this.usuariosLista.find(
        (user) => user.username === this.username
      );
      if (usuarioExistente){
        if (usuarioExistente.rut == this.rut){
          this.mostrarMensajeUsuario(usuarioExistente.password, usuarioExistente.username);
        }else{
          this.mostrarMensajeNoRut();
        }
      }else{
        this.mostrarMensajeNo(this.username);
      }
    }
  }

  registrar() {
    if (this.username) {
      const usuarioExistente = this.usuariosLista.find(
        (user) => user.username === this.username
      );
      if (usuarioExistente) {
        this.mostrarMensajeUsuario(usuarioExistente.password, usuarioExistente.username);
      } else {
        console.log('Este usuario no existe');
        this.mostrarMensajeNo(this.username)      }
    } else {

    }
  }

}
