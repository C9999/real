# R.E.A.L — Converse · Conheça · Conecte

Jogo web e mobile de perguntas para estimular conversas e conexões reais entre pessoas.
Desenvolvido como SPA (Single Page Application) em HTML, CSS e JavaScript puro — sem frameworks, sem build tools obrigatórios.

---

## Referências visuais

![Tela principal](<Imagem do ChatGPT 28 de out. de 2026, 19_26_38.png>)
![Modal de pergunta](<Imagem do ChatGPT 28 de out. de 2026, 19_26_47.png>)

---

## Arquivos do projeto

| Arquivo | Descrição |
|---|---|
| `index.html` | Aplicação completa (HTML + CSS + JS em um único arquivo) |
| `perguntas.json` | Banco de perguntas por categoria |
| `build.js` | Script Node.js que injeta as perguntas do JSON no HTML |

---

## Como funciona o jogo

### Categorias

São 5 categorias de perguntas + 1 categoria especial:

| Categoria | Cor | Ícone |
|---|---|---|
| Relacionamentos | Rosa escuro `#c0616b` | Coração |
| Expectativas | Azul `#4a7db5` | Estrela |
| Acordos | Dourado `#b5882a` | Documento assinado |
| Limites | Roxo `#7b52a8` | Escudo |
| Sexo | Rosa `#c2587a` | Chama com miolo |
| Sorte | Verde `#5a8a3c` | Trevo de 4 folhas |

### Fluxo principal

- Clicar em uma categoria → exibe pergunta aleatória daquela categoria em uma modal
- Clicar em **Sorte** → sorteia uma pergunta aleatória de qualquer categoria ativa com perguntas disponíveis
- Dentro da modal de uma categoria, o botão **Próxima** avança para outra pergunta da mesma categoria
- A modal do Sorte **não exibe o botão Próxima**, forçando o jogador a escolher ativamente a próxima categoria
- O cabeçalho da modal exibe a cor e os ícones da categoria; quando aberta pelo Sorte, mostra o ícone da categoria sorteada + o ícone do trevo

### Modal de pergunta

- Cabeçalho colorido com ícone(s) e nome da categoria
- Texto da pergunta centralizado
- ID da pergunta no canto inferior esquerdo (ex: `rel-003`)
- Botão **Próxima** (oculto nas modais do Sorte)
- Botão ✕ para fechar

---

## Menu hambúrguer (canto superior esquerdo)

### Toggle — Categoria Sexo
- Por padrão a categoria Sexo vem **ativa**
- Ao desativar o toggle, a carta fica cinza e não pode ser clicada
- A categoria Sexo também é excluída dos sorteios do Sorte enquanto desativada

### Histórico da sessão
- Lista todas as perguntas vistas na sessão atual, em ordem cronológica reversa
- Exibe o nome da categoria (com sufixo `· Sorte` quando foi sorteada) e o texto da pergunta

### Reset ao recarregar
- Ao recarregar a página todas as configurações voltam ao padrão: Sexo ativa, histórico limpo

---

## Banco de perguntas (`perguntas.json`)

Estrutura do arquivo:

```json
{
  "categorias": {
    "relacionamentos": {
      "nome": "Relacionamentos",
      "perguntas": [
        { "id": "rel-001", "pergunta": "Texto da pergunta..." }
      ]
    }
  }
}
```

Cada categoria contém 10 perguntas com IDs no formato `xxx-001` a `xxx-010`.

> A categoria `sorte` não possui perguntas próprias no JSON — ela sorteia das demais.

---

## Como atualizar as perguntas

Edite o `perguntas.json` e depois rode:

```bash
node build.js
```

O script injeta as perguntas diretamente no `index.html`, eliminando a dependência de servidor local. O arquivo pode ser aberto diretamente no navegador via `file://`.

---

## Design

- Fundo bege quente (`#f0e8de`) com blobs decorativos e plantas nos cantos
- Cartas com proporção 3:4, fundo pastel por categoria, ícone SVG centralizado
- Modal com animação de entrada suave, cabeçalho colorido por categoria
- Layout responsivo: 5 cartas em linha + Sorte centralizada abaixo
- Em telas pequenas as cartas quebram em duas linhas automaticamente
