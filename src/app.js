// Interface da Agenda de Eventos: liga a lógica pura (events.js) ao DOM.
import {
  CATEGORIES, getCategory, MONTH_NAMES, WEEKDAY_NAMES,
  getMonthMatrix, getEventsForDay, createEvent, validateEvent,
  searchEvents, filterByCategory, upcomingEvents, toISODate,
} from './events.js';
import { loadEvents, saveEvents, isStorageAvailable } from './storage.js';

const today = new Date();

const state = {
  events: loadEvents(),
  viewYear: today.getFullYear(),
  viewMonth: today.getMonth(),
  selectedISO: toISODate(today),
  search: '',
  category: 'todas',
  editingId: null,
};

// --- Referências a elementos ---
const $ = (id) => document.getElementById(id);
const els = {
  monthLabel: $('month-label'),
  weekdays: $('weekdays'),
  grid: $('calendar-grid'),
  search: $('search'),
  filterCategory: $('filter-category'),
  dayLabel: $('selected-day-label'),
  dayEvents: $('day-events'),
  upcoming: $('upcoming-events'),
  modal: $('modal'),
  modalTitle: $('modal-title'),
  form: $('event-form'),
  fTitle: $('f-title'),
  fDate: $('f-date'),
  fTime: $('f-time'),
  fCategory: $('f-category'),
  fDescription: $('f-description'),
  errTitle: $('err-title'),
  errDate: $('err-date'),
  btnDelete: $('btn-delete'),
};

// --- Filtro aplicado à lista atual de eventos ---
function visibleEvents() {
  return filterByCategory(searchEvents(state.events, state.search), state.category);
}

function persist() {
  saveEvents(state.events);
}

// --- Render do calendário ---
function renderWeekdays() {
  els.weekdays.innerHTML = WEEKDAY_NAMES.map((d) => `<span>${d}</span>`).join('');
}

function renderCalendar() {
  els.monthLabel.textContent = `${MONTH_NAMES[state.viewMonth]} ${state.viewYear}`;
  const matrix = getMonthMatrix(state.viewYear, state.viewMonth);
  const todayISO = toISODate(new Date());
  const events = visibleEvents();

  els.grid.innerHTML = '';
  for (const week of matrix) {
    for (const cellData of week) {
      const dayEvents = getEventsForDay(events, cellData.iso);
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (!cellData.inMonth) cell.classList.add('out');
      if (cellData.iso === todayISO) cell.classList.add('today');
      if (cellData.iso === state.selectedISO) cell.classList.add('selected');
      cell.dataset.iso = cellData.iso;

      const dayNum = document.createElement('span');
      dayNum.className = 'cell-day';
      dayNum.textContent = cellData.day;
      cell.appendChild(dayNum);

      dayEvents.slice(0, 3).forEach((ev) => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.style.background = getCategory(ev.category).color;
        chip.textContent = (ev.time ? ev.time + ' ' : '') + ev.title;
        chip.title = ev.title;
        cell.appendChild(chip);
      });
      if (dayEvents.length > 3) {
        const more = document.createElement('span');
        more.className = 'cell-more';
        more.textContent = `+${dayEvents.length - 3} mais`;
        cell.appendChild(more);
      }

      cell.addEventListener('click', () => {
        state.selectedISO = cellData.iso;
        renderCalendar();
        renderSidebar();
      });
      els.grid.appendChild(cell);
    }
  }
}

function eventItem(ev) {
  const li = document.createElement('li');
  li.className = 'event-item';
  const cat = getCategory(ev.category);
  li.innerHTML = `
    <span class="event-dot" style="background:${cat.color}"></span>
    <span class="event-meta">
      <span class="event-title"></span>
      <span class="event-sub"></span>
    </span>`;
  li.querySelector('.event-title').textContent = ev.title;
  li.querySelector('.event-sub').textContent =
    `${ev.date}${ev.time ? ' · ' + ev.time : ''} · ${cat.label}`;
  li.addEventListener('click', () => openModal(ev));
  return li;
}

function renderSidebar() {
  const events = visibleEvents();

  els.dayLabel.textContent = `Eventos de ${state.selectedISO}`;
  const dayList = getEventsForDay(events, state.selectedISO);
  els.dayEvents.innerHTML = '';
  if (dayList.length === 0) {
    els.dayEvents.innerHTML = '<li class="empty">Sem eventos neste dia.</li>';
  } else {
    dayList.forEach((ev) => els.dayEvents.appendChild(eventItem(ev)));
  }

  const next = upcomingEvents(events, toISODate(new Date()), 5);
  els.upcoming.innerHTML = '';
  if (next.length === 0) {
    els.upcoming.innerHTML = '<li class="empty">Sem eventos futuros.</li>';
  } else {
    next.forEach((ev) => els.upcoming.appendChild(eventItem(ev)));
  }
}

// --- Modal ---
function openModal(ev = null) {
  state.editingId = ev ? ev.id : null;
  els.modalTitle.textContent = ev ? 'Editar evento' : 'Novo evento';
  els.fTitle.value = ev ? ev.title : '';
  els.fDate.value = ev ? ev.date : state.selectedISO;
  els.fTime.value = ev ? ev.time : '';
  els.fCategory.value = ev
    ? ev.category
    : (state.category !== 'todas' ? state.category : CATEGORIES[0].id);
  els.fDescription.value = ev ? ev.description : '';
  els.errTitle.textContent = '';
  els.errDate.textContent = '';
  els.btnDelete.classList.toggle('hidden', !ev);
  els.modal.classList.remove('hidden');
  els.fTitle.focus();
}

function closeModal() {
  els.modal.classList.add('hidden');
  state.editingId = null;
}

function submitForm(e) {
  e.preventDefault();
  const input = {
    id: state.editingId || undefined,
    title: els.fTitle.value,
    date: els.fDate.value,
    time: els.fTime.value,
    category: els.fCategory.value,
    description: els.fDescription.value,
  };

  const errors = validateEvent(input);
  els.errTitle.textContent = errors.title || '';
  els.errDate.textContent = errors.date || '';
  if (Object.keys(errors).length > 0) return;

  const event = createEvent(input);
  if (state.editingId) {
    state.events = state.events.map((ev) => (ev.id === state.editingId ? event : ev));
  } else {
    state.events.push(event);
  }
  persist();
  closeModal();
  renderCalendar();
  renderSidebar();
}

function deleteEvent() {
  if (!state.editingId) return;
  if (!confirm('Apagar este evento?')) return;
  state.events = state.events.filter((ev) => ev.id !== state.editingId);
  persist();
  closeModal();
  renderCalendar();
  renderSidebar();
}

// --- Inicialização ---
function fillCategorySelectors() {
  els.fCategory.innerHTML = CATEGORIES
    .map((c) => `<option value="${c.id}">${c.label}</option>`)
    .join('');
  els.filterCategory.innerHTML =
    '<option value="todas">Todas as categorias</option>' +
    CATEGORIES.map((c) => `<option value="${c.id}">${c.label}</option>`).join('');
}

function bindEvents() {
  $('btn-new').addEventListener('click', () => openModal());
  $('btn-prev').addEventListener('click', () => {
    state.viewMonth--;
    if (state.viewMonth < 0) { state.viewMonth = 11; state.viewYear--; }
    renderCalendar();
  });
  $('btn-next').addEventListener('click', () => {
    state.viewMonth++;
    if (state.viewMonth > 11) { state.viewMonth = 0; state.viewYear++; }
    renderCalendar();
  });
  $('btn-today').addEventListener('click', () => {
    const now = new Date();
    state.viewYear = now.getFullYear();
    state.viewMonth = now.getMonth();
    state.selectedISO = toISODate(now);
    renderCalendar();
    renderSidebar();
  });
  els.search.addEventListener('input', (e) => {
    state.search = e.target.value;
    renderCalendar();
    renderSidebar();
  });
  els.filterCategory.addEventListener('change', (e) => {
    state.category = e.target.value;
    renderCalendar();
    renderSidebar();
  });
  els.form.addEventListener('submit', submitForm);
  $('btn-cancel').addEventListener('click', closeModal);
  els.btnDelete.addEventListener('click', deleteEvent);
  els.modal.addEventListener('click', (e) => {
    if (e.target === els.modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !els.modal.classList.contains('hidden')) closeModal();
  });
}

function init() {
  if (!isStorageAvailable()) {
    $('storage-warning').classList.remove('hidden');
  }
  fillCategorySelectors();
  renderWeekdays();
  bindEvents();
  renderCalendar();
  renderSidebar();
}

init();
