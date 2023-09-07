import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController desde Ionic


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  usuariosLista: any[] = [];

  constructor(
    private router: Router, //para navegar entre pages
    private alertController: AlertController
    ) { }

  ngOnInit() {
    
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.usuariosLista = JSON.parse(storedUsers);
    }

  }

  async mostrarMensajeError() { //await solo se permite en funciones async
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'If you got questions or you need advice, then talk to God Cause Hes the only one that listens even when you think He isnt',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

    registrar() {
      // Validar que se hayan ingresado datos en los campos
      if (this.username && this.password) {
        // Crear un objeto con los datos ingresados
        const userData = {
          username: this.username,
          password: this.password,
        };

        // Agregar el objeto a la lista
        this.usuariosLista.push(userData);

        // Guardar la lista en el localStorage
        localStorage.setItem('users', JSON.stringify(this.usuariosLista));

        // Limpiar los campos de entrada
        this.username = '';
        this.password = '';
        this.router.navigate(["/login"])
      } else{
        console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        this.mostrarMensajeError();
      }
    }

}
