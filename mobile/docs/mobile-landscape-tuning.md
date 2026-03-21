# Ajuste de Landscape Mobile

## Objetivo

Esta etapa compacta a interface do build mobile em `mobile/webview-build/index.html` para uso prioritario em celulares no modo horizontal, sem alterar a logica principal do jogo.

## Logica de landscape mobile

- Foi criada a flag de runtime `isLandscapeMobile`.
- A flag entra quando o runtime ja considera o contexto mobile e a viewport esta em horizontal.
- Foram adicionadas duas faixas auxiliares para telas mais baixas:
  - `landscape-mobile-short`: altura util `<= 430px`
  - `landscape-mobile-compact`: altura util `<= 412px`
- Essas flags viram classes no `html` e no `body`:
  - `landscape-mobile`
  - `landscape-mobile-short`
  - `landscape-mobile-compact`

## O que foi reduzido na HUD

- A HUD em landscape deixa de empilhar blocos e passa a operar em uma faixa unica mais compacta.
- Avatar, titulo, subtitulo, barra de XP e slots de habilidade foram reduzidos por variaveis CSS com `clamp()`.
- O badge central ficou menor e com largura mais controlada.
- Os chips de fase, tempo e pontuacao ficaram mais estreitos e com tipografia reduzida.
- O contador de moedas ficou menor para nao disputar espaco com o painel do jogador.

## O que foi reduzido nas cartas e no tabuleiro

- O tabuleiro em landscape passou a usar escala baseada na altura util da viewport, nao apenas na largura.
- As cartas das grades `grid-4`, `grid-5` e `grid-6` agora usam alturas especificas com `clamp()` e `min()` para caber melhor em `4` linhas.
- O espacamento entre cartas foi reduzido em landscape.
- O hover e o brilho das cartas foram suavizados para evitar leitura pesada na tela horizontal.
- O painel do boss tambem foi reduzido para liberar mais area jogavel ao tabuleiro.

## Overlays e efeitos suavizados

- `cinematic-overlay`, `vignette-layer` e `fog-layer` ficam mais leves em landscape.
- `combo-text`, `spell-projectile`, `magic-spark`, `levelup-shockwave` e `black-hole` tiveram escala visual reduzida.
- O overlay de `fidelius` ficou menos agressivo.
- O `time-fade-overlay` e o `crack-svg` foram suavizados para nao cobrir excessivamente HUD e cartas.

## Safe areas e notch

- O viewport recebeu `viewport-fit=cover`.
- Foram adicionadas variaveis para:
  - `--mobile-safe-top`
  - `--mobile-safe-right`
  - `--mobile-safe-bottom`
  - `--mobile-safe-left`
- Essas variaveis agora participam do espacamento da HUD, menu, overlays, telas internas, modais, botao de configuracao e inventario.
- Isso melhora o comportamento em iPhones com notch e Dynamic Island, especialmente em landscape.

## Breakpoints e regras usadas

- Regra base mobile:
  - toque detectado ou viewport pequena
- Landscape mobile:
  - mobile ativo + orientacao horizontal
- Faixa curta:
  - altura util `<= 430px`
- Faixa muito compacta:
  - altura util `<= 412px`
- Escalas visuais:
  - `clamp()`, `min()` e variaveis CSS para HUD, boss panel, cartas, badges, botoes e overlays

## Ajustes secundarios incluidos

- Menu principal mais compacto em landscape.
- Safe area lateral aplicada em elementos fixos do menu.
- Intro ajustada para usar melhor a largura sem estourar a altura.
- Notificacoes, toasts, popup de conquista e modais ficaram menores em landscape.

## Pontos que ainda podem exigir polimento fino em aparelho real

- Conforto de toque nas cartas das grades mais densas, principalmente em `grid-6`.
- Equilibrio final entre tamanho do boss panel e largura util do tabuleiro em aparelhos Android com barras do sistema variaveis.
- Calibracao visual do menu principal em aparelhos com notch lateral mais agressivo.
- Checagem de overlaps raros entre inventario, HUD e notificacoes quando varios efeitos acontecem juntos.
- Validacao real de contraste e nitidez em aparelhos com DPR alto.
