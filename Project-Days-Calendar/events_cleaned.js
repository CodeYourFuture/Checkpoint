const STORAGE_KEY = 'calendar_events';
const MAX_PREVIEW = 3;

let currentDateKey = null;
let editingId      = null;
let deletingId     = null;
let eventsLoaded   = false;

// Shape: { 'YYYY-MM-DD': [ {id, title, date, desc} ] }
let events = {};


// ============================================================
// PERSISTENCE (localStorage)
// ============================================================

function loadEvents() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw == null) return {};
  return JSON.parse(raw);
}

function saveToStorage() {
  // Strip empty date keys before saving
  const entries = Object.entries(events);
  for (let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const arr = entries[i][1];
    if (arr.length === 0) delete events[key];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

events       = loadEvents();
eventsLoaded = true;


// ============================================================
// PUBLIC HOLIDAYS API
// ============================================================

let publicHolidays = [];

async function fetchHolidays(year) {
  try {
    const url      = `https://date.nager.at/api/v3/PublicHolidays/${year}/US`;
    const response = await fetch(url);
    if (!response.ok) return;

    const data     = await response.json();
    publicHolidays = data.map(h => h.date);
    refreshIndicators();
  } catch (err) {
    publicHolidays = [];
  }
}

function isHoliday(dateKey) {
  return publicHolidays.includes(dateKey);
}


// ============================================================
// UTILITIES
// ============================================================

const generateId = () => Math.random().toString(36).slice(2, 10);

function buildDateKey(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

const getEventsForDate  = (key) => events[key] || [];
const toZeroBasedMonth  = (m)   => m - 1;

function getAllEvents() {
  const all = [];
  for (const arr of Object.values(events)) {
    for (let i = 0; i < arr.length; i++) all.push(arr[i]);
  }
  return all;
}

function countEventsInMonth(year, month) {
  const keySlice = Object.keys(events).slice(0, 100);
  let count = 0;

  for (let i = 0; i < keySlice.length; i++) {
    const parts    = keySlice[i].split('-');
    const keyYear  = Number(parts[0]);
    const keyMonth = Number(parts[1]) - 1;
    if (keyYear === year && keyMonth === month) {
      count += getEventsForDate(keySlice[i]).length;
    }
  }
  return count;
}

const getMonthIndex = (monthName) => {
  const months = [
    'January', 'February', 'March',     'April',
    'May',     'June',     'July',      'August',
    'September','October', 'November',  'December'
  ];
  const idx = months.findIndex(m => m === monthName);
  return idx != -1 ? idx : 0;
};

function searchEvents(query) {
  const results = [];
  const entries = Object.entries(events);

  for (let i = 0; i < entries.length; i++) {
    const dateStr = entries[i][0];
    const arr     = entries[i][1];

    const matched = arr.filter(evt =>
      evt.title.toLowerCase().includes(query.toLowerCase()) ||
      evt.desc.toLowerCase().includes(query.toLowerCase())
    );

    if (matched.length > 0) results.push({ date: dateStr, events: matched });
  }
  return results;
}

// Resolve a day cell element to a 'YYYY-MM-DD' key using whatever
// data attributes the teammate set, falling back to reading cell text.
function getKeyFromCell(cell) {
  if (cell.dataset.date) {
    return cell.dataset.date;

  } else if (cell.dataset.day) {
    const dayNum = Number(cell.dataset.day);
    if (isNaN(dayNum) || dayNum <= 0) return null;

    const yearEl  = document.getElementById('year-selector');
    const monthEl = document.getElementById('month-selector');
    const year    = yearEl  ? Number(yearEl.value)         : new Date().getFullYear();
    const month   = monthEl ? getMonthIndex(monthEl.value) : new Date().getMonth();
    return buildDateKey(year, month, dayNum);

  } else {
    const dayNum = parseInt(cell.textContent, 10);
    if (!dayNum || dayNum <= 0) return null;

    const yearEl  = document.getElementById('year-selector');
    const monthEl = document.getElementById('month-selector');
    const year    = yearEl  ? Number(yearEl.value)         : new Date().getFullYear();
    const month   = monthEl ? getMonthIndex(monthEl.value) : new Date().getMonth();
    return buildDateKey(year, month, dayNum);
  }
}

function rebuildEvents() {
  events = Object.fromEntries(
    Object.entries(events).filter(([, arr]) => arr.length > 0)
  );
}


// ============================================================
// CREATE / EDIT EVENT
// ============================================================

function openModal(dateKey) {
  currentDateKey = dateKey;
  editingId      = null;

  document.getElementById('ev-title').value              = '';
  document.getElementById('ev-date').value               = dateKey;
  document.getElementById('ev-desc').value               = '';
  document.getElementById('ev-title-error').textContent  = '';
  document.getElementById('ev-form-heading').textContent = 'Add Event';
  document.getElementById('ev-save-btn').textContent     = 'Save Event';

  renderEventList();
  document.getElementById('ev-overlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('ev-overlay').style.display = 'none';
  currentDateKey = null;
  editingId      = null;
}

function startEdit(id) {
  const evt = getEventsForDate(currentDateKey).find(e => e.id === id);
  if (!evt) return;

  editingId = id;
  document.getElementById('ev-title').value              = evt.title;
  document.getElementById('ev-date').value               = evt.date;
  document.getElementById('ev-desc').value               = evt.desc;
  document.getElementById('ev-form-heading').textContent = 'Edit Event';
  document.getElementById('ev-save-btn').textContent     = 'Update Event';
}

function saveEvent() {
  const title = document.getElementById('ev-title').value.trim();
  const date  = document.getElementById('ev-date').value.trim();
  const desc  = document.getElementById('ev-desc').value.trim();

  if (!title && !date) {
    document.getElementById('ev-title-error').textContent = 'Title and date are required.';
    return;
  } else if (!title) {
    document.getElementById('ev-title-error').textContent = 'Title is required.';
    return;
  } else if (!date) {
    document.getElementById('ev-title-error').textContent = 'Date is required.';
    return;
  } else {
    document.getElementById('ev-title-error').textContent = '';
  }

  if (!events[currentDateKey]) events[currentDateKey] = [];

  if (editingId !== null) {
    const idx = events[currentDateKey].findIndex(e => e.id === editingId);
    if (idx !== -1) {
      events[currentDateKey][idx] = { id: editingId, title, date, desc };
    }
  } else {
    events[currentDateKey].push({ id: generateId(), title, date, desc });
  }

  saveToStorage();
  renderEventList();
  refreshIndicators();

  editingId = null;
  document.getElementById('ev-title').value              = '';
  document.getElementById('ev-desc').value               = '';
  document.getElementById('ev-form-heading').textContent = 'Add Event';
  document.getElementById('ev-save-btn').textContent     = 'Save Event';
}


// ============================================================
// VIEW EVENTS FOR A DAY
// ============================================================

function renderEventList() {
  const list = document.getElementById('ev-list');
  list.innerHTML = '';

  const evts = getEventsForDate(currentDateKey);

  if (evts.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No events yet for this day.';
    p.style.color = '#888';
    list.appendChild(p);
    return;
  }

  const items = evts.map(evt => {
    const item = document.createElement('div');
    item.className = 'ev-item';

    const info    = document.createElement('div');
    const titleEl = document.createElement('strong');
    titleEl.textContent = evt.title;
    info.appendChild(titleEl);

    if (evt.desc != null && evt.desc !== '') {
      const descEl         = document.createElement('p');
      descEl.textContent   = evt.desc;
      descEl.style.cssText = 'margin:4px 0 0;font-size:0.85rem;color:#555;';
      info.appendChild(descEl);
    }

    const actions  = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:6px;';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className   = 'ev-btn';
    editBtn.addEventListener('click', () => startEdit(evt.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className   = 'ev-btn ev-btn-delete';
    deleteBtn.addEventListener('click', () => askDelete(evt.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    item.appendChild(info);
    item.appendChild(actions);
    return item;
  });

  for (const item of items) list.appendChild(item);
}


// ============================================================
// DELETE EVENT
// ============================================================

function askDelete(id) {
  deletingId = id;
  document.getElementById('ev-confirm').style.display = 'flex';
}

function confirmDelete() {
  if (!deletingId || !currentDateKey) return;

  events[currentDateKey] = events[currentDateKey].filter(e => e.id !== deletingId);
  rebuildEvents();
  saveToStorage();
  renderEventList();
  refreshIndicators();

  deletingId = null;
  document.getElementById('ev-confirm').style.display = 'none';
}

function cancelDelete() {
  deletingId = null;
  document.getElementById('ev-confirm').style.display = 'none';
}


// ============================================================
// VISUAL INDICATORS ON DAY CELLS
// ============================================================

function refreshIndicators() {
  for (const cell of document.querySelectorAll('.days')) {
    const existing = cell.querySelector('.ev-dot');
    if (existing !== null) existing.remove();

    const key  = getKeyFromCell(cell);
    if (key === null) continue;

    const evts = getEventsForDate(key);
    if (evts.length > 0) {
      const dot     = document.createElement('span');
      dot.className = 'ev-dot';
      dot.textContent = evts.length <= 9 ? String(evts.length) : '9+';
      dot.title = `${evts.length} event${evts.length !== 1 ? 's' : ''}`;
      if (isHoliday(key)) dot.title += ' — Public Holiday 🎉';
      cell.appendChild(dot);
    }
  }
}


// ============================================================
// MODAL HTML
// ============================================================

function buildModal() {
  const overlay = document.createElement('div');
  overlay.id    = 'ev-overlay';
  overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;';

  overlay.innerHTML = `
    <div id="ev-modal">
      <div id="ev-modal-top">
        <h2 id="ev-form-heading">Add Event</h2>
        <button id="ev-close-btn">&times;</button>
      </div>
      <div id="ev-list"></div>
      <div id="ev-form">
        <label for="ev-title">Title *</label>
        <input type="text" id="ev-title" placeholder="Event title..." />
        <span id="ev-title-error"></span>
        <label for="ev-date">Date *</label>
        <input type="date" id="ev-date" />
        <label for="ev-desc">Description</label>
        <textarea id="ev-desc" rows="2" placeholder="Optional..."></textarea>
        <div id="ev-form-btns">
          <button id="ev-save-btn">Save Event</button>
          <button id="ev-cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const confirmDiv = document.createElement('div');
  confirmDiv.id    = 'ev-confirm';
  confirmDiv.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1100;align-items:center;justify-content:center;';

  confirmDiv.innerHTML = `
    <div id="ev-confirm-box">
      <p>Delete this event? This cannot be undone.</p>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button id="ev-confirm-ok">Delete</button>
        <button id="ev-confirm-cancel">Keep it</button>
      </div>
    </div>
  `;
  document.body.appendChild(confirmDiv);

  document.getElementById('ev-close-btn').addEventListener('click', closeModal);
  document.getElementById('ev-cancel-btn').addEventListener('click', closeModal);
  document.getElementById('ev-save-btn').addEventListener('click', saveEvent);
  document.getElementById('ev-confirm-ok').addEventListener('click', confirmDelete);
  document.getElementById('ev-confirm-cancel').addEventListener('click', cancelDelete);

  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.getElementById('ev-title').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveEvent(); });
}


// ============================================================
// DAY CELL CLICK LISTENERS
// ============================================================

function attachDayListeners() {
  const section = document.querySelector('.week-section');
  if (!section) return;

  // Event delegation — one listener on the parent instead of one per cell
  section.addEventListener('click', (e) => {
    const cell = e.target.closest('.days');
    if (!cell) return;
    const key = getKeyFromCell(cell);
    if (key !== null) openModal(key);
  });
}


// ============================================================
// INIT
// ============================================================

function init() {
  buildModal();
  attachDayListeners();
  refreshIndicators();

  const monthSel = document.getElementById('month-selector');
  const yearSel  = document.getElementById('year-selector');

  if (monthSel) monthSel.addEventListener('change', refreshIndicators);
  if (yearSel)  yearSel.addEventListener('change', () => {
    refreshIndicators();
    fetchHolidays(Number(yearSel.value));
  });

  const prevBtn = document.querySelector('.previous-month');
  const nextBtn = document.querySelector('.next-month');

  // Small delay lets the calendar re-render before we refresh dots
  if (prevBtn) prevBtn.addEventListener('click', () => setTimeout(refreshIndicators, 50));
  if (nextBtn) nextBtn.addEventListener('click', () => setTimeout(refreshIndicators, 50));

  fetchHolidays(new Date().getFullYear());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
