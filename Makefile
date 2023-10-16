all: build push
build:
	docker build -t sterks/chess-fe . --platform=linux/amd64 --no-cache
#--no-cache
.PHONY: build
push:
	docker push sterks/chess-fe
