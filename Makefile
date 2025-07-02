.PHONY: build up down bash
COMPOSE=docker compose $(COMPOSE_OPTS)


build:
	$(COMPOSE) build

up: build
	$(COMPOSE) up

down:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

bash:
	$(COMPOSE) exec django bash

remove image $(image_id):
	docker rmi -f $(image_id)

remove all images: # it removes all unused images
	docker image prune -a 

open: $(image_id)
	docker exec -it $(image_id) sh