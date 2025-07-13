# Copilot Instructions - TattooZone

## 🎯 Proyecto
**TattooZone**: PWA localizador de tatuadores con mapa interactivo

## 📋 Estado Actual
- **Fase**: Frontend MVP - solo estructura funcional
- **Tech**: TypeScript + React 
- **Restricción**: SIN diseño visual, solo botones y frames básicos

## ⚡ MVP Completado
- ✅ Geolocalización básica
- ✅ Mapa con Google Maps API  
- ✅ Registro usuarios/tatuadores
- ✅ Perfiles básicos
- ✅ Botones de contacto

## 🛠️ Reglas de Código

### Frontend:
- TypeScript estricto con interfaces
- Componentes funcionales React
- Hooks personalizados para lógica
- Context API para estado global
- React Hook Form + Yup para formularios

### Estructura:
```
src/
├── components/ (Map, TattooerProfile, UserProfile, Auth)
├── pages/
├── hooks/
├── types/
└── utils/
```

### UI Temporal:
- `<button className="btn">` (sin estilos)
- `<div className="card">` (solo estructura)
- HTML semántico básico
- Mobile-first responsive

## 🚫 NO Incluir:
- Colores o estilos CSS elaborados
- Bibliotecas de UI (Material-UI, etc.)
- Animaciones complejas

## ✅ SÍ Incluir:
- Funcionalidad completa
- Validaciones de formularios
- Accesibilidad básica
- Preparado para PWA

## 🗺️ Integraciones:
- **Google Maps**: @googlemaps/react-wrapper
- **WhatsApp**: `whatsapp://send?phone=...`
- **Geolocalización**: API nativa

Prioridad: **Funcionalidad > Apariencia**
- **Lazy loading** para optimización

### Para Integraciones:
- **Google Maps**: Usar @googlemaps/react-wrapper
- **Geolocalización**: API nativa del navegador
- **WhatsApp**: Links directos (whatsapp://send)
- **Formularios**: React Hook Form + Yup validation

## 🎨 Guías de UI (Temporal)

### Layout Básico:
- **Header**: Logo + navegación simple
- **Main**: Mapa o contenido principal
- **Sidebar**: Filtros o información adicional
- **Modal**: Para perfiles y formularios

### Elementos UI Sin Estilo:
- Botones: `<button className="btn">` (sin estilos)
- Cards: `<div className="card">` (solo estructura)
- Forms: Campos básicos con labels
- Navigation: Lista simple de enlaces

## 📱 Consideraciones PWA

### Características a Implementar:
- **Responsive design**: Mobile-first approach
- **Offline capability**: Caché básico de datos
- **Installable**: Manifest.json configurado
- **Performance**: Lazy loading y code splitting

### Archivos PWA Necesarios:
- `public/manifest.json`
- `public/sw.js` (service worker)
- Iconos en múltiples tamaños

## 🗃️ Gestión de Estado

### Estado Global (Context):
- Usuario autenticado
- Ubicación actual
- Tatuadores favoritos
- Filtros activos

### Estado Local:
- Formularios
- Modales abiertos/cerrados
- Datos temporales de componentes

## 🔍 Ejemplos de Funcionalidades

### Mapa de Tatuadores:
```typescript
// Hook para mapa
const useMapData = () => {
  // Lógica de geolocalización
  // Fetch de tatuadores cercanos
  // Manejo de marcadores
}
```

### Perfil de Tatuador:
```typescript
interface TattooerProfile {
  id: string;
  name: string;
  location: Coordinates;
  styles: string[];
  contact: ContactInfo;
  portfolio: Image[];
}
```

## ⚠️ Restricciones Actuales

### SÍ incluir:
- Estructura HTML semántica
- Clases CSS básicas para layout
- Funcionalidad completa
- Accesibilidad básica (aria-labels, alt texts)
- Validaciones de formularios

## 🎯 Objetivos de Cada Sugerencia

1. **Funcionalidad primero**: El código debe funcionar
2. **Estructura clara**: Fácil de mantener y extender
3. **Performance**: Optimizado para móviles
4. **Preparado para diseño**: Fácil de estilizar después
5. **PWA ready**: Considerando capacidades offline

## 📞 Integración WhatsApp

```typescript
// Ejemplo de función para contacto
const contactTattooer = (phoneNumber: string, message?: string) => {
  const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message || 'Hola, vi tu perfil en TattooZone')}`;
  window.open(url, '_blank');
};
```

Recuerda: Este proyecto está en fase de prototipado funcional. Prioriza la lógica y estructura sobre la apariencia visual.
