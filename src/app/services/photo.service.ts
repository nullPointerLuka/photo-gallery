/**
 * 
 *
 * Encapsula las tres APIs de Capacitor que usa la galería:
 *  - Camera:      abre la cámara (nativa en Android, PWA Elements en navegador).
 *  - Filesystem:  guarda cada foto de forma permanente como archivo.
 *  - Preferences: guarda la lista de fotos (rutas de los archivos) para poder
 *                 volver a mostrarlas cuando se reabre la aplicación.
 */
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';


export interface UserPhoto {

  filepath: string;
  /** URL que usa la etiqueta <img> para mostrar la foto. */
  webviewPath?: string;
}

@Injectable({ providedIn: 'root' })
export class PhotoService {

  public photos: UserPhoto[] = [];

 
  private readonly PHOTO_STORAGE = 'photos';


  private readonly isNative = Capacitor.isNativePlatform();

  /**
   * Abre la cámara, guarda la foto tomada en el sistema de archivos
   * y la agrega al inicio de la galería.
   */
  public async addNewToGallery(): Promise<void> {
    // Tomar la foto con la cámara
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,   
      quality: 100,
    });

    // Guardarla de forma permanente en el sistema de archivos
    const savedImageFile = await this.savePicture(capturedPhoto);

    // Agregarla a la galería y persistir la lista actualizada
    this.photos.unshift(savedImageFile);
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos.map((p) => ({ filepath: p.filepath }))),
    });
  }

  /**
   * Carga la lista de fotos guardadas y reconstruye la URL de cada una.
   * Se llama al iniciar la pestaña de la galería.
   */
  public async loadSaved(): Promise<void> {
    // Recuperar la lista guardada en Preferences
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    const saved: UserPhoto[] = value ? JSON.parse(value) : [];

    for (const photo of saved) {
      if (this.isNative) {
        // Android: el archivo se muestra directamente con una URL convertida
        photo.webviewPath = Capacitor.convertFileSrc(photo.filepath);
      } else {
        // Navegador: los archivos viven en IndexedDB, hay que leerlos como base64
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    }

    this.photos = saved;
  }


  private async savePicture(photo: Photo): Promise<UserPhoto> {
    // Convertir la foto a base64, que es el formato que exige Filesystem.writeFile
    const base64Data = await this.readAsBase64(photo);


    const fileName = `${Date.now()}.jpeg`;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.isNative) {
      // Android: guardar la URI del archivo y generar la URL para mostrarla
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }

    // Navegador: se usa el nombre del archivo y la URL temporal de la foto capturada
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }

  /** Lee la foto capturada y la devuelve como cadena base64. */
  private async readAsBase64(photo: Photo): Promise<string> {
    if (this.isNative) {
      // Android: leer el archivo directamente desde su ruta
      const file = await Filesystem.readFile({ path: photo.path! });
      return file.data as string;
    }

    // Navegador: descargar el blob de la URL temporal y convertirlo a base64
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return this.convertBlobToBase64(blob);
  }

  /** Convierte un Blob en una cadena base64 (data URL). */
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
