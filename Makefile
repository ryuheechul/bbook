.PHONY: test run develop db-init unit-test up-test-db up-test-db-d down-test-db

db-init:
	docker-compose -f compose-init.yml run postgres-init; sleep 2; docker-compose -f compose-init.yml down

develop:
	yarn && yarn start

run:
	docker-compose up

unit-test:
	yarn && yarn unit-test

test:
	yarn && yarn test

up-test-db:
	docker-compose -f compose-test.yml up

up-test-db-d:
	docker-compose -f compose-test.yml up -d

down-test-db:
	docker-compose -f compose-test.yml down
