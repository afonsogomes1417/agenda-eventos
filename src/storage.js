// Camada de persistência (localStorage). Isolada para a lógica continuar testável.
import { createEvent } from './events.js';

const STORAGE_KEY = 'agenda-eventos:v1';

/** Lê os eventos guardados. Devolve [] se não houver dados ou se estiverem corrompidos. */
export function loadEvents(storage = globalThis.localStorage) {
  try {
    const raw = storage && storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Reconstrói cada evento para garantir que está normalizado.
    return parsed.filter(Boolean).map((e) => createEvent(e));
  } catch {
    return [];
  }
}

/** Guarda a lista de eventos. */
export function saveEvents(events, storage = globalThis.localStorage) {
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(events));
}
