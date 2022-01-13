# Ejemplo de Dockerfile para una aplicación simple en NodeJS
FROM node:16

# app directory
WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE $PORT

CMD ["npm", "start"]