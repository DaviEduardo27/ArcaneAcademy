# Correção Real de Landscape Mobile - Rodada 2

## Diagnóstico do que estava ganhando antes

Os ajustes anteriores existiam, mas o layout ainda preservava a estrutura de desktop em pontos centrais:

- `#screen-game` continuava sendo exibido como `flex` por causa do fluxo da tela ativa e do `style.display='flex'`.
- `.hud-top` continuava absoluto, funcionando como overlay sobre a cena.
- `.game-area` ainda carregava `height: 100%` e padding vertical alto herdado do modo mobile generico.
- `.hud-left`, `.hud-right`, `.hud-badge`, `.hud-chip` e `.coin-display` ainda mantinham boa parte da massa visual do desktop.
- O tamanho das cartas nao vinha de JS; ele continuava sendo controlado por CSS base em:
  - `.card-wrapper`
  - `.card-grid`
  - `body.mobile-mode:not(.mobile-portrait) .card-grid.grid-4 .card-wrapper`
  - `body.mobile-mode:not(.mobile-portrait) .card-grid.grid-5 .card-wrapper`
  - `body.mobile-mode:not(.mobile-portrait) .card-grid.grid-6 .card-wrapper`
- O botao de configuracao e a barra de inventario ainda herdavam escala grande do desktop/mobile generico.

## O que passou a controlar o mobile landscape

Foi criado um modo central e forte:

- `body.mobile-landscape`
- `#screen-game.mobile-landscape`

Quando o runtime detecta contexto mobile + orientacao horizontal, essas classes passam a ser aplicadas.

Em seguida, os overrides principais ficaram escopados nesse modo, com foco em:

- `body.mobile-landscape #screen-game.mobile-landscape.active`
- `body.mobile-landscape #screen-game.mobile-landscape .hud-top`
- `body.mobile-landscape #screen-game.mobile-landscape .hud-root`
- `body.mobile-landscape #screen-game.mobile-landscape .game-area`
- `body.mobile-landscape #screen-game.mobile-landscape .card-grid... .card-wrapper`
- `body.mobile-landscape #screen-game.mobile-landscape .inventory-bar`

## O que foi reduzido na HUD

- Avatar reduzido de forma mais agressiva.
- Bloco do jogador (`.hud-left`) com grid menor e menos padding.
- Tipografia secundaria (`.hud-sub`) reduzida.
- Slots de habilidade com tamanho e rotulos menores.
- Badge central de modo mais compacto.
- Cards de fase, tempo e pontos menores.
- Contador de moedas menor.
- Sombras, blur e bordas do topo suavizados.

## O que foi reduzido nas cartas

- O tamanho das cartas continuou sendo controlado por CSS, nao por JS.
- Foi aplicado override forte e escopado em `#screen-game.mobile-landscape` para:
  - `grid-4`
  - `grid-5`
  - `grid-6`
- Tambem foram reduzidos:
  - gap do grid
  - hover lift das cartas
  - escala visual interna das faces
  - tamanho visual da arte da carta

## Paddings e min-heights corrigidos

- `#screen-game` deixou de depender do overlay/padding alto da estrutura anterior e passou a operar em grid real.
- `.hud-top` deixou de ficar absoluto no modo mobile landscape.
- `.game-area` passou a usar padding `0` no modo travado e ganhou distribuicao em colunas mais compactas.
- `.inventory-bar` deixou de ficar absoluto no rodape e passou a ocupar a linha inferior do grid da tela.
- Varios `min-width`, `min-height`, gaps e paddings foram reduzidos nos blocos do topo.

## Uso de !important

Foi necessario usar `!important` de forma escopada em pontos estruturais, principalmente para vencer:

- `display:flex` aplicado no fluxo atual da tela ativa
- posicionamento absoluto da HUD
- paddings herdados do modo mobile generico
- tamanhos de cartas herdados de regras anteriores
- posicionamento absoluto do inventario

O uso foi mantido apenas dentro de `body.mobile-landscape` e `#screen-game.mobile-landscape`.

## Alterações em JS

Nao havia sizing de cartas por JS.

O JS foi alterado para:

- aplicar as classes:
  - `mobile-landscape`
  - `mobile-landscape-short`
  - `mobile-landscape-compact`
- aplicar essas classes no `html`, `body` e `#screen-game`
- manter reacao em `resize` e `orientationchange` pelo runtime existente

## Testes que devem ser repetidos

- Simulacao em aproximadamente `914x412`
- Simulacao em aproximadamente `932x430`
- Abrir fase com grade 4x4
- Abrir fase com grade 5x4
- Abrir fase com grade 6x4
- Verificar:
  - se a HUD ficou claramente menor
  - se as cartas ficaram claramente menores
  - se o topo deixou de comprimir a area jogavel
  - se o inventario ficou mais baixo e menos intrusivo
  - se o botao de configuracao continuou clicavel
  - se os overlays nao cobrem demais cartas e HUD
