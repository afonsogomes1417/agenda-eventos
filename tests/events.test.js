// Testes unitários da lógica pura. Correm com `npm test` (node --test).
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateEvent, isValidEvent, createEvent, sortEvents,
  getEventsForDay, searchEvents, filterByCategory, upcomingEvents,
  getMonthMatrix, toISODate, getCategory,
} from '../src/events.js';

import { loadEvents, saveEvents } from '../src/storage.js';

test('validateEvent: deteta título em falta', () => {
  const errors = validateEvent({ title: '', date: '2026-06-18' });
  assert.ok(errors.title);
});

test('validateEvent: deteta data inválida', () => {
  const errors = validateEvent({ title: 'Reunião', date: '18-06-2026' });
  assert.ok(errors.date);
});

test('validateEvent: deteta hora inválida', () => {
  const errors = validateEvent({ title: 'Reunião', date: '2026-06-18', time: '25h' });
  assert.ok(errors.time);
});

test('isValidEvent: aceita um evento correto', () => {
  assert.equal(isValidEvent({ title: 'Reunião', date: '2026-06-18', time: '10:30' }), true);
});

test('createEvent: normaliza e gera id', () => {
  const ev = createEvent({ title: '  Exame  ', date: '2026-06-20', category: 'estudo' });
  assert.equal(ev.title, 'Exame');
  assert.equal(ev.category, 'estudo');
  assert.ok(ev.id && typeof ev.id === 'string');
});

test('createEvent: categoria desconhecida cai em "outro"', () => {
  const ev = createEvent({ title: 'X', date: '2026-06-20', category: 'inexistente' });
  assert.equal(ev.category, 'outro');
});

test('createEvent: lança erro com dados inválidos', () => {
  assert.throws(() => createEvent({ title: '', date: 'xxx' }));
});

test('sortEvents: ordena por data e depois por hora', () => {
  const list = [
    { id: '1', title: 'B', date: '2026-06-18', time: '14:00' },
    { id: '2', title: 'A', date: '2026-06-18', time: '09:00' },
    { id: '3', title: 'C', date: '2026-06-17', time: '23:00' },
  ];
  const sorted = sortEvents(list).map((e) => e.id);
  assert.deepEqual(sorted, ['3', '2', '1']);
});

test('getEventsForDay: devolve apenas os do dia pedido', () => {
  const list = [
    { id: '1', title: 'A', date: '2026-06-18', time: '' },
    { id: '2', title: 'B', date: '2026-06-19', time: '' },
  ];
  assert.equal(getEventsForDay(list, '2026-06-18').length, 1);
});

test('searchEvents: pesquisa por título e descrição', () => {
  const list = [
    { id: '1', title: 'Dentista', date: '2026-06-18', description: '' },
    { id: '2', title: 'Aula', date: '2026-06-19', description: 'rever exame' },
  ];
  assert.equal(searchEvents(list, 'exame').length, 1);
  assert.equal(searchEvents(list, 'DENT').length, 1);
  assert.equal(searchEvents(list, '').length, 2);
});

test('filterByCategory: filtra corretamente', () => {
  const list = [
    { id: '1', title: 'A', date: '2026-06-18', category: 'trabalho' },
    { id: '2', title: 'B', date: '2026-06-18', category: 'estudo' },
  ];
  assert.equal(filterByCategory(list, 'estudo').length, 1);
  assert.equal(filterByCategory(list, 'todas').length, 2);
});

test('upcomingEvents: ignora passado e limita resultados', () => {
  const list = [
    { id: '1', title: 'Passado', date: '2026-06-10', time: '' },
    { id: '2', title: 'Hoje', date: '2026-06-18', time: '' },
    { id: '3', title: 'Futuro', date: '2026-06-25', time: '' },
  ];
  const next = upcomingEvents(list, '2026-06-18', 5);
  assert.deepEqual(next.map((e) => e.id), ['2', '3']);
});

test('getMonthMatrix: gera 6 semanas de 7 dias', () => {
  const matrix = getMonthMatrix(2026, 5); // Junho 2026
  assert.equal(matrix.length, 6);
  assert.ok(matrix.every((week) => week.length === 7));
});

test('getMonthMatrix: 1 de Junho 2026 é uma segunda-feira', () => {
  const matrix = getMonthMatrix(2026, 5);
  // Primeira célula da primeira semana deve ser exatamente 2026-06-01.
  assert.equal(matrix[0][0].iso, '2026-06-01');
  assert.equal(matrix[0][0].inMonth, true);
});

test('toISODate: formata sem desvios de fuso', () => {
  assert.equal(toISODate(new Date(2026, 0, 5)), '2026-01-05');
});

test('getCategory: devolve cor conhecida', () => {
  assert.equal(getCategory('trabalho').color, '#2563eb');
});

test('storage: grava e lê eventos (mock de localStorage)', () => {
  const map = new Map();
  const fakeStorage = {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
  };
  const ev = createEvent({ title: 'Teste', date: '2026-06-18', category: 'pessoal' });
  saveEvents([ev], fakeStorage);
  const loaded = loadEvents(fakeStorage);
  assert.equal(loaded.length, 1);
  assert.equal(loaded[0].title, 'Teste');
});

test('storage: devolve [] se os dados estiverem corrompidos', () => {
  const fakeStorage = { getItem: () => '{lixo', setItem: () => {} };
  assert.deepEqual(loadEvents(fakeStorage), []);
});
