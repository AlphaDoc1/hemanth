# Portfolio design direction

Warm editorial typography, paper and ink surfaces, a rust accent, and a matching persistent dark theme. Manrope supplies the main typography; IBM Plex Mono labels and italic system Georgia give the page contrast without additional font downloads. Font files are self-hosted, with their OFL licenses in `public/fonts`.

## Research

Live portfolio domains were inaccessible from this environment. Research used public repository source, rather than claiming a review of their current live websites or a ranking of the “best” sites:

- [Brittany Chiang, v4](https://github.com/bchiang7/v4/tree/539cef0): project hierarchy, prominent source/demo links, and responsive featured work.
- [Tania Rascia](https://github.com/taniarascia/taniarascia.com/tree/eb61b7f): content-led navigation, personal presentation, and theme controls.
- [Paco Coursey, historical portfolio](https://github.com/pacocoursey/paco): typography, restraint, and interaction details. This repository identifies itself as an older site, not the current portfolio.

The implementation uses original layouts and CSS; no portfolio assets or source were copied. The project covers are decorative illustrations, explicitly labeled as such, and are replaced by saved project images when available. They do not represent screenshots or real analytics. Preview content is identified in the interface; saved Supabase content and existing admin workflows remain supported.

## Interaction and responsive behavior

The featured project leads the hero, followed by varied about, work, skills, and contact layouts. Work can be filtered by technologies present in the actual project data. Theme choice persists across public, authentication, and admin routes. Keyboard focus, reduced motion, descriptive action labels, and narrow-screen layouts are supported.

The frontend remains usable without Supabase environment variables. Valid configuration loads saved content; fetch failures show a retryable preview, and a successful empty project response remains empty.
