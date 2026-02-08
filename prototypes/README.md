# Prototypes

Interactive React JSX design prototypes for Syntropy OS. These are self-contained components using mock data that demonstrate core interaction patterns.

## Components

| File | Feature | Description |
|------|---------|-------------|
| `task-card-queue.jsx` | F01, F02, F09 | Card-by-card queue with epic drill-down, dependencies, follow-ups |
| `architecture-explorer.jsx` | Architecture | Layered architecture explorer with schema, data flows, cost model |
| `domain-explorer.jsx` | F11 | Domain/Space explorer with tabs: Overview, Info, Projects, Artifacts, History |
| `product-canvas.jsx` | Product | Feature/story/use-case organizer with filtering, search, export |
| `artifact-intelligence.jsx` | F12 | 5-stage artifact pipeline: Upload → Process → Extract → Review → Save |

## Tech

- React hooks (useState, useEffect, useRef, useCallback)
- Inline CSS with dark theme (Figma-style)
- Fonts: DM Sans (body), JetBrains Mono (code/data)
- No external dependencies beyond React
- Mock data aligned with the product spec

## Colors

- Background: `#12141A`
- Cards: `#1A1D23`
- Text: `#E8E6E1`
- Gold accent: `#E8B931`
- Green: `#5BBD72`
- Blue: `#4A9BD9`
- Red: `#D94A6B`
- Purple: `#7A5AF5`
