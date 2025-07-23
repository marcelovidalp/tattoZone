import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  tattooers?: Array<{
    id: number;
    name: string;
    lat: number;
    lng: number;
    style: string;
    rating?: number;
    distance?: string;
    phone?: string;
  }>;
  userLocation?: { lat: number; lng: number } | null;
}

const MapComponent: React.FC<GoogleMapProps> = ({ 
  center, 
  zoom, 
  tattooers = [], 
  userLocation 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Actualizar centro del mapa cuando cambie
  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [map, center]);

  // Agregar marcador de usuario
  useEffect(() => {
    if (map && userLocation) {
      new google.maps.Marker({
        position: userLocation,
        map,
        title: 'Tu ubicación',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12)
        }
      });
    }
  }, [map, userLocation]);

  // Agregar marcadores de tatuadores
  useEffect(() => {
    if (map && tattooers.length > 0) {
      // Limpiar marcadores anteriores (opcional: mantener referencia para limpiar)
      
      tattooers.forEach((tattooer) => {
        const marker = new google.maps.Marker({
          position: { lat: tattooer.lat, lng: tattooer.lng },
          map,
          title: tattooer.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30S24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#E53E3E"/>
                <circle cx="16" cy="10" r="4" fill="white"/>
                <text x="16" y="13" text-anchor="middle" fill="#E53E3E" font-size="8" font-weight="bold">T</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 32)
          }
        });

        // InfoWindow para mostrar información del tatuador
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h4 style="margin: 0 0 8px 0; color: #333;">${tattooer.name}</h4>
              <p style="margin: 4px 0; font-size: 13px; color: #666;">
                <strong>Especialidad:</strong> ${tattooer.style}
              </p>
              ${tattooer.rating ? `
                <p style="margin: 4px 0; font-size: 13px; color: #666;">
                  <strong>Rating:</strong> ⭐ ${tattooer.rating}/5
                </p>
              ` : ''}
              ${tattooer.distance ? `
                <p style="margin: 4px 0; font-size: 13px; color: #666;">
                  <strong>Distancia:</strong> 📍 ${tattooer.distance}
                </p>
              ` : ''}
              ${tattooer.phone ? `
                <button 
                  onclick="window.open('whatsapp://send?phone=${tattooer.phone}&text=Hola ${tattooer.name}, vi tu perfil en TattooZone', '_blank')"
                  style="
                    background: #25d366; 
                    color: white; 
                    border: none; 
                    padding: 8px 16px; 
                    border-radius: 20px; 
                    cursor: pointer; 
                    font-size: 12px; 
                    margin-top: 8px;
                  "
                >
                  💬 WhatsApp
                </button>
              ` : ''}
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, tattooers]);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#f5f5f5'
        }}>
          <div>🗺️ Cargando mapa...</div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#f5f5f5',
          color: '#d32f2f'
        }}>
          <div>❌ Error al cargar Google Maps</div>
        </div>
      );
    default:
      return <></>;
  }
};

const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  return (
    <Wrapper 
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!} 
      render={render}
      libraries={['places']}
    >
      <MapComponent {...props} />
    </Wrapper>
  );
};

export default GoogleMap;