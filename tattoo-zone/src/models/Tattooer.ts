import { Location } from './Location';
import { TattooStyle } from './TattooStyle';

/**
 * Clase Tattooer - Representa un tatuador con toda su información
 */
export class Tattooer {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public specialties: TattooStyle[];
  public location: Location;
  public rating: number;
  public portfolio: string[]; // URLs de imágenes
  public experienceYears: number;
  public isActive: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    specialties: TattooStyle[],
    location: Location,
    rating: number = 0,
    experienceYears: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.specialties = specialties;
    this.location = location;
    this.rating = rating;
    this.experienceYears = experienceYears;
    this.portfolio = [];
    this.isActive = true;
  }

  /**
   * Verifica si el tatuador está disponible para nuevos trabajos
   */
  isAvailable(): boolean {
    return this.isActive && this.rating >= 3.0;
  }

  /**
   * Calcula la distancia desde una ubicación dada
   */
  getDistanceFrom(userLocation: Location): number {
    return this.location.calculateDistance(userLocation);
  }

  /**
   * Obtiene la URL de contacto por WhatsApp
   */
  getContactUrl(): string {
    const message = `Hola ${this.name}, vi tu perfil en TattooZone y me interesa tu trabajo.`;
    return `whatsapp://send?phone=${this.phone}&text=${encodeURIComponent(message)}`;
  }

  /**
   * Verifica si el tatuador se especializa en un estilo específico
   */
  specializesIn(style: TattooStyle): boolean {
    return this.specialties.some(specialty => specialty.name === style.name);
  }

  /**
   * Obtiene el estilo principal del tatuador
   */
  getPrimaryStyle(): TattooStyle {
    return this.specialties[0] || new TattooStyle('General', 'Estilo general');
  }
}
