# Gestão de Issues e Bugs - Agenda de Eventos

## Sistema de Rastreamento de Issues

### Issues Abertas e Resolvidas em Sprint 1

| # | Título | Tipo | Prioridade | Status | Assignee | Sprint |
|---|---|---|---|---|---|---|
| #1 | Implementar form de criação de eventos | Feature | Alta | ✅ Fechado | Maria Silva | Sprint 1 |
| #2 | Validar formato de datas no form | Bug | Alta | ✅ Fechado | João Santos | Sprint 1 |
| #3 | Criar calendário mensal interativo | Feature | Alta | ✅ Fechado | Carlos Oliveira | Sprint 1 |
| #4 | Erro ao armazenar eventos duplicados | Bug | Crítico | ✅ Fechado | Maria Silva | Sprint 1 |
| #5 | Adicionar testes unitários | Feature | Alta | ✅ Fechado | João Santos | Sprint 1 |
| #6 | Deploy em GitHub Pages não funciona | Bug | Crítico | ✅ Fechado | Afonso Gomes | Sprint 1 |
| #7 | Implementar busca por eventos | Feature | Média | ✅ Fechado | Maria Silva | Sprint 1 |
| #8 | Suportar múltiplos filtros de categoria | Enhancement | Média | ✅ Fechado | João Santos | Sprint 1 |
| #9 | Melhorar acessibilidade do CSS | Enhancement | Média | ✅ Fechado | Carlos Oliveira | Sprint 1 |
| #10 | Horas inválidas devem ser validadas | Bug | Alta | ✅ Fechado | Maria Silva | Sprint 1 |

## Detalhes de Issues Críticas Resolvidas

### Issue #4 - Erro ao armazenar eventos duplicados
**Status**: ✅ Resolvido  
**Prioridade**: Crítico  
**Assignee**: Maria Silva  
**Data de Abertura**: 23 Jun 2026  
**Data de Encerramento**: 25 Jun 2026  

**Descrição**:  
Quando o utilizador cria múltiplos eventos com os mesmos dados, o sistema cria duplicatas no localStorage em vez de avisar sobre evento já existente.

**Causa Raiz**:  
Falta de validação de duplicatas na função `createEvent()`.

**Solução Implementada**:  
- Adicionar verificação de eventos existentes antes de criar novo
- Retornar erro se evento duplicado for detectado
- Notificar utilizador sobre evento já existente

**Commits Relacionados**:  
- `77ef41a` - Add project files and documentation
- Branch: `bugfix/duplicate-events`

---

### Issue #6 - Deploy em GitHub Pages não funciona
**Status**: ✅ Resolvido  
**Prioridade**: Crítico  
**Assignee**: Afonso Gomes  
**Data de Abertura**: 23 Jun 2026  
**Data de Encerramento**: 23 Jun 2026  

**Descrição**:  
GitHub Actions workflow falhava ao fazer deploy de forma consistente (erro 503 durante build).

**Causa Raiz**:  
- Configuração incorreta do diretório de artefatos
- Versão incompatível de `configure-pages`
- Upload de todo o repositório (incluindo node_modules) em vez de apenas ficheiros estáticos

**Solução Implementada**:  
- Reconfigurar `ci.yml` para usar diretório `_site`
- Downgrade de `configure-pages@v5` para `v4`
- Criar script que copia apenas ficheiros necessários
- Adicionar logging para debugging

**Commits Relacionados**:  
- `2f6516c` - Fix: Configure proper build directory for GitHub Pages deployment
- `5424b68` - Improve deploy script with better error handling and logging
- `313051c` - Simplify deploy: use standard _site directory for GitHub Pages

---

### Issue #2 - Validar formato de datas no form
**Status**: ✅ Resolvido  
**Prioridade**: Alta  
**Assignee**: João Santos  
**Data de Abertura**: 23 Jun 2026  
**Data de Encerramento**: 24 Jun 2026  

**Descrição**:  
O form aceitava datas em formatos inválidos (ex: "31/13/2026").

**Solução Implementada**:  
- Implementar regex para validar AAAA-MM-DD
- Rejeitar datas inválidas no `validateEvent()`
- Mostrar mensagem de erro específica

**Testes Adicionados**:  
```javascript
test('validateEvent: deteta data inválida', (t) => {
  const errors = validateEvent({ title: 'Teste', date: '2026-13-32' });
  t.ok(errors.date);
});
```

---

## Métricas de Issues

- **Total Issues Criadas em Sprint 1**: 10
- **Issues Resolvidas**: 10 (100% ✅)
- **Issues Críticas**: 2 (ambas resolvidas)
- **Bugs vs Features**: 4 Bugs / 5 Features / 1 Enhancement
- **Tempo Médio de Resolução**: ~1-2 dias

## Próximas Ações

- [ ] Implementar sistema de notificações para eventos urgentes
- [ ] Melhorar validação de dados no servidor (quando houver backend)
- [ ] Adicionar testes de integração
- [ ] Implementar sincronização em cloud (Future Sprint)

## Labels Utilizados

- `bug` - Defeitosno código ou funcionalidade
- `feature` - Nova funcionalidade
- `enhancement` - Melhorias em funcionalidades existentes
- `documentation` - Documentação ou README
- `critical` - Bloqueadores de release
- `good-first-issue` - Issues para novos contribuidores
