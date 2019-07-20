.PHONY: test develop db-init unit-test down-test-db down \
	build-base build-dev build-test build-prod db-warm-up \
	db-clean-up serve

db-warm-up:
	docker-compose run -d postgres && sleep 15 && make down && make db-init

db-clean-up:
	rm -rf .tmp/postgres

db-init:
	docker-compose -f compose-init.yml run postgres-init; sleep 2; docker-compose -f compose-init.yml down

down:
	docker-compose down

develop: down
	docker-compose up

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

serve: build-prod # run in production mode
	docker run -p 80:3000 --rm -it local-dockerfile-bbook:node-prod
