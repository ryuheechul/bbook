.PHONY: test run develop db-init unit-test up-test-db up-test-db-d down-test-db down run-d

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
	yarn && yarn unit-test

test: down-test-db
	yarn && yarn test

up-test-db:
	docker-compose -f compose-test.yml up

up-test-db-d:
	docker-compose -f compose-test.yml up -d

down-test-db:
	docker-compose -f compose-test.yml down
