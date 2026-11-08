import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Configuración de Capacitor.
 * - appId:  identificador del paquete Android.
 * - appName: nombre que se muestra en el dispositivo.
 */
const config: CapacitorConfig = {
  appId: 'com.example.photogallery',
  appName: 'photo-gallery',
  webDir: 'www',
};

export default config;
