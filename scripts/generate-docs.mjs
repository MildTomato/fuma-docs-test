import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./spec/api_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/management-api",
  per: "operation",
  groupBy: "tag",
});

void generateFiles({
  input: ["./spec/auth_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/data-api/auth",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/storage_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/data-api/storage",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/functions_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/data-api/functions",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/analytics_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/data-api/analytics",
  //   per: "operation",
  //   groupBy: "tag",
});
