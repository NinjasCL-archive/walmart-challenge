# Database
ddu database-docker-up:
	docker run -d --rm -e MONGO_INITDB_ROOT_USERNAME=productListUser -e MONGO_INITDB_ROOT_PASSWORD=productListPassword -p 27017:27017 --name mongodb-local -v "$(shell pwd)/docker/mongodb/database":/database mongo:3.6.8

dp database-provision:
	docker exec mongodb-local bash -c './database/import.sh localhost'

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
	docker-compose build --force-rm --no-cache && docker-compose up --detach

i install:
	make build
	make database-provision

tb test-backend:
	docker exec walmart-tester-local bash -c 'cd /app/backend && npm run test'

tf test-frontend:
	docker exec walmart-tester-local bash -c 'cd /app/frontend && npm run test-no-watch'

t test:
	make test-backend
	make test-frontend

gh github:
	make install
	make test

cb console-backend:
	docker exec walmart-backend-local bash -c 'bash'

cf console-frontend:
	docker exec walmart-frontend-local bash -c 'bash'

ct console-test:
	docker exec walmart-tester-local bash -c 'bash'
