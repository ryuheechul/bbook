db-init:
	docker-compose -f compose-init.yml run postgres-init; sleep 2; docker-compose -f compose-init.yml down

develop:
	npm start

run:
	docker-compose up
