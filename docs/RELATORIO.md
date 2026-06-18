# Relatório — Vibe Coding e CI/CD

> **Como usar este documento:** preenche os campos marcados com «...» e substitui os marcadores
> `[IMAGEM: ...]` por capturas de ecrã reais. No fim, exporta para PDF (ver instruções no final).

---

## Capa

<div align="center">

**INSTITUTO POLITÉCNICO DE VIANA DO CASTELO**
**ESCOLA SUPERIOR DE TECNOLOGIA E GESTÃO**

Engenharia de Software
Engenharia da Computação Gráfica e Multimédia

---

# Agenda de Eventos
### Vibe Coding e CI/CD

---

**Aluno:** «Nome completo» — Nº «0000»
**Docente:** Vasco Miranda
**Ano letivo:** 2025/2026 — 2º Semestre

«Local», «mês» de 2026

</div>

---

## Índice

1. [Introdução](#1-introdução)
2. [Tema e Valor da Solução](#2-tema-e-valor-da-solução)
3. [Arquitetura do Processo de Desenvolvimento](#3-arquitetura-do-processo-de-desenvolvimento)
4. [Plataforma Escolhida e Limitações](#4-plataforma-escolhida-e-limitações)
5. [Vibe Coding — Utilização de IA e Prompting](#5-vibe-coding--utilização-de-ia-e-prompting)
6. [GitHub — Versionamento e Colaboração](#6-github--versionamento-e-colaboração)
7. [Gestão Agile/Scrum](#7-gestão-agilescrum)
8. [CI/CD e Deploy Automático](#8-cicd-e-deploy-automático)
9. [Prints e Evidências](#9-prints-e-evidências)
10. [Conclusão e Análise Crítica](#10-conclusão-e-análise-crítica)
11. [Bibliografia](#11-bibliografia)
12. [Links](#12-links)

---

## 1. Introdução

Este relatório documenta o desenvolvimento da aplicação **Agenda de Eventos**, um protótipo
funcional criado no âmbito da unidade curricular de Engenharia de Software. O objetivo do
trabalho é demonstrar a aplicação de processos modernos de engenharia de software no
desenvolvimento de soluções digitais, integrando ferramentas de Inteligência Artificial (IA)
na prototipagem (*vibe coding*), juntamente com práticas de versionamento (Git/GitHub),
gestão ágil (Scrum), integração e entrega contínuas (CI/CD) e *deploy* automatizado.

Ao longo do documento são apresentadas as decisões tomadas, as ferramentas utilizadas, as
evidências do trabalho realizado e uma análise crítica da experiência.

---

## 2. Tema e Valor da Solução

A **Agenda de Eventos** é uma aplicação web que permite ao utilizador organizar os seus
compromissos num calendário mensal simples e intuitivo. O utilizador pode criar, editar e
apagar eventos, atribuir-lhes categorias com cores, pesquisar e filtrar, e consultar
rapidamente os eventos do dia e os próximos eventos.

**Problema que resolve:** a dispersão de compromissos (notas soltas, mensagens, memória) leva
a esquecimentos. A aplicação centraliza os eventos pessoais num único sítio, acessível no
navegador, com os dados guardados localmente.

**Valor gerado:**
- Simplicidade — não requer registo nem instalação.
- Acessível em qualquer dispositivo com navegador (deploy online).
- Persistência local dos dados (`localStorage`), sem necessidade de servidor.

---

## 3. Arquitetura do Processo de Desenvolvimento

O desenvolvimento seguiu uma arquitetura de processo assente em quatro pilares:

```
┌──────────────┐   prompts    ┌──────────────┐   commits/PR   ┌──────────────┐
│  Vibe Coding │ ───────────► │   Código      │ ────────────► │    GitHub     │
│  (IA)        │              │  (HTML/CSS/JS)│                │ (versionamento)│
└──────────────┘              └──────────────┘                └──────┬───────┘
                                                                      │ push/PR
                              ┌──────────────┐   testes verdes ┌──────▼───────┐
                              │ GitHub Pages │ ◄────────────── │ GitHub Actions│
                              │  (deploy)    │   deploy auto   │   (CI/CD)     │
                              └──────────────┘                 └──────────────┘
```

**Separação de responsabilidades no código** (boa prática que facilita os testes):
- `src/events.js` — **lógica pura** (validação, ordenação, pesquisa, geração do calendário). Não depende do DOM nem do `localStorage`, por isso é 100% testável.
- `src/storage.js` — **persistência** isolada (`localStorage`).
- `src/app.js` — **interface**, liga a lógica ao DOM.

Esta separação permite testar a lógica de negócio em Node.js sem precisar de um navegador.

---

## 4. Plataforma Escolhida e Limitações

### Ferramentas utilizadas

| Categoria | Ferramenta | Função |
|-----------|-----------|--------|
| Assistente de IA | Claude Code (Opus 4.8) | Geração de código, testes, configuração de CI/CD e relatório |
| Linguagens | HTML5, CSS3, JavaScript (ES Modules) | Aplicação |
| Runtime/testes | Node.js (`node --test`) | Testes unitários e servidor local |
| Versionamento | Git + GitHub | Controlo de versões e colaboração |
| Gestão ágil | GitHub Projects | Product Backlog, Sprint Backlog, issues |
| CI/CD | GitHub Actions | Pipeline de testes e deploy |
| Deploy | GitHub Pages | Hospedagem online automática |

### Vantagens encontradas
- A IA acelerou enormemente a prototipagem e a escrita de testes.
- O *stack* sem frameworks tornou o projeto leve, fácil de perceber e de fazer deploy.
- Todo o pipeline (CI + deploy) ficou centralizado no GitHub, sem contas adicionais.

### Dificuldades / Limitações
- «descrever dificuldade — ex.: configurar as permissões do GitHub Pages na primeira vez»
- A IA por vezes assume bibliotecas ou contextos que não existem; é preciso rever o código.
- O `localStorage` é por navegador/dispositivo: os dados não sincronizam entre dispositivos.
- O deploy estático não suporta lógica de servidor (não há autenticação nem base de dados central).

---

## 5. Vibe Coding — Utilização de IA e Prompting

O desenvolvimento foi feito em estilo *vibe coding*: descrevendo objetivos em linguagem
natural a um assistente de IA, que gerou e iterou o código. O registo completo dos prompts
encontra-se em [PROMPTS.md](PROMPTS.md). Exemplos representativos:

> **Prompt 1 (arranque):** «Ajuda-me a criar uma agenda de eventos em HTML/CSS/JS puro, com
> calendário mensal, criar/editar/apagar eventos, categorias com cores e persistência em
> localStorage.»

> **Prompt 2 (qualidade):** «Separa a lógica pura num módulo sem DOM para eu poder escrever
> testes unitários com node --test.»

> **Prompt 3 (CI/CD):** «Configura um pipeline de GitHub Actions que corra os testes em cada
> push e faça deploy automático para o GitHub Pages quando passarem.»

A IA foi usada para: **geração de código**, **escrita de testes unitários**, **configuração
do pipeline** e **redação deste relatório** — tudo sob revisão humana.

---

## 6. GitHub — Versionamento e Colaboração

O projeto foi versionado com Git e alojado no GitHub. Evidências a incluir:

- **Commits** com mensagens descritivas e convenção *Conventional Commits* (`feat:`, `fix:`, `docs:`, `test:`).
- **Branches** por funcionalidade (ex.: `feat/filtro-categorias`).
- **Pull Requests** para integrar cada funcionalidade em `main`.
- **Issues** para registo de bugs e tarefas.

[IMAGEM: histórico de commits no GitHub]
[IMAGEM: lista de branches]
[IMAGEM: um Pull Request com a descrição e o resultado dos testes do CI]

> _Nota (trabalho individual):_ o fluxo de branches + Pull Requests é demonstrado pelo próprio
> autor, evidenciando o domínio do processo de colaboração do GitHub.

---

## 7. Gestão Agile/Scrum

A gestão foi feita no **GitHub Projects** (board Kanban/Scrum). Contém:

- **Product Backlog** — todas as funcionalidades previstas.
- **Sprint Backlog** — itens selecionados para a Sprint 1.
- **1 Sprint concluída** — Sprint 1 com os itens terminados.
- **Gestão de bugs/issues** — registo e resolução de problemas.
- **Distribuição de tarefas** — atribuição dos itens (assignee).

[IMAGEM: Scrum Board com as colunas To do / In progress / Done]
[IMAGEM: Product Backlog]

### Product Backlog (exemplo)

| ID | User Story | Prioridade | Estado |
|----|-----------|-----------|--------|
| US1 | Como utilizador, quero ver um calendário mensal para me orientar. | Alta | ✅ Done |
| US2 | Como utilizador, quero criar um evento com título, data e hora. | Alta | ✅ Done |
| US3 | Como utilizador, quero editar e apagar eventos. | Alta | ✅ Done |
| US4 | Como utilizador, quero categorizar eventos por cor. | Média | ✅ Done |
| US5 | Como utilizador, quero pesquisar e filtrar eventos. | Média | ✅ Done |
| US6 | Como utilizador, quero que os meus dados fiquem guardados. | Alta | ✅ Done |
| US7 | Como utilizador, quero ver os próximos eventos em destaque. | Baixa | ✅ Done |

---

## 8. CI/CD e Deploy Automático

O pipeline está definido em [.github/workflows/ci.yml](../.github/workflows/ci.yml) e tem
duas fases:

1. **CI (Integração Contínua):** em cada `push` ou *pull request* para `main`, o GitHub
   Actions instala o Node.js e corre `npm test` (18 testes unitários). Se algum teste falhar,
   a integração é bloqueada.
2. **CD (Entrega Contínua):** quando há `push` para `main` e os testes passam, o site é
   publicado automaticamente no **GitHub Pages**.

```yaml
on:
  push: { branches: [ main ] }
  pull_request: { branches: [ main ] }
jobs:
  test:    # corre os testes
  deploy:  # needs: test  → só faz deploy se os testes passarem
```

[IMAGEM: execução do workflow no separador "Actions" (verde)]
[IMAGEM: site publicado no GitHub Pages]

---

## 9. Prints e Evidências

> Inserir aqui as capturas de ecrã das principais funcionalidades.

[IMAGEM: vista geral do calendário]
[IMAGEM: modal de criar/editar evento]
[IMAGEM: pesquisa e filtro por categoria]
[IMAGEM: lista de próximos eventos]
[IMAGEM: resultado dos testes `npm test` no terminal — 18 passed]

---

## 10. Conclusão e Análise Crítica

**Processo e metodologias.** A combinação de Scrum (organização do trabalho em backlog e
sprint) com Git/GitHub (versionamento) deu estrutura ao desenvolvimento e tornou o progresso
visível e mensurável.

**Potencial das ferramentas de IA.** O *vibe coding* revelou-se muito eficaz na geração de
código e testes, reduzindo drasticamente o tempo de prototipagem. A IA é um acelerador
poderoso, mas exige **revisão crítica** — o programador continua responsável por validar,
testar e compreender o que é gerado.

**Limitações encontradas.** «descrever — ex.: persistência apenas local, ausência de backend,
necessidade de rever código gerado, curva de configuração inicial do GitHub Pages».

**Vantagens do trabalho colaborativo.** «no caso individual: o fluxo de branches/PR mantém o
histórico organizado e permite rever cada alteração isoladamente; em grupo, permitiria
trabalho em paralelo sem conflitos».

**Impacto do CI/CD.** A automação dos testes e do deploy aumentou a confiança nas alterações:
cada mudança é validada automaticamente e publicada sem passos manuais, eliminando erros de
deploy e acelerando a entrega de valor.

---

## 11. Bibliografia

> Formato APA 7.ª edição. Ajustar as datas de acesso conforme necessário.

Atlassian. (2024). *What is Scrum?* https://www.atlassian.com/agile/scrum

Chacon, S., & Straub, B. (2014). *Pro Git* (2.ª ed.). Apress. https://git-scm.com/book

GitHub. (2024). *GitHub Actions documentation*. https://docs.github.com/en/actions

GitHub. (2024). *GitHub Pages documentation*. https://docs.github.com/en/pages

Mozilla. (2024). *MDN Web Docs*. https://developer.mozilla.org/

Node.js. (2024). *Test runner — Node.js documentation*. https://nodejs.org/api/test.html

Schwaber, K., & Sutherland, J. (2020). *The Scrum Guide*. https://scrumguides.org/

---

## 12. Links

- **Aplicação online (GitHub Pages):** «https://utilizador.github.io/agenda-eventos/»
- **Repositório GitHub:** «https://github.com/utilizador/agenda-eventos»
- **Board Scrum (GitHub Projects):** «link do projeto»

---

> ### Como exportar para PDF
> **Opção A (VS Code):** instalar a extensão *"Markdown PDF"* → clicar com o botão direito no
> ficheiro → *"Markdown PDF: Export (pdf)"*.
> **Opção B:** abrir este `.md` no navegador (ou no [dillinger.io](https://dillinger.io)) e
> usar *Imprimir → Guardar como PDF*.
> **Opção C (Word):** colar o conteúdo no Word, formatar e *Guardar como PDF*.
