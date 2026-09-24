# Catálogo de peças — Árvore Passeio

## Como usar
1. Copie a pasta `C:\ProgramData\CatalogoProdutosCofap\FotoProd` para dentro desta pasta (ao lado do `index.html`) para as fotos aparecerem.
   Outra opção é apontar o botão **Pasta das fotos** para o caminho original, ex.: `file:///C:/ProgramData/CatalogoProdutosCofap/FotoProd/`.
2. Dê duplo clique no `index.html` (Chrome ou Edge). O catálogo abre sozinho, porque o banco vai embutido em `lib/catalogo_db.js`.
   Se esse arquivo for removido, a página pede para abrir o `catalogo_sistema.db` manualmente.
3. Navegue pela árvore, filtre por montadora/modelo e busque por código Cofap, código de concorrente (Nakata, Monroe, KYB...) ou texto.

Funciona offline. A única dependência externa é a fonte Barlow (Google Fonts), com fallback automático.

## Conteúdo
| Arquivo | Função |
|---|---|
| `catalogo_sistema.db` | Banco SQLite com produtos, árvore, aplicações, referências e classificação |
| `index.html` + `lib/` | Interface (sql.js embutido, lê o banco direto no navegador) |
| `lib/catalogo_db.js` | Cópia do banco embutida para abertura automática (gerada pelo `gerar_banco.py`) |
| `scripts/gerar_banco.py` | Recria o banco a partir de um novo `CatalogoExpresso.c01` e do `Passeio.xlsx` |
| `scripts/exportar_csv.py` | Exporta as tabelas em CSV |
| `csv_access/` | CSVs prontos para importar no Access |

## Estrutura do banco
- `arvore` — Sistema (nível 1) > Grupo (2) > Subgrupo (3), vinda do Passeio.xlsx
- `produto` — itens Cofap; `produto_arvore` liga cada produto a um ou mais subgrupos
- `regra_classificacao` — regras usadas na ligação (descrição + posição → subgrupo)
- `aplicacao` + `produto_aplicacao` — veículos em que cada peça serve
- `referencia_cruzada` — códigos equivalentes de outras marcas
- `fabricante` — montadoras e marcas; `distribuidor` — rede de distribuidores
- `v_produto_sem_classificacao` — produtos que não entraram na árvore (linha pesada: cabine, 3º eixo, suspensão pneumática)

Para ajustar a classificação, edite a lista `REGRAS` em `gerar_banco.py` e rode:
`python scripts/gerar_banco.py CatalogoExpresso.c01 Passeio.xlsx catalogo_sistema.db`
Isso recria o banco **e** o `lib/catalogo_db.js`. Se editar o `.db` por outra ferramenta (DBeaver, Access via ODBC),
rode `python scripts/embutir_banco.py catalogo_sistema.db lib/catalogo_db.js` para a página ver a mudança.

## Usar no Access
- **Importar:** Dados Externos > Novo Arquivo de Texto > escolha cada CSV de `csv_access` (delimitado por `;`, primeira linha com nomes, codificação UTF-8). Depois crie as relações pelos campos `*_id`.
- **Vincular ao vivo:** instale o driver SQLite ODBC (http://www.ch-werner.de/sqliteodbc/), crie uma DSN para `catalogo_sistema.db` e use Dados Externos > ODBC > Vincular.
