import {
  getFunctionsList,
  getTypeSpec,
} from "@/components/reference/Reference.generated.singleton";
import { Tabs, TabsList } from "@/components/ui/tabs";
// import { MDXRemoteRefs } from "@/components/reference/Reference.mdx";
import { DocsDescription, DocsTitle } from "@/components/page";
import type { MethodTypes } from "@/components/reference/Reference.typeSpec.ts";
// import {
//   FnParameterDetails,
//   RefSubLayout,
//   ReturnTypeDetails,
//   StickyHeader,
// } from "@/components/reference/Reference.ui";
import type { AbbrevApiReferenceSection } from "@/components/reference/Reference.utils";

const ClientLibraryPage = () => {
  return (
    <>
      <DocsTitle>Client Library</DocsTitle>
      <DocsDescription>
        This page provides information about the client library.
      </DocsDescription>
      {/* Additional content can be added here */}

      <FunctionSection
        sdkId="javascript"
        version="v2"
        link="/docs/reference/client-library/supabase-js"
        section={{
          type: "function",
          name: "createTpaForProject",
        }}
        useTypeSpec={true}
      />
    </>
  );
};

interface FunctionSectionProps {
  sdkId: string;
  version: string;
  link: string;
  section: AbbrevApiReferenceSection;
  useTypeSpec: boolean;
}

async function FunctionSection({
  sdkId,
  version,
  link,
  section,
  useTypeSpec,
}: FunctionSectionProps) {
  const fns = await getFunctionsList(sdkId, version);

  const fn = fns.find((fn) => fn.id === section.id);
  if (!fn) return null;

  let types: MethodTypes | undefined;
  if (useTypeSpec && "$ref" in fn) {
    types = await getTypeSpec(fn["$ref"] as string);
  }

  //   const fullDescription = [
  //     types?.comment?.shortText,
  //     "description" in fn && (fn.description as string),
  //     "notes" in fn && (fn.notes as string),
  //   ]
  //     .filter(Boolean)
  //     .map(normalizeMarkdown)
  //     .join("\n\n");

  return (
    <div>
      <div className="overflow-hidden flex flex-col gap-8">
        <div className="prose break-words text-sm">
          {/* <MDXRemoteRefs source={fullDescription} /> */}
        </div>
        {/* <FnParameterDetails
          parameters={
            "overwriteParams" in fn
              ? (fn.overwriteParams as Array<object>).map(
                  (overwrittenParams) => ({
                    ...overwrittenParams,
                    __overwritten: true,
                  })
                )
              : "params" in fn
                ? (fn.params as Array<object>).map((param) => ({
                    ...param,
                    __overwritten: true,
                  }))
                : types?.params
          }
          altParameters={types?.altSignatures?.map(({ params }) => params)}
          className="max-w-[80ch]"
        /> */}
        {/* {!!types?.ret && <ReturnTypeDetails returnType={types.ret} />} */}
      </div>
      <div className="overflow-auto">
        {"examples" in fn &&
          Array.isArray(fn.examples) &&
          fn.examples.length > 0 && (
            <Tabs defaultValue={fn.examples[0].id}>
              <TabsList className="flex-wrap gap-2 border-0">
                {/* {fn.examples.map((example) => (
                  <TabsTrigger
                    key={example.id}
                    value={example.id}
                    className={cn(
                      "px-2.5 py-1 rounded-full",
                      "border-0 bg-surface-200 hover:bg-surface-300",
                      "text-xs text-foreground-lighter",
                      // Undoing styles from primitive component
                      "data-[state=active]:border-0 data-[state=active]:shadow-0",
                      "data-[state=active]:bg-foreground data-[state=active]:text-background",
                      "transition"
                    )}
                  >
                    {example.name}
                  </TabsTrigger>
                ))} */}
              </TabsList>
              {/* {fn.examples.map((example) => (
                <TabsContent key={example.id} value={example.id}>
                  <MDXRemoteRefs source={example.code} />
                  <div className="flex flex-col gap-2">
                    {!!example.data?.sql && (
                      <CollapsibleDetails
                        title="Data source"
                        content={example.data.sql}
                      />
                    )}
                    {!!example.response && (
                      <CollapsibleDetails
                        title="Response"
                        content={example.response}
                      />
                    )}
                    {!!example.description && (
                      <CollapsibleDetails
                        title="Notes"
                        content={normalizeMarkdown(example.description)}
                      />
                    )}
                  </div>
                </TabsContent>
              ))} */}
            </Tabs>
          )}
      </div>
    </div>
  );
}

export default ClientLibraryPage;
