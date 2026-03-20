# Adaptacao de UI Mobile

## O que foi adaptado para toque

- Foi criada uma camada de runtime mobile com deteccao de toque, viewport pequena e modo mobile.
- O menu principal agora aceita fluxo de toque com destaque no primeiro tap e confirmacao no segundo tap para reduzir acionamentos acidentais.
- Cartoes bloqueados no menu agora podem exibir feedback e motivo de bloqueio por toque, sem depender apenas de hover.
- Botoes, quiz, loja, slots, abas cosmeticas, habilidades e itens receberam areas de toque mais confortaveis.

## O que foi adaptado para responsividade

- Foram adicionadas regras de layout para `mobile-mode`, `mobile-portrait` e `small-height`.
- Painel do jogo, HUD, perfil, loja, configuracoes, modais, quiz e grimorio foram ajustados para caber melhor em telas menores.
- Foram reduzidos riscos de cortes laterais e overflow horizontal, com paines e modais podendo rolar verticalmente quando necessario.
- O tabuleiro foi redimensionado para acomodar grades maiores em retrato sem perder a jogabilidade.

## O que foi alterado na HUD

- A HUD foi reorganizada para ocupar largura total em mobile, com badge central e blocos empilhados.
- Avatar, XP, habilidades e indicadores principais ficaram mais compactos e legiveis.
- Chips de fase, tempo e pontuacao passaram a se distribuir em grade compacta em telas pequenas.
- A barra de inventario e o botao de configuracoes foram reposicionados para toque mais confortavel.

## O que foi aliviado em performance

- Foi criado um modo automatico com `MOBILE_PERFORMANCE_MODE` e `REDUCE_EFFECTS`.
- Em mobile, foram reduzidos particulas, densidade do fundo estrelado, quantidade de efeitos de level up, bursts e poeira.
- Foram reduzidos blur, backdrop-filter, sombras pesadas e animacoes cosmeticas quando o modo leve entra.
- Parallax de mouse e instabilidade visual extrema foram suavizados ou limitados no modo mobile.

## Pontos que ainda exigem ajuste manual fino

- Balancear tamanhos finais das cartas em aparelhos muito estreitos.
- Revisar se o boss panel deve ficar sempre acima do tabuleiro ou alternar por orientacao.
- Ajustar textos longos em alguns cards do menu e descricoes da loja.
- Decidir se habilidades da HUD precisam de labels extras ou tooltip por toque prolongado.
- Internalizar dependencias externas para build offline Android.

## Testes recomendados em celular

- Validar menu principal em portrait e landscape.
- Jogar fases com grade 4x4, 5x4 e 6x4 para confirmar conforto do toque.
- Testar quiz, loja, perfil, grimorio e configuracoes em telas pequenas.
- Verificar se nenhum botao importante fica coberto pela HUD ou pelo inventario.
- Comparar desempenho em aparelho forte e aparelho intermediario.
- Testar abertura em WebView Android e funcionamento com internet limitada ou ausente.
