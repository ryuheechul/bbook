import * as docker from "@pulumi/docker";
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as cluster from "./cluster";
import * as config from "./config";
import * as db from "./db";

// Get the GCR repository for our app container, and build and publish the app image.
const appImage = new docker.Image("bbook-app", {
    imageName: `${config.dockerUsername}/${pulumi.getProject()}_${pulumi.getStack()}`,
    build: {
        context: "../",
        dockerfile: "../prod.Dockerfile"
    },
    registry: {
        server: "docker.io",
        username: config.dockerUsername,
        password: config.dockerPassword,
    },
});

// Deploy the app container as a Kubernetes load balanced service.
const appPort = 3000;
const appLabels = { app: "bbook-app" };
const appDeployment = new k8s.apps.v1.Deployment("bbook-deployment", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: "bbook",
                    image: appImage.imageName,
                    env: [
                        { name: "DB_HOST", value: db.instance.firstIpAddress },
                        { name: "DB_USERNAME", value: config.dbUsername },
                        { name: "DB_PASSWORD", value: config.dbPassword },
                    ],
                    ports: [{ containerPort: appPort }],
                }],
            },
        },
    },
}, { provider: cluster.provider });

const exposePort = 80;

const appService = new k8s.core.v1.Service("bbook-service", {
    metadata: { labels: appDeployment.metadata.apply(m => m.labels) },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: exposePort, targetPort: appPort }],
        selector: appDeployment.spec.apply(spec => spec.template.metadata.labels),
    },
}, { provider: cluster.provider });

// Export the service's IP address.
export let appAddress =
    appService.status.apply(s => `http://${s.loadBalancer.ingress[0].ip}:${exposePort}/todo_lists`);
