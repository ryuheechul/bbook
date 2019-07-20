.PHONY: test run develop db-init unit-test down-test-db down run-d \
	build-base build-dev build-test build-prod

db-init:
	docker-compose -f compose-init.yml run postgres-init; sleep 2; docker-compose -f compose-init.yml down

develop: down run-d
	sleep 5 && yarn && yarn start

down:
	docker-compose down

run:
	docker-compose up

run-d:
	docker-compose up -d

unit-test:
	docker-compose -f compose-test.yml run bbook-node-test sh -c "yarn && yarn unit-test"

test: down-test-db build-base
	docker-compose -f compose-test.yml run bbook-node-test && make down-test-db

down-test-db:
	docker-compose -f compose-test.yml down

build-base:
	docker build . -t local-dockerfile-bbook:node-base

build-test: build-base
	docker build . -f test.Dockerfile -t local-dockerfile-bbook:node-test

build-dev: build-base
	docker build . -f dev.Dockerfile -t local-dockerfile-bbook:node-dev

build-prod: build-base
	docker build . -f prod.Dockerfile -t local-dockerfile-bbook:node-prod
