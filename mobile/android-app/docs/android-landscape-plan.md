# Android Landscape Plan

## Objetivo

Garantir que a futura build Android abra e se mantenha em landscape sem depender apenas do HTML.

## Onde o landscape deve ser travado

O lock principal deve ficar na camada Android nativa.

Pontos esperados:

1. `AndroidManifest.xml`
2. Activity principal aberta pelo Capacitor
3. Ajustes complementares no Android Studio, se a activity usar tema ou comportamento proprio

## Estrategia recomendada

1. Definir `android:screenOrientation="landscape"` na activity principal
2. Validar se o shell Capacitor nao esta sobrescrevendo a orientacao em tempo de execucao
3. Manter a camada web pronta para recalcular layout quando a WebView mudar de tamanho

## O que a camada web ja faz

- usa `viewport-fit=cover`
- trabalha com classes de viewport landscape por altura util
- recalcula HUD, board e modais em `resize`, `orientationchange`, `focus`, `pageshow` e `visibilitychange`
- respeita safe areas com `env(safe-area-inset-*)`
- reposiciona modais abertos quando a viewport util muda

## Relacao entre Android e HTML/CSS/JS

- Android trava a orientacao e entrega uma WebView horizontal estavel
- HTML/CSS/JS ajustam escala, safe area e layout fino dentro dessa area util
- se o lock ficar so no CSS, a activity ainda pode abrir em portrait antes da adaptacao visual

## Safe area e barras do sistema

Cuidados obrigatorios:

- manter `viewport-fit=cover`
- validar gestos de navegacao e barra inferior do Android
- validar notch, hole-punch e cantos arredondados
- confirmar que botao de config, HUD e modais nao encostam nas bordas

## Validacoes no emulador

- app abre direto em horizontal
- retorno do background nao quebra o layout
- intro, menu, gameplay, loja, grimorio e opcoes permanecem proporcionais
- modais continuam centralizados apos resize real da WebView

## Validacoes em aparelho real

- abertura direta em landscape
- retomada do app apos multitarefa
- troca entre app e tela inicial sem distorcer HUD ou board
- teclado virtual nao destrói layout de perfil/opcoes
- aparelhos 20:9 e 19.5:9 mantem area jogavel util

## O que ainda depende do lado nativo

- lock final de orientacao no Manifest/Activity
- comportamento exato de barras do sistema
- politica final de fullscreen, se for adotada depois
