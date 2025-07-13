# Setup del Proyecto TattooZone

## 🚀 Inicialización

### 1. Crear proyecto React con TypeScript
```bash
npx create-react-app tattoo-zone --template typescript
cd tattoo-zone
```

### 2. Instalar dependencias principales
```bash
# Google Maps
npm install @googlemaps/react-wrapper

# Formularios
npm install react-hook-form @hookform/resolvers yup

# Navegación
npm install react-router-dom
npm install @types/react-router-dom

# PWA y utilidades
npm install workbox-webpack-plugin
```

### 3. Estructura de carpetas
```bash
mkdir src/components src/pages src/hooks src/types src/utils src/context
mkdir src/components/Map src/components/Auth src/components/TattooerProfile src/components/UserProfile src/components/Search
mkdir public/icons
```

### 4. Variables de entorno
Crear `.env` en la raíz:
```
REACT_APP_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

## 📁 Archivos iniciales a crear

### src/types/index.ts
```typescript
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TattooerProfile {
  id: string;
  name: string;
  location: Coordinates;
  styles: string[];
  contact: {
    phone: string;
    email?: string;
  };
  portfolio: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'user' | 'tattooer';
}
```

### public/manifest.json
```json
{
  "short_name": "TattooZone",
  "name": "TattooZone - Localizador de Tatuadores",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### src/context/AppContext.tsx
```typescript
import React, { createContext, useContext, useState } from 'react';
import { User, TattooerProfile, Coordinates } from '../types';

interface AppContextType {
  user: User | null;
  currentLocation: Coordinates | null;
  favorites: string[];
  setUser: (user: User | null) => void;
  setCurrentLocation: (location: Coordinates) => void;
  toggleFavorite: (tattoerId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (tattoerId: string) => {
    setFavorites(prev => 
      prev.includes(tattoerId)
        ? prev.filter(id => id !== tattoerId)
        : [...prev, tattoerId]
    );
  };

  return (
    <AppContext.Provider value={{
      user,
      currentLocation,
      favorites,
      setUser,
      setCurrentLocation,
      toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};
```

## 🎯 Próximos pasos
1. Ejecutar `npm start` para verificar que todo funciona
2. Configurar Google Maps API key
3. Crear componentes básicos (Map, Auth, etc.)
4. Implementar navegación con React Router
