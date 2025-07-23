# Diagrama de Clases - TattooZone

```mermaid
classDiagram
    class Location {
        +number lat
        +number lng
        +string address
        +calculateDistance(Location other) number
        +toString() string
    }

    class User {
        +number id
        +string name
        +string email
        +string phone
        +Location location
        +contactViaWhatsApp(Tattooer tattooer) void
    }

    class Tattooer {
        +number id
        +string name
        +string email
        +string phone
        +TattooStyle[] specialties
        +Location location
        +number rating
        +string[] portfolio
        +number experienceYears
        +isAvailable() boolean
        +getDistanceFrom(Location userLocation) number
        +getContactUrl() string
    }

    class TattooStyle {
        +string name
        +string description
        +string[] characteristics
        +toString() string
    }

    class SearchFilters {
        +string searchTerm
        +TattooStyle selectedStyle
        +number maxDistance
        +number minRating
        +applyFilters(Tattooer[] tattooers) Tattooer[]
    }

    class TattooZoneApp {
        +User currentUser
        +Location userLocation
        +Tattooer[] allTattooers
        +SearchFilters filters
        +getCurrentLocation() void
        +searchTattooers() Tattooer[]
        +filterByDistance(number maxKm) Tattooer[]
        +filterByStyle(TattooStyle style) Tattooer[]
    }

    %% Relaciones entre clases
    User --> Location : has
    Tattooer --> Location : located_at
    Tattooer --> TattooStyle : specializes_in
    TattooZoneApp --> User : current_user
    TattooZoneApp --> Tattooer : manages
    TattooZoneApp --> SearchFilters : uses
    SearchFilters --> TattooStyle : filters_by
````
