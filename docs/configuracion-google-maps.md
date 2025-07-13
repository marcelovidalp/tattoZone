# Configuración de Google Maps - TattooZone

## 🗺️ Configuración inicial

### 1. Obtener API Key de Google Maps
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un proyecto nuevo o seleccionar uno existente
3. Habilitar las APIs:
   - Maps JavaScript API
   - Geocoding API (para el futuro)
   - Places API (para el futuro)
4. Crear credenciales (API Key)

### 2. Configurar la API Key
```powershell
# Crear archivo .env en la raíz del proyecto
echo "REACT_APP_GOOGLE_MAPS_API_KEY=tu_api_key_aqui" > .env
```

### 3. Restricciones de seguridad (recomendadas)
- Restringir la API key por dominio
- Limitar las APIs habilitadas
- Configurar cuotas de uso

## 🎯 Funcionalidades implementadas

### Mapa básico:
- ✅ Renderizado del mapa
- ✅ Marcadores de tatuadores de ejemplo
- ✅ Botón de ubicación actual
- ✅ Manejo de estados de carga/error

### Integración con UI:
- ✅ Búsqueda funcional
- ✅ Filtros por estilo y distancia
- ✅ Lista de tatuadores
- ✅ Botón de WhatsApp

## 🚀 Para probar sin API key:
La aplicación funcionará con un mapa de demostración limitado.
Para desarrollo completo, necesitas una API key válida.

## 🔧 Troubleshooting:

### Error: Google Maps no carga
- Verificar que la API key esté en .env
- Verificar que las APIs estén habilitadas
- Verificar restricciones de dominio

### Error: Ubicación no funciona
- HTTPS requerido para geolocalización
- Permitir permisos de ubicación en el navegador
