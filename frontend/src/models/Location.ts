/**
 * Clase Location - Maneja coordenadas geográficas y cálculos de distancia
 */
export class Location {
  public lat: number;
  public lng: number;
  public address?: string;

  constructor(lat: number, lng: number, address?: string) {
    this.lat = lat;
    this.lng = lng;
    this.address = address;
  }

  /**
   * Calcula la distancia en kilómetros entre esta ubicación y otra
   * Utiliza la fórmula de Haversine para cálculos precisos
   */
  calculateDistance(other: Location): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRadians(other.lat - this.lat);
    const dLng = this.toRadians(other.lng - this.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(this.lat)) * Math.cos(this.toRadians(other.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  toString(): string {
    return `${this.lat}, ${this.lng}${this.address ? ` (${this.address})` : ''}`;
  }
}
