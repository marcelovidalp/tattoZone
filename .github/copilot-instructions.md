# Copilot Coding Agent Instructions for TattooZone

## 1. Arquitectura General
- TattooZone es una PWA frontend (React + TypeScript) con enfoque en Clean Architecture.
- El núcleo de la lógica reside en `src/models/` y `src/services/`, siguiendo patrones de entidades, filtros y servicios.
- El archivo principal de orquestación es `src/models/TattooZoneApp.ts`, que centraliza el estado y la lógica de negocio.
- Los componentes de UI están en `src/components/` y se comunican con la lógica a través de instancias de `TattooZoneApp` y hooks.
- Los filtros de búsqueda y lógica de geolocalización están desacoplados en `SearchFilters` y `LocationService`.

## 2. Flujos de Desarrollo
- **Build:** `npm run build` genera la app en `build/`.
- **Dev:** `npm start` inicia el servidor de desarrollo.
- **Test:** `npm test` ejecuta pruebas con Jest y Testing Library.
- **Verificación rápida:** Usa los scripts PowerShell en `docs/verificacion-estructura.md` para validar estructura y archivos clave.

## 3. Convenciones y Patrones
- **Instanciación:** Usa `new TattooZoneApp()` para acceder a lógica principal y estado global.
- **Filtros:** Aplica filtros con `SearchFilters.applyFilters(tattooers)`; actualiza ubicación con `setUserLocation`.
- **Geolocalización:** Utiliza `LocationService.getCurrentLocation()` y `reverseGeocode` para obtener y mostrar direcciones.
- **Routing:** Usa React Router v6 (`Routes`, `Route`, `useNavigate`).
- **Estilos:** Los estilos están en `src/styles/` y se importan por componente.
- **Integración mapas:** Leaflet (`react-leaflet`) y Google Maps (`@googlemaps/react-wrapper`) pueden coexistir; revisa `LeafletMap.tsx` y configuración en `.env`.

## 4. Integraciones y Dependencias
- **Google Maps:** API key en `.env` como `REACT_APP_GOOGLE_MAPS_API_KEY`.
- **Leaflet:** Usa iconos y estilos personalizados en `LeafletMap.css`.
- **Contactos:** El contacto por WhatsApp se realiza desde la lógica de `TattooZoneApp` y los componentes de perfil.

## 5. Ejemplos de Patrones Clave
- Para filtrar tatuadores:
  ```typescript
  const filters = new SearchFilters('busqueda', estilo, 10, 4);
  const resultados = filters.applyFilters(tattooers);
  ```
- Para obtener ubicación:
  ```typescript
  const location = await LocationService.getCurrentLocation();
  filters.setUserLocation(location);
  ```
- Para renderizar mapa:
  ```tsx
  <LeafletMap center={[lat, lng]} zoom={13} tattooers={resultados} />
  ```

## 6. Reglas Especiales
- Mantén la lógica de negocio fuera de los componentes de UI.
- No modifiques directamente el estado global; usa métodos de `TattooZoneApp`.
- Los mocks y datos de prueba se inicializan en los servicios, no en los componentes.
- Si agregas nuevas entidades o casos de uso, sigue el patrón de Clean Architecture documentado en `docs/PROJECT_STRUCTURE.md`.

## 7. Archivos Clave
- `src/models/TattooZoneApp.ts` — Orquestador principal
- `src/services/LocationService.ts` — Geolocalización y geocodificación
- `src/models/SearchFilters.ts` — Filtros de búsqueda
- `src/components/LeafletMap.tsx` — Mapa interactivo
- `docs/estructura-src.md` y `docs/PROJECT_STRUCTURE.md` — Referencia de estructura y arquitectura

---

¿Falta alguna convención, integración o patrón importante? Indica cualquier sección que requiera mayor detalle o actualización.
