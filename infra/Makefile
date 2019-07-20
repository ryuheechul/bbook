.PHONY: preview build up

build:
	cd ../ && make build-base

preview: build
	pulumi preview

up: build
	pulumi up

