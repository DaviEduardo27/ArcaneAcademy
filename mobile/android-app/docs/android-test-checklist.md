# Android Test Checklist

## Abertura e shell

- [ ] O app abre sem tela branca
- [ ] O app inicia em landscape
- [ ] O app respeita notch e safe area
- [ ] O app volta do background sem travar

## Intro e menu

- [ ] Intro abre corretamente
- [ ] Video da intro carrega
- [ ] Botao `Iniciar Jornada` responde ao toque
- [ ] Botao `Pular Intro` responde ao toque
- [ ] Menu principal ocupa bem a largura
- [ ] Cards do menu nao parecem desktop reduzido

## Gameplay

- [ ] HUD cabe bem em landscape
- [ ] Boss panel nao esmaga o board
- [ ] Cartas aparecem no tamanho esperado
- [ ] Cartas respondem ao toque
- [ ] Configuracoes continuam acessiveis
- [ ] Overlays e eventos nao cobrem leitura demais

## Telas internas

- [ ] Loja abre e fecha corretamente
- [ ] Opcoes abrem e fecham corretamente
- [ ] Grimorio abre e navega corretamente
- [ ] Perfil abre e salva corretamente
- [ ] Molduras e customizacao continuam funcionais
- [ ] Modais nao ficam cortados

## Midia e assets

- [ ] Imagens locais carregam
- [ ] Sons locais carregam
- [ ] Musica de menu toca apos interacao
- [ ] Musica de gameplay toca apos interacao
- [ ] Video local da intro toca sem erro

## Toque e interacao

- [ ] Toques unicos nao disparam duas vezes
- [ ] Scroll interno em modais funciona
- [ ] Botoes pequenos continuam tocaveis
- [ ] Nao existem overlays bloqueando clique

## Layout e textos

- [ ] Nao ha textos cortados
- [ ] Nao ha chips espremidos
- [ ] Notificacoes nao invadem a tela inteira
- [ ] Painel da loja nao fica achatado
- [ ] Grimorio nao perde area util

## Performance

- [ ] Animacoes continuam fluidas
- [ ] O app nao congela em transicoes
- [ ] Eventos visuais nao causam queda forte de FPS
- [ ] O board continua responsivo em partidas longas

## Persistencia

- [ ] Save local funciona
- [ ] Configuracoes persistem
- [ ] Perfil persiste apos reiniciar o app
