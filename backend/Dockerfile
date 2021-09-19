FROM node:15-slim

WORKDIR /usr/src/app

COPY ./package.json ./

run npm install

COPY . .

EXPOSE 8080

EXPOSE 1883

CMD ["node", "app.js"]