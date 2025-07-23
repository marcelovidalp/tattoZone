import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/components/LeafletMap.css';

// Configurar iconos de Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface LeafletMapProps {
  center: [number, number];
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
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, tattooers = [] }) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%' }}
      className="leaflet-map"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {tattooers.map((tattooer) => (
        <Marker 
          key={tattooer.id}
          position={[tattooer.lat, tattooer.lng]}
          icon={defaultIcon}
        >
          {/* Tooltip permanente que muestra el nombre */}
          <Tooltip 
            permanent={true}
            direction="top"
            offset={[0, -40]}
            className="tattooer-tooltip"
          >
            <div className="tooltip-content">
              <strong>{tattooer.name}</strong>
              <br />
              <span>{tattooer.style}</span>
            </div>
          </Tooltip>
          
          {/* Popup que aparece al hacer click para más información */}
          <Popup>
            <div className="popup-content">
              <h4>{tattooer.name}</h4>
              <p><strong>Especialidad:</strong> {tattooer.style}</p>
              {tattooer.rating && (
                <p><strong>Rating:</strong> ⭐ {tattooer.rating}/5</p>
              )}
              {tattooer.distance && (
                <p><strong>Distancia:</strong> 📍 {tattooer.distance}</p>
              )}
              {tattooer.phone && (
                <button 
                  className="popup-contact-btn"
                  onClick={() => window.open(`whatsapp://send?phone=${tattooer.phone}&text=Hola ${tattooer.name}, vi tu perfil en TattooZone`, '_blank')}
                >
                  💬 WhatsApp
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
