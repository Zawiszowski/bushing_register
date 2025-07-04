.PHONY: build up down bash
COMPOSE=docker compose $(COMPOSE_OPTS)


build:
	$(COMPOSE) build br_backend
	$(COMPOSE) build br_frontend

up:
	$(COMPOSE) up br_backend br_frontend

down:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

bash:
	$(COMPOSE) exec br_backend bash

remove-image:
	docker rmi -f $(image_id)

remove-all-images: # it removes all unused images
	docker image prune -a 

open:
	docker exec -it $(image_id) sh