import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TattooZoneService } from '../services/TattooZoneService';
import { Tattooer } from '../models/Tattooer';
import { Location } from '../models/Location';

/**
 * Componente TattooerProfile - Muestra el perfil completo de un tatuador
 */
const TattooerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tattooer, setTattooer] = useState<Tattooer | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [tattooService] = useState(() => new TattooZoneService());

  useEffect(() => {
    if (id) {
      const foundTattooer = tattooService.getTattooerById(parseInt(id));
      setTattooer(foundTattooer);
      setLoading(false);
    }
  }, [id, tattooService]);

  /**
   * Obtiene la ubicación del usuario para calcular distancia
   */
  const getCurrentUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(new Location(
            position.coords.latitude,
            position.coords.longitude,
            'Mi ubicación'
          ));
        },
        (error) => console.error('Error obteniendo ubicación:', error)
      );
    }
  };

  useEffect(() => {
    getCurrentUserLocation();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <h2>Cargando perfil...</h2>
      </div>
    );
  }

  if (!tattooer) {
    return (
      <div className="profile-not-found">
        <h2>Tatuador no encontrado</h2>
        <button className="btn" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  const distance = userLocation ? tattooer.getDistanceFrom(userLocation) : null;

  return (
    <div className="tattooer-profile">
      {/* Header del perfil */}
      <header className="profile-header">
        <button className="btn back-btn" onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h1>Perfil de Tatuador</h1>
      </header>

      <div className="profile-content">
        {/* Información principal */}
        <section className="profile-main">
          <div className="profile-info">
            <h2>{tattooer.name}</h2>
            <div className="rating-section">
              <span className="rating">⭐ {tattooer.rating}/5</span>
              <span className="experience">🎨 {tattooer.experienceYears} años de experiencia</span>
            </div>
            
            {distance && (
              <p className="distance">📍 A {distance.toFixed(1)} km de tu ubicación</p>
            )}

            <div className="contact-info">
              <p>📧 {tattooer.email}</p>
              <p>📱 {tattooer.phone}</p>
              <p>📍 {tattooer.location.address || tattooer.location.toString()}</p>
            </div>
          </div>

          {/* Especialidades */}
          <div className="specialties-section">
            <h3>Especialidades</h3>
            <div className="specialties-list">
              {tattooer.specialties.map((style, index) => (
                <div key={index} className="specialty-card">
                  <h4>{style.name}</h4>
                  <p>{style.description}</p>
                  <div className="characteristics">
                    {style.characteristics.map((char, i) => (
                      <span key={i} className="characteristic-tag">{char}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="portfolio-section">
          <h3>Portfolio de {tattooer.name}</h3>
          {tattooer.portfolio.length > 0 ? (
            <div className="portfolio-grid">
              {tattooer.portfolio.map((imageUrl, index) => (
                <div key={index} className="portfolio-item">
                  <img 
                    src={imageUrl} 
                    alt={`Trabajo ${index + 1} de ${tattooer.name}`}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay">
                    <span className="portfolio-artist-name">{tattooer.name}</span>
                    <span className="portfolio-work-number">Trabajo #{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-portfolio-container">
              <p className="no-portfolio">Portfolio de {tattooer.name} próximamente disponible</p>
              <small>Mientras tanto, puedes contactarlo para ver sus trabajos anteriores</small>
            </div>
          )}
        </section>

        {/* Acciones */}
        <section className="profile-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => window.open(tattooer.getContactUrl(), '_blank')}
          >
            💬 Contactar por WhatsApp
          </button>
          <button className="btn btn-secondary">
            ⭐ Dejar una reseña
          </button>
        </section>
      </div>
    </div>
  );
};

export default TattooerProfile;
