FROM node:lts-alpine3.10

WORKDIR /app

COPY ./package*.json ./

RUN sh ./init.sh

COPY . .

RUN pwd && ls -a

EXPOSE 3333

CMD ["npm", "start"]


