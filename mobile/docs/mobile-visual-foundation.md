# Fundacao visual mobile landscape

## Objetivo

Esta etapa criou uma base visual global para a versao mobile landscape em `mobile/webview-build`, para que intro, menu, gameplay, opcoes, loja e selecao/customizacao compartilhem a mesma escala, o mesmo espacamento e a mesma hierarquia visual.

## Classes de viewport criadas

Classes aplicadas automaticamente em `html`, `body` e `#screen-game`:

- `mobile-landscape-compact`: altura util `<= 430px`
- `mobile-landscape-short`: altura util entre `431px` e `480px`
- `mobile-landscape-medium`: altura util entre `481px` e `560px`
- `mobile-landscape-roomy`: altura util `> 560px`

Classes auxiliares de efeitos:

- `mobile-effects-light`
- `mobile-effects-medium`
- `mobile-effects-full`

O calculo usa `window.visualViewport.height` quando disponivel e recalcula em `load`, `resize`, `orientationchange` e `visualViewport.resize`.

## Tokens principais de UI criados

Tokens globais:

- `--ui-scale`
- `--ui-padding`
- `--ui-gap`
- `--panel-radius`
- `--panel-padding`
- `--panel-border-width`
- `--title-size`
- `--text-size`
- `--small-text-size`
- `--button-height`
- `--button-padding-x`
- `--button-font-size`
- `--icon-size`
- `--avatar-size`
- `--hud-height`
- `--hud-gap`
- `--hud-card-height`
- `--hud-card-min-width`
- `--modal-width`
- `--modal-max-height`
- `--shop-card-width`
- `--shop-card-height`
- `--overlay-scale`
- `--notification-scale`
- `--board-scale`
- `--card-width`
- `--card-height`
- `--settings-button-size`

Tokens auxiliares adicionados para reutilizacao:

- `--menu-card-width`
- `--menu-card-height`
- `--menu-card-gap`
- `--intro-video-width`
- `--intro-button-width`
- `--xp-bar-width`
- `--modal-panel-width`
- `--notification-max-width`
- `--boss-panel-width`

## Componentes globais padronizados

Passaram a obedecer a mesma base mobile:

- paineis: `panel-glass`, `glass-panel-premium`, `shop-panel-premium`, `magic-alert-box`, `newspaper`, `grimoire-container`
- botoes: `btn-main`, `btn-premium`, `magic-alert-btn`, `quiz-opt-btn`, `shop-buy-btn`, `btn-buy`, `menu-theme-toggle`, `magic-arrow-btn`, `page-btn`, `btn-close-modal`, `shop-close`
- intro: `intro-container`, `intro-video`, `start-btn-intro`, `skip-text`
- menu: `menu-card`, `menu-options-container`, `magic-menu-card`, `menu-progress-badge`, `menu-theme-toggle`, `beta-badge`
- profile/customizacao: `profile-content`, `avatar-frame-large`, `level-progress-container`, `stat-card-premium`, `profile-actions`, `cos-tab`, `cos-card`
- loja: `shop-header`, `shop-title`, `shop-panel-premium`, `shop-grid`, `shop-item-card`, `shop-item`, `shop-inline-toast`
- jogo: HUD, boss panel, notificacoes, overlays, inventario e botao de configuracao continuam ligados ao sistema de escala por viewport

## Regras de modal

- modais e paineis usam `--modal-width`, `--modal-max-height`, `--panel-padding` e `--panel-radius`
- overlays de modal respeitam safe area e scroll interno
- paines com largura inline passaram a ser controlados pela base mobile landscape
- alertas e modais menores continuam com `--modal-panel-width` para nao ficarem largos demais

## Regras de botoes

- altura minima centralizada em `--button-height`
- padding horizontal centralizado em `--button-padding-x`
- tipografia centralizada em `--button-font-size`
- botoes circulares usam a mesma referencia de altura
- toque ganhou microfeedback leve via `:active` e transicoes curtas

## Tratamento de safe area

Toda a base continua respeitando:

- `env(safe-area-inset-top)`
- `env(safe-area-inset-left)`
- `env(safe-area-inset-right)`
- `env(safe-area-inset-bottom)`

Esses valores entram em:

- padding estrutural de intro, menu, profile, settings e credits
- offsets de badges e botoes de canto
- espacamento de modais
- largura util de notificacoes e toasts
- botao de configuracao e elementos do topo

## Base de efeitos preparada

Flags e tokens preparados:

- `MOBILE_EFFECTS_LEVEL`
- `MOBILE_PARTICLE_DENSITY`
- `REDUCE_EFFECTS`
- `--glow-strength`
- `--blur-strength`
- `--overlay-opacity`
- `--transition-speed`
- `--particle-density`

Perfis atuais:

- `compact` e `short`: efeitos leves, `mobile-effects-light`
- `medium` e `roomy`: efeitos moderados, `mobile-effects-medium`
- desktop: permanece como `mobile-effects-full`

Isso deixa a base pronta para novas camadas visuais sem soltar efeitos pesados de forma cega em todo aparelho.

## O que ainda sera ajustado por tela

Nas proximas etapas, esta fundacao deve receber polimento fino especifico por tela:

- alinhamento final da intro em aparelhos reais
- densidade final e distribuicao dos cards do menu
- composicao fina do profile/customizacao em Androids menores
- refinamento do grid da loja conforme quantidade de itens
- ajuste fino de modais especiais e telas de livro/grimorio
- calibragem final de HUD e board em aparelhos reais com WebView
