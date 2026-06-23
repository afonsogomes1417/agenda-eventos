# Backlog e Gestão Scrum — Agenda de Eventos

Este documento espelha o board do **GitHub Projects** e serve de evidência da gestão
Agile/Scrum. Cada User Story (US) e bug deve ter uma *issue* correspondente no GitHub
(usar os templates em `.github/ISSUE_TEMPLATE/`), distribuída ao responsável (*assignee*).

- **Equipa:** Pedro Araújo (trabalho individual)
- **Duração da Sprint:** 1 semana
- **Definition of Done (DoD):** funcionalidade implementada, testada (manual + `npm test` verde no CI), revista por PR e integrada em `main`.

---

## Product Backlog

Lista priorizada de todas as funcionalidades previstas.

| ID | User Story | Prioridade | Estimativa | Estado |
|----|-----------|-----------|-----------|--------|
| US1 | Como utilizador, quero ver um calendário mensal navegável para me orientar no tempo. | Alta | 3 | ✅ Done |
| US2 | Como utilizador, quero criar um evento com título, data, hora, categoria e descrição. | Alta | 5 | ✅ Done |
| US3 | Como utilizador, quero editar e apagar eventos existentes. | Alta | 3 | ✅ Done |
| US4 | Como utilizador, quero categorizar eventos por cor para os distinguir rapidamente. | Média | 2 | ✅ Done |
| US5 | Como utilizador, quero pesquisar e filtrar eventos por categoria. | Média | 3 | ✅ Done |
| US6 | Como utilizador, quero que os meus dados fiquem guardados entre sessões (localStorage). | Alta | 2 | ✅ Done |
| US7 | Como utilizador, quero ver os próximos eventos em destaque na barra lateral. | Baixa | 2 | ✅ Done |
| US8 | Como utilizador, quero um tema escuro para usar a app à noite. | Baixa | 3 | 📋 Backlog |
| US9 | Como utilizador, quero exportar os meus eventos para um ficheiro `.ics`. | Baixa | 5 | 📋 Backlog |
| US10 | Como utilizador, quero receber um lembrete antes de um evento. | Baixa | 8 | 📋 Backlog |

---

## Sprint 1 (concluída)

**Objetivo da Sprint:** entregar uma agenda funcional com calendário, CRUD de eventos,
categorias, pesquisa/filtro e persistência local, suportada por testes e CI/CD.

### Sprint Backlog

| Item | Estado |
|------|--------|
| US1 — Calendário mensal navegável | ✅ Done |
| US2 — Criar evento | ✅ Done |
| US3 — Editar e apagar eventos | ✅ Done |
| US4 — Categorias com cores | ✅ Done |
| US5 — Pesquisa e filtro | ✅ Done |
| US6 — Persistência (localStorage) | ✅ Done |
| US7 — Próximos eventos em destaque | ✅ Done |
| TAREFA — Testes unitários (`node --test`) | ✅ Done |
| TAREFA — Pipeline CI/CD (GitHub Actions + Pages) | ✅ Done |

**Resultado:** todos os itens concluídos. Incremento publicado via deploy automático.

---

## Gestão de bugs/issues

| ID | Bug | Severidade | Estado |
|----|-----|-----------|--------|
| BUG1 | «exemplo: ao mudar de mês, o dia selecionado mantinha-se fora da vista» | Baixa | ✅ Done |

> Acrescenta aqui os bugs reais que encontrares durante o desenvolvimento (cria a issue
> com o label `bug` usando o template). Cada bug deve ter um print no relatório.

---

## Colunas do board (GitHub Projects)

`Backlog` → `To do (Sprint)` → `In progress` → `Done`

> Mapeamento: as US8–US10 ficam em **Backlog**; as US1–US7 e tarefas da Sprint 1 em **Done**.
