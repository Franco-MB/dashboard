# Dashboard IoT — Ambiente de Desenvolvimento

## Motivação

Este projeto surgiu da necessidade de tornar mais rápido e confortável o desenvolvimento da interface visual da dashboard IoT.

Desenvolver diretamente dentro do nó `ui-template` do Node-RED torna o processo de criação e refatoração pouco prático. Cada alteração no HTML, CSS ou JavaScript exige, repetidamente, realizar o deploy no Node-RED e posteriormente atualizar a página da dashboard para visualizar o resultado.

Durante a construção de interfaces mais elaboradas, esse ciclo se torna especialmente cansativo:

```text
Editar código no ui-template
        │
        ▼
      Deploy
        │
        ▼
Atualizar a página
        │
        ▼
Visualizar resultado
        │
        ▼
Encontrar algo para corrigir
        │
        └──────────────► repetir
```

Além disso, manter HTML, CSS e JavaScript dentro de um único nó dificulta a organização, a leitura, a manutenção e a utilização dos recursos disponíveis no VS Code.

Este projeto foi criado para separar o **desenvolvimento da interface** da sua futura **implantação no Node-RED**.

O desenvolvimento passa a ocorrer em arquivos independentes, utilizando o VS Code e Vite, com atualização automática da interface no navegador após salvar as alterações.

```text
VS Code
   │
   ├── HTML
   ├── CSS
   ├── JavaScript
   └── SVG
        │
        ▼
      Vite
        │
        ├── PC
        └── Smartphone
```

Somente após a interface estar desenvolvida e testada ela será preparada para utilização no `ui-template` do Node-RED.

---

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
├── .gitignore
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

Dessa forma, os arquivos permanecem no PC e podem ser editados normalmente pelo VS Code, enquanto o Vite os utiliza diretamente dentro do container.

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

O serviço estará disponível na porta `5173`.

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

Dessa forma, não é necessário copiar o código para o Node-RED, executar um deploy ou atualizar manualmente a dashboard a cada alteração.

O fluxo de desenvolvimento passa a ser:

```text
Editar
  │
  ▼
Salvar
  │
  ▼
Vite detecta a alteração
  │
  ▼
PC + Smartphone atualizados
```

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

O objetivo futuro é automatizar esse empacotamento para que os arquivos separados do projeto sejam transformados em um único conteúdo compatível com o `ui-template`, sem necessidade de reorganização ou cópia manual do código.

A estrutura do código-fonte deve, portanto, permanecer separada durante todo o desenvolvimento.

---

# Princípio do projeto

O Node-RED não será utilizado como ambiente principal de desenvolvimento visual.

Ele será utilizado posteriormente como ambiente de integração e execução da dashboard.

Essa separação permite desenvolver, testar e refatorar a interface rapidamente antes de conectá-la à infraestrutura IoT.

O objetivo é que as limitações do `ui-template` sejam tratadas somente na etapa de implantação, mantendo o código-fonte organizado e adequado ao desenvolvimento durante todo o processo.

