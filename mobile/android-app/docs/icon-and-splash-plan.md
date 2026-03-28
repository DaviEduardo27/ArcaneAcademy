# Icon And Splash Plan

## Objetivo

Planejar os arquivos necessarios para icone e splash do app Android sem gerar arte nesta etapa.

## Icone do app

Arquivos esperados no futuro:

- icone mestre em alta resolucao
- versao foreground
- versao background ou base plana
- versao adaptativa para Android
- opcionalmente versao monocromatica

## Splash

Arquivos esperados no futuro:

- imagem mestre do splash
- cor de fundo oficial
- versao com logo central
- opcionalmente versao dark se o projeto exigir

## Requisitos genericos

- arte limpa, sem texto pequeno
- boa leitura em fundo claro e escuro
- margem de seguranca para cortes
- versao quadrada para icones
- versao mais larga ou centralizada para splash

## Organizacao futura sugerida

Sugestao de estrutura:

- `mobile/android-app/assets/icon/`
- `mobile/android-app/assets/splash/`
- `mobile/android-app/assets/source/`

## Observacoes

- nao gerar arte final agora
- primeiro validar shell Android, landscape, UI e performance
- finalizar icone e splash apenas perto da etapa de build distribuivel
