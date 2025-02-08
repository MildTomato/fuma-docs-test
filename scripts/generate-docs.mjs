import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./spec/api_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/management-api",
  per: "operation",
  groupBy: "tag",
});
