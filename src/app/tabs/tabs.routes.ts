/**
 * Rutas de la plantilla "tabs". Cada pestaña carga su página de forma diferida.
 * La galería de fotografías vive en la pestaña "photos" (tab2).
 */
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      // Pestaña inicial: la galería de fotografías
      { path: '', redirectTo: '/tabs/tab2', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/tab2', pathMatch: 'full' },
];
