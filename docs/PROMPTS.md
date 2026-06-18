# Registo de Prompts (Vibe Coding)

Este ficheiro documenta os principais prompts usados durante o desenvolvimento com apoio de IA
(Claude Code / Opus 4.8), como evidência da utilização de *prompting*. Acrescenta os teus
próprios prompts à medida que fores iterando o projeto.

---

### 1. Arranque do projeto
> «Ajuda-me a criar uma agenda de eventos em HTML/CSS/JS puro (sem frameworks), com um
> calendário mensal navegável, criar/editar/apagar eventos, categorias com cores e persistência
> em localStorage.»

**Resultado:** estrutura inicial do projeto (`index.html`, `css/styles.css`, `src/`).

---

### 2. Código testável
> «Separa a lógica pura (validação, ordenação, pesquisa, geração do calendário) num módulo sem
> DOM nem localStorage, para eu poder escrever testes unitários.»

**Resultado:** `src/events.js` isolado da interface; `src/storage.js` para a persistência.

---

### 3. Testes unitários
> «Escreve testes unitários com o test runner nativo do Node (node --test) que cubram a
> validação de eventos, ordenação, pesquisa, filtros, a matriz do calendário e a persistência.»

**Resultado:** `tests/events.test.js` com 18 testes; `npm test` → 18 passed.

---

### 4. Pipeline CI/CD
> «Configura um pipeline de GitHub Actions que corra os testes em cada push e pull request e
> faça deploy automático para o GitHub Pages quando os testes passarem em main.»

**Resultado:** `.github/workflows/ci.yml` com os jobs `test` (CI) e `deploy` (CD).

---

### 5. Interface / UX
> «Melhora o aspeto visual: cores por categoria, destaque do dia de hoje, lista de próximos
> eventos e um modal para criar/editar.»

**Resultado:** estilos em `css/styles.css` e renderização em `src/app.js`.

---

### 6. Documentação
> «Cria um README claro e um relatório em Markdown com a estrutura pedida no enunciado
> (capa, índice, evidências, análise crítica, bibliografia APA 7ª).»

**Resultado:** `README.md` e `docs/RELATORIO.md`.

---

> **Dica para a defesa:** tira capturas de ecrã do teu próprio chat com a IA para mostrares o
> processo de *prompting* em tempo real. Acrescenta abaixo os prompts adicionais que usares.

### Prompts adicionais
- «...»
- «...»
