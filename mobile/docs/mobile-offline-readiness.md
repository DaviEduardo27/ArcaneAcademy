# Prontidao Offline da Base Mobile

## Dependencias externas encontradas

- Google Fonts via CDN em `mobile/webview-build/index.html` para as familias `Cinzel`, `MedievalSharp` e `Pirata One`.
- GSAP via CDN em `mobile/webview-build/index.html`.
- Textura de papel via `transparenttextures.com` em `mobile/webview-build/index.html`.

## Risco atual para funcionamento offline

- Sem internet, as fontes externas podem cair para fallback visual e alterar a identidade da interface.
- Sem internet, o GSAP via CDN pode impedir ou degradar animacoes importantes da interface.
- Sem internet, a textura externa do quiz e do grimorio pode nao carregar.
- Em um empacotamento Android/WebView totalmente offline, essas dependencias precisam ser internalizadas para evitar comportamento parcial.

## Sugestao futura para internalizar assets e scripts

- Baixar e versionar localmente as fontes usadas no projeto, trocando o `link` do Google Fonts por `@font-face` local.
- Adicionar uma copia local do GSAP dentro da estrutura mobile e atualizar o `script src`.
- Substituir a textura externa de papel por um arquivo local em `mobile/assets/images/`.
- Revisar se outras referencias remotas surgirem nas proximas etapas de adaptacao.

## Prioridade de migracao

1. GSAP local.
2. Fontes locais.
3. Textura de papel local.
4. Revisao final do build mobile em modo aviao e em WebView Android.
