# 📅 Agenda de Eventos

Aplicação web simples de **agenda/calendário de eventos**, desenvolvida em **HTML, CSS e JavaScript puro** (sem frameworks), no âmbito da unidade curricular de **Engenharia de Software** — IPVC / ESTG.

O projeto demonstra um ciclo moderno de desenvolvimento de software: prototipagem com apoio de IA (*vibe coding*), versionamento com Git/GitHub, gestão Agile/Scrum e um pipeline de **CI/CD** com **deploy automático**.

## 🔗 Links

- **Aplicação online:** _(adicionar link do GitHub Pages após o deploy)_
- **Repositório:** _(adicionar link do GitHub)_
- **Board Scrum:** _(adicionar link do GitHub Projects)_

## ✨ Funcionalidades

- Calendário mensal com navegação entre meses e botão "Hoje".
- Criar, editar e apagar eventos (título, data, hora, categoria, descrição).
- Categorias com cores (Trabalho, Pessoal, Estudo, Outro).
- Pesquisa por título/descrição e filtro por categoria.
- Lista de eventos do dia selecionado e de próximos eventos.
- Persistência local no navegador (`localStorage`) — os dados ficam guardados.

## 🛠️ Tecnologias

- HTML5, CSS3 e JavaScript (ES Modules), sem dependências de runtime.
- Node.js apenas para correr testes e o servidor de desenvolvimento.
- GitHub Actions para CI/CD e GitHub Pages para o deploy.

## 🚀 Como correr localmente

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd agenda-eventos

# 2. Arrancar o servidor de desenvolvimento (Node.js)
npm start
# abrir http://localhost:3000
```

> Em alternativa, basta abrir o ficheiro `index.html` diretamente no navegador.

## ✅ Testes

```bash
npm test
```

Os testes unitários (`node --test`) validam a lógica pura da aplicação:
validação e criação de eventos, ordenação, pesquisa, filtros, geração do
calendário e a camada de persistência.

## 📂 Estrutura do projeto

```
agenda-eventos/
├── index.html              # Estrutura da página
├── css/styles.css          # Estilos
├── src/
│   ├── events.js           # Lógica pura (testável)
│   ├── storage.js          # Persistência (localStorage)
│   └── app.js              # Ligação ao DOM / interface
├── tests/events.test.js    # Testes unitários
├── scripts/serve.mjs       # Servidor estático de desenvolvimento
├── .github/workflows/ci.yml# Pipeline CI/CD
└── docs/                   # Relatório e registo de prompts
```

## 🔄 CI/CD

A cada `push` ou *pull request* para `main`, o GitHub Actions corre os testes
(CI). Quando os testes passam num `push` para `main`, é feito o **deploy
automático** para o GitHub Pages (CD). Ver [.github/workflows/ci.yml](.github/workflows/ci.yml).

Workflows adicionais (deteção automática, valorizada no enunciado):

- **CodeQL** — análise de segurança/vulnerabilidades ([.github/workflows/codeql.yml](.github/workflows/codeql.yml)).
- **Revisão de PRs com IA (Claude)** — comenta os PRs automaticamente; opcional, requer
  configuração ([.github/workflows/claude-review.yml](.github/workflows/claude-review.yml), ver [docs/SETUP.md](docs/SETUP.md)).

## 🗂️ Gestão Agile/Scrum

O Product Backlog, Sprint Backlog, a Sprint 1 (concluída) e a gestão de bugs estão
documentados em [docs/BACKLOG.md](docs/BACKLOG.md), espelhando o board do GitHub Projects.
Os *templates* de issues e de Pull Request estão em [.github/](.github/).

## 📄 Licença

MIT.
