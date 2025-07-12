.PHONY: build up down bash
COMPOSE=docker compose -f docker-compose.dev.yaml $(COMPOSE_OPTS)
COMPOSE_PROD=docker compose -f docker-compose.prod.yaml $(COMPOSE_OPTS)

build:
	$(COMPOSE) build br_backend_dev
	$(COMPOSE) build br_frontend_dev

build-prod:
	$(COMPOSE_PROD) build br_backend
	$(COMPOSE_PROD) build br_frontend

up:
	$(COMPOSE) up 

down:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

bash:
	$(COMPOSE) exec br_backend_dev bash

remove-image:
	docker rmi -f $(image_id)

remove-all-images: # it removes all unused images
	docker image prune -a 

open:
	docker exec -it $(image_id) sh