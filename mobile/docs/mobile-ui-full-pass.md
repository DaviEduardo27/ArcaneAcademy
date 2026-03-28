# Mobile UI Full Pass

## Objetivo da etapa

Esta etapa criou a base visual global da versao `mobile/webview-build` para Android em modo horizontal, sem alterar a logica principal do jogo.

O foco foi:

- criar um app shell mobile real
- consolidar um sistema de viewport landscape
- centralizar tokens globais de UI
- reorganizar menu, gameplay, modais e grimorio
- fazer o board responder ao espaco util real da tela
- reduzir espacos mortos e aparencia de desktop encolhido

## App shell criado

Foi adicionada uma estrutura de shell em runtime:

- `#app-shell`
- `#app-stage`

Regras principais:

- o shell ocupa `100dvw x 100dvh`
- o stage ocupa toda a area util e centraliza a aplicacao
- a estrutura e criada no `DOMContentLoaded` por `ensureAppShell()`
- o stage recebe `data-active-screen` via `applyAppShellState()`

Motivacao:

- evitar a sensacao de “caixa pequena no centro”
- garantir um enquadramento consistente para intro, menu, gameplay e telas internas

## Classes de viewport criadas e mantidas

Continuam sendo aplicadas automaticamente por `refreshMobileRuntimeState()`:

- `mobile-landscape`
- `mobile-landscape-compact`
- `mobile-landscape-short`
- `mobile-landscape-medium`
- `mobile-landscape-roomy`

Faixas:

- `compact`: altura util `<= 430px`
- `short`: altura util `431px a 480px`
- `medium`: altura util `481px a 560px`
- `roomy`: altura util `> 560px`

Recalculo:

- `load`
- `resize`
- `orientationchange`
- `visualViewport.resize`

## Tokens principais criados/organizados

### Escala e estrutura global

- `--ui-scale`
- `--panel-scale`
- `--panel-padding`
- `--panel-radius`
- `--panel-gap`
- `--header-height`
- `--app-stage-width`
- `--app-stage-height`

### Tipografia

- `--title-size`
- `--subtitle-size`
- `--label-size`
- `--body-size`
- `--small-size`

### Botoes e icones

- `--button-height`
- `--button-font-size`
- `--button-padding-x`
- `--icon-size`
- `--settings-button-size`

### HUD e gameplay

- `--avatar-size`
- `--hud-height`
- `--hud-gap`
- `--hud-card-height`
- `--hud-card-min-width`
- `--boss-panel-width`
- `--boss-panel-scale`
- `--board-gap`
- `--card-width`
- `--card-height`

### Modais, notificacoes e telas internas

- `--modal-width`
- `--modal-max-width`
- `--modal-max-height`
- `--notification-width`
- `--notification-scale`
- `--shop-card-width`
- `--shop-card-height`
- `--book-width`
- `--book-height`

### Efeitos

- `--overlay-scale`
- `--glow-strength`
- `--blur-strength`
- `--overlay-opacity`
- `--transition-speed`
- `--particle-density`

## Componentes que agora obedecem a base mobile

### Intro

- video com limite real por altura util
- botao `Iniciar Jornada` touch-friendly
- `Pular Intro` respeitando safe area
- composicao central sem excesso de area vazia

### Menu principal

- `#menu-capa-layer` passou a preencher melhor a largura em landscape
- `#menu-options-container` virou grid real em 3 colunas
- cards do menu ficaram com proporcao controlada e menor altura
- chips superiores (moedas, progresso, tema, badge) ficaram mais compactos e coerentes

### Gameplay

- HUD superior continua compacta e proporcional
- boss panel lateral agora usa largura controlada por runtime
- board central usa calculo real de espaco disponivel
- cartas deixam de depender apenas de tokens fixos
- botao de configuracao continua respeitando safe area

### Perfil / customizacao

- painel principal usa `--modal-max-width`
- conteudo rola internamente sem virar pagina desktop reduzida
- blocos e acoes seguem a mesma escala global

### Opcoes / slots / paineis centrais

- `panel-glass` passou a ter largura e altura maximas coerentes
- grids de slots usam estrutura de colunas consistente
- botoes principais ganharam largura touch-friendly

### Loja

- painel central usa largura maxima dedicada para landscape
- grid da loja foi estabilizado em colunas consistentes
- cards obedecem tokens de altura/largura

### Grimorio

- `grimoire-container` agora usa `--book-width` e `--book-height`
- estrutura interna virou grid com header, miolo, navegacao e acoes
- pagina interna ganhou escala de leitura mais adequada
- retratos, textos e navegacao ficaram proporcionais

### Notificacoes e eventos

- `notification-bar` agora usa `--notification-width`
- `toast-stack` foi limitado por largura util
- `newspaper` e alertas passaram a usar altura/largura mais discretas
- overlays cinematograficos passaram a responder ao multiplicador de efeitos mobile

## Sizing real do board e das cartas

Foi adicionada uma camada de calculo real em JS:

- `applyGameplayBoardSizing()`
- `refreshMobileScreenLayout()`
- `scheduleLandscapeLayoutRefresh()`

Constantes usadas:

- `MOBILE_BOARD_PADDING`
- `MOBILE_BOARD_MAX_WIDTH`
- `MOBILE_BOARD_MAX_HEIGHT`
- `MOBILE_CARD_SCALE_COMPACT`
- `MOBILE_CARD_SCALE_SHORT`
- `MOBILE_CARD_SCALE_MEDIUM`
- `MOBILE_CARD_SCALE_ROOMY`

Como funciona:

- mede a `game-area` real ja montada
- identifica a grade atual (`grid-4`, `grid-5`, `grid-6`)
- calcula quantas colunas e linhas estao visiveis
- reserva espaco para o boss panel
- calcula largura maxima confortavel das cartas pelo espaco horizontal e vertical disponivel
- grava variaveis runtime no `#screen-game`

Variaveis runtime aplicadas:

- `--boss-panel-width-runtime`
- `--board-runtime-gap`
- `--board-card-width`
- `--board-card-height`
- `--board-runtime-max-width`
- `--board-runtime-max-height`

Recalculo acontece em:

- troca de screen
- `resize`
- `orientationchange`
- `visualViewport.resize`
- montagem de fase em `carregarFase()`

## Safe area

O tratamento de safe area continua ativo e foi reaproveitado na base nova:

- `env(safe-area-inset-top)`
- `env(safe-area-inset-left)`
- `env(safe-area-inset-right)`
- `env(safe-area-inset-bottom)`

Impacto:

- HUD
- botoes de canto
- menu chips superiores
- modais
- notificacoes
- intro

## Base de efeitos preparada

Flags e niveis usados:

- `MOBILE_EFFECTS_LEVEL`
- `REDUCE_EFFECTS`
- `mobile-effects-light`
- `mobile-effects-medium`
- `mobile-effects-full`

Multiplicadores novos:

- `--fx-glow-multiplier`
- `--fx-blur-multiplier`
- `--fx-overlay-multiplier`

Intencao:

- `compact/short`: efeito mais leve
- `medium/roomy`: efeito moderado
- desktop: comportamento completo

## O que ainda precisa de polimento fino em aparelho real

- calibrar a densidade visual do header do menu em aparelhos com notch agressivo
- revisar a leitura final do grimorio em aparelhos Android com WebView mais baixa
- ajustar fino do board em telas muito baixas se o inventario crescer visualmente
- validar visualmente loja e perfil em aparelhos reais alem do simulador

## Testes recomendados agora

Repetir manualmente em landscape:

- `740x360`
- `914x412`
- `915x412`
- `932x430`

Verificar:

- intro ocupa bem a tela
- menu nao parece desktop reduzido
- gameplay usa o espaco central corretamente
- boss panel nao esmaga o board
- cartas ficam proporcionais
- shop/profile/grimorio nao ficam com espacos mortos
- notificacoes nao invadem leitura do board
