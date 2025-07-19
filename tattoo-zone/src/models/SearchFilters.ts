import { Tattooer } from './Tattooer';
import { TattooStyle, TattooStyleEnum } from './TattooStyle';
import { Location } from './Location';

/**
 * Clase SearchFilters - Maneja todos los filtros de búsqueda de tatuadores
 */
export class SearchFilters {
  public searchTerm: string;
  public selectedStyle: TattooStyle;
  public maxDistance: number; // en kilómetros
  public minRating: number;
  public userLocation: Location | null;

  constructor(
    searchTerm: string = '',
    selectedStyle: TattooStyle = new TattooStyle(TattooStyleEnum.TODOS, 'Todos los estilos'),
    maxDistance: number = 5,
    minRating: number = 0
  ) {
    this.searchTerm = searchTerm;
    this.selectedStyle = selectedStyle;
    this.maxDistance = maxDistance;
    this.minRating = minRating;
    this.userLocation = null;
  }

  /**
   * Aplica todos los filtros a una lista de tatuadores
   */
  applyFilters(tattooers: Tattooer[]): Tattooer[] {
    return tattooers.filter(tattooer => {
      // Filtro por término de búsqueda
      if (this.searchTerm && !this.matchesSearchTerm(tattooer)) {
        return false;
      }

      // Filtro por estilo
      if (this.selectedStyle.name !== TattooStyleEnum.TODOS && 
          !tattooer.specializesIn(this.selectedStyle)) {
        return false;
      }

      // Filtro por distancia
      if (this.userLocation && 
          tattooer.getDistanceFrom(this.userLocation) > this.maxDistance) {
        return false;
      }

      // Filtro por rating mínimo
      if (tattooer.rating < this.minRating) {
        return false;
      }

      return true;
    });
  }

  /**
   * Verifica si un tatuador coincide con el término de búsqueda
   */
  private matchesSearchTerm(tattooer: Tattooer): boolean {
    const term = this.searchTerm.toLowerCase();
    return tattooer.name.toLowerCase().includes(term) ||
           tattooer.specialties.some(style => style.name.toLowerCase().includes(term));
  }

  /**
   * Actualiza la ubicación del usuario para cálculos de distancia
   */
  setUserLocation(location: Location): void {
    this.userLocation = location;
  }

  /**
   * Establece una ubicación específica usando coordenadas
   * @param lat Latitud
   * @param lng Longitud
   * @param address Dirección opcional
   */
  setLocationByCoordinates(lat: number, lng: number, address?: string): void {
    this.userLocation = new Location(lat, lng, address || `${lat}, ${lng}`);
  }

  /**
   * Filtra tatuadores por proximidad a coordenadas específicas
   * @param lat Latitud de referencia
   * @param lng Longitud de referencia
   * @param maxDistance Distancia máxima en kilómetros
   * @param tattooers Lista de tatuadores a filtrar
   * @returns Lista de tatuadores filtrados por distancia
   */
  filterByCoordinates(lat: number, lng: number, maxDistance: number, tattooers: Tattooer[]): Tattooer[] {
    const referenceLocation = new Location(lat, lng);
    
    return tattooers.filter(tattooer => {
      const distance = tattooer.getDistanceFrom(referenceLocation);
      return distance <= maxDistance;
    }).sort((a, b) => {
      // Ordenar por distancia ascendente
      return a.getDistanceFrom(referenceLocation) - b.getDistanceFrom(referenceLocation);
    });
  }

  /**
   * Aplica filtros con coordenadas específicas como punto de referencia
   * @param lat Latitud de referencia
   * @param lng Longitud de referencia
   * @param tattooers Lista de tatuadores
   * @returns Lista filtrada y ordenada por distancia
   */
  applyFiltersWithCoordinates(lat: number, lng: number, tattooers: Tattooer[]): Tattooer[] {
    // Establecer ubicación temporal para filtros
    const originalLocation = this.userLocation;
    this.setLocationByCoordinates(lat, lng, 'Ubicación de búsqueda');
    
    // Aplicar filtros normales
    const filtered = this.applyFilters(tattooers);
    
    // Restaurar ubicación original
    this.userLocation = originalLocation;
    
    return filtered;
  }
}
