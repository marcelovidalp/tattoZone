import { Location } from '../models/Location';

export class LocationService {
  static async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada por este navegador'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          try {
            // Obtener dirección usando geocodificación inversa
            const address = await this.reverseGeocode(lat, lng);
            const location = new Location(lat, lng, address);
            resolve(location);
          } catch (error) {
            // Si falla la geocodificación, crear ubicación sin dirección
            const location = new Location(lat, lng);
            resolve(location);
          }
        },
        (error) => {
          let errorMessage = 'Error desconocido al obtener ubicación';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permisos de ubicación denegados. Por favor, habilita la geolocalización en la configuración del navegador.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Ubicación no disponible. Verifica tu conexión GPS/WiFi.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado. Intenta nuevamente.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  }

  // Geocodificación inversa usando OpenStreetMap (gratuito)
  static async reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'TattooZone-App'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Error en la geocodificación');
      }
      
      const data = await response.json();
      
      // Construir dirección legible
      const address = data.address;
      const parts = [];
      
      if (address.road) parts.push(address.road);
      if (address.house_number) parts.push(address.house_number);
      if (address.neighbourhood || address.suburb) {
        parts.push(address.neighbourhood || address.suburb);
      }
      if (address.city || address.town || address.village) {
        parts.push(address.city || address.town || address.village);
      }
      
      return parts.join(', ') || data.display_name;
      
    } catch (error) {
      console.warn('Error en geocodificación inversa:', error);
      throw error;
    }
  }

  // Geocodificación directa (Dirección → Coordenadas)
  static async geocodeAddress(address: string): Promise<Location[]> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'TattooZone-App'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Error en la búsqueda de direcciones');
      }
      
      const data = await response.json();
      
      return data.map((item: any) => new Location(
        parseFloat(item.lat),
        parseFloat(item.lon),
        item.display_name
      ));
      
    } catch (error) {
      console.error('Error en geocodificación:', error);
      throw error;
    }
  }
}