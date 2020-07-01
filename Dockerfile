# Test runner image
FROM node:lts-alpine3.10

# Install Backend
WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend ./

COPY ./init.sh ./init.sh
RUN chmod +x ./init.sh
RUN ./init.sh
RUN pwd && ls -a && ls node_modules/


# Install Frontend
WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

RUN pwd && ls -a

# We need to sleep this beast in order
# to execute testing commands
CMD ["sleep", "3600"]
