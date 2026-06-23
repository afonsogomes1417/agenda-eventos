# Guia de Configuração — GitHub, Deploy e Scrum

Segue estes passos pela ordem. Os comandos correm no terminal, dentro da pasta
`C:\Users\ASUS\agenda-eventos`.

---

## 1. Criar o repositório no GitHub e fazer push

1. Vai a **https://github.com/new** e cria um repositório:
   - **Repository name:** `agenda-eventos`
   - **Public** (necessário para o GitHub Pages gratuito)
   - **NÃO** marques "Add a README" (o projeto já tem ficheiros)
2. Liga o teu repositório local ao GitHub e faz push:

```bash
git remote add origin https://github.com/«o-teu-utilizador»/agenda-eventos.git
git push -u origin main
```

> Se for pedida autenticação, usa o teu utilizador GitHub + um **Personal Access Token**
> (Settings → Developer settings → Tokens) como password.

---

## 2. Ativar o deploy automático (GitHub Pages)

1. No repositório: **Settings → Pages**.
2. Em **Build and deployment → Source**, escolhe **GitHub Actions**.
3. Pronto. A partir daqui, cada `push` para `main` corre os testes e publica o site.

Vê o progresso no separador **Actions**. No fim, o site fica em:
`https://«o-teu-utilizador».github.io/agenda-eventos/`

---

## 3. Demonstrar o fluxo de branches + Pull Request

Para teres evidência de branches e PRs (pedido no enunciado):

```bash
# criar uma branch para uma nova funcionalidade
git checkout -b feat/tema-escuro

# (fazer uma alteração pequena, ex.: ajustar uma cor no css)
git add .
git commit -m "feat: experimentar ajuste de cor"

# enviar a branch para o GitHub
git push -u origin feat/tema-escuro
```

Depois, no GitHub, aparece o botão **"Compare & pull request"** → cria o PR, escreve uma
descrição e faz **Merge**. Repara que o CI corre automaticamente no PR (✓ verde).

```bash
# voltar a main e atualizar
git checkout main
git pull
```

---

## 4. Criar o board Scrum (GitHub Projects)

1. No repositório: separador **Projects → New project → Board**.
2. Cria as colunas: **Backlog**, **To do (Sprint)**, **In progress**, **Done**.
3. Cria *issues* (uma por User Story) e arrasta-as para as colunas:

| Issue (título) | Coluna inicial |
|----------------|----------------|
| US1 — Calendário mensal navegável | Done |
| US2 — Criar evento (título/data/hora) | Done |
| US3 — Editar e apagar eventos | Done |
| US4 — Categorias com cores | Done |
| US5 — Pesquisa e filtro | Done |
| US6 — Persistência (localStorage) | Done |
| US7 — Próximos eventos em destaque | Done |
| BUG — «exemplo de bug que encontraste» | Done |
| US8 — «funcionalidade futura» | Backlog |

4. Para registar um **bug**: separador **Issues → New issue**, com o *label* `bug`.
5. **Distribuição de tarefas:** atribui cada issue a ti (campo *Assignee*).
6. Marca a **Sprint 1 como concluída** (move os itens feitos para *Done*).

> Tira capturas de ecrã do board, do backlog e de uma issue de bug para o relatório.

---

## 5. (Bónus valorizado) Deteção de vulnerabilidades e revisão de PRs com IA

O enunciado valoriza a deteção automática de bugs/vulnerabilidades e a revisão de PRs com IA.
O projeto já inclui dois workflows para isso:

### a) CodeQL — análise de segurança (ativo, sem configuração)
`.github/workflows/codeql.yml` corre automaticamente em cada push/PR para `main` e faz
análise estática de vulnerabilidades. Os resultados aparecem em **Security → Code scanning**.
Não precisa de chaves — basta o repositório ser público.

### b) Revisão automática de PRs com Claude (opcional — precisa de chave)
`.github/workflows/claude-review.yml` comenta automaticamente os PRs. Está **desativado por
defeito** (para não falhar o pipeline sem configuração). Para ativar:

1. **Settings → Secrets and variables → Actions → Secrets → New repository secret:**
   `ANTHROPIC_API_KEY` = a tua chave da API Anthropic.
2. No separador **Variables**, cria: `ENABLE_CLAUDE_REVIEW` = `true`.

A partir daí, cada PR para `main` recebe uma revisão automática da IA.

> Alternativa sem chave: **GitHub Copilot code review** (se tiveres acesso) — pede revisão no PR.

---

## 6. Atualizar os links no relatório

Depois do deploy, edita `docs/RELATORIO.md` e `README.md` e substitui os «...» pelos links
reais (aplicação, repositório e board). Acrescenta as capturas de ecrã nas secções de
evidências.
