import { Location } from './Location';
import { Tattooer } from './Tattooer';

/**
 * Clase User - Representa un usuario de la aplicación TattooZone
 */
export class User {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public location: Location | null;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    location: Location | null = null
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.location = location;
  }

  /**
   * Contacta a un tatuador vía WhatsApp
   */
  contactViaWhatsApp(tattooer: Tattooer): void {
    const message = `Hola ${tattooer.name}, soy ${this.name} y vi tu perfil en TattooZone. Me interesa tu trabajo.`;
    const url = `whatsapp://send?phone=${tattooer.phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /**
   * Establece la ubicación del usuario
   */
  setLocation(location: Location): void {
    this.location = location;
  }

  /**
   * Verifica si el usuario tiene ubicación configurada
   */
  hasLocation(): boolean {
    return this.location !== null;
  }

  /**
   * Obtiene la distancia a un tatuador si tiene ubicación
   */
  getDistanceToTattooer(tattooer: Tattooer): number | null {
    if (!this.location) return null;
    return tattooer.getDistanceFrom(this.location);
  }

  /**
   * Representación en string del usuario
   */
  toString(): string {
    return `${this.name} (${this.email})`;
  }
}
