# Database
ddu database-docker-up:
	docker run -d --rm -e MONGO_INITDB_ROOT_USERNAME=productListUser -e MONGO_INITDB_ROOT_PASSWORD=productListPassword -p 27017:27017 --name mongodb-local -v "$(shell pwd)/docker/mongodb/database":/database mongo:3.6.8

dp database-provision:
	docker exec mongodb-local sh -c './database/import.sh localhost'

du database-up:
	make database-docker-up
	make database-provision

dr database-reset:
	make database-down
	make database-up

dd database-down:
	docker rm -f mongodb-local

# Backend and Frontend
u up:
	./check-container-names.sh
	docker-compose up -d --build

b build:
	# https://github.com/docker/compose/issues/1049#issuecomment-561988120
	# Ensure that we are building an image from scratch.
	./check-container-names.sh
	docker-compose build --force-rm --no-cache
	docker-compose up --detach

i install:
	make build
	make database-provision
	docker ps | grep walmart

bt test-install:
	docker-compose -f ./docker-compose-testing.yml build --force-rm --no-cache
	docker-compose -f ./docker-compose-testing.yml up -d
	make database-provision
	docker ps

tb test-backend:
	docker exec walmart-tester-local sh -c 'cd /app/backend && npm install && sh ./init.sh && pwd && ls -a && npm run test'

tf test-frontend:
	docker exec walmart-tester-local sh -c 'cd /app/frontend && npm install && pwd && ls -a  && npm run test-no-watch'

t test:
	make test-frontend
	make test-backend

gh github:
	make test-install
	make test

cb console-backend:
	docker exec walmart-backend-local sh -c '/bin/sh'

cf console-frontend:
	docker exec walmart-frontend-local sh -c '/bin/sh'

ct console-test:
	docker exec walmart-tester-local sh -c '/bin/sh'
