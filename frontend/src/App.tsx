import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './styles/App.css';
import './styles/components/Sidebar.css';
import LeafletMap from './components/LeafletMap';
import TattooerProfileSidebar from './components/TattooerProfileSidebar';
import TattooerProfile from './components/TattooerProfile';
import { TattooZoneApp } from './models/TattooZoneApp';
// import { User } from './models/User'; // Removido por no uso
import { Tattooer } from './models/Tattooer';
import { TattooStyleEnum } from './models/TattooStyle';

/**
 * Componente principal de la aplicación Tinta Conectada con routing
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
 * Componente de la página principal usando la arquitectura orientada a objetos
 */
function HomePage() {
  const navigate = useNavigate();
  
  // Instancia principal de la aplicación (siguiendo el diagrama de clases)
  const [tattooZoneApp] = useState(() => new TattooZoneApp());
  
  // Estados de la UI
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(TattooStyleEnum.TODOS);
  const [selectedDistance, setSelectedDistance] = useState('5');
  const [filteredTattooers, setFilteredTattooers] = useState<Tattooer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTattooerForSidebar, setSelectedTattooerForSidebar] = useState<Tattooer | null>(null);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  // Estados derivados de la aplicación principal
  const currentUser = tattooZoneApp.currentUser;
  const userLocation = tattooZoneApp.userLocation;
  const availableStyles = tattooZoneApp.getAvailableStyles();

  /**
   * Actualiza la lista de tatuadores usando la lógica de la aplicación principal
   * Memoizado para cumplir reglas de dependencias de hooks
   */
  const updateFilteredTattooers = useCallback(() => {
    try {
      // Actualizar filtros en la aplicación principal
      const styleFilter =
        availableStyles.find((s) => s.name === selectedStyle) || availableStyles[0];

      tattooZoneApp.updateFilters({
        searchTerm,
        selectedStyle: styleFilter,
        maxDistance: parseInt(selectedDistance),
        userLocation: tattooZoneApp.userLocation,
      });

      // Obtener tatuadores filtrados usando el método de la aplicación
      const filtered = tattooZoneApp.searchTattooers();
      setFilteredTattooers(filtered);
    } catch (error) {
      console.error('Error filtrando tatuadores:', error);
      setFilteredTattooers([]);
    }
  }, [
    availableStyles,
    selectedStyle,
    searchTerm,
    selectedDistance,
    tattooZoneApp,
    tattooZoneApp.userLocation,
  ]);

  /**
   * Efecto para cargar tatuadores iniciales al montar el componente
   */
  useEffect(() => {
    // Cargar todos los tatuadores al inicio sin filtros
    try {
      const allTattooers = tattooZoneApp.getAllTattooers();
      setFilteredTattooers(allTattooers);
    } catch (error) {
      console.error('Error cargando tatuadores:', error);
      setFilteredTattooers([]);
    }
  }, [tattooZoneApp]); // Agregar tattooZoneApp como dependencia

  /**
   * Efecto para aplicar filtros cuando cambian los parámetros de búsqueda
   */
  useEffect(() => {
    // Solo aplicar filtros si hay algún criterio de búsqueda activo
    if (searchTerm || selectedStyle !== TattooStyleEnum.TODOS || userLocation) {
      updateFilteredTattooers();
    } else {
      // Si no hay filtros activos, mostrar todos los tatuadores
      try {
        const allTattooers = tattooZoneApp.getAllTattooers();
        setFilteredTattooers(allTattooers);
      } catch (error) {
        console.error('Error cargando tatuadores:', error);
        setFilteredTattooers([]);
      }
    }
  }, [searchTerm, selectedStyle, selectedDistance, userLocation, tattooZoneApp, updateFilteredTattooers]);

  /**
   * Obtiene la ubicación usando el método de la aplicación principal
   */
  const getCurrentLocation = async () => {
    setIsLoading(true);
    
    try {
      await tattooZoneApp.getCurrentLocation();
      alert(`Ubicación obtenida: ${tattooZoneApp.userLocation?.toString()}`);
      updateFilteredTattooers(); // Actualizar lista con nueva ubicación
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      alert('No se pudo obtener la ubicación. Verifique los permisos del navegador.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja el contacto con un tatuador usando la aplicación principal
   */
  const handleContactTattooer = (tattoerId: number) => {
    tattooZoneApp.contactTattooer(tattoerId);
  };

  /**
   * Convierte un tatuador a formato compatible con el mapa
   */
  const convertTattooersForMap = (tattooers: Tattooer[]) => {
    return tattooers.map(tattooer => ({
      id: tattooer.id,
      name: tattooer.name,
      style: tattooer.getPrimaryStyle().name,
      distance: userLocation ? 
        `${tattooer.getDistanceFrom(userLocation).toFixed(1)} km` : 
        'Distancia desconocida',
      rating: tattooer.rating,
      phone: tattooer.phone,
      lat: tattooer.location.lat,
      lng: tattooer.location.lng,
    }));
  };

  // Centro del mapa basado en ubicación del usuario o valor por defecto
  const mapCenter: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng]
    : [-38.7359, -72.5904]; // Temuco por defecto

  // Navegación a perfil en página completa se manejaría cuando se requiera

  /**
   * Muestra el perfil del tatuador en el sidebar (mantiene el mapa visible)
   */
  const handleViewProfileSidebar = (tattoerId: number) => {
    const tattooer = tattooZoneApp.getTattooerById(tattoerId);
    if (tattooer) {
      setSelectedTattooerForSidebar(tattooer);
      setShowProfileSidebar(true);
    }
  };

  /**
   * Cierra el sidebar del perfil
   */
  const closeProfileSidebar = () => {
    setShowProfileSidebar(false);
    setSelectedTattooerForSidebar(null);
  };

  return (
    <>
      {/* Header de la aplicación */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Tinta Conectada</h1>
          <nav className="nav">
            {currentUser ? (
              <div className="user-info">
                <span>Hola, {currentUser.name}</span>
                <button className="btn nav-btn" onClick={() => tattooZoneApp.logout()}>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <button className="btn nav-btn">Iniciar Sesión</button>
                <button className="btn nav-btn">Registro</button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        <div className={`main-content ${showProfileSidebar ? 'with-profile-sidebar' : ''}`}>
          {/* Sección del mapa con Leaflet - VISIBLE */}
          <section className="map-section">
            <LeafletMap 
              center={mapCenter}
              zoom={13}
              tattooers={convertTattooersForMap(filteredTattooers)}
            />
            {/* Botón de ubicación superpuesto */}
            <div style={{ 
              position: 'absolute', 
              top: '10px', 
              left: '10px', 
              zIndex: 1000 
            }}>
              <button 
                className={`btn location-btn ${isLoading ? 'loading' : ''}`}
                onClick={getCurrentLocation}
                disabled={isLoading}
              >
                {isLoading ? '🔄 Obteniendo...' : '📍 Obtener Mi Ubicación'}
              </button>
            </div>
          </section>

          {/* Panel lateral con búsqueda y filtros - SCROLLEABLE */}
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
                  disabled={!userLocation}
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
                {!userLocation && (
                  <small style={{ color: '#666', fontSize: '0.8em' }}>
                    Requiere ubicación del usuario
                  </small>
                )}
              </div>
            </div>

            {/* Sección de resultados actualizada */}
            <div className="results-section">
              <h4>
                Tatuadores Encontrados ({filteredTattooers.length})
                {userLocation && ' - Ordenados por distancia'}
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
                      
                      {/* Información de distancia usando el usuario actual */}
                      <p>📍 {
                        currentUser && currentUser.hasLocation()
                          ? `${currentUser.getDistanceToTattooer(tattooer)?.toFixed(1)} km`
                          : userLocation 
                            ? `${tattooer.getDistanceFrom(userLocation).toFixed(1)} km`
                            : tattooer.location.address || 'Ubicación disponible'
                      }</p>
                      
                      <p>⭐ {tattooer.rating}/5</p>
                      <p>🎨 {tattooer.experienceYears} años de experiencia</p>
                      
                      {/* Acciones de la tarjeta */}
                      <div className="card-actions">
                        <button 
                          className="btn"
                          onClick={() => handleViewProfileSidebar(tattooer.id)} // Usa sidebar
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

            {/* Sidebar del perfil */}
            {showProfileSidebar && selectedTattooerForSidebar && (
              <TattooerProfileSidebar
                tattooer={selectedTattooerForSidebar}
                userLocation={userLocation}
                onClose={closeProfileSidebar}
                onContact={() => handleContactTattooer(selectedTattooerForSidebar.id)}
              />
            )}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
  <p>&copy; 2024 Tinta Conectada - Encuentra tu tatuador ideal</p>
      </footer>
    </>
  );
}

export default App;
