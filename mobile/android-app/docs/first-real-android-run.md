# First Real Android Run

## Sequencia exata para o primeiro teste real

1. Usar `mobile/webview-build` como `webDir`
2. Sincronizar o projeto Android pelo fluxo definido em `capacitor-setup.md`
3. Abrir o projeto no Android Studio
4. Confirmar o lock de landscape na activity principal
5. Rodar primeiro em emulador landscape
6. Repetir em aparelho real Android

## O que validar no primeiro boot

- app abre sem tela branca prolongada
- intro aparece sem travar
- botao `Iniciar Jornada` responde
- menu principal carrega imagens, textos e botoes
- nao ha erro fatal logo na inicializacao

## O que validar no audio

- primeiro toque desbloqueia audio
- clique inicial nao quebra o fluxo da intro
- musica do menu entra depois da primeira interacao
- musica de gameplay toca ao iniciar fase
- efeitos sonoros funcionam em cartas, loja e navegacao
- retorno do background retoma audio sem travar

## O que validar em landscape

- app abre em horizontal
- HUD fica dentro da area util
- board continua centralizado
- modais nao saem da tela apos rotacao ou retorno do app
- safe areas continuam respeitadas

## O que validar por area

- Intro: video, botao principal, pular intro
- Menu: cards, moedas, botoes, scroll e feedback visual
- Gameplay: HUD, boss panel, board, config, overlays e notificacoes
- Loja: abertura, scroll interno, compra, fechamento
- Opcoes: sliders de audio, voltar, foco visual
- Grimorio: navegacao, pagina, scroll interno, fechamento
- Perfil e molduras: campos, botoes, tabs, cards cosmeticos

## Sintomas comuns de falha em WebView

- tela preta no lugar do video de intro
- musica nao toca apos primeiro toque
- clique funciona, mas SFX nao tocam
- modal abre cortado apos voltar do background
- HUD fica grande ou desalinhada apos resize real
- fonte cai para fallback por falta de rede
- WebView perde layout apos abrir teclado ou trocar de app

## Como saber se a build esta pronta para polimento final

- fluxo completo roda sem crash
- audio entra e volta de forma previsivel
- landscape permanece estavel
- menu, gameplay e modais ficam proporcionais em aparelho real
- assets locais carregam sem dependencia da pasta `Web/`
- os problemas restantes sao visuais finos, nao estruturais
