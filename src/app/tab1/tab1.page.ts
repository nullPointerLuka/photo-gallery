import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {}
