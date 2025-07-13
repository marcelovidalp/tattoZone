# Navegación de Directorios - TattooZone

## 🗂️ Estructura de Directorios

```
C:\Users\marce\Documentos\GitHub\
└── tattoZone\                    # ← Directorio del repositorio
    ├── docs\                     # ← Documentación
    ├── requerimienos.md          # ← Archivo de requisitos
    └── tattoo-zone\              # ← Directorio de la aplicación React
        ├── package.json          # ← Archivo de dependencias
        ├── src\                  # ← Código fuente
        ├── public\               # ← Archivos públicos
        └── node_modules\         # ← Dependencias instaladas
```

## 🚀 Comandos de Navegación en PowerShell

### Navegar al proyecto React:
```powershell
# Desde cualquier ubicación, ir al proyecto
cd "C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone"

# Verificar que estás en el lugar correcto
Get-Location
# Debe mostrar: C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone

# Ver contenido del directorio
Get-ChildItem
# Debe mostrar: package.json, src, public, etc.
```

### Verificar ubicación actual:
```powershell
# Ver dónde estás
pwd
# o
Get-Location

# Ver archivos en el directorio actual
ls
# o
Get-ChildItem
```

## ⚠️ Error Común: Directorio Incorrecto

### Problema:
```
npm error code ENOENT
npm error path C:\Users\marce\Documentos\GitHub\tattoZone\package.json
```

### Solución:
```powershell
# El error indica que estás en tattoZone/ pero necesitas estar en tattoo-zone/
# Navegar al directorio correcto:
cd "C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone"

# Verificar que package.json existe
Test-Path "package.json"
# Debe retornar: True
```

## 🔍 Comandos de Verificación

### Verificar estructura completa:
```powershell
# Desde tattoZone\ (directorio padre)
cd "C:\Users\marce\Documentos\GitHub\tattoZone"
Get-ChildItem -Recurse -Name | Select-Object -First 20
```

### Verificar que estás en el lugar correcto para npm:
```powershell
# Debe mostrar el contenido del package.json
Get-Content "package.json" | Select-Object -First 5
```

## 🎯 Secuencia Correcta de Comandos

```powershell
# 1. Ir al directorio correcto
cd "C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone"

# 2. Verificar ubicación
Get-Location

# 3. Verificar que package.json existe
ls package.json

# 4. Ejecutar npm install
npm install

# 5. Iniciar proyecto
npm start
```

## 📝 Atajos de PowerShell

```powershell
# Crear alias para ir rápido al proyecto
Set-Alias -Name goto-tattoo -Value "cd 'C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone'"

# Usar el alias
goto-tattoo
```

## 🔧 Si el directorio no existe

### Crear estructura correcta:
```powershell
# Si tattoo-zone no existe, crearlo desde tattoZone\
cd "C:\Users\marce\Documentos\GitHub\tattoZone"
npx create-react-app tattoo-zone --template typescript
cd tattoo-zone
```

Recuerda: Siempre verifica que estés en el directorio que contiene `package.json` antes de ejecutar comandos npm.
