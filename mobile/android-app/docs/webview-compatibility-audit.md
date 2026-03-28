# WebView Compatibility Audit

## Escopo auditado

Arquivo principal auditado:

- `mobile/webview-build/index.html`

Pastas locais relevantes:

- `mobile/webview-build/Imagens`
- `mobile/webview-build/Sons`
- `mobile/webview-build/Videos`
- `mobile/webview-build/vendor`

## Itens encontrados

### Dependencias externas

- Google Fonts via `fonts.googleapis.com`
- GSAP via CDN `cdnjs`

### Vendor e fallbacks locais

- existe agora `vendor/gsap/gsap-compat.js`
- o shim local entra antes do CDN e evita quebra de runtime quando a rede falha
- `vendor/fonts/fonts.css` prepara lookup local-first das familias principais e organiza stacks de fallback

### Assets locais

- imagens em `mobile/webview-build/Imagens`
- sons em `mobile/webview-build/Sons`
- video em `mobile/webview-build/Videos`
- icone local `icone.ico`

### Audio e video

- `video` local com `muted`, `playsinline`, `webkit-playsinline`, `preload`, `loop` e `autoplay`
- varios efeitos sonoros locais carregados com `new Audio(...)`
- musicas locais carregadas por elementos `audio`
- ha agora rotina central de unlock de audio no primeiro gesto
- ha pausa e retomada segura de audio ao voltar do background
- a intro agora cai para fallback seguro se o `mp4` falhar

### Runtime mobile

- layout reage a `resize`
- layout reage a `orientationchange`
- layout reage a `visibilitychange`
- layout reage a `focus` e `pageshow`
- modais abertos recebem limite runtime de altura para nao sairem da viewport

### Persistencia

- uso de `localStorage` para perfil, save e configuracoes

### Toque

- base mobile trata `click`, `pointer` e `touch`
- o unlock de audio escuta `pointerdown`, `touchstart` e `click`

### Viewport e execucao

- meta viewport agora usa `width=device-width`
- meta viewport agora usa `height=device-height`
- meta viewport usa `viewport-fit=cover`
- meta viewport usa `interactive-widget=resizes-content`

### Fullscreen e orientacao

- nao foi encontrado uso direto de `requestFullscreen`
- nao foi encontrado uso direto de `screen.orientation`
- orientacao landscape continua sendo responsabilidade principal da camada Android

### Codigo legado de desktop

- existe `require('electron')` protegido por `try/catch`
- em Android/WebView isso continua virando no-op

## Riscos por prioridade

### Alta

- Google Fonts ainda dependem de rede para manter a tipografia exata
- o shim local do GSAP protege o runtime, mas nao substitui todos os recursos do GSAP real

### Media

- codecs de `mp4` e `mp3` ainda precisam de validacao real em emulador e aparelho
- politicas de audio podem variar entre fabricantes e versoes da WebView
- comportamento do teclado virtual ainda precisa de validacao nas telas com input

### Baixa

- `require('electron')` ainda pode ser limpo no futuro
- metadados `og:` nao impactam a execucao Android
- favicon nao e item critico para o app empacotado

## Recomendacoes futuras

1. Empacotar arquivos reais de fonte em `vendor/fonts` se a identidade tipografica offline for obrigatoria
2. Validar `Videos/intro.mp4` e os `mp3` em emulador e aparelho real
3. Confirmar lock de landscape no Manifest/Activity Android
4. Revisar desempenho do shim local do GSAP em aparelhos intermediarios
5. Medir comportamento de `localStorage` apos reinstalacao e limpeza de dados
