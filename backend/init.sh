#!/bin/bash

ENVDEV="HOST=0.0.0.0
PORT=3333
NODE_ENV=development
APP_NAME=Walmart Challenge
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=cusYyCYCPpUf2HdOgqSlkyjqJcHeQ2eK
DB_CONNECTION=mongodb
DB_HOST=database #127.0.0.1
DB_PORT=27017
DB_USER=productListUser
DB_PASSWORD=productListPassword
DB_AUTH_SOURCE=admin
DB_DATABASE=promotions
DB_DEBUG=true
HASH_DRIVER=bcrypt
"

echo "$ENVDEV" > .env

ENVTEST="HOST=0.0.0.0
PORT=4000
NODE_ENV=development
APP_NAME=Walmart Challenge
APP_URL=http://${HOST}:${PORT}
CACHE_VIEWS=false
APP_KEY=cusYyCYCPpUf2HdOgqSlkyjqJcHeQ2eK
DB_CONNECTION=mongodb
DB_HOST=database #127.0.0.1
DB_PORT=27017
DB_USER=productListUser
DB_PASSWORD=productListPassword
DB_AUTH_SOURCE=admin
DB_DATABASE=promotions
DB_DEBUG=true
HASH_DRIVER=bcrypt
"

echo "$ENVTEST" > .env.testing

