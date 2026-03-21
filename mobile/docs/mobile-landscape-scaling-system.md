# Sistema de escala mobile landscape

## Objetivo

Esta rodada centralizou a escala da interface mobile landscape em perfis baseados na altura util da viewport, para evitar que HUD, tabuleiro, notificacoes e eventos continuem herdando proporcoes de desktop.

## Classes de viewport criadas

As classes sao aplicadas automaticamente em `html`, `body` e `#screen-game` pela funcao `refreshMobileRuntimeState()`:

- `mobile-landscape-compact`: altura util `<= 430px`
- `mobile-landscape-short`: altura util entre `431px` e `480px`
- `mobile-landscape-medium`: altura util entre `481px` e `560px`
- `mobile-landscape-roomy`: altura util `> 560px`

O calculo usa `window.visualViewport.height` quando disponivel, com fallback para `window.innerHeight`.

## Tokens de escala criados

Tokens centrais:

- `--hud-scale`
- `--notification-scale`
- `--overlay-scale`
- `--boss-panel-scale`
- `--board-scale`
- `--hud-padding`
- `--hud-gap`
- `--avatar-size`
- `--status-icon-size`
- `--xp-bar-height`
- `--xp-bar-width`
- `--stat-card-height`
- `--stat-card-min-width`
- `--notification-max-width`
- `--boss-panel-width`
- `--card-width`
- `--card-height`
- `--board-gap`
- `--settings-button-size`

Tokens derivados mais usados:

- `--screen-pad-top/right/bottom/left`
- `--hud-title-size`
- `--hud-sub-size`
- `--coin-font-size`
- `--badge-min-width`
- `--stats-panel-width`
- `--card-width-5`
- `--card-width-6`
- `--boss-img-size`
- `--boss-aura-size`
- `--notification-bottom`
- `--toast-top`
- `--achievement-min-width`
- `--modal-panel-width`

## O que foi ajustado na HUD

- Painel do jogador agora usa tokens para avatar, fontes, gap, padding e largura da barra de XP.
- Cards de `Fase`, `Tempo` e `PTS` passaram a seguir `--stat-card-height`, `--stat-card-min-width`, `--stat-value-size` e `--stat-label-size`.
- Badge `Historia`, moedas, slots de habilidade e botao de configuracao tambem passaram a responder ao perfil de altura.
- O topo principal passou a respeitar safe areas e espacamentos menores por faixa de viewport.

## O que foi ajustado no board e nas cartas

- O tabuleiro agora usa `--board-gap`, `--board-column-gap` e `--board-side-width`.
- As cartas do grid `4`, `5` e `6` passaram a usar `--card-width`, `--card-height`, `--card-width-5`, `--card-height-5`, `--card-width-6` e `--card-height-6`.
- Face, arte interna e hover das cartas foram compactados para acompanhar a nova escala.
- O inventario inferior tambem passou a seguir tokens de tamanho e gap.

## O que foi ajustado em notificacoes e eventos

- `notification-bar`, `toast-stack`, `achievement-popup` e `magic-alert-box` agora usam larguras, paddings e tipografia por perfil.
- `boss-panel` e `boss-speech-bubble` passaram a usar largura, imagem, aura, barra de HP e texto baseados em tokens.
- `combo-text`, `float-score`, `spell-projectile`, `magic-spark`, `black-hole`, `time-fade-overlay`, `cinematic-overlay`, `vignette` e `fog` foram suavizados para landscape.

## Safe areas

As bordas continuam respeitando:

- `env(safe-area-inset-top)`
- `env(safe-area-inset-left)`
- `env(safe-area-inset-right)`
- `env(safe-area-inset-bottom)`

Esses valores entram principalmente em:

- padding estrutural de `#screen-game`
- offset do botao de configuracao
- largura util de notificacoes e conquistas
- offsets verticais de toast e barra de notificacao

## Regras importantes de teste

Repetir principalmente:

- `~915x412`: deve cair em `mobile-landscape-compact`
- `~932x430`: deve cair em `mobile-landscape-compact`
- `431px a 480px` de altura: deve cair em `mobile-landscape-short`

## Pontos que ainda podem exigir ajuste fino em aparelho real

- equilibrio fino entre `boss-panel` e tabuleiro em celulares Android com barras do sistema variaveis
- posicionamento de toasts em WebViews com chrome dinamico
- intensidade visual de overlays em aparelhos com brilho alto e notch mais agressivo
- pequenos ajustes de tipografia caso a fonte renderize diferente entre Safari iOS e Android WebView
