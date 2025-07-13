# Solución de Errores - TattooZone

## 🚨 Error: "react-scripts" no se reconoce

### Problema:
```
"react-scripts" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.
```

### Solución para PowerShell (Windows):

1. **Eliminar node_modules y package-lock.json:**
```powershell
# PowerShell commands
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

2. **Reinstalar dependencias:**
```powershell
npm install
```

3. **Si persiste el error, instalar react-scripts globalmente:**
```powershell
npm install -g react-scripts@5.0.1
```

4. **Alternativa - usar npx:**
```powershell
npx react-scripts start
```

### Comandos de verificación:

```powershell
# Verificar que react-scripts esté instalado
npm list react-scripts

# Verificar versión de Node
node --version

# Verificar versión de npm
npm --version

# Verificar ubicación actual
Get-Location
```

## 🔧 Comandos alternativos para PowerShell:

Si `npm start` no funciona, usa:

```powershell
# Opción 1: usar npx
npx react-scripts start

# Opción 2: usar yarn (si tienes yarn instalado)
yarn start

# Opción 3: instalar react-scripts específicamente
npm install react-scripts@5.0.1 --save
npm start

# Opción 4: limpiar caché de npm
npm cache clean --force
npm install
```

## 🚀 Secuencia completa para PowerShell:

```powershell
# 1. Navegar al directorio del proyecto
cd "C:\Users\marce\Documentos\GitHub\tattoZone\tattoo-zone"

# 2. Limpiar instalación anterior
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# 3. Reinstalar dependencias
npm install

# 4. Iniciar el proyecto
npm start
```

## ✅ Verificación exitosa:

Cuando funcione correctamente verás:
```
Compiled successfully!

You can now view tattoo-zone in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

## 🔍 Troubleshooting adicional:

### Si tienes problemas de permisos:
```powershell
# Ejecutar PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Si node_modules no se elimina:
```powershell
# Forzar eliminación
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
```

### Verificar que estés en la carpeta correcta:
```powershell
# Ver contenido del directorio
Get-ChildItem
# Debe mostrar: package.json, src/, public/, etc.
```

## 🚨 Error: Conflictos de dependencias npm

### Problema:
```
npm error ERESOLVE could not resolve
npm error peer typescript@">=2.7.0" from fork-ts-checker-webpack-plugin@6.5.3
```

### Solución para PowerShell (Windows):

#### Paso 1: Limpiar completamente
```powershell
# Eliminar node_modules y archivos de lock
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item yarn.lock -ErrorAction SilentlyContinue

# Limpiar caché de npm
npm cache clean --force
```

#### Paso 2: Instalar con versiones compatibles
```powershell
# Instalar dependencias básicas primero
npm install react@18.2.0 react-dom@18.2.0
npm install typescript@4.9.5
npm install react-scripts@5.0.1

# Instalar el resto de dependencias
no
```

#### Paso 3: Si persisten errores, usar flag --legacy-peer-deps
```powershell
npm install --legacy-peer_deps
```

## 🔧 Comandos alternativos para PowerShell:

### Opción 1: Instalación forzada
```powershell
npm install --force
```

### Opción 2: Ignorar peer dependencies
```powershell
npm install --legacy-peer-deps
```

### Opción 3: Crear proyecto desde cero
```powershell
# Ir al directorio padre
cd "C:\Users\marce\Documentos\GitHub\tattoZone"

# Eliminar proyecto actual
Remove-Item -Recurse -Force tattoo-zone

# Crear nuevo proyecto
npx create-react-app tattoo-zone --template typescript

# Navegar al nuevo proyecto
cd tattoo-zone
```

## 🚀 Secuencia completa RECOMENDADA:

```powershell
# 1. Limpiar todo
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

# 2. Instalar con compatibilidad
npm install --legacy-peer-deps

# 3. Verificar instalación
npm list

# 4. Iniciar proyecto
npm start
```

## ✅ Verificación exitosa:

Deberías ver:
```
✓ All dependencies installed successfully
✓ No vulnerabilities found
```

Y luego:
```
Compiled successfully!
Local: http://localhost:3000
```

## 🎯 Si nada funciona - Plan B:

### Recrear proyecto limpio:
```powershell
# Eliminar proyecto actual
cd "C:\Users\marce\Documentos\GitHub\tattoZone"
Remove-Item -Recurse -Force tattoo-zone

# Crear nuevo
npx create-react-app tattoo-zone --template typescript
cd tattoo-zone

# Verificar que funciona
npm start
```

### Después agregar dependencias una por una:
```powershell
# Solo agregar lo esencial primero
npm install react-router-dom
npm install react-hook-form

# Probar que funciona después de cada instalación
npm start
```

## 🚨 Error: JSON parse - package.json corrupto

### Problema:
```
npm error JSON.Parse Unexpected non-whitespace character after JSON at position 977 (line 44 column 7)
npm error JSON.Parse Failed to parse JSON data.
```

### Solución para PowerShell (Windows):

#### Paso 1: Verificar el archivo corrupto
```powershell
# Ver contenido del package.json
Get-Content "package.json"
# Buscar caracteres raros o duplicaciones
```

#### Paso 2: Crear package.json limpio
```powershell
# Respaldar el archivo corrupto
Copy-Item "package.json" "package.json.backup"

# Eliminar el archivo corrupto
Remove-Item "package.json"

# Crear nuevo package.json básico
@"
{
  "name": "tattoo-zone",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
"@ | Out-File -FilePath "package.json" -Encoding UTF8
```

#### Paso 3: Verificar y instalar
```powershell
# Verificar que el JSON es válido
Get-Content "package.json" | ConvertFrom-Json

# Si no hay errores, instalar
npm install
```

## 🔧 Comando de emergencia - Recrear proyecto:

Si nada funciona, recrear desde cero:

```powershell
# Ir al directorio padre
cd "C:\Users\marce\Documentos\GitHub\tattoZone"

# Eliminar proyecto corrupto
Remove-Item -Recurse -Force "tattoo-zone"

# Crear nuevo proyecto limpio
npx create-react-app tattoo-zone --template typescript

# Navegar al nuevo proyecto
cd tattoo-zone

# Verificar que funciona
npm start
```

## 🚨 Error: Se abre explorador de directorios en lugar de la app

### Problema:
Al ejecutar `npm start`, en lugar de mostrar la aplicación React, aparece un listado de directorios como un explorador de archivos.

### Causas posibles:
1. Archivo `index.html` corrupto o faltante
2. Problemas con el directorio `public/`
3. React-scripts no encuentra los archivos correctos
4. Puerto ocupado por otro servidor

### Solución paso a paso:

#### Paso 1: Verificar estructura de archivos
```powershell
# Verificar que existen los archivos esenciales
Test-Path "public/index.html"     # Debe ser True
Test-Path "src/index.tsx"         # Debe ser True
Test-Path "src/App.tsx"           # Debe ser True
Test-Path "package.json"          # Debe ser True

# Ver contenido del directorio public
Get-ChildItem "public/"
```

#### Paso 2: Verificar el contenido de index.html
```powershell
# Ver las primeras líneas del index.html
Get-Content "public/index.html" | Select-Object -First 10
```

#### Paso 3: Limpiar y reiniciar
```powershell
# Detener el servidor si está corriendo (Ctrl+C)
# Limpiar caché y reinstalar
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install
```

#### Paso 4: Verificar puerto
```powershell
# Verificar si el puerto 3000 está ocupado
netstat -ano | findstr :3000

# Si está ocupado, especificar otro puerto
$env:PORT = "3001"
npm start
```

#### Paso 5: Iniciar en modo limpio
```powershell
# Iniciar con configuración específica
npm start
```

### Verificaciones adicionales:

#### Si persiste el problema:
```powershell
# Verificar contenido de src/index.tsx
Get-Content "src/index.tsx" | Select-Object -First 10

# Verificar que React se renderiza correctamente
# El archivo debe contener: ReactDOM.createRoot y root.render
```

#### Recrear archivos esenciales si faltan:
```powershell
# Si falta public/index.html, usar el que proporcioné arriba
# Si falta src/index.tsx, verificar que existe y contiene el código correcto
```

## 🔧 Solución de emergencia:

Si nada funciona, recrear estructura básica:

```powershell
# Ir al directorio padre
cd "C:\Users\marce\Documentos\GitHub\tattoZone"

# Respaldar src/App.tsx y src/App.css
Copy-Item "tattoo-zone/src/App.tsx" "App.tsx.backup"
Copy-Item "tattoo-zone/src/App.css" "App.css.backup"

# Eliminar proyecto corrupto
Remove-Item -Recurse -Force "tattoo-zone"

# Crear nuevo proyecto
npx create-react-app tattoo-zone --template typescript

# Navegar al nuevo proyecto
cd tattoo-zone

# Restaurar archivos personalizados
Copy-Item "../App.tsx.backup" "src/App.tsx"
Copy-Item "../App.css.backup" "src/App.css"

# Verificar que funciona
npm start
```
