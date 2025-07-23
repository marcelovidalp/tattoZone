import { User } from './User';
import { Location } from './Location';
import { Tattooer } from './Tattooer';
import { SearchFilters } from './SearchFilters';
import { TattooStyle, TattooStyleEnum } from './TattooStyle';
import { TattooZoneService } from '../services/TattooZoneService';

/**
 * Clase principal TattooZoneApp - Maneja el estado y lógica principal de la aplicación
 */
export class TattooZoneApp {
  public currentUser: User | null;
  public userLocation: Location | null;
  public allTattooers: Tattooer[];
  public filters: SearchFilters;
  private tattooService: TattooZoneService;

  constructor() {
    this.currentUser = null;
    this.userLocation = null;
    this.allTattooers = [];
    this.filters = new SearchFilters();
    this.tattooService = new TattooZoneService();
    
    // Inicializar con datos del servicio
    this.allTattooers = this.tattooService.getAllTattooers();
  }

  /**
   * Obtiene todos los tatuadores disponibles
   */
  getAllTattooers(): Tattooer[] {
    return this.tattooService.getAllTattooers();
  }

  /**
   * Obtiene la ubicación actual del usuario usando geolocalización
   */
  async getCurrentLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada en este navegador'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = new Location(
            position.coords.latitude,
            position.coords.longitude,
            'Mi ubicación'
          );
          
          this.userLocation = location;
          this.filters.setUserLocation(location);
          
          // Si hay usuario logueado, actualizar su ubicación
          if (this.currentUser) {
            this.currentUser.setLocation(location);
          }
          
          resolve();
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  /**
   * Busca tatuadores aplicando los filtros actuales
   */
  searchTattooers(): Tattooer[] {
    const filteredTattooers = this.filters.applyFilters(this.allTattooers);
    
    // Si hay ubicación del usuario, ordenar por distancia
    if (this.userLocation) {
      return filteredTattooers.sort((a, b) => 
        a.getDistanceFrom(this.userLocation!) - b.getDistanceFrom(this.userLocation!)
      );
    }
    
    return filteredTattooers;
  }

  /**
   * Filtra tatuadores por distancia máxima
   */
  filterByDistance(maxKm: number): Tattooer[] {
    if (!this.userLocation) {
      return this.allTattooers;
    }

    return this.allTattooers.filter(tattooer => {
      const distance = tattooer.getDistanceFrom(this.userLocation!);
      return distance <= maxKm;
    }).sort((a, b) => 
      a.getDistanceFrom(this.userLocation!) - b.getDistanceFrom(this.userLocation!)
    );
  }

  /**
   * Filtra tatuadores por estilo específico
   */
  filterByStyle(style: TattooStyle): Tattooer[] {
    if (style.name === TattooStyleEnum.TODOS) {
      return this.allTattooers;
    }
    
    return this.allTattooers.filter(tattooer => 
      tattooer.specializesIn(style)
    );
  }

  /**
   * Actualiza los filtros de búsqueda
   */
  updateFilters(newFilters: Partial<SearchFilters>): void {
    Object.assign(this.filters, newFilters);
  }

  /**
   * Establece el usuario actual
   */
  setCurrentUser(user: User): void {
    this.currentUser = user;
    if (user.location) {
      this.userLocation = user.location;
      this.filters.setUserLocation(user.location);
    }
  }

  /**
   * Obtiene un tatuador por ID
   */
  getTattooerById(id: number): Tattooer | null {
    return this.tattooService.getTattooerById(id);
  }

  /**
   * Contacta a un tatuador (usando usuario actual o método directo)
   */
  contactTattooer(tattoerId: number): void {
    const tattooer = this.getTattooerById(tattoerId);
    if (!tattooer) return;

    if (this.currentUser) {
      this.currentUser.contactViaWhatsApp(tattooer);
    } else {
      // Contacto directo sin usuario logueado
      window.open(tattooer.getContactUrl(), '_blank');
    }
  }

  /**
   * Obtiene todos los estilos disponibles
   */
  getAvailableStyles(): TattooStyle[] {
    return TattooStyle.getAllStyles();
  }

  /**
   * Verifica si hay un usuario logueado
   */
  hasCurrentUser(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Cierra la sesión del usuario actual
   */
  logout(): void {
    this.currentUser = null;
    // Mantener la ubicación pero no asociada al usuario
  }
}
