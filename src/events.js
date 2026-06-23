// Lógica pura da Agenda de Eventos.
// Sem DOM e sem localStorage, para ser 100% testável em Node e no browser.

export const CATEGORIES = [
  { id: 'trabalho', label: 'Trabalho', color: '#2563eb' },
  { id: 'pessoal', label: 'Pessoal', color: '#16a34a' },
  { id: 'estudo', label: 'Estudo', color: '#9333ea' },
  { id: 'outro', label: 'Outro', color: '#ea580c' },
];

export const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// Semana a começar à segunda-feira (convenção em Portugal).
export const WEEKDAY_NAMES = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

/** Devolve a categoria pelo id; cai em "Outro" se não existir. */
export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

/** Acrescenta um zero à esquerda (5 -> "05"). */
export function pad2(n) {
  return String(n).padStart(2, '0');
}

/** Converte um objeto Date para "AAAA-MM-DD" (sem problemas de fuso horário). */
export function toISODate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/** Valida os dados de um evento e devolve um objeto de erros (vazio = válido). */
export function validateEvent(input) {
  const errors = {};
  if (!input || typeof input.title !== 'string' || input.title.trim() === '') {
    errors.title = 'O título é obrigatório.';
  }
  if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input.date || '')) {
    errors.date = 'A data é inválida.';
  }
  if (input && input.time && !/^\d{2}:\d{2}$/.test(input.time)) {
    errors.time = 'A hora é inválida.';
  }
  return errors;
}

/** True se o evento for válido. */
export function isValidEvent(input) {
  return Object.keys(validateEvent(input)).length === 0;
}

/** Gera um identificador único (usa crypto.randomUUID quando disponível). */
export function generateId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Cria um evento normalizado a partir dos dados do formulário. Lança erro se inválido. */
export function createEvent(input) {
  const errors = validateEvent(input);
  if (Object.keys(errors).length > 0) {
    throw new Error('Evento inválido: ' + Object.values(errors).join(' '));
  }
  return {
    id: input.id || generateId(),
    title: input.title.trim(),
    date: input.date,
    time: input.time || '',
    category: getCategory(input.category).id,
    description: (input.description || '').trim(),
  };
}

/** Ordena eventos por data e, dentro do mesmo dia, por hora. */
export function sortEvents(events) {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return (a.time || '').localeCompare(b.time || '');
  });
}

/** Devolve os eventos de um dado dia (ISO "AAAA-MM-DD"), já ordenados. */
export function getEventsForDay(events, iso) {
  return sortEvents(events.filter((e) => e.date === iso));
}

/** Pesquisa por título ou descrição (case-insensitive). */
export function searchEvents(events, query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return sortEvents(events);
  return sortEvents(
    events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.description || '').toLowerCase().includes(q)
    )
  );
}

/** Filtra por categoria. "todas" (ou vazio) devolve tudo.
 * Suporta múltiplas categorias se passadas como array. */
export function filterByCategory(events, categoryId) {
  if (!categoryId || categoryId === 'todas') return events;
  
  // Suporte para array de categorias (múltiplos filtros)
  if (Array.isArray(categoryId)) {
    return events.filter((e) => categoryId.includes(e.category));
  }
  
  return events.filter((e) => e.category === categoryId);
}

/** Próximos eventos a partir de uma data (inclusive), limitados a `limit`. */
export function upcomingEvents(events, fromISO, limit = 5) {
  return sortEvents(events.filter((e) => e.date >= fromISO)).slice(0, limit);
}

/**
 * Devolve a matriz do mês (6 semanas x 7 dias) para desenhar o calendário.
 * @param {number} year  ano (ex.: 2026)
 * @param {number} month mês com base 0 (0 = Janeiro)
 */
export function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // segunda-feira = 0
  const cursor = new Date(year, month, 1 - startOffset);
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push({
        iso: toISODate(cursor),
        day: cursor.getDate(),
        inMonth: cursor.getMonth() === month,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}
