FROM node:12.18

# Volume
VOLUME ["/usr/src/app/"]
WORKDIR /usr/src/app/

COPY package*.json ./
COPY /init.sh /init.sh
RUN chmod +x /init.sh

CMD ["/init.sh"]


