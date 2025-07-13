import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
        >
          <Popup>
            <div>
              <strong>{tattooer.name}</strong>
              <br />
              Especialista en {tattooer.style}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
