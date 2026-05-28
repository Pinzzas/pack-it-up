# Route 1 Family — Game Specification (v1)

> A cozy road-trip game about how families grow, and the chaos that comes with them.
> v1 builds the core loop only. Read this whole file before writing code.

---

## 1. Emotional Spine

**You can't control everything — that's where the memories come from.**

Every system serves this one idea. The suitcase that won't quite close, the event you couldn't prepare for, the "rough" outcome that becomes the funniest journal entry. The gap between the player's plan and what actually happens is exactly where the warmth lives. **No outcome is ever a failure.** Even the worst-packed trip produces a good story.

---

## 2. The Core Loop

```
PACK  →  DRIVE  →  RESOLVE  →  JOURNAL
```

1. **Pack** — Arrange item shapes on a grid suitcase. Not everything fits. You bet on the trip you think you'll have.
2. **Drive** — A simple screen: Manila → Batangas. Events fire in sequence.
3. **Resolve** — Each event checks the bag and plays one of three outcomes: ideal / improvised / rough.
4. **Journal** — A text recap writes itself from what happened. Rough moments get the warmest writing.

A full run is ~10–20 minutes. v1 contains two runs.

---

## 3. v1 Scope (BUILD ONLY THIS)

- **Run 1:** Solo traveler. No non-negotiable items.
- **Run 2:** You + partner. Adds ONE non-negotiable item (partner's pillow). Unlocks after Run 1.
- **Destination:** Manila → Batangas (beach) only.
- **8 events**, **16 items** (15 packable + 1 non-negotiable).
- **Grid:** 5 columns × 4 rows = 20 cells.

**OUT of v1 scope (do not build):** kids/grandma runs, other destinations, admin/intangible items, illustrations, the "wildcard" hidden-payoff mechanic, sound, save files beyond run unlock state.

---

## 4. Packing Mechanics

- The suitcase is a **5×4 grid**. Items are **Tetris-style shapes** (rectangles in v1).
- Items can be **moved and rotated** (90°) freely within the grid.
- Items are **persistent** — once packed, available the whole trip. No use-up.
- Overflow is **guaranteed by design**: the full item set far exceeds 20 cells. The player MUST leave items behind.
- **Non-negotiable items** (Run 2): auto-added to the bag, **cannot be removed**, but **can be moved and rotated** within the grid like any other item. They trigger no events — they only cost space.
- A run can begin only when no items overlap and all are inside the grid. Leftover (unpacked) items are simply not on the trip.

---

## 5. The Three-Tier Outcome System

When an event fires, check the packed bag against that event's trigger items:

- **Ideal** — the bag contains the event's ideal item. Smooth, warm, slightly smug.
- **Improvised** — no ideal item, but the bag contains one of the event's improvised items. Charming, clever, "it'll do." THIS TIER GETS THE MOST CHARM.
- **Rough** — the bag contains neither. It goes sideways — and is written as the best memory of all. NEVER a punishment.

Resolution priority: Ideal > Improvised > Rough. Use the first tier whose trigger item is present.

---

## 6. Events (8)

Each event lists its ideal item, improvised item(s), and the tone of each outcome. Final outcome prose can be refined, but every rough outcome MUST end warm.

### E1 — The Tollway Crawl
Leaving Manila. Bumper-to-bumper on SLEX/STAR.
- **Ideal:** Snack stash → traffic becomes hangout time.
- **Improvised:** Power bank → kept everyone's phones alive through the crawl.
- **Rough:** Three hours of traffic, and it's where the real conversation happened.

### E2 — The Sudden Ulan
A downpour hits the open road.
- **Ideal:** Rain jacket → push on, soaked-but-fine, laughing.
- **Improvised:** Malong OR Beach towel → makeshift cover, ridiculous, works.
- **Rough:** Pull over at a waiting shed and just watch the rain together.

### E3 — The Roadside Stop
The bibingka / fruit / buko stall on the highway.
- **Ideal:** Cooler bag → stock up, feast later.
- **Improvised:** Snack stash OR Coin purse → grab what you can, eat it right there.
- **Rough:** Split one buko between everyone — best thing you ate all trip.

### E4 — The Ferry Crossing
Waiting at the port, the bangka ride over the water.
- **Ideal:** Dry bag → phones and valuables stay safe and dry.
- **Improvised:** Big duffel (wrap things) OR First-aid/ginger tin (queasiness) → manage it.
- **Rough:** Wet everything, soaked-phone panic — becomes the story you retell.

### E5 — The Beachfront Night
Cooler evening by the water, nothing to do but sit.
- **Ideal:** Speaker → music, the evening turns magic.
- **Improvised:** Power bank OR Snack stash OR Malong → make do, still lovely.
- **Rough:** Just the sound of the waves — the night you actually talked.

### E6 — The Sandy Aftermath
Back in the car, everything covered in sand.
- **Ideal:** Extra shirt → clean change, comfortable ride home.
- **Improvised:** Beach towel OR Big duffel OR Flip-flops → good enough.
- **Rough:** Sand in everything the whole drive — you laugh about it for years.

### E7 — The Mosquito Ambush
Sundown, the buzzing starts.
- **Ideal:** OFF / repellent → barely notice them, evening stays magic.
- **Improvised:** Malong (cover up) → ride it out.
- **Rough:** Bitten to pieces; comparing bites next morning becomes its own dumb ritual.

### E8 — The Unloaded Toll
The RFID barrier won't lift. The beep of shame. Cars stacking up.
- **Ideal:** Coin purse / baon envelope → pay the attendant cash, barely a pause.
- **Improvised:** (loose change flavor — treat Coin purse as ideal; no separate improvised item in v1) → if no coin purse, go straight to rough.
- **Rough:** The reverse-out-of-the-lane walk of shame — the story that opens every retelling.

> Note: E8 resolves Ideal (coin purse present) or Rough (absent). It has no improvised tier in v1. This is intentional.

---

## 7. Items (16)

Shape is **width × height** in grid cells. Rotatable 90°.

### Generalists (big, flexible)
| Item | Shape | Triggers |
|---|---|---|
| Malong | 2×2 | Improvises E2, E5, E7 |
| Beach towel | 1×3 | Improvises E2, E6 |
| Snack stash | 2×2 | Ideal E1; improvises E3, E5 |
| Big duffel (extra clothes) | 2×3 | Improvises E4, E6 |

### Specialists (small, sharp)
| Item | Shape | Triggers |
|---|---|---|
| Rain jacket | 1×2 | Ideal E2 |
| OFF / repellent | 1×1 | Ideal E7 |
| Dry bag | 1×2 | Ideal E4 |
| Speaker | 1×1 | Ideal E5 |
| Extra shirt | 1×2 | Ideal E6 |
| Cooler bag | 2×2 | Ideal E3 |
| Sunscreen | 1×1 | Beach comfort (flavor; no hard trigger in v1) |
| Power bank | 1×1 | Improvises E1, E5 |
| Flip-flops / tsinelas | 1×2 | Improvises E6 |
| First-aid / ginger tin | 1×1 | Improvises E4 |
| Coin purse / baon envelope | 1×1 | Ideal E8; improvises E3 |

### Non-negotiable (Run 2 only)
| Item | Shape | Triggers |
|---|---|---|
| Partner's pillow | 2×2 | None — pure space cost. Cannot be removed; can be moved/rotated. |

> Sunscreen has no hard event trigger in v1 — it's a decoy/flavor item that competes for space. Keep it.

---

## 8. Coverage Check (every event reaches all reachable tiers)

| Event | Ideal item | Improvised item(s) | Rough |
|---|---|---|---|
| E1 Tollway | Snack stash | Power bank | nothing |
| E2 Ulan | Rain jacket | Malong / Beach towel | nothing |
| E3 Roadside | Cooler bag | Snack stash / Coin purse | nothing |
| E4 Ferry | Dry bag | Big duffel / First-aid | nothing |
| E5 Beach night | Speaker | Power bank / Snacks / Malong | nothing |
| E6 Sandy | Extra shirt | Towel / Duffel / Flip-flops | nothing |
| E7 Mosquito | OFF | Malong | nothing |
| E8 Toll | Coin purse | (none) | nothing |

---

## 9. The Journal

- After the drive, generate a **text-led** recap page.
- One short paragraph per event that fired, written in the tone of its resolved tier.
- Rough entries are the warmest and funniest — they should read as the highlights, not the failures.
- End with a one-line summary that reflects the spine (e.g. "Nothing went to plan. You'd do it again tomorrow.").
- Persist which runs are unlocked so Run 2 stays available.

---

## 10. Suggested Data Shapes (guidance, not law)

```js
// item
{ id: "malong", name: "Malong", w: 2, h: 2, kind: "generalist" }

// event
{
  id: "E2", title: "The Sudden Ulan",
  ideal: ["rain_jacket"],
  improvised: ["malong", "beach_towel"],
  text: { ideal: "...", improvised: "...", rough: "..." }
}

// resolve(event, packedItemIds) -> "ideal" | "improvised" | "rough"
```

Keep events and items as **plain data** so new ones can be added without touching logic. The resolver is a pure function over (event, packed item ids).

---

## 11. Build Order (one phase per prompt — STOP after each)

1. Project skeleton + a title screen that renders. No gameplay.
2. Packing grid: render 5×4, drag items in from a tray, enforce no-overlap + in-bounds, allow rotate. "Start trip" enables only when valid.
3. Drive screen: advance through the 8 events in sequence.
4. Resolver + outcome display: each event shows its ideal/improvised/rough text based on the bag.
5. Journal screen: assemble the recap from resolved outcomes.
6. Run 2: add partner's pillow as non-negotiable (auto-placed, immovable-from-bag, movable-in-grid); add run-unlock state.

Do not start a phase before the previous one is tested and approved.
