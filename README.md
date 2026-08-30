# Dashboard IoT — Ambiente de Desenvolvimento

## Objetivo

Este projeto é o ambiente de desenvolvimento da interface visual da futura dashboard IoT.

A interface será desenvolvida exclusivamente com:

* HTML puro
* CSS puro
* JavaScript puro
* SVG

**Não serão utilizados React, Vue, Angular ou outros frameworks de interface.**

O desenvolvimento será realizado no VS Code, enquanto o Vite será executado dentro de um container Docker.

O objetivo é permitir o desenvolvimento e a visualização simultânea da dashboard no PC e no smartphone, com atualização automática após salvar os arquivos.

---

## Estrutura

```text
dashboard/
│
├── index.html
│
├── css/
│   └── dashboard.css
│
├── js/
│   ├── dashboard.js
│   ├── svg.js
│   └── mqtt.js
│
├── svg/
│   └── caixa-agua.svg
│
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

A separação entre HTML, CSS, JavaScript e SVG deve ser mantida durante todo o desenvolvimento.

Essa separação pertence ao **código-fonte**. O `ui-template` do Node-RED será tratado posteriormente como destino de implantação.

---

## Ambiente

O Docker fornece o ambiente de execução do Vite:

```text
VS Code
   │
   │ arquivos do projeto
   ▼
Docker
   │
   ├── Node.js
   └── Vite
        │
        ├── PC
        └── Smartphone
```

Os arquivos do projeto são disponibilizados ao container através de um **bind mount**.

Dessa forma, os arquivos continuam no PC e podem ser editados normalmente pelo VS Code, enquanto o Vite os utiliza diretamente dentro do container.

As dependências do Node/Vite são mantidas em um volume Docker separado.

---

## Iniciar o ambiente

Na pasta `dashboard/`:

```bash
docker compose up -d --build
```

Verificar o container:

```bash
docker compose ps
```

O serviço deverá estar disponível na porta `5173`.

---

## Visualizar no PC

Abrir no navegador:

```text
http://localhost:5173
```

---

## Visualizar no smartphone

O smartphone deve estar conectado à mesma rede local do PC.

Descobrir o endereço IP do PC e utilizá-lo junto à porta `5173`.

Exemplo:

```text
192.168.1.100
```

No smartphone:

```text
http://192.168.1.100:5173
```

---

## Desenvolvimento

O desenvolvimento ocorre normalmente pelo VS Code.

Arquivos principais:

```text
index.html
css/dashboard.css
js/dashboard.js
js/svg.js
js/mqtt.js
svg/caixa-agua.svg
```

Ao salvar uma alteração, o Vite detecta a modificação e atualiza a visualização nos navegadores.

Dessa forma, não é necessário copiar o código para o Node-RED nem executar um deploy a cada alteração.

---

## Parar o ambiente

```bash
docker compose down
```

---

## Ver logs

```bash
docker compose logs -f
```

---

## Reconstruir o ambiente

Caso o `Dockerfile` ou o `package.json` seja alterado:

```bash
docker compose up -d --build
```

Alterações nos arquivos HTML, CSS, JavaScript e SVG normalmente **não exigem reconstrução do container**, pois esses arquivos são disponibilizados através do bind mount.

---

# Fase de empacotamento

O `ui-template` será utilizado somente posteriormente, quando a interface estiver suficientemente desenvolvida e testada.

Durante o desenvolvimento:

```text
HTML
CSS
JavaScript
SVG
   │
   ▼
Vite
   │
   ▼
PC + Smartphone
```

Na fase de implantação:

```text
HTML
CSS
JavaScript
SVG
   │
   ▼
processo de empacotamento
   │
   ▼
conteúdo compatível com ui-template
   │
   ▼
Node-RED
```

O objetivo futuro é automatizar esse empacotamento para que os arquivos separados do projeto sejam transformados em um único conteúdo compatível com o `ui-template`, sem necessidade de reorganização ou cópia manual do código.

A estrutura do código-fonte deve, portanto, permanecer separada durante todo o desenvolvimento.

---

# Princípio do projeto

O Node-RED não será utilizado como ambiente principal de desenvolvimento visual.

Ele será utilizado posteriormente como ambiente de integração e execução da dashboard.

A interface será desenvolvida primeiro utilizando:

```text
VS Code + HTML + CSS + JavaScript + SVG + Vite + Docker
```

e posteriormente integrada à infraestrutura:

```text
Node-RED + ui-template + MQTT
```

Essa separação permite desenvolver, testar e refatorar a interface rapidamente antes de conectá-la à infraestrutura IoT.
