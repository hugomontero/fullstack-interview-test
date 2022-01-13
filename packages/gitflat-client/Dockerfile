# Ejemplo de Dockerfile para una aplicación simple en NodeJS
FROM node:16

# app directory
WORKDIR /usr/src/app/web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve



ENV PORT=3000

EXPOSE $PORT

CMD ["serve", "-s" , "build"]