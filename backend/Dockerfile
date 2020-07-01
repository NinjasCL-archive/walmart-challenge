FROM node:12.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./init.sh

RUN ./init.sh

EXPOSE 3333

CMD ["npm", "start"]


