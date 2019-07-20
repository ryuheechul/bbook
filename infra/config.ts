import { Config } from "@pulumi/pulumi";

const config = new Config();

/// Docker config
export const dockerUsername = config.require("dockerUsername");
export const dockerPassword = config.require("dockerPassword");

/// PostgreSQL config
export const dbUsername = config.require("dbUsername");
export const dbPassword = config.require("dbPassword");

/// Kubernetes config
export const clusterNodeCount = config.getNumber("clusterNodeCount") || 3;
export const clusterNodeMachineType = config.get("clusterNodeMachineType") || "f1-micro";
export const clusterUsername = config.get("clusterUsername") || "admin";
export const clusterPassword = config.require("clusterPassword");
export const dbMachineType = config.get("dbMachineType") || "db-f1-micro";
export const region = "europe-west2";
