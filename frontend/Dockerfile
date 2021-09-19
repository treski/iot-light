FROM node:15-slim

WORKDIR /usr/src/app

COPY ./package.json ./

run npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]