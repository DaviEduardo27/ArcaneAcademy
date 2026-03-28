# Capacitor Setup

## Objetivo do Capacitor no projeto

O Capacitor sera usado para empacotar a base de `mobile/webview-build` como app Android nativo, mantendo a logica do jogo em HTML, CSS e JavaScript.

## Pasta usada como webDir

Se o shell Android ficar em `mobile/android-app/app-shell`, o `webDir` deve apontar para:

- `../../webview-build`

Isso permite que o app Android use diretamente a build mobile ja existente.

## Passos sugeridos para inicializar o app Android

1. Entrar em `mobile/android-app/app-shell`
2. Criar o shell Node do app, se ainda nao existir
3. Instalar Capacitor no shell
4. Criar o arquivo final `capacitor.config` a partir do template desta pasta
5. Confirmar que o `webDir` aponta para `../../webview-build`

## Como adicionar a plataforma Android

Passo sugerido:

1. Inicializar o Capacitor no shell
2. Executar a adicao da plataforma Android
3. Confirmar a criacao da pasta `android/`

## Como sincronizar alteracoes

Fluxo esperado:

1. Alterar arquivos em `mobile/webview-build`
2. Rodar a sincronizacao do Capacitor
3. Reabrir ou rebuildar o app Android quando necessario

## Como abrir no Android Studio

Fluxo esperado:

1. Executar a sincronizacao do Capacitor
2. Abrir a pasta Android gerada no Android Studio
3. Selecionar emulador ou aparelho real
4. Rodar a aplicacao em landscape

## Como gerar APK futuramente

Fluxo esperado:

1. Sincronizar a base web final
2. Abrir o projeto Android no Android Studio
3. Gerar build `debug` para testes
4. Gerar build `release` apenas depois do polimento real de UI, audio e performance

## Recomendacoes desta etapa

- manter `mobile/webview-build` como unica fonte do app Android
- nao misturar assets da pasta `Web/`
- validar primeiro em emulador landscape e depois em aparelho real
- deixar ads para uma etapa posterior
