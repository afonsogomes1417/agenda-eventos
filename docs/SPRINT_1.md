# Sprint 1 - Gestão de Eventos Básica e Visualização

## Sprint Information
- **Sprint Duration**: 2 semanas (23 Jun - 7 Jul 2026)
- **Sprint Goal**: Implementar funcionalidades core de criação/edição/visualização de eventos
- **Total Capacity**: 45 Story Points
- **Sprint Status**: ✅ CONCLUÍDO

## Sprint Backlog

| ID | User Story | Assignee | Status | Story Points |
|---|---|---|---|---|
| US001 | Criar novo evento com título, data, hora, descrição | Maria Silva | ✅ Concluído | 8 |
| US002 | Editar evento existente | João Santos | ✅ Concluído | 5 |
| US003 | Eliminar evento | Maria Silva | ✅ Concluído | 3 |
| US004 | Visualizar calendário mensal interativo | Carlos Oliveira | ✅ Concluído | 13 |
| US005 | Ver lista de eventos por dia | João Santos | ✅ Concluído | 5 |
| US006 | Visualizar próximos eventos | Carlos Oliveira | ✅ Concluído | 5 |
| BUG001 | Corrigir validação de horas inválidas | Maria Silva | ✅ Concluído | 3 |

## Sprint Velocity
- **Story Points Planeados**: 45
- **Story Points Completados**: 42
- **Velocity**: 94% ✅
- **Burndown**: No schedule

## Tarefas Técnicas
- [x] Configurar estrutura HTML base com form de criação
- [x] Implementar lógica de validação em `events.js`
- [x] Criar funções de CRUD em `storage.js`
- [x] Implementar renderização do calendário em `app.js`
- [x] Adicionar testes unitários para cada função
- [x] Configurar CI/CD com GitHub Actions
- [x] Deploy em GitHub Pages

## Commits Realizados
```
313051c - Simplify deploy: use standard _site directory for GitHub Pages
5424b68 - Improve deploy script with better error handling and logging
2f6516c - Fix: Configure proper build directory for GitHub Pages deployment
77ef41a - Add project files and documentation
151df69 - docs: adicionar guia de configuração de GitHub, deploy e Scrum
```

## Issues Fechadas em Sprint 1
- #1 - Implementar form de criação de eventos
- #2 - Validar formato de datas
- #3 - Criar calendário mensal
- #4 - Armazenar eventos em localStorage
- #5 - Adicionar testes unitários
- #6 - Configurar GitHub Pages
- #7 - Implementar busca por eventos

## Retrospectiva
### O que funcionou bem ✅
- Comunicação clara entre membros do grupo
- Testes facilitaram detecção de bugs
- Deploy automático com GitHub Actions funcionou

### O que melhorar 🔧
- Melhor planejamento de dependências entre tarefas
- Mais revisões de código durante o sprint

### Ações para próximo sprint
- Code review obrigatório em todas as PRs
- Daily standups de 10 minutos

## Próximos Passos
- Sprint 2: Implementar pesquisa, filtros e melhorar armazenamento
- Contactar stakeholders para feedback
