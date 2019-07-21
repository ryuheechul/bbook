# IaC for bbook
> base on https://github.com/pulumi/actions-example-gke-rails

## Summary
- Resilient infrastructure via replicas (3 kubernetes nodes + 2 db replicas)
- Achieve IaC and CD both via Pulumi code

## Prerequisites
- [docker](https://docs.docker.com/install/)
- [pulumi](https://www.pulumi.com/docs/reference/install/)
- make sure you are in `bbook/infra`

### you may want to run this on GCP Cloud shell
> it has preinstalled nodejs and docker
> you probably wouldn't need to install and setup `gcloud`
> after you install pulumi do `$ export PATH=${PATH}:~/.pulumi/bin`

## Prepare
- `$ yarn # or npm i`

## Set config values
```bash
$ pulumi config set bbook-infra:clusterPassword [value] [--secret] # must be longer than 16 chars
$ pulumi config set bbook-infra:dbUsername postgres
$ pulumi config set bbook-infra:dbPassword bbookPw [--secret]
$ pulumi config set bbook-infra:dockerPassword [value] [--secret]
$ pulumi config set bbook-infra:dockerUsername [value] [--secret]
```
Now you have `Pulumi.bbook.yaml` which is necessary to run pulumi

## Verify
- `$ make preview`
- follow instruction to set config values

## Continuous Deployment via Github Actions
- [../.github](../.github)
