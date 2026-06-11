# Requirements: add-new-project

> Created: 2026-06-11
> Status: Active

## Context

Agregar un nuevo proyecto al portfolio requiere editar dos archivos JSON (ES + EN), copiar imágenes a `src/assets/projects/`, y si el proyecto tiene múltiples imágenes, el modelo y los componentes deben soportar la galería. Este documento sirve de guía para que Claude sepa exactamente qué hacer en futuras adiciones.

**Adding a new project to the portfolio requires editing two JSON files (ES + EN), copying images to `src/assets/projects/`, and if the project has multiple images, the model and components already support the gallery.**

---

## Stack

- `src/assets/data/es/projects.json` — datos en español
- `src/assets/data/en/projects.json` — datos en inglés
- `src/assets/projects/` — imágenes de proyectos
- `src/app/domain/shared/models/projects.model.ts` — interfaz `Projects`
- `src/app/domain/shared/components/projects/projects.component.*` — tarjetas de proyectos
- `src/app/domain/shared/components/projects-modal/projects-modal.component.*` — modal de detalle

---

## How to add a new project (paso a paso / step by step)

### 1. Copiar imágenes / Copy images

```bash
cp <source-image>.png src/assets/projects/<project-name>.png
# Si hay múltiples imágenes / If multiple images:
cp <source1>.png src/assets/projects/<project-name>1.png
cp <source2>.png src/assets/projects/<project-name>2.png
# etc.
```

### 2. Añadir entrada en ambos JSON / Add entry in both JSONs

**`src/assets/data/es/projects.json`** y **`src/assets/data/en/projects.json`**

Insertar al **inicio del array** (posición 0) para que aparezca primero:

```json
{
  "id": <unique-incremental-id>,
  "title": "<Nombre del Proyecto — Subtítulo descriptivo>",
  "description": "<Descripción detallada profesional de 3-5 párrafos. Explicar: qué hace, problema que resuelve, arquitectura clave, features destacados, decisiones técnicas importantes>",
  "stack": ["Tech1", "Tech2", "Tech3"],
  "img": "assets/projects/<project-name>1.png",
  "imgs": [
    "assets/projects/<project-name>1.png",
    "assets/projects/<project-name>2.png",
    "assets/projects/<project-name>3.png"
  ],
  "className": "desk-img-photo",
  "url": "<opcional: URL del proyecto si está en producción>"
}
```

**Nota sobre `className`:**
| Valor | Uso |
|-------|-----|
| `desk-img-photo` | Apps web/desktop con screenshot real (foto) |
| `desk-img` | Apps web con imagen de diseño / mockup |
| `mvl-img` | Apps móviles (portrait) |
| `mvl-desk-img` | Apps híbridas mobile+desktop |
| `logo-img` | Logos o imágenes cuadradas |
| `desk-small-img` | Screenshots pequeños |
| `desk-big-img` | Screenshots anchos |

**Si el proyecto tiene UNA sola imagen**, omitir `imgs` y usar solo `img`.

### 3. Descripción de calidad / Quality description

La descripción debe:
- Explicar el problema que resuelve (1 oración)
- Detallar la arquitectura y decisiones técnicas clave
- Mencionar features principales
- Incluir métricas o datos técnicos donde aplique (tamaño bundle, versiones, etc.)
- Usar párrafos separados con `\n\n` para mejor legibilidad en el modal

---

## Constraints

- IDs únicos, incremental — revisar el máximo existente antes de asignar
- `img` siempre presente (campo legacy, backward-compatible)
- `imgs` opcional — si se incluye, debe tener al menos 2 elementos para activar la galería
- Imágenes en formato PNG o JPEG, tamaño recomendado: 1280×800px o similar 16:9
- Ambos JSONs (ES + EN) deben tener el mismo número de proyectos y los mismos IDs

---

## Acceptance criteria

- [x] Modelo `Projects` tiene campo `imgs?: string[]`
- [x] Tarjeta de proyecto muestra badge de imagen cuando hay múltiples (`imgs`)
- [x] Modal muestra carrusel con navegación prev/next cuando hay múltiples imágenes
- [x] Modal muestra thumbnails/dots de navegación
- [x] `currentImgIndex` se resetea al abrir un nuevo proyecto
- [x] Proyectos ctxflow, EverVim y FramePrompt añadidos con descripciones profesionales
- [x] Imágenes copiadas a `src/assets/projects/`
- [x] Ambos JSONs (ES + EN) actualizados
