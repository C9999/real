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
| `texto.json` | Conteúdo exibido na modal "Sobre o jogo" |
| `build.js` | Script Node.js que injeta as perguntas do JSON no HTML |

---

## Como rodar localmente

Com Node.js:
```bash
npx serve .
```
Acesse em **http://localhost:3000**

Com Python:
```bash
python -m http.server 8080
```
Acesse em **http://localhost:8080**

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
- Clicar em **Sorte** → sorteia uma pergunta aleatória de qualquer categoria ativa
- Dentro da modal de uma categoria, o botão **Próxima** avança para outra pergunta da mesma categoria
- A modal do **Sorte não exibe o botão Próxima**, forçando o jogador a escolher ativamente a próxima categoria
- O cabeçalho da modal exibe ícone(s) e nome da categoria; quando aberta pelo Sorte, mostra o ícone da categoria sorteada + ícone do trevo

### Faróis de navegação

Cada modal de pergunta exibe 3 botões de farol:

| Farol | Cor | Ação |
|---|---|---|
| 🟢 Verde | `#3aaa5c` | Modal fica verde + toast "Aprofunde mais sobre essa carta" |
| 🟡 Amarelo | `#e6b800` | Modal fica amarela, carta vai para a lista **Falaremos depois** no menu + toast + fecha a modal |
| 🔴 Vermelho | `#d94040` | Pergunta é removida do histórico + toast "Não falaremos mais sobre essa carta" + fecha a modal |

### Modal de pergunta

- Cabeçalho colorido com ícone(s) e nome da categoria
- Texto da pergunta centralizado
- 3 botões de farol (verde, amarelo, vermelho)
- ID da pergunta no canto inferior esquerdo (ex: `rel-003`)
- Botão **Próxima** — avança para outra pergunta da mesma categoria (oculto nas modais do Sorte)
- Botão ✕ para fechar

---

## Menu hambúrguer (canto superior esquerdo)

### Toggle — Categoria Sexo
- Por padrão a categoria Sexo vem **ativa**
- Ao desativar, a carta fica cinza e é excluída dos sorteios do Sorte

### Toggle — Dark mode
- Por padrão vem **desligado**
- Alterna entre o tema claro (bege quente) e o tema escuro (marrom escuro)
- Todas as cores — fundo, cartas, modais, drawer e textos — se adaptam automaticamente

### Falaremos depois
- Lista as perguntas marcadas com o farol amarelo
- Ao clicar em uma carta da lista, a modal reabre com o farol amarelo já ativo

### Histórico da sessão
- Lista todas as perguntas vistas na sessão, em ordem cronológica reversa
- Exibe o nome da categoria (com sufixo `· Sorte` quando foi sorteada) e o texto da pergunta
- Perguntas descartadas com o farol vermelho são removidas do histórico

### Reset ao recarregar
- Ao recarregar a página todas as configurações voltam ao padrão: Sexo ativa, dark mode desligado, histórico e lista "Falaremos depois" limpos

---

## Ícone de informação (ⓘ)

- Fica ao lado de "Conecte" na tagline do cabeçalho
- Abre uma modal com o conteúdo do `texto.json`
- Para atualizar o conteúdo, edite o `texto.json` com a estrutura:

```json
{
  "titulo": "O que é o R.E.A.L?",
  "subtitulo": "Converse · Conheça · Conecte",
  "descricao": "Descrição geral do jogo...",
  "secoes": [
    { "titulo": "Como jogar", "texto": "..." },
    { "titulo": "As categorias", "texto": "..." }
  ]
}
```

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

> A categoria `sorte` não possui perguntas próprias — ela sorteia das demais.

---

## Como atualizar as perguntas

Edite o `perguntas.json` e depois rode:

```bash
node build.js
```

O script injeta as perguntas diretamente no `index.html` como fallback, eliminando a dependência de servidor local para abertura via `file://`. No Vercel o fetch funciona normalmente.

---

## Deploy

O projeto está publicado em **https://real-carlos.vercel.app/**

A cada push no GitHub o Vercel faz o redeploy automaticamente.

---

## Design

- Fundo bege quente (`#f0e8de`) com blobs decorativos e plantas nos cantos
- Dark mode com fundo marrom escuro (`#1a1510`) via variáveis CSS
- Cartas com proporção 3:4, fundo pastel por categoria, ícone SVG centralizado
- Modal com animação de entrada suave, cabeçalho colorido por categoria
- Layout responsivo: 5 cartas em linha + Sorte centralizada abaixo
- Mobile (≤600px): Relacionamentos + Expectativas / Sexo centralizado / Acordos + Limites / Sorte centralizada
