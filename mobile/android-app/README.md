# Android App Base

## Objetivo

Esta pasta prepara a futura versao Android do projeto sem alterar a versao Web.

A base visual e de gameplay usada pelo app sera:

- `mobile/webview-build/`

Esta pasta existe para organizar:

- shell futuro do app com Capacitor
- documentacao tecnica para Android
- checklist de teste real
- planejamento de icone, splash e landscape

## Relacao com mobile/webview-build

- `mobile/webview-build` continua sendo a fonte web do app
- o Android deve consumir essa pasta como `webDir`
- a pasta `Web/` nao participa da build Android

## Estrutura atual

- `app-shell/`
- `docs/`

## Fluxo futuro

1. Configurar o projeto Capacitor em `mobile/android-app/app-shell`
2. Apontar o `webDir` para `../../webview-build`
3. Adicionar a plataforma Android
4. Sincronizar os arquivos web
5. Abrir o projeto no Android Studio
6. Rodar em emulador landscape
7. Testar em aparelho real
8. Polir UI final e compatibilidade
9. So depois integrar ads

## Estado desta etapa

- estrutura Android criada
- documentacao principal criada
- base `mobile/webview-build` revisada para uso em WebView
- fallback tecnico para GSAP adicionado no `index.html`
- dependencias externas remanescentes documentadas para correcao futura
