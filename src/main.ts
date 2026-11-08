/**
 * Punto de entrada de la aplicación.
 *
 * 1. Registra los "PWA Elements" de Ionic. Estos componentes web aportan la
 *    interfaz de cámara cuando la app se ejecuta en el NAVEGADOR (en Android
 *    el plugin de cámara usa la aplicación de cámara nativa y no los necesita).
 * 2. Arranca la aplicación Angular en modo standalone (sin NgModules).
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { appConfig } from './app/app.config';
import { App } from './app/app';


defineCustomElements(window);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
