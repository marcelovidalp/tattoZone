import { Tattooer } from '../models/Tattooer';
import { Location } from '../models/Location';
import { TattooStyle, TattooStyleEnum } from '../models/TattooStyle';
import { SearchFilters } from '../models/SearchFilters';

/**
 * Servicio principal de TattooZone - Maneja toda la lógica de negocio
 */
export class TattooZoneService {
  private tattooers: Tattooer[];
  private filters: SearchFilters;

  constructor() {
    this.tattooers = this.initializeMockData();
    this.filters = new SearchFilters();
  }

  /**
   * Inicializa datos de prueba de tatuadores
   */
  private initializeMockData(): Tattooer[] {
    const styles = TattooStyle.getAllStyles();
    
    return [
      new Tattooer(
        1,
        'Juan Pérez',
        'juan@email.com',
        '+56912345678',
        [styles.find(s => s.name === TattooStyleEnum.REALISMO)!],
        new Location(-38.7359, -72.5904, 'Centro Temuco'),
        4.8,
        8
      ),
      new Tattooer(
        2,
        'María García',
        'maria@email.com',
        '+56912345679',
        [styles.find(s => s.name === TattooStyleEnum.TRADICIONAL)!],
        new Location(-38.7450, -72.6100, 'Plaza de Armas'),
        4.9,
        12
      ),
      new Tattooer(
        3,
        'Carlos López',
        'carlos@email.com',
        '+56912345680',
        [styles.find(s => s.name === TattooStyleEnum.MINIMALISTA)!],
        new Location(-38.7280, -72.5750, 'Barrio Inglés'),
        4.7,
        5
      ),
      new Tattooer(
        4,
        'Ana Torres',
        'ana@email.com',
        '+56912345681',
        [styles.find(s => s.name === TattooStyleEnum.BLACKWORK)!],
        new Location(-38.7500, -72.6200, 'Zona Norte'),
        4.6,
        6
      ),
      new Tattooer(
        5,
        'Diego Silva',
        'diego@email.com',
        '+56912345682',
        [styles.find(s => s.name === TattooStyleEnum.ACUARELA)!],
        new Location(-38.7150, -72.5650, 'Universidad'),
        4.9,
        10
      ),
    ];
  }

  /**
   * Obtiene todos los tatuadores disponibles
   */
  getAllTattooers(): Tattooer[] {
    return this.tattooers.filter(t => t.isAvailable());
  }

  /**
   * Busca tatuadores aplicando los filtros actuales
   * Si no hay filtros activos, devuelve todos los tatuadores
   */
  searchTattooers(): Tattooer[] {
    const allTattooers = this.getAllTattooers();
    
    // Si no hay criterios de búsqueda activos, devolver todos
    if (!this.hasActiveFilters()) {
      return allTattooers;
    }
    
    return this.filters.applyFilters(allTattooers);
  }

  /**
   * Verifica si hay filtros activos
   */
  private hasActiveFilters(): boolean {
    return !!(
      this.filters.searchTerm ||
      (this.filters.selectedStyle && this.filters.selectedStyle.name !== TattooStyleEnum.TODOS) ||
      this.filters.userLocation
    );
  }

  /**
   * Reinicia los filtros a su estado inicial
   */
  resetFilters(): void {
    this.filters = new SearchFilters();
  }

  /**
   * Actualiza los filtros de búsqueda
   */
  updateFilters(newFilters: Partial<SearchFilters>): void {
    Object.assign(this.filters, newFilters);
  }

  /**
   * Establece la ubicación del usuario para cálculos de distancia
   */
  setUserLocation(location: Location): void {
    this.filters.setUserLocation(location);
  }

  /**
   * Obtiene los filtros actuales
   */
  getCurrentFilters(): SearchFilters {
    return this.filters;
  }

  /**
   * Contacta a un tatuador vía WhatsApp
   */
  contactTattooer(tattoId: number): void {
    const tattooer = this.tattooers.find(t => t.id === tattoId);
    if (tattooer) {
      window.open(tattooer.getContactUrl(), '_blank');
    }
  }

  /**
   * Obtiene un tatuador específico por su ID
   */
  getTattooerById(id: number): Tattooer | null {
    return this.tattooers.find(t => t.id === id) || null;
  }
}
