# MONARCH GIN — Website Architecture & Implementation Plan

A contemporary luxury botanical spirits website for **MONARCH GIN** (*"A SPIRIT FOR WHAT COMES NEXT"*). Translates the high-resolution brand identity board into a refined 4-page digital experience (Home, About, Shop, Contact) combining editorial typography, archival botanical illustration, GSAP ScrollTrigger pinned parallax, multi-currency commerce, and a slide-out cart drawer.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions have been confirmed through our initial clarification and the design brief:

- **Confirmed: Currency & Region**: Defaulting to South African Rand (ZAR, `R`) to honor South African botanical heritage and alcohol distribution standards, paired with a discreet multi-currency switcher (ZAR, USD, GBP, EUR) with live exchange conversion.
- **Confirmed: 16:9 Cinematic Hero Parallax**: The landing hero is engineered for a 16:9 (1920×1080px) composition. We will provision a cinematic atmospheric placeholder with slow ambient motion, ready for custom video media upload/swapping, with GSAP ScrollTrigger pin and layered typography parallax.
- **Confirmed: Age Verification**: Minimalist full-screen editorial 18+ modal greeting first-time visitors with bone/obsidian styling, legal drinking confirmation, and persistent session storage.
- **Brand Assets**: Extracted directly from `/public/assets/aistudio/MONARCH_Brand_Identity_Board_A3_600ppi_00a4a6c7.png` (authentic high-res Butterfly Monogram, Cactus Gin bottle photography, Lavender & Mint bottle photography, and the Archival Brand World botanical illustration).

---

## 1. Overview & Core Concept

- **What It Does**: A complete, fully functional luxury gin brand website comprising four core pages:
  1. **HOME**: 16:9 pinned parallax hero, brand introduction statement, two-column product collection highlight, Monarch butterfly symbol narrative, and closing editorial campaign.
  2. **ABOUT**: Brand philosophy, origin narrative, botanical heritage deep dive, and the butterfly symbol of transformation and becoming.
  3. **SHOP**: Minimal luxury catalogue with product grid, interactive detail modal/view template (botanical profile, ABV, volume, tasting notes, serving ritual), quantity stepper, and complete working shopping cart drawer with South African alcohol delivery disclosures.
  4. **CONTACT**: Editorial contact form with categorization (General, Stockists, Trade & Wholesale, Collaborations), email links, and verified submission state.
- **Target Audience / Persona**: Discerning spirits connoisseurs, luxury boutique buyers, high-end hospitality venues, and collectors seeking artisanal botanical craftsmanship.
- **Key Value**: Delivers the tactile, quiet restraint of a luxury perfume maison or contemporary fashion house, avoiding alcohol ecommerce clichés (no garish banners, no pill badge clutter, no fake countdowns).

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Color Palette** (sampled from brand board):
  - **Bone (`#E1C9B0`)**: Primary warm neutral background, creating a soft, tactile editorial canvas.
  - **Obsidian (`#262621`)**: Primary high-contrast text and architectural lines.
  - **Desert Clay (`#AD6230`)**: Cactus Gin expression accent and warm botanical tone.
  - **Withered Olive (`#646A42`)**: Botanical herbal accent.
  - **Golden Pollen (`#B08B3C`)**: Warm sunlight and harvest accents.
  - **Dried Rose (`#794338`)**: Lavender & Mint subtle floral undertone.
  - **Ivory Cream (`#F6EFE6`)**: Card and elevated editorial surface tone.

### Typography
- **Primary / Editorial Serif**: High-contrast, expressive serif (`Cormorant Garamond` / `Playfair Display`) for headlines, product names, and poetic statements.
- **Secondary / Neo-Grotesque**: `Plus Jakarta Sans` / `Manrope` for navigation, functional buttons, specs, tasting notes, and captions.
- **Captions & Micro-copy**: Generous tracking (`tracking-[0.25em]`), clean uppercase without boxed pill enclosures.

### Navigation Contract
- **Desktop (3-Zone Top Bar)**:
  - *Zone 1 (Left)*: MONARCH wordmark with the signature butterfly monogram.
  - *Zone 2 (Centre)*: `ABOUT` · `SHOP` · `CONTACT` with subtle underline hover transitions.
  - *Zone 3 (Right)*: Currency Switcher (`ZAR / USD / GBP`) and `BAG (n)` drawer trigger.
  - *Scroll Behavior*: Transparent over opening hero; transitions seamlessly to solid Bone background with hairline obsidian divider on scroll.
- **Mobile Navigation**: Minimalist header with compact butterfly mark, bag counter, and full-screen editorial drawer with oversized typography and smooth reveal transitions.

### Motion System & Micro-Interactions
- **GSAP ScrollTrigger**: Pinned 16:9 hero section where the video/placeholder background subtly scales (1.05× $\to$ 1.0×) and translates at a slower rate than the foreground headline and scroll prompt.
- **Cart Slide-Over**: Smooth slide-in drawer from the right with backdrop blur, itemized list, quantity increment/decrement, subtotal calculation, and seamless checkout intent flow.
- **Page Transitions**: Fluid, quiet fade transitions between the 4 primary views with automatic scroll-to-top.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Asset Extraction from 7016×4961px Board**
  - *Chosen Approach*: Extract genuine assets (Butterfly Monogram, Cactus Gin bottle on travertine, Lavender & Mint bottle on travertine, and Brand World artwork) directly from the provided 600ppi master identity board.
  - *Why*: Preserves 100% brand fidelity and avoids generic AI-hallucinated bottles or distorted logos.
- **Decision 2: 16:9 Hero Stage with Swap-Ready Architecture**
  - *Chosen Approach*: Create an atmospheric 1920×1080 responsive media stage with slow coastal ambient motion, condensation lighting, and an in-app "Media Source Switcher" control (allowing instant preview of custom video URLs or the curated ambient loop).
  - *Why*: Matches user request to provide a placeholder today while engineering the exact 16:9 parallax math for future video uploads.
- **Decision 3: Multi-Currency Cart Engine**
  - *Chosen Approach*: Reactive client-side cart store supporting South African Rand (ZAR) baseline (e.g. R 680.00) with real-time conversion rates to USD ($38.00), GBP (£30.00), and EUR (€35.00).
  - *Why*: Provides domestic compliance with South African liquor retail regulations while accommodating global luxury shoppers.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              APP ROOT                                  │
│   (App.tsx — State: Active Page, Cart Store, Currency, Age Gate)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────┐            ┌──────────────┐            ┌──────────────┐
│  Navigation  │            │ Page Router  │            │  CartDrawer  │
│  - Logo/Mark │            │ (Home/About/ │            │  - Items     │
│  - Links     │            │  Shop/Contact│            │  - Quantity  │
│  - Currency  │            │  PDP Modal)  │            │  - Subtotal  │
│  - Bag Count │            └───────┬──────┘            │  - Checkout  │
└──────────────┘                    │                   └──────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
   ┌──────────────┐          ┌──────────────┐          ┌──────────────┐
   │  Home View   │          │  Shop View   │          │  About View  │
   │ - Pinned 16:9│          │ - Catalog    │          │ - Philosophy │
   │   GSAP Hero  │          │ - PDP View   │          │ - Symbolism  │
   │ - Editorial  │          │ - Botanical  │          │ - Botanicals │
   │ - Dual Prod  │          │   Profiles   │          │ - Heritage   │
   │ - Butterfly  │          │ - Serving    │          └──────────────┘
   │ - CTA Banner │          │   Ritual     │
   └──────────────┘          └──────────────┘
```

### Data Structures & Products
- **Products Catalog** (`src/data/products.ts`):
  1. `monarch-cactus-gin`: 750ml, 43% ABV, R 680.00 (ZAR), Botanicals: Kalahari prickly pear, wild coastal juniper, rooibos, coriander seed, citrus peel.
  2. `monarch-lavender-mint`: 750ml, 43% ABV, R 680.00 (ZAR), Botanicals: Highveld lavender, indigenous spearmint, angelica root, orris root, cardamon.
- **Cart Management** (`src/context/CartContext.tsx`): Persistent in `localStorage`, tracking items, quantities, selected bottle sizes, and currency conversion.
- **GSAP ScrollTrigger**: Loaded via standard `gsap` and `ScrollTrigger` for fluid, GPU-accelerated pinned parallax.

---

## 5. Verification & Quality Gates

1. **Compilation & Linting**: Co-run `compile_applet` and `lint_applet` to ensure zero TypeScript errors or missing dependencies.
2. **Responsive Verification**: Test at 1440px desktop, 1024px tablet, and 375px mobile viewport widths.
3. **Motion Verification**: Confirm `prefers-reduced-motion` graceful degradation.
4. **Interaction Verification**: Cart drawer opening/closing, item addition, currency switching, age gate acceptance, and contact form validation.
