.DEFAULT_GOAL := help

COMPOSE_BASE  := -f docker-compose.yml
COMPOSE_DEV   := docker compose $(COMPOSE_BASE) -f docker-compose.dev.yml
COMPOSE_PROD  := docker compose $(COMPOSE_BASE) -f docker-compose.prod.yml

env ?= dev

ifeq ($(env),prod)
  COMPOSE := $(COMPOSE_PROD)
else
  COMPOSE := $(COMPOSE_DEV)
endif

.PHONY: help up down build logs ps prune

help: ## Show this help
	@echo "Available targets:"
	@echo "  build-up  Build and start containers (default: dev, use env=prod for prod)"
	@echo "  up        Start containers (default: dev, use env=prod for prod)"
	@echo "  down      Stop and remove containers + volumes"
	@echo "  build     Build images only"
	@echo "  logs      Tail logs (add s=<service> to filter)"
	@echo "  ps        List containers"
	@echo "  prune     Prune Docker builder cache"
	@echo ""
	@echo "Usage: make <target> [env=prod]"

build-up: ## Build and start containers. Usage: `make build-up` (dev) or `make build-up env=prod`
	$(COMPOSE) up --build -d

up: ## Start containers. Usage: `make up` (dev) or `make up env=prod`
	$(COMPOSE) up -d

down: ## Stop and remove containers. Usage: `make down` (dev) or `make down env=prod`
	$(COMPOSE) down

down-volumes: ## Stop and remove containers + volumes. Usage: `make down` (dev) or `make down env=prod`
	$(COMPOSE) down -v

build: ## Build images only. Usage: `make build` (dev) or `make build env=prod`
	$(COMPOSE) build

logs: ## Tail logs. Usage: `make logs` (dev), `make logs env=prod`, or `make logs s=<service>`
	$(COMPOSE) logs -f $(s)

ps: ## List containers. Usage: `make ps` (dev) or `make ps env=prod`
	$(COMPOSE) ps

prune: ## Prune Docker builder cache (docker builder prune -af)
	docker builder prune -af
