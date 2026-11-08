/**
 * Pestaña "Fotos": interfaz de la galería.
 * Muestra las fotos en una cuadrícula y un botón flotante que abre la cámara.
 * Toda la lógica de cámara y almacenamiento está en PhotoService.
 */
import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg],
})
export class Tab2Page implements OnInit {
  constructor(public photoService: PhotoService) {
    addIcons({ camera });
  }


  async ngOnInit(): Promise<void> {
    await this.photoService.loadSaved();
  }


  addPhotoToGallery(): void {
    this.photoService.addNewToGallery();
  }
}
