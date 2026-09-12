# Node 22 fornece o ambiente necessário para executar o Vite.
FROM node:22-alpine

# Diretório de trabalho dentro do container.
WORKDIR /app

# Copia primeiro os arquivos de configuração do npm.
# Isso permite aproveitar o cache do Docker quando
# os arquivos do projeto forem alterados.
COPY package*.json ./

# Instala as dependências definidas no package.json.
RUN npm install

# O código-fonte será fornecido posteriormente pelo
# bind mount definido no docker-compose.yml.

# Porta utilizada pelo servidor de desenvolvimento do Vite.
EXPOSE 5173

# Inicia o servidor Vite.
# --host 0.0.0.0 permite que outros dispositivos da rede
# local, como o smartphone, acessem o servidor.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]