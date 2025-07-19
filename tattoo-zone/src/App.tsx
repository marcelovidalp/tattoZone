import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import GoogleMap from './components/GoogleMap'; // Cambiar importación
import TattooerProfile from './components/TattooerProfile';
// Importaciones de nuestras clases
import { TattooZoneService } from './services/TattooZoneService';
import { Location } from './models/Location';
import { Tattooer } from './models/Tattooer';
import { TattooStyle, TattooStyleEnum } from './models/TattooStyle';

/**
 * Componente principal de la aplicación TattooZone con routing
 */
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tattooer/:id" element={<TattooerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

/**
 * Componente de la página principal (contenido original de App)
 */
function HomePage() {
  const navigate = useNavigate();
  
  // Estados principales de la aplicación
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(TattooStyleEnum.TODOS);
  const [selectedDistance, setSelectedDistance] = useState('5');
  const [filteredTattooers, setFilteredTattooers] = useState<Tattooer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Instancia del servicio principal
  const [tattooService] = useState(() => new TattooZoneService());
  const [availableStyles] = useState(() => TattooStyle.getAllStyles());

  /**
   * Efecto para cargar tatuadores iniciales y aplicar filtros
   */
  useEffect(() => {
    updateFilteredTattooers();
  }, [searchTerm, selectedStyle, selectedDistance, currentLocation]);

  /**
   * Actualiza la lista de tatuadores basado en los filtros actuales
   */
  const updateFilteredTattooers = () => {
    // Actualizar filtros en el servicio
    const styleFilter = availableStyles.find(s => s.name === selectedStyle) || 
                       new TattooStyle(TattooStyleEnum.TODOS, 'Todos los estilos');
    
    tattooService.updateFilters({
      searchTerm,
      selectedStyle: styleFilter,
      maxDistance: parseInt(selectedDistance),
      userLocation: currentLocation
    });

    // Obtener tatuadores filtrados
    const filtered = tattooService.searchTattooers();
    
    // Si hay ubicación del usuario, calcular distancias y ordenar por proximidad
    if (currentLocation) {
      filtered.sort((a, b) => 
        a.getDistanceFrom(currentLocation) - b.getDistanceFrom(currentLocation)
      );
    }

    setFilteredTattooers(filtered);
  };

  /**
   * Obtiene la ubicación actual del usuario usando geolocalización
   */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada en este navegador');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = new Location(
          position.coords.latitude,
          position.coords.longitude,
          'Mi ubicación'
        );
        
        setCurrentLocation(newLocation);
        tattooService.setUserLocation(newLocation);
        
        setIsLoading(false);
        alert(`Ubicación obtenida: ${newLocation.toString()}`);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        setIsLoading(false);
        alert('No se pudo obtener la ubicación. Verifique los permisos del navegador.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  /**
   * Maneja el contacto con un tatuador vía WhatsApp
   */
  const handleContactTattooer = (tattoerId: number) => {
    tattooService.contactTattooer(tattoerId);
  };

  /**
   * Convierte un tatuador a formato compatible con el mapa
   */
  const convertTattooersForMap = (tattooers: Tattooer[]) => {
    return tattooers.map(tattooer => ({
      id: tattooer.id,
      name: tattooer.name,
      style: tattooer.getPrimaryStyle().name,
      distance: currentLocation ? 
        `${tattooer.getDistanceFrom(currentLocation).toFixed(1)} km` : 
        'Distancia desconocida',
      rating: tattooer.rating,
      phone: tattooer.phone,
      lat: tattooer.location.lat,
      lng: tattooer.location.lng,
    }));
  };

  // Centro del mapa basado en ubicación del usuario o valor por defecto
  const mapCenter = currentLocation 
    ? { lat: currentLocation.lat, lng: currentLocation.lng }
    : { lat: -38.7359, lng: -72.5904 }; // Temuco por defecto

  const userLocationForMap = currentLocation 
    ? { lat: currentLocation.lat, lng: currentLocation.lng }
    : null;

  /**
   * Navega al perfil de un tatuador
   */
  const handleViewProfile = (tattoerId: number) => {
    navigate(`/tattooer/${tattoerId}`);
  };

  return (
    <>
      {/* Header de la aplicación */}
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
          {/* Sección del mapa con Google Maps */}
          <section className="map-section">
            <GoogleMap 
              center={mapCenter}
              zoom={13}
              tattooers={convertTattooersForMap(filteredTattooers)}
              userLocation={userLocationForMap}
            />
            {/* Botón de ubicación superpuesto */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
              <button 
                className={`btn location-btn ${isLoading ? 'loading' : ''}`}
                onClick={getCurrentLocation}
                disabled={isLoading}
              >
                {isLoading ? '🔄 Obteniendo...' : '📍 Obtener Mi Ubicación'}
              </button>
            </div>
          </section>

          {/* Panel lateral con búsqueda y filtros */}
          <aside className="sidebar">
            {/* Sección de búsqueda */}
            <div className="search-section">
              <h3>Buscar Tatuadores</h3>
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por estilo, nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn" onClick={updateFilteredTattooers}>
                Buscar
              </button>
            </div>

            {/* Sección de filtros */}
            <div className="filters-section">
              <h4>Filtros</h4>
              
              {/* Filtro por estilo */}
              <div className="filter-group">
                <label>Estilo:</label>
                <select
                  className="filter-select"
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value as TattooStyleEnum)}
                >
                  <option value={TattooStyleEnum.TODOS}>Todos</option>
                  {availableStyles.map(style => (
                    <option key={style.name} value={style.name}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por distancia */}
              <div className="filter-group">
                <label>Distancia máxima:</label>
                <select
                  className="filter-select"
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                  disabled={!currentLocation}
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
                {!currentLocation && (
                  <small style={{ color: '#666', fontSize: '0.8em' }}>
                    Requiere ubicación del usuario
                  </small>
                )}
              </div>
            </div>

            {/* Sección de resultados */}
            <div className="results-section">
              <h4>
                Tatuadores Encontrados ({filteredTattooers.length})
                {currentLocation && ' - Ordenados por distancia'}
              </h4>
              
              <div className="tattooer-list">
                {filteredTattooers.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666' }}>
                    No se encontraron tatuadores con los filtros actuales
                  </p>
                ) : (
                  filteredTattooers.map((tattooer) => (
                    <div key={tattooer.id} className="card tattooer-card">
                      <h5>{tattooer.name}</h5>
                      <p>Especialista en {tattooer.getPrimaryStyle().name}</p>
                      
                      {/* Información de distancia */}
                      <p>📍 {
                        currentLocation 
                          ? `${tattooer.getDistanceFrom(currentLocation).toFixed(1)} km`
                          : tattooer.location.address || 'Ubicación disponible'
                      }</p>
                      
                      <p>⭐ {tattooer.rating}/5</p>
                      <p>🎨 {tattooer.experienceYears} años de experiencia</p>
                      
                      {/* Acciones de la tarjeta */}
                      <div className="card-actions">
                        <button 
                          className="btn"
                          onClick={() => handleViewProfile(tattooer.id)}
                        >
                          Ver Perfil
                        </button>
                        <button
                          className="btn btn-contact"
                          onClick={() => handleContactTattooer(tattooer.id)}
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TattooZone - Encuentra tu tatuador ideal</p>
      </footer>
    </>
  );
}

export default App;
