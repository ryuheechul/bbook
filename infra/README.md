# IaC for bbook
> base on https://github.com/pulumi/actions-example-gke-rails

## Prerequisites
- [docker](https://docs.docker.com/install/)
- [pulumi](https://www.pulumi.com/docs/reference/install/)

### you may want to run this on GCP Cloud shell
> it has preinstalled nodejs and docker
> you probably wouldn't need to install and setup `gcloud`
> after you install pulumi do `$ export PATH=${PATH}:~/.pulumi/bin`

## Verify
- `$ yarn # or npm i`
- `$ pulumi preview`
- follow instruction to set config values
