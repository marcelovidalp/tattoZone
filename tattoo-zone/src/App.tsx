import React, { useState } from 'react';
import './App.css';
import LeafletMap from './components/LeafletMap';

function App() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Todos');
  const [selectedDistance, setSelectedDistance] = useState('5 km');

  // Obtener ubicación del usuario
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          alert(`Ubicación obtenida: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener la ubicación');
        }
      );
    } else {
      alert('Geolocalización no soportada en este navegador');
    }
  };

  // Datos de ejemplo de tatuadores con coordenadas
  const tattooers = [
    {
      id: 1,
      name: 'Juan Pérez',
      style: 'Realismo',
      distance: '2.5 km',
      rating: 4.8,
      phone: '+5491123456789',
      lat: -34.6037,
      lng: -58.3816,
    },
    {
      id: 2,
      name: 'María García',
      style: 'Tradicional',
      distance: '3.1 km',
      rating: 4.9,
      phone: '+5491123456790',
      lat: -34.6118,
      lng: -58.3960,
    },
    {
      id: 3,
      name: 'Carlos López',
      style: 'Minimalista',
      distance: '1.8 km',
      rating: 4.7,
      phone: '+5491123456791',
      lat: -34.5998,
      lng: -58.3731,
    },
        {
      id: 4,
      name: 'Ana Torres',
      style: 'Blackwork',
      distance: '4.2 km',
      rating: 4.6,
      phone: '+56912345681',
      lat: -38.7500,
      lng: -72.6200,
    },
    {
      id: 5,
      name: 'Diego Silva',
      style: 'Acuarela',
      distance: '5.1 km',
      rating: 4.9,
      phone: '+56912345682',
      lat: -38.7150,
      lng: -72.5650,
    },
  ];

  // Función para contactar por WhatsApp
  const contactTattooer = (phone: string, name: string) => {
    const message = `Hola ${name}, vi tu perfil en TattooZone y me interesa tu trabajo.`;
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Centro del mapa (Buenos Aires por defecto, o ubicación del usuario)
  const mapCenter: [number, number] = currentLocation 
    ? [currentLocation.lat, currentLocation.lng] 
    : [-38.7359, -72.5904]; // Temuco por defecto

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">TattooZone</h1>
          <nav className="nav">
            <button className="btn nav-btn">Iniciar Sesión</button>
            <button className="btn nav-btn">Registro</button>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="main-content">
          {/* Área del mapa - Ahora con Leaflet */}
          <section className="map-section">
            <LeafletMap 
              center={mapCenter}
              zoom={13}
              tattooers={tattooers}
            />
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
              <button className="btn location-btn" onClick={getCurrentLocation}>
                📍 Obtener Mi Ubicación
              </button>
            </div>
          </section>

          {/* Panel lateral */}
          <aside className="sidebar">
            <div className="search-section">
              <h3>Buscar Tatuadores</h3>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por estilo, nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn">Buscar</button>
            </div>

            <div className="filters-section">
              <h4>Filtros</h4>
              <div className="filter-group">
                <label>Estilo:</label>
                <select
                  className="filter-select"
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                >
                  <option>Todos</option>
                  <option>Realismo</option>
                  <option>Tradicional</option>
                  <option>Minimalista</option>
                  <option>Blackwork</option>
                  <option>Acuarela</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Distancia:</label>
                <select
                  className="filter-select"
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                >
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>25 km</option>
                  <option>50 km</option>
                </select>
              </div>
            </div>

            <div className="results-section">
              <h4>Tatuadores Cercanos</h4>
              <div className="tattooer-list">
                {tattooers.map((tattooer) => (
                  <div key={tattooer.id} className="card tattooer-card">
                    <h5>{tattooer.name}</h5>
                    <p>Especialista en {tattooer.style}</p>
                    <p>📍 {tattooer.distance}</p>
                    <p>⭐ {tattooer.rating}/5</p>
                    <div className="card-actions">
                      <button className="btn">Ver Perfil</button>
                      <button
                        className="btn btn-contact"
                        onClick={() => contactTattooer(tattooer.phone, tattooer.name)}
                      >
                        WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 TattooZone - Encuentra tu tatuador ideal</p>
      </footer>
    </div>
  );
}

export default App;
