// import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { BoxIcon, RocketIcon } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      sidebar={{
        // prefetch: false,
        // tabs: {
        //   transform: (option, node) => ({
        //     ...option,
        //     icon: option.icon,
        //   }),
        // },
        tabs: [
          {
            title: "Management API",
            description: "Features available in /app",
            icon: (
              <span className="border border-blue-600/50 bg-gradient-to-t from-blue-600/30 rounded-lg p-1 text-blue-600">
                <BoxIcon />
              </span>
            ),
            url: "/docs/management-api",
          },
          {
            title: "Data API",
            description: "Features available in /pages",
            icon: (
              <span className="border purple-blue-600/50 bg-gradient-to-t from-purple-600/30 rounded-lg p-1 text-purple-600">
                <BoxIcon />
              </span>
            ),
            url: "/docs/data-api",
          },
          {
            title: "Storage API",
            icon: (
              <span className="border border-fd-primary/50 bg-gradient-to-t from-fd-primary/30 rounded-lg p-1 text-fd-primary">
                <RocketIcon />
              </span>
            ),
            url: "/docs/architecture",
          },
          {
            title: "Community",
            icon: (
              <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
                <RocketIcon />
              </span>
            ),
            url: "/docs/community",
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
