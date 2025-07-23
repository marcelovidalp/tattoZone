# TattooZone - Arquitectura Limpia Full-Stack

## Estructura de Directorios

```
tattoZone/
├── docs/                          # Documentación del proyecto
│   ├── api/                       # Documentación de la API
│   ├── architecture/              # Diagramas de arquitectura
│   └── user-stories/              # Historias de usuario
│
├── shared/                        # Código compartido entre frontend y backend
│   ├── domain/                    # Entidades del dominio (Core Business Logic)
│   │   ├── entities/              # Entidades principales
│   │   │   ├── User.ts
│   │   │   ├── Tattooer.ts
│   │   │   ├── Location.ts
│   │   │   ├── TattooStyle.ts
│   │   │   └── Review.ts
│   │   ├── value-objects/         # Objetos de valor
│   │   │   ├── Email.ts
│   │   │   ├── Phone.ts
│   │   │   ├── Rating.ts
│   │   │   └── Distance.ts
│   │   ├── repositories/          # Interfaces de repositorios
│   │   │   ├── IUserRepository.ts
│   │   │   ├── ITattooerRepository.ts
│   │   │   └── ILocationRepository.ts
│   │   └── use-cases/             # Casos de uso (Application Business Rules)
│   │       ├── user/
│   │       │   ├── CreateUser.ts
│   │       │   ├── LoginUser.ts
│   │       │   └── UpdateUserLocation.ts
│   │       ├── tattooer/
│   │       │   ├── SearchTattooers.ts
│   │       │   ├── FilterByDistance.ts
│   │       │   ├── FilterByStyle.ts
│   │       │   └── GetTattooerProfile.ts
│   │       └── location/
│   │           ├── GetCurrentLocation.ts
│   │           └── CalculateDistance.ts
│   └── types/                     # Tipos TypeScript compartidos
│       ├── api.types.ts
│       ├── domain.types.ts
│       └── common.types.ts
│
├── backend/                       # Servidor Node.js/Express
│   ├── src/
│   │   ├── infrastructure/        # Frameworks & Drivers (External Concerns)
│   │   │   ├── database/          # Configuración de base de datos
│   │   │   │   ├── mongodb/
│   │   │   │   │   ├── connection.ts
│   │   │   │   │   ├── models/
│   │   │   │   │   └── repositories/
│   │   │   │   │       ├── MongoUserRepository.ts
│   │   │   │   │       ├── MongoTattooerRepository.ts
│   │   │   │   │       └── MongoLocationRepository.ts
│   │   │   │   └── postgresql/    # Alternativa SQL
│   │   │   ├── web/               # Framework web (Express)
│   │   │   │   ├── server.ts
│   │   │   │   ├── middleware/
│   │   │   │   ├── routes/
│   │   │   │   │   ├── auth.routes.ts
│   │   │   │   │   ├── tattooer.routes.ts
│   │   │   │   │   ├── user.routes.ts
│   │   │   │   │   └── location.routes.ts
│   │   │   │   └── controllers/
│   │   │   │       ├── AuthController.ts
│   │   │   │       ├── TattooerController.ts
│   │   │   │       ├── UserController.ts
│   │   │   │       └── LocationController.ts
│   │   │   ├── external-services/ # Servicios externos
│   │   │   │   ├── GoogleMapsService.ts
│   │   │   │   ├── WhatsAppService.ts
│   │   │   │   └── EmailService.ts
│   │   │   └── config/            # Configuraciones
│   │   │       ├── database.config.ts
│   │   │       ├── app.config.ts
│   │   │       └── environment.config.ts
│   │   ├── application/           # Interface Adapters
│   │   │   ├── services/          # Servicios de aplicación
│   │   │   │   ├── UserService.ts
│   │   │   │   ├── TattooerService.ts
│   │   │   │   └── LocationService.ts
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   ├── UserDTO.ts
│   │   │   │   ├── TattooerDTO.ts
│   │   │   │   └── LocationDTO.ts
│   │   │   └── mappers/           # Mappers entre DTOs y entidades
│   │   │       ├── UserMapper.ts
│   │   │       ├── TattooerMapper.ts
│   │   │       └── LocationMapper.ts
│   │   └── main.ts                # Punto de entrada del backend
│   ├── tests/                     # Tests del backend
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                      # Aplicación React
│   ├── public/
│   ├── src/
│   │   ├── infrastructure/        # Frameworks & Drivers (External Concerns)
│   │   │   ├── api/               # Cliente HTTP
│   │   │   │   ├── ApiClient.ts
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── authApi.ts
│   │   │   │   │   ├── tattooerApi.ts
│   │   │   │   │   ├── userApi.ts
│   │   │   │   │   └── locationApi.ts
│   │   │   │   └── interceptors/
│   │   │   ├── storage/           # LocalStorage, SessionStorage
│   │   │   │   ├── LocalStorageService.ts
│   │   │   │   └── SessionStorageService.ts
│   │   │   ├── geolocation/       # APIs del navegador
│   │   │   │   └── GeolocationService.ts
│   │   │   └── ui/                # Componentes de UI (React)
│   │   │       ├── components/
│   │   │       │   ├── common/
│   │   │       │   │   ├── Button/
│   │   │       │   │   ├── Input/
│   │   │       │   │   ├── Modal/
│   │   │       │   │   └── Loading/
│   │   │       │   ├── layout/
│   │   │       │   │   ├── Header/
│   │   │       │   │   ├── Footer/
│   │   │       │   │   └── Sidebar/
│   │   │       │   ├── features/
│   │   │       │   │   ├── auth/
│   │   │       │   │   │   ├── LoginForm/
│   │   │       │   │   │   └── RegisterForm/
│   │   │       │   │   ├── tattooer/
│   │   │       │   │   │   ├── TattooerCard/
│   │   │       │   │   │   ├── TattooerProfile/
│   │   │       │   │   │   ├── TattooerList/
│   │   │       │   │   │   └── TattooerFilter/
│   │   │       │   │   ├── map/
│   │   │       │   │   │   ├── LeafletMap/
│   │   │       │   │   │   ├── MarkerPopup/
│   │   │       │   │   │   └── LocationButton/
│   │   │       │   │   └── user/
│   │   │       │   │       ├── UserProfile/
│   │   │       │   │       └── UserSettings/
│   │   │       │   └── pages/
│   │   │       │       ├── HomePage/
│   │   │       │       ├── ProfilePage/
│   │   │       │       ├── LoginPage/
│   │   │       │       └── NotFoundPage/
│   │   │       └── styles/
│   │   │           ├── globals.css
│   │   │           ├── components/
│   │   │           └── pages/
│   │   ├── application/           # Interface Adapters
│   │   │   ├── hooks/             # Custom React Hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useTattooers.ts
│   │   │   │   ├── useLocation.ts
│   │   │   │   └── useFilters.ts
│   │   │   ├── context/           # React Context
│   │   │   │   ├── AuthContext.tsx
│   │   │   │   ├── TattooZoneContext.tsx
│   │   │   │   └── LocationContext.tsx
│   │   │   ├── store/             # Estado global (Redux/Zustand)
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── tattooerSlice.ts
│   │   │   │   ├── locationSlice.ts
│   │   │   │   └── store.ts
│   │   │   └── adapters/          # Adaptadores para el dominio
│   │   │       ├── UserAdapter.ts
│   │   │       ├── TattooerAdapter.ts
│   │   │       └── LocationAdapter.ts
│   │   ├── main.tsx               # Punto de entrada
│   │   └── App.tsx                # Componente principal
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── mobile/                        # Aplicación React Native (Futuro)
│   └── (estructura similar al frontend)
│
├── scripts/                       # Scripts de automatización
│   ├── build.sh
│   ├── deploy.sh
│   ├── test.sh
│   └── seed-database.ts
│
├── docker/                        # Configuración Docker
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── .github/                       # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── tests.yml
│
├── README.md
├── package.json                   # Root package.json (monorepo)
└── lerna.json                     # Configuración de Lerna para monorepo
```

## Principios de Clean Architecture Aplicados

### 1. Dependency Rule
- Las dependencias apuntan hacia adentro (hacia el dominio)
- El dominio no conoce detalles de implementación
- Los frameworks son detalles intercambiables

### 2. Separation of Concerns
- **Domain Layer**: Lógica de negocio pura
- **Application Layer**: Casos de uso y servicios
- **Infrastructure Layer**: Frameworks, DB, APIs externas
- **Presentation Layer**: UI y controladores

### 3. Inversión de Dependencias
- Interfaces definidas en el dominio
- Implementaciones en infraestructura
- Inyección de dependencias

### 4. Testabilidad
- Cada capa es testeable independientemente
- Mocks e interfaces para aislar dependencias
- Tests unitarios, de integración y E2E

## Beneficios de esta Estructura

1. **Escalabilidad**: Fácil agregar nuevas funcionalidades
2. **Mantenibilidad**: Código organizado y desacoplado
3. **Testabilidad**: Cada componente es testeable
4. **Flexibilidad**: Cambiar tecnologías sin afectar la lógica de negocio
5. **Reutilización**: Código compartido entre frontend y backend
6. **Colaboración**: Equipos pueden trabajar independientemente

## Tecnologías Sugeridas

### Backend
- **Framework**: Express.js/Fastify
- **Base de Datos**: MongoDB/PostgreSQL
- **ORM**: Mongoose/Prisma
- **Autenticación**: JWT
- **Validación**: Joi/Yup
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React + TypeScript
- **Estado**: Redux Toolkit/Zustand
- **Routing**: React Router
- **HTTP Client**: Axios
- **Maps**: Leaflet
- **Testing**: Jest + React Testing Library

### Shared
- **Validación**: Zod (compartida entre FE y BE)
- **Tipos**: TypeScript
- **Build**: Vite/Webpack
