import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = join(__dirname, 'data');
const DB_FILE   = join(DATA_DIR, 'events.json');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
if (!existsSync(DB_FILE))  writeFileSync(DB_FILE, '[]', 'utf8');

function load()        { return JSON.parse(readFileSync(DB_FILE, 'utf8')); }
function save(events)  { writeFileSync(DB_FILE, JSON.stringify(events, null, 2), 'utf8'); }

const VALID_CATEGORIES = ['trabalho', 'pessoal', 'saude', 'estudo', 'outro'];

function validate(body) {
  const errors = {};
  if (!body.title || !String(body.title).trim())
    errors.title = 'Título obrigatório.';
  if (!body.date || !/^\d{4}-\d{2}-\d{2}$/.test(body.date))
    errors.date = 'Data inválida (AAAA-MM-DD).';
  if (body.time && !/^\d{2}:\d{2}$/.test(body.time))
    errors.time = 'Hora inválida (HH:MM).';
  if (body.category && !VALID_CATEGORIES.includes(body.category))
    errors.category = 'Categoria inválida.';
  return Object.keys(errors).length ? errors : null;
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) =>
  res.json({ status: 'ok', ts: new Date().toISOString() })
);

// GET /api/events
app.get('/api/events', (_req, res) => {
  const events = load().sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
  );
  res.json(events);
});

// GET /api/events/:id
app.get('/api/events/:id', (req, res) => {
  const ev = load().find(e => e.id === req.params.id);
  if (!ev) return res.status(404).json({ error: 'Evento não encontrado.' });
  res.json(ev);
});

// POST /api/events
app.post('/api/events', (req, res) => {
  const errors = validate(req.body);
  if (errors) return res.status(422).json({ errors });

  const ev = {
    id:          randomUUID(),
    title:       String(req.body.title).trim(),
    date:        req.body.date,
    time:        req.body.time        || '',
    category:    req.body.category    || 'outro',
    description: req.body.description || '',
    createdAt:   new Date().toISOString(),
  };
  const events = load();
  events.push(ev);
  save(events);
  res.status(201).json(ev);
});

// PUT /api/events/:id
app.put('/api/events/:id', (req, res) => {
  const events = load();
  const idx = events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Evento não encontrado.' });

  const errors = validate(req.body);
  if (errors) return res.status(422).json({ errors });

  events[idx] = {
    ...events[idx],
    title:       String(req.body.title).trim(),
    date:        req.body.date,
    time:        req.body.time        || '',
    category:    req.body.category    || events[idx].category,
    description: req.body.description || '',
  };
  save(events);
  res.json(events[idx]);
});

// DELETE /api/events/:id
app.delete('/api/events/:id', (req, res) => {
  const events = load();
  const idx = events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Evento não encontrado.' });
  events.splice(idx, 1);
  save(events);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Backend a correr em http://localhost:${PORT}`)
);
