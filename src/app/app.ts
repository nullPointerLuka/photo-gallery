/**
 * Componente raíz. Solo contiene el contenedor de Ionic (<ion-app>) y el
 * <ion-router-outlet>, donde se cargan las páginas según la ruta activa.
 */
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  imports: [IonApp, IonRouterOutlet],
})
export class App {}
