# SleepBand

Landing page de um produto de conceito: uma banda de cabeça que ajuda a adormecer, acompanha o sono e acorda a pessoa devagar, em vez de a sobressaltar.

**Site:** [pheph.github.io/SleepBand](https://pheph.github.io/SleepBand/)

## O que tem

Página única com sete secções: hero, o problema do sono, produto, como funciona, testemunhos, compra e contacto.

O que a distingue de uma landing page normal está na interação:

* **Banda ilustrada em SVG, manipulável.** O pendente em forma de lua arrasta-se ao longo da curva da banda com eventos de ponteiro, e ao mesmo tempo um disco escuro atravessa a lua grande do fundo, como um eclipse. Os dois movimentos estão ligados por paralaxe.
* **Campo de estrelas gerado em JavaScript**, com tamanho, posição e atraso de animação aleatórios.
* **Respeito por `prefers-reduced-motion`.** Quem tem a redução de movimento ligada no sistema não recebe nenhuma estrela animada. A verificação é feita antes de criar os elementos, não apenas escondendo-os no CSS.
* **Formulário de contacto com validação própria.** O `novalidate` desliga as mensagens do browser e a validação é feita no script, para controlar o texto e o momento do erro.
* Arrasto acessível por teclado, com as setas a moverem o pendente.

## Detalhes técnicos

* HTML, CSS e JavaScript puros. Sem framework, sem dependências, sem passo de build.
* 133 linhas de JavaScript e 276 de CSS.
* Tipografia Fraunces e Manrope, do Google Fonts.
* Publicado no GitHub Pages, com `.nojekyll` para o Jekyll não processar os ficheiros.

## Ver localmente

```bash
python3 -m http.server 8000
```

Depois abrir `http://localhost:8000`.

## Nota

SleepBand é um produto inventado. O objetivo do projeto foi treinar SVG interativo, animação sóbria e acessibilidade numa página construída à mão.
