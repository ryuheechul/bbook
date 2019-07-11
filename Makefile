.PHONY: test run develop db-init

db-init:
	docker-compose -f compose-init.yml run postgres-init; sleep 2; docker-compose -f compose-init.yml down

develop:
	yarn && yarn start

run:
	docker-compose up

test:
	yarn && yarn test
