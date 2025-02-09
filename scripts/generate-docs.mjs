import { generateFiles } from "fumadocs-openapi";

void generateFiles({
  input: ["./spec/api_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/reference/management-api",
  per: "operation",
  groupBy: "tag",
});

void generateFiles({
  input: ["./spec/auth_v1_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/reference/rest/auth",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/storage_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/reference/rest/storage",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/functions_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/reference/rest/functions",
  //   per: "operation",
  //   groupBy: "tag",
});

void generateFiles({
  input: ["./spec/analytics_v0_openapi.json"], // the OpenAPI schemas
  output: "./content/docs/reference/rest/analytics",
  //   per: "operation",
  //   groupBy: "tag",
});
