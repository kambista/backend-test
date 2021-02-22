seed:
	docker-compose -f compose/docker-compose.yaml run application npm run seed:run

down:
	docker-compose -f compose/docker-compose.yaml down

up:
	cd application && npm run tsc
	docker-compose -f compose/docker-compose.yaml up --build