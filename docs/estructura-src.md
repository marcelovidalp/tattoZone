# Estructura del Directorio `src/`

## 📁 Orden de Directorios (React Standard)

### `/src` (raíz) - Archivos principales primero
- **Archivos principales**:
  - `index.tsx` - Punto de entrada de la aplicación
  - `App.tsx` - Componente principal/raíz
  - `App.css` - Estilos del componente App
  - `index.css` - Estilos globales
  - `App.test.tsx` - Tests del componente App
  - `setupTests.ts` - Configuración de tests
  - `reportWebVitals.ts` - Métricas de performance
  - `react-app-env.d.ts` - Tipos de React

## 📁 Directorios adicionales (orden alfabético)

### `/components` - Componentes reutilizables
- **Propósito**: Componentes de UI reutilizables
- **Subdirectorios**:
  - `Auth/` - Autenticación (Login, Register)
  - `Map/` - Componentes del mapa
  - `Search/` - Búsqueda y filtros
  - `TattooerProfile/` - Perfil de tatuador
  - `UserProfile/` - Perfil de usuario

### `/context` - Context providers
- **Propósito**: Estado global de React Context
- **Archivos**:
  - `AppContext.tsx` - Context principal
  - `AuthContext.tsx` - Context de autenticación

### `/hooks` - Custom hooks
- **Propósito**: Lógica reutilizable en hooks
- **Archivos**:
  - `useAuth.ts` - Hook de autenticación
  - `useGeolocation.ts` - Hook de ubicación
  - `useMapData.ts` - Hook para datos del mapa

### `/pages` - Páginas principales
- **Propósito**: Componentes de rutas/páginas
- **Archivos**:
  - `HomePage.tsx` - Página principal
  - `LoginPage.tsx` - Página de login
  - `ProfilePage.tsx` - Página de perfil

### `/types` - Tipos TypeScript
- **Propósito**: Definiciones de interfaces y tipos
- **Archivos**:
  - `index.ts` - Exportaciones principales
  - `api.ts` - Tipos de API
  - `tattooer.ts` - Tipos de tatuador
  - `user.ts` - Tipos de usuario

### `/utils` - Utilidades
- **Propósito**: Funciones helper y utilidades
- **Archivos**:
  - `maps.ts` - Utilidades de mapas
  - `storage.ts` - Manejo de localStorage
  - `validation.ts` - Validaciones
  - `whatsapp.ts` - Integración WhatsApp

## 🎯 Estructura actual implementada

```
src/
├── App.css              # ✅ Estilos principales
├── App.test.tsx         # ✅ Tests del App
├── App.tsx              # ✅ Componente principal (LIENZO)
├── index.css            # ✅ Estilos globales
├── index.tsx            # ✅ Punto de entrada
├── react-app-env.d.ts   # ✅ Tipos de React
├── reportWebVitals.ts   # ✅ Métricas
├── setupTests.ts        # ✅ Setup de tests
├── components/          # 🔄 Por crear
├── context/             # 🔄 Por crear
├── hooks/               # 🔄 Por crear
├── pages/               # 🔄 Por crear
├── types/               # 🔄 Por crear
└── utils/               # 🔄 Por crear
```

## 📋 Estado del Lienzo Principal (App.tsx)

### ✅ Implementado:
- Layout responsive básico
- Header con navegación
- Área de mapa (placeholder)
- Sidebar con búsqueda y filtros
- Lista de tatuadores
- Footer

### 🎯 Funcionalidades mostradas:
- Búsqueda por estilo/nombre
- Filtros por estilo y distancia
- Tarjetas de tatuadores con acciones
- Botones de contacto
- Layout mobile-first

### 📱 Responsive:
- Desktop: Mapa + sidebar lado a lado
- Mobile: Mapa arriba, sidebar abajo
- Header adaptativo

## 🚀 Próximos pasos:
1. Crear estructura de carpetas restantes
2. Implementar componentes individuales
3. Agregar funcionalidad a los botones
4. Integrar Google Maps
5. Conectar con backend
│   ├── validation.ts
│   ├── whatsapp.ts
│   └── storage.ts
├── context/             # Context providers
│   ├── AppContext.tsx
│   ├── AuthContext.tsx
│   └── MapContext.tsx
├── App.tsx              # Componente principal
├── App.css              # Estilos del App
├── index.tsx            # Punto de entrada
└── index.css            # Estilos globales
```

## 📋 Convenciones de nombres

### Componentes
- **PascalCase**: `TattooerCard.tsx`
- **Extensión**: `.tsx` para componentes con JSX

### Hooks
- **camelCase**: `useGeolocation.ts`
- **Prefijo**: Siempre empezar con `use`
- **Extensión**: `.ts` para hooks sin JSX

### Tipos
- **camelCase**: `user.ts`, `api.ts`
- **Exportación**: Usar `export interface` o `export type`

### Utils
- **camelCase**: `validation.ts`, `whatsapp.ts`
- **Funciones puras**: Sin efectos secundarios cuando sea posible

## 🔄 Flujo de importación

```typescript
// En un componente
import { TattooerProfile } from '../types';        // Tipos
import { useAuth } from '../hooks/useAuth';        // Hooks
import { validateForm } from '../utils/validation'; // Utils
import { useAppContext } from '../context/AppContext'; // Context
```

Esta estructura modular facilita el mantenimiento y la escalabilidad del proyecto.
