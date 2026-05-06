# 🍽 ¿Qué cocino hoy? — PWA de Recetas Argentinas

Una aplicación web progresiva (PWA) que sugiere comidas típicas argentinas de forma aleatoria con recetas completas paso a paso, generadas por inteligencia artificial (Claude de Anthropic).

---

## 🚀 Cómo desplegar

### Opción 1 — Netlify Drop (más fácil, gratis)
1. Abrí [netlify.com/drop](https://app.netlify.com/drop) en tu navegador.
2. Arrastrá toda la carpeta `que-cocino-hoy/` a la página.
3. ¡Listo! Netlify te da una URL en segundos.

### Opción 2 — GitHub Pages (gratis)
```bash
# 1. Crear repo en GitHub e inicializar
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/que-cocino-hoy.git
git push -u origin main

# 2. En GitHub: Settings → Pages → Source: Deploy from branch → main
# La app estará en: https://TU_USUARIO.github.io/que-cocino-hoy/
```

### Opción 3 — Vercel (recomendado para producción)
```bash
npm i -g vercel
vercel
# Seguí las instrucciones interactivas
```

### Opción 4 — Servidor local con Python
```bash
cd que-cocino-hoy
python3 -m http.server 8080
# Abrí http://localhost:8080 en el navegador
```

---

## 🔑 API Key de Anthropic (opcional pero recomendado)

La app usa la API de Claude (Anthropic) para generar recetas. Si la usás desde el navegador directamente:

> ⚠️ **Nota de seguridad**: Para uso personal/demo está bien. Para producción, usá un backend que proteja tu API key.

La app funciona sin API key gracias a recetas de respaldo locales.

Para habilitar la IA completa:
1. Obtené una API key en [console.anthropic.com](https://console.anthropic.com)
2. Abrí `index.html` y buscá `API_KEY_PLACEHOLDER`
3. O mejor: desplegá un backend simple en Node.js que haga proxy a la API

---

## 📱 Instalación como App

### Android (Chrome)
1. Abrí la URL de la app en Chrome.
2. Tap en el banner de instalación que aparece, o menú (⋮) → "Agregar a pantalla de inicio".
3. ¡La app se instala como una app nativa!

### iOS (Safari)
1. Abrí la URL en Safari.
2. Tap en el botón compartir (□↑).
3. Seleccioná "Agregar a pantalla de inicio".
4. Confirmá con "Agregar".

---

## ✨ Funcionalidades

- 🎲 **Generador aleatorio** de comidas argentinas (milanesas, empanadas, asado, pasta, guisos, tartas, etc.)
- ☀️🌙 **Filtro** por almuerzo o cena
- 📖 **Receta completa** con ingredientes, pasos detallados, tiempo y dificultad
- ❤️ **Favoritos** guardados en el dispositivo (localStorage)
- 🕐 **Historial** de recetas vistas
- 🌙 **Modo oscuro**
- 📲 **Compartir** recetas por WhatsApp, Instagram, etc.
- 📴 **Modo offline** con acceso al historial sin internet
- ⚡ **PWA instalable** en Android e iOS

---

## 📁 Estructura de archivos

```
que-cocino-hoy/
├── index.html          ← App principal (todo-en-uno)
├── offline.html        ← Página sin conexión
├── manifest.json       ← Configuración PWA
├── sw.js               ← Service Worker
├── favicon.ico         ← Favicon
└── icons/              ← Íconos PWA (todos los tamaños)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

---

## 🛠 Tecnologías

- **Frontend**: HTML5, CSS3 (custom properties, grid, animations), JavaScript vanilla
- **IA**: Claude claude-sonnet-4-20250514 (Anthropic) para recetas dinámicas
- **PWA**: Service Worker + Web App Manifest
- **Tipografía**: Fraunces (display) + DM Sans (UI) — Google Fonts
- **Storage**: localStorage para favoritos e historial
- **Sin frameworks externos** — cero dependencias

---

## 🍝 Recetas incluidas (fallback offline)

- Milanesas con puré de papa
- Fideos con tuco casero
- (+ generación dinámica vía IA)

---

## 📄 Licencia

MIT — Libre para uso personal y comercial.

---

Hecho con ❤️ en Argentina 🇦🇷
