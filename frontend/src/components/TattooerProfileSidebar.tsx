import React from 'react';
import '../styles/components/TattooerProfileSidebar.css';
import { Tattooer } from '../models/Tattooer';
import { User } from '../models/User';
import { Location } from '../models/Location';

interface TattooerProfileSidebarProps {
  tattooer: Tattooer;
  userLocation: Location | null;
  currentUser?: User | null;
  onClose: () => void;
  onContact: () => void;
}

const TattooerProfileSidebar: React.FC<TattooerProfileSidebarProps> = ({
  tattooer,
  userLocation,
  currentUser,
  onClose,
  onContact
}) => {
  // Calcular distancia usando el usuario actual si está disponible
  const distance = currentUser && currentUser.hasLocation() 
    ? currentUser.getDistanceToTattooer(tattooer)
    : userLocation 
      ? tattooer.getDistanceFrom(userLocation) 
      : null;

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar-overlay" onClick={onClose} />
      <div className="profile-sidebar-content">
        {/* Header del sidebar */}
        <div className="profile-sidebar-header">
          <h2>Perfil del Tatuador</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contenido del perfil */}
        <div className="profile-sidebar-body">
          {/* Información principal */}
          <div className="profile-main-info">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {tattooer.name.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="profile-basic-info">
              <h3>{tattooer.name}</h3>
              <div className="rating-experience">
                <span className="rating">⭐ {tattooer.rating}/5</span>
                <span className="experience">🎨 {tattooer.experienceYears} años</span>
              </div>
              
              {distance && (
                <p className="distance">📍 A {distance.toFixed(1)} km de tu ubicación</p>
              )}
            </div>
          </div>

          {/* Información de contacto */}
          <div className="profile-section">
            <h4>Información de Contacto</h4>
            <div className="contact-details">
              <p><span className="icon">📧</span> {tattooer.email}</p>
              <p><span className="icon">📱</span> {tattooer.phone}</p>
              <p><span className="icon">📍</span> {tattooer.location.address || tattooer.location.toString()}</p>
            </div>
          </div>

          {/* Especialidades */}
          <div className="profile-section">
            <h4>Especialidades</h4>
            <div className="specialties-container">
              {tattooer.specialties.map((style, index) => (
                <div key={index} className="specialty-item">
                  <div className="specialty-header">
                    <h5>{style.name}</h5>
                  </div>
                  <p className="specialty-description">{style.description}</p>
                  <div className="characteristics">
                    {style.characteristics.map((char, i) => (
                      <span key={i} className="characteristic-tag">{char}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio preview */}
          <div className="profile-section">
            <h4>Portfolio</h4>
            {tattooer.portfolio.length > 0 ? (
              <div className="portfolio-preview">
                {tattooer.portfolio.slice(0, 4).map((imageUrl, index) => (
                  <div key={index} className="portfolio-thumbnail">
                    <img src={imageUrl} alt={`Trabajo ${index + 1}`} />
                  </div>
                ))}
                {tattooer.portfolio.length > 4 && (
                  <div className="portfolio-more">
                    +{tattooer.portfolio.length - 4} más
                  </div>
                )}
              </div>
            ) : (
              <div className="no-portfolio">
                <p>Portfolio próximamente disponible</p>
                <small>Contacta al tatuador para ver sus trabajos</small>
              </div>
            )}
          </div>

          {/* Estadísticas adicionales */}
          <div className="profile-section">
            <h4>Estadísticas</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{tattooer.rating}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{tattooer.experienceYears}</span>
                <span className="stat-label">Años</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{tattooer.specialties.length}</span>
                <span className="stat-label">Estilos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{tattooer.portfolio.length}</span>
                <span className="stat-label">Trabajos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="profile-sidebar-footer">
          <button 
            className="btn btn-primary btn-full-width"
            onClick={onContact}
          >
            💬 Contactar por WhatsApp
          </button>
          <button className="btn btn-secondary btn-full-width">
            ⭐ Dejar una reseña
          </button>
          <button className="btn btn-outline btn-full-width">
            📋 Ver perfil completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TattooerProfileSidebar;
