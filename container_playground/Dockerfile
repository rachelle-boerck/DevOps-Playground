FROM node:latest

WORKDIR /app

ENV SERVER_PORT=5000

COPY package.json .

RUN npm install 

COPY .  /app

EXPOSE 5000              

CMD ["node", "src/server.js"] 