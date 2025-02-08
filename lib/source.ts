import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createOpenAPI } from "fumadocs-openapi/server";
import { attachFile } from "fumadocs-openapi/server";
import { generateFiles } from "fumadocs-openapi";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  pageTree: {
    attachFile,
  },
});

export const openapi = createOpenAPI({
  // options
});

// void generateFiles({
//   per: "file",
// });
