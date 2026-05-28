// state.js — screen/state controller
// Manages which screen is visible. One screen at a time.

// All screen names in the game. Each maps to a <section id="screen-{name}"> in the HTML.
export const SCREENS = {
  TITLE:   'title',
  PACK:    'pack',
  DRIVE:   'drive',
  JOURNAL: 'journal',
};

// Hide all screens, then reveal the one requested.
export function showScreen(name) {
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.add('hidden');
  });
  const target = document.getElementById(`screen-${name}`);
  if (target) {
    target.classList.remove('hidden');
  }
}

// Wire up the title screen's start button.
// For now it advances to pack (which is a placeholder until Phase 2).
function initTitleScreen() {
  const btn = document.getElementById('btn-start');
  btn.addEventListener('click', () => {
    showScreen(SCREENS.PACK);
  });
}

// Entry point — called once when the page loads.
function init() {
  showScreen(SCREENS.TITLE);
  initTitleScreen();
}

init();
