/**
 * Rutas principales. La ruta raíz carga (de forma diferida) las rutas del
 * componente de pestañas definidas en tabs/tabs.routes.ts.
 */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];
