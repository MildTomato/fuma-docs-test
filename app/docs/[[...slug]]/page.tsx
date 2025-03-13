import ClientLibraryPage from "@/components/client-library/client-library-page";
import defaultMdxComponents from "@/components/mdx";
import { APIPage } from "@/components/open-api/server/api-page";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/page";
import { source } from "@/lib/source";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  // console.log("frontmatter", page.data);

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* <p
        style={{
          backgroundColor: page.data.stage === "beta" ? "orange" : "green",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        stage: {page?.data.stage}
      </p> */}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            APIPage: APIPage,
            ClientLibraryPage: ClientLibraryPage,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
