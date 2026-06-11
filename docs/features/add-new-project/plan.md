# Plan: add-new-project

> Created: 2026-06-11
> Status: Completed

## Tasks

- [x] Inicializar ctxflow con agente Claude Code
- [x] Copiar imágenes de ~/Desktop/dev-helpers/wp/ a src/assets/projects/
- [x] Actualizar Projects model — añadir `imgs?: string[]`
- [x] Actualizar projects.component.html — badge contador de imágenes en card
- [x] Actualizar projects-modal.component.ts — lógica carousel (currentImgIndex, allImages, etc.)
- [x] Actualizar projects-modal.component.html — carrusel con nav + thumbnails
- [x] Actualizar projects-modal.component.scss — estilos del carrusel
- [x] Añadir ctxflow a src/assets/data/es/projects.json y en/projects.json
- [x] Añadir EverVim a src/assets/data/es/projects.json y en/projects.json
- [x] Añadir FramePrompt a src/assets/data/es/projects.json y en/projects.json

## File structure

```
src/
├── assets/
│   ├── projects/
│   │   ├── ctxflow1.png, ctxflow2.png, ctxflow3.png
│   │   ├── evervim1.png, evervim2.png, evervim3.png, evervim4.png
│   │   └── frameprompt1.png ... frameprompt5.png
│   └── data/
│       ├── es/projects.json  ← +3 proyectos
│       └── en/projects.json  ← +3 proyectos
└── app/domain/shared/
    ├── models/projects.model.ts       ← +imgs field
    └── components/
        ├── projects/projects.component.html     ← +img badge
        └── projects-modal/
            ├── projects-modal.component.ts      ← +carousel logic
            ├── projects-modal.component.html    ← +carousel UI
            └── projects-modal.component.scss    ← +carousel styles

docs/features/add-new-project/   ← ctxflow feature docs
CLAUDE.md                         ← ctxflow context file
```

## Notes

- `img` (singular) se mantiene para backwards-compatibility con los ~30 proyectos existentes
- `imgs` (array) activa el carrusel si tiene ≥2 elementos
- El carrusel muestra thumbnails debajo del hero para proyectos con imágenes
- La tarjeta muestra un badge "📷 N" cuando `imgs.length > 1`
- `currentImgIndex` se resetea en `ngOnChanges` cuando cambia el `project` input
