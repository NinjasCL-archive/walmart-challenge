FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .
RUN sh ./init.sh

RUN pwd && ls -a

EXPOSE 3333

CMD ["npm", "start"]


