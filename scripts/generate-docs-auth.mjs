import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./spec/auth_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/auth",
  per: "operation",
  groupBy: "tag",
});
