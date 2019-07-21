# bbook
> bbook - Birthday book built on nodejs

## Prerequisites
- [docker](https://docs.docker.com/install/)

## Warm up database via docker-compose
> do it once is enough unless `.tmp/postgres` is corrupted

`$ make db-warm-up`

## Test

`$ make test`

## Develop

`$ make develop`

## Run in production mode
`$ make serve`

## Deploy via Pulumi
[infra](infra)

## Caveats
- this repo has been developed and tested on macOS but not on linux
- so if you discover an issue on linux please let me know
