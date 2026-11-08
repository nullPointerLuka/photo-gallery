/**
 * Página contenedora de las pestañas (barra inferior de navegación).
 * Se registran los iconos de ionicons que se usan en la barra.
 */
import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipse, images, square, triangle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor() {
    // En componentes standalone cada icono debe registrarse explícitamente
    addIcons({ triangle, ellipse, square, images });
  }
}
