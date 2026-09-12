# Dashboard IoT — Monitoramento de Abastecimento de Água

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)
![Versão](https://img.shields.io/badge/version-1.0.0-green)
![Licença](https://img.shields.io/badge/license-MIT-yellow)

Ambiente de desenvolvimento independente para minha interface visual de uma dashboard IoT destinada ao monitoramento de um sistema de abastecimento de água.

A interface é desenvolvida separadamente do Node-RED utilizando **HTML, CSS, JavaScript, SVG e Vite**, permitindo testar rapidamente o projeto no PC e no smartphone antes da implantação no `ui-template`.

> **Princípio do projeto:** desenvolver primeiro, integrar depois.

## Tecnologias

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- [JavaScript](https://www.w3schools.com/js/default.asp)
- [SVG](https://www.w3schools.com/graphics/svg_intro.asp)
- [Vite](https://vite.dev/)
- [Docker](https://www.docker.com/)
- [Node-RED](https://nodered.org/)
- [MQTT](https://mqtt.org/)
- [Inkscape](https://github.com/inkscape)

## Status

Atualmente a interface possui:

- representação gráfica do sistema hidráulico em SVG;
- simulação dos sensores S1–S5;
- simulação dos níveis da cisterna e da caixa d'água;
- representação do estado da bomba;
- execução independente do Node-RED;
- estrutura preparada para futura integração MQTT.

## Arquitetura

```text
                    DESENVOLVIMENTO
                          │
                    VS Code + Vite
                          │
             ┌────────────┼────────────┐
             │            │            │
            HTML         CSS      JavaScript
             │            │            │
             └────────────┼────────────┘
                          │
                          │
                       Docker
                          │
                   ┌──────┴──────┐
                   ▼             ▼
                  PC         Smartphone
                          │
                          ▼
                    TESTE DA UI
                          │
                          ▼
                     Node-RED
                          │
                     ui-template
                          │
                          ▼
                     Dashboard
```

O Node-RED é tratado como **destino de implantação e integração**, não como ambiente principal de desenvolvimento visual.



A separação entre HTML, CSS e JavaScript deve ser mantida durante o desenvolvimento.

## Ambiente de desenvolvimento

O Vite é executado dentro de um container Docker. Os arquivos do projeto permanecem no computador e são disponibilizados ao container por bind mount.

```text
VS Code → Docker → Node.js/Vite → Navegador
```

As alterações nos arquivos HTML, CSS e JavaScript são detectadas pelo Vite sem necessidade de reconstruir o container.

## Como executar

Na pasta do projeto:

```bash
docker compose up -d --build
```

Verificar o container:

```bash
docker compose ps
```

A interface ficará disponível na porta `5173`.

### PC

```text
http://localhost:5173
```

### Smartphone

O smartphone deve estar na mesma rede local do computador.

Descubra o IP do computador e acesse:

```text
http://IP_DO_COMPUTADOR:5173
```

Exemplo:

```text
http://192.168.1.100:5173
```

## Comandos úteis

Parar o ambiente:

```bash
docker compose down
```

Ver logs:

```bash
docker compose logs -f
```

Reconstruir o ambiente após alterações no `Dockerfile` ou `package.json`:

```bash
docker compose up -d --build
```

Alterações normais no código-fonte não exigem rebuild.

## Simulação atual

A interface possui uma simulação automática dos sensores e da bomba para permitir o desenvolvimento da representação gráfica antes da integração com dados reais.

### Sensores

| Sensor | Representação |
|---|---|
| S1 | Nível da cisterna |
| S2 | Nível da cisterna |
| S3 | Nível baixo da caixa |
| S4 | Nível médio da caixa |
| S5 | Nível alto da caixa |

Os sensores são representados visualmente no SVG e alternam entre os estados ativo e inativo durante a simulação.

### Nível da caixa d'água

Os sensores S3, S4 e S5 determinam o nível representado no SVG:

```text
S3 OFF  S4 OFF  S5 OFF  → vazio
S3 ON   S4 OFF  S5 OFF  → baixo
S3 ON   S4 ON   S5 OFF  → médio
S3 ON   S4 ON   S5 ON   → cheio
```

### Nível da cisterna

Os sensores S1 e S2 determinam o nível da cisterna:

```text
S1 OFF  S2 OFF  → vazia
S1 ON   S2 OFF  → intermediária
S1 ON   S2 ON   → cheia
```

### Bomba

A bomba é acionada quando S1 e S2 estão ativos e desligada quando ambos estão inativos.

A hélice é representada por uma animação CSS controlada pelo JavaScript.

## Integração com Node-RED

Após a conclusão da interface, o conteúdo desenvolvido no ambiente Vite será adaptado para o `ui-template` do Node-RED Dashboard 2.0.

A correspondência será:

```text
Projeto
├── index.html      → <template>
├── dashboard.css   → <style>
└── dashboard.js    → <script>
```

A adaptação conterá alterações no JavaScript para receber mensagens do Node-RED em vez de utilizar a simulação local.

A integração MQTT também será incorporada posteriormente.

## Layout e SVG

O layout gráfico do sistema foi desenvolvido no **Inkscape**, utilizando SVG como formato principal da interface.

Inkscape é utilizado para criar e editar o desenho hidráulico, permitindo trabalhar diretamente com os elementos gráficos que posteriormente são manipulados pelo CSS e JavaScript.

O projeto utiliza um SVG de grandes dimensões. Durante os testes no Node-RED, foi adotado o layout `Fixed` para o grupo que contém o desenho, por apresentar comportamento mais previsível para esse tipo de conteúdo.

O tamanho visual do SVG é tratado separadamente do layout do Dashboard.

Para evitar barras de rolagem no `ui-template`, foi utilizada:

```css
.nrdb-ui-widget.nrdb-ui-template {
    overflow: hidden !important;
}
```

Essa regra controla o excesso de conteúdo do widget, mas **não redimensiona o SVG**.


## Desenvolvimento × implantação

O fluxo adotado é:

```text
Editar
  ↓
Salvar
  ↓
Vite atualiza
  ↓
Testar no PC e smartphone
  ↓
Validar interface
  ↓
Adaptar para Node-RED
  ↓
Integrar MQTT e dados da aplicação IoT
```

Essa abordagem reduz o ciclo de desenvolvimento e mantém o código-fonte organizado durante a construção da interface.

## Próximos passos

- concluir a integração MQTT;
- substituir a simulação por dados reais;
- adaptar o JavaScript para o `ui-template`;
- integrar a interface ao Node-RED Dashboard 2.0;
- validar o comportamento em diferentes dispositivos.
