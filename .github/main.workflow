workflow "Update" {
    on = "push"
    resolves = [ "Pulumi Deploy (Current Stack)" ]
}

action "Pulumi Deploy (Current Stack)" {
    uses = "docker://pulumi/actions@v0.17.23"
    args = [ "up" ]
    env = {
        "PULUMI_CI" = "up"
        "PULUMI_ROOT" = "infra"
    }
    secrets = [
        "PULUMI_ACCESS_TOKEN",
        "GOOGLE_CREDENTIALS"
    ]
}

workflow "Preview" {
    on = "pull_request"
    resolves = "Pulumi Preview (Merged Stack)"
}

action "Pulumi Preview (Merged Stack)" {
    uses = "docker://pulumi/actions@v0.17.23"
    args = [ "preview" ]
    env = {
        "PULUMI_CI" = "pr"
        "PULUMI_ROOT" = "infra"
    }
    secrets = [
        "PULUMI_ACCESS_TOKEN",
        "GOOGLE_CREDENTIALS"
    ]
}