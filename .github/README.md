# Continuous Deployment via Github Actions

Based on https://github.com/pulumi/actions-example-gke-rails

## Prepare
- make sure you can access Github Actions features on your Github account
- fork(clone if necessary) this repository
- [Set secrets on your repo](https://www.pulumi.com/docs/reference/cd-github-actions/#configuring-your-secrets)
- Generate config file (`Pulumi.bbook.yaml`) via [../infra](../infra)
- Commit the change above and push to your repository (You might want to delete `Pulumi.bbook.yaml` in `infra/.gitignore`)
- See if defined actions work properly when you push the changes to github origin


