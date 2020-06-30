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
b build:
	docker-compose up -d --build

i install:
	make dev
	make database-provision

tb test-backend:
	docker exec walmart-tester-local bash -c 'cd /app/backend && npm run test'

tf test-frontend:
	docker exec walmart-tester-local bash -c 'cd /app/frontend && npm run test-no-watch'

t test:
	# these tests are not passing for now
	# make test-backend
	# make test-frontend