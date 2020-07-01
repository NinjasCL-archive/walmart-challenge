FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./init.sh ./init.sh
RUN chmod +x ./init.sh
RUN ./init.sh

COPY . .

RUN pwd && ls -a

EXPOSE 3333

CMD ["npm", "start"]


