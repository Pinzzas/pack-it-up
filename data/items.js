// items.js — all packable items for v1
// Shape: w × h in grid cells. Rotation swaps w and h.
// kind: 'generalist' | 'specialist' | 'non-negotiable'
// locked: true means the item can't be removed from the bag (Run 2 non-negotiables only).

export const ITEMS = [

  // ── Generalists ─────────────────────────────────────────────
  // Large, flexible — each triggers multiple events as an improvised option.
  { id: 'malong',      name: 'Malong',                    w: 2, h: 2, kind: 'generalist' },
  { id: 'beach_towel', name: 'Beach Towel',                w: 1, h: 3, kind: 'generalist' },
  { id: 'snack_stash', name: 'Snack Stash',                w: 2, h: 2, kind: 'generalist' },
  { id: 'big_duffel',  name: 'Big Duffel (extra clothes)', w: 2, h: 3, kind: 'generalist' },

  // ── Specialists ─────────────────────────────────────────────
  // Smaller, each targets one event as the ideal item.
  { id: 'rain_jacket',   name: 'Rain Jacket',               w: 1, h: 2, kind: 'specialist' },
  { id: 'off_repellent', name: 'OFF / Repellent',            w: 1, h: 1, kind: 'specialist' },
  { id: 'dry_bag',       name: 'Dry Bag',                    w: 1, h: 2, kind: 'specialist' },
  { id: 'speaker',       name: 'Speaker',                    w: 1, h: 1, kind: 'specialist' },
  { id: 'extra_shirt',   name: 'Extra Shirt',                w: 1, h: 2, kind: 'specialist' },
  { id: 'cooler_bag',    name: 'Cooler Bag',                 w: 2, h: 2, kind: 'specialist' },
  { id: 'sunscreen',     name: 'Sunscreen',                  w: 1, h: 1, kind: 'specialist' }, // flavor/decoy — no hard event trigger
  { id: 'power_bank',    name: 'Power Bank',                 w: 1, h: 1, kind: 'specialist' },
  { id: 'flip_flops',    name: 'Flip-flops / Tsinelas',      w: 1, h: 2, kind: 'specialist' },
  { id: 'first_aid',     name: 'First-Aid / Ginger Tin',     w: 1, h: 1, kind: 'specialist' },
  { id: 'coin_purse',    name: 'Coin Purse / Baon Envelope', w: 1, h: 1, kind: 'specialist' },

  // ── Non-negotiable (Run 2 only) ──────────────────────────────
  // Auto-added to the bag; cannot be removed but can be moved and rotated.
  // Triggers no events — pure space cost.
  { id: 'partners_pillow', name: "Partner's Pillow", w: 2, h: 2, kind: 'non-negotiable', locked: true },

];
