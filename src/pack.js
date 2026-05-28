// pack.js — packing grid: render, drag-and-drop, rotation, placement validation

import { ITEMS } from '../data/items.js';
import { showScreen, SCREENS } from './state.js';

// Grid dimensions — single source of truth; change here to tune difficulty
const GRID_COLS = 5;
const GRID_ROWS = 4;

// Current placements: Map<itemId, { col, row, rotated }>
let packed = new Map();

// Currently dragged item, or null
let dragging = null;

// Prevent re-attaching container-level listeners on repeat visits
let initialized = false;

// ── Item helpers ─────────────────────────────────────────────

function getItem(id) {
  return ITEMS.find(i => i.id === id);
}

// Effective width/height after optional rotation (rotation swaps w and h)
function dims(id, rotated) {
  const item = getItem(id);
  return rotated ? { w: item.h, h: item.w } : { w: item.w, h: item.h };
}

// ── Placement validation ───────────────────────────────────────

// True if placing item at (col, row) with given rotation is legal.
// excludeId: treat this item as absent when checking overlaps —
//            used when repositioning an already-placed item.
function canPlace(id, col, row, rotated, excludeId = null) {
  const { w, h } = dims(id, rotated);

  // In-bounds
  if (col < 0 || row < 0 || col + w > GRID_COLS || row + h > GRID_ROWS) {
    return false;
  }

  // No overlap with other packed items
  for (const [pid, p] of packed) {
    if (pid === excludeId) continue;
    const { w: pw, h: ph } = dims(pid, p.rotated);
    const xOverlap = col < p.col + pw && col + w > p.col;
    const yOverlap = row < p.row + ph && row + h > p.row;
    if (xOverlap && yOverlap) return false;
  }

  return true;
}

// ── Mouse position → grid cell ──────────────────────────────

// The cursor position becomes the top-left corner of the dropped item.
function cellFromEvent(e) {
  const grid = document.getElementById('pack-grid');
  const rect = grid.getBoundingClientRect();
  const col = Math.floor((e.clientX - rect.left) / (rect.width / GRID_COLS));
  const row = Math.floor((e.clientY - rect.top) / (rect.height / GRID_ROWS));
  return {
    col: Math.max(0, Math.min(GRID_COLS - 1, col)),
    row: Math.max(0, Math.min(GRID_ROWS - 1, row)),
  };
}

// ── Rendering ──────────────────────────────────────────────

function renderGrid() {
  const grid = document.getElementById('pack-grid');
  grid.innerHTML = '';

  // Background: 20 cell divs for visual grid lines and drop highlights
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.dataset.col = c;
      cell.dataset.row = r;
      grid.appendChild(cell);
    }
  }

  // Foreground: one div per packed item, spanning its cells via CSS grid placement
  for (const [id, { col, row, rotated }] of packed) {
    const item = getItem(id);
    const { w, h } = dims(id, rotated);
    const el = document.createElement('div');
    el.className = `grid-item kind-${item.kind}`;
    if (item.locked) el.classList.add('item-locked');
    el.dataset.id = id;
    el.style.gridColumn = `${col + 1} / span ${w}`;
    el.style.gridRow = `${row + 1} / span ${h}`;
    el.draggable = true;
    el.innerHTML = `<span class="item-label">${item.name}</span>`;
    el.addEventListener('dragstart', onGridItemDragStart);
    el.addEventListener('dragend', onDragEnd);
    el.addEventListener('click', onGridItemClick);
    grid.appendChild(el);
  }
}

function renderTray() {
  const tray = document.getElementById('item-tray');
  tray.innerHTML = '';

  // Show all non-locked items not currently on the grid
  const available = ITEMS.filter(i => !i.locked && !packed.has(i.id));

  for (const item of available) {
    const el = document.createElement('div');
    el.className = `tray-item kind-${item.kind}`;
    el.dataset.id = item.id;
    el.draggable = true;
    el.innerHTML = `
      <span class="item-label">${item.name}</span>
      <span class="item-dims">${item.w}×${item.h}</span>
    `;
    el.addEventListener('dragstart', onTrayItemDragStart);
    el.addEventListener('dragend', onDragEnd);
    tray.appendChild(el);
  }

  if (available.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'tray-empty';
    msg.textContent = 'Everything is packed!';
    tray.appendChild(msg);
  }
}

function renderAll() {
  renderGrid();
  renderTray();
  updateStartButton();
}

// ── Drag: from tray ──────────────────────────────────────────

function onTrayItemDragStart(e) {
  dragging = { id: e.currentTarget.dataset.id, fromGrid: false };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dragging.id);
}

// ── Drag: from grid ──────────────────────────────────────────

function onGridItemDragStart(e) {
  e.stopPropagation();
  const id = e.currentTarget.dataset.id;
  dragging = { id, fromGrid: true };
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', id);
  // Defer the ghost class so the browser captures the un-dimmed ghost first
  requestAnimationFrame(() => {
    const el = document.querySelector(`.grid-item[data-id="${id}"]`);
    if (el) el.classList.add('is-dragging');
  });
}

function onDragEnd() {
  clearHighlights();
  document.querySelectorAll('.grid-item.is-dragging').forEach(el => el.classList.remove('is-dragging'));
  document.getElementById('item-tray').classList.remove('tray-drop-active');
  dragging = null;
}

// ── Grid: drop zone ──────────────────────────────────────────

function onGridDragOver(e) {
  e.preventDefault();
  if (!dragging) return;
  const { col, row } = cellFromEvent(e);
  const rotated = dragging.fromGrid ? (packed.get(dragging.id)?.rotated ?? false) : false;
  const excludeId = dragging.fromGrid ? dragging.id : null;
  const valid = canPlace(dragging.id, col, row, rotated, excludeId);
  highlightPlacement(dragging.id, col, row, rotated, valid);
  e.dataTransfer.dropEffect = valid ? 'move' : 'none';
}

function onGridDrop(e) {
  e.preventDefault();
  clearHighlights();
  if (!dragging) return;
  const { col, row } = cellFromEvent(e);
  const rotated = dragging.fromGrid ? (packed.get(dragging.id)?.rotated ?? false) : false;
  const excludeId = dragging.fromGrid ? dragging.id : null;
  if (canPlace(dragging.id, col, row, rotated, excludeId)) {
    packed.set(dragging.id, { col, row, rotated });
    dragging = null;
    renderAll();
  }
  // Invalid drop: dragging stays set; onDragEnd cleans up
}

function onGridDragLeave(e) {
  // Only clear when the cursor actually leaves the grid container
  if (!document.getElementById('pack-grid').contains(e.relatedTarget)) {
    clearHighlights();
  }
}

// ── Tray: drop zone (unpack) ─────────────────────────────────

function onTrayDragOver(e) {
  if (!dragging || !dragging.fromGrid) return;
  const item = getItem(dragging.id);
  if (item.locked) return; // locked items can never be removed from the bag
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  document.getElementById('item-tray').classList.add('tray-drop-active');
}

function onTrayDrop(e) {
  e.preventDefault();
  if (!dragging || !dragging.fromGrid) return;
  const item = getItem(dragging.id);
  if (item.locked) return;
  packed.delete(dragging.id);
  dragging = null;
  document.getElementById('item-tray').classList.remove('tray-drop-active');
  renderAll();
}

// ── Click on packed item: rotate in-place ───────────────────────

function onGridItemClick(e) {
  const id = e.currentTarget.dataset.id;
  const p = packed.get(id);
  if (!p) return;
  const newRotated = !p.rotated;
  // Only rotate if it still fits at the same position
  if (canPlace(id, p.col, p.row, newRotated, id)) {
    packed.set(id, { ...p, rotated: newRotated });
    renderGrid();
  }
  // Otherwise silently ignore — there's no room to rotate here
}

// ── Highlight helpers ──────────────────────────────────────────

function highlightPlacement(id, col, row, rotated, valid) {
  clearHighlights();
  const { w, h } = dims(id, rotated);
  const cls = valid ? 'highlight-valid' : 'highlight-invalid';
  for (let r = row; r < row + h; r++) {
    for (let c = col; c < col + w; c++) {
      const cell = document.querySelector(`.grid-cell[data-col="${c}"][data-row="${r}"]`);
      if (cell) cell.classList.add(cls);
    }
  }
}

function clearHighlights() {
  document.querySelectorAll('.grid-cell').forEach(el => {
    el.classList.remove('highlight-valid', 'highlight-invalid');
  });
}

// ── Start trip ───────────────────────────────────────────────

function updateStartButton() {
  // Our drag logic enforces the in-bounds and no-overlap invariant on every
  // state change, so the grid is always valid — Start Trip is always available.
  document.getElementById('btn-start-trip').disabled = false;
}

// ── Public API ───────────────────────────────────────────────

export function initPackScreen() {
  packed.clear();

  if (!initialized) {
    document.getElementById('pack-grid').addEventListener('dragover', onGridDragOver);
    document.getElementById('pack-grid').addEventListener('drop', onGridDrop);
    document.getElementById('pack-grid').addEventListener('dragleave', onGridDragLeave);

    document.getElementById('item-tray').addEventListener('dragover', onTrayDragOver);
    document.getElementById('item-tray').addEventListener('drop', onTrayDrop);

    document.getElementById('btn-start-trip').addEventListener('click', () => {
      showScreen(SCREENS.DRIVE);
    });

    initialized = true;
  }

  renderAll();
}

// Returns ids of all currently packed items — used by the resolver in Phase 4
export function getPackedItemIds() {
  return Array.from(packed.keys());
}
