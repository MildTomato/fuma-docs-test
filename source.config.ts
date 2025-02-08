import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const test = defineCollections({
  type: "doc",
  dir: "content/docs",
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      stage: z.enum(["beta", "ga"]).optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
    valueToExport: ["stage"],
  },
});
