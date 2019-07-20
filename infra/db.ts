import * as gcp from "@pulumi/gcp";
import { region, dbUsername, dbPassword, dbMachineType} from "./config";

// Provision a database for our Rails app.
export const instance = new gcp.sql.DatabaseInstance("bbook-db", {
    region,
    databaseVersion: "POSTGRES_9_6",
    settings: {
        tier: dbMachineType,
        ipConfiguration: {
            authorizedNetworks: [{ value: "0.0.0.0/0" }],
        },
        crashSafeReplication: true,
        replicationType: dbMachineType
    }
});

// Create a user with the configured credentials for the Rails app to use.
const user = new gcp.sql.User("bbook-db-user", {
    instance: instance.name,
    name: dbUsername,
    password: dbPassword,
});
