// import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { cn } from "fumadocs-ui/components/api";
import { NavProvider } from "fumadocs-ui/components/layout/nav";
// import { CollapsibleSidebar } from "fumadocs-ui/layouts/docs/sidebar";
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";

import {
  PageStyles,
  // StylesProvider,
  // TreeContextProvider,
} from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { DocsNavbar, SidebarHeaderItems } from "../../components/DocsNavBar";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarPageTree,
  SidebarViewport,
} from "../../components/SideBar";
import {
  Database,
  Code,
  GitGraph,
  Settings,
  Terminal,
  KeyRound,
  HardDrive,
  Network,
  Zap,
  Clock,
  ListOrdered,
} from "lucide-react";
import { RootToggle } from "@/components/layout/root-toggle";
import { StylesProvider, TreeContextProvider } from "@/provider";

export default function Layout({ children }: { children: ReactNode }) {
  const pageStyles: PageStyles = {
    tocNav: cn("xl:hidden"),
    toc: cn("max-xl:hidden"),
    page: cn("mt-[var(--fd-nav-height)]"),
  };

  const variables = cn(
    "[--fd-nav-height:3.5rem] [--fd-tocnav-height:36px] md:[--fd-sidebar-width:268px] xl:[--fd-toc-width:268px] xl:[--fd-tocnav-height:0px]"
  );

  const sidebarCollapsible = false;
  // const Aside = sidebarCollapsible ? CollapsibleSidebar : Sidebar;

  const tabs = [
    {
      title: "Data API",
      description: "Features available in /pages",
      icon: (
        <span className="border purple-blue-600/50 bg-gradient-to-t from-purple-600/30 rounded-lg p-1 text-purple-600">
          <Database />
        </span>
      ),
      url: "/docs/data-api",
      baseUrl: "/docs/reference",
    },
    {
      title: "Client Libraries",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Code />
        </span>
      ),
      url: "/docs/client-libraries",
      baseUrl: "/docs/reference",
    },
    {
      title: "GraphQL",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <GitGraph />
        </span>
      ),
      url: "/docs/graphql",
      baseUrl: "/docs/reference",
    },
    {
      title: "Management API",
      description: "Features available in /app",
      icon: (
        <span className="border border-blue-600/50 bg-gradient-to-t from-blue-600/30 rounded-lg p-1 text-blue-600">
          <Settings />
        </span>
      ),
      url: "/docs/management-api",
      baseUrl: "/docs/reference",
    },
    {
      title: "CLI",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Terminal />
        </span>
      ),
      url: "/docs/cli",
      baseUrl: "/docs/reference",
    },
    {
      title: "Database",
      description: "Efficient data management.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Database />
        </span>
      ),
      url: "/docs/products/database",
      baseUrl: "/docs/products",
    },
    {
      title: "Authentication",
      description: "Manage authorization of users.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <KeyRound />
        </span>
      ),
      url: "/docs/products/authentication",
      baseUrl: "/docs/products",
    },
    {
      title: "Storage",
      description: "Store and serve files of any size.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <HardDrive />
        </span>
      ),
      url: "/docs/products/storage",
      baseUrl: "/docs/products",
    },
    {
      title: "Edge Functions",
      description: "Serverless functions globally.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Network />
        </span>
      ),
      url: "/docs/products/edge-functions",
      baseUrl: "/docs/products",
    },
    {
      title: "Realtime",
      description: "Build real-time applications.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Zap />
        </span>
      ),
      url: "/docs/products/realtime",
      baseUrl: "/docs/products",
    },
    {
      title: "Cron",
      description: "Schedule recurring tasks.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <Clock />
        </span>
      ),
      url: "/docs/products/cron",
      baseUrl: "/docs/products",
    },
    {
      title: "Queues",
      description: "Manage background jobs.",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <ListOrdered />
        </span>
      ),
      url: "/docs/products/queues",
      baseUrl: "/docs/products",
    },
  ];

  return (
    <TreeContextProvider tree={source.pageTree}>
      <NavProvider transparentMode={"top"}>
        <main id="nd-docs-layout" className={cn("flex flex-col", variables)}>
          <DocsNavbar
            nav={{
              title: "My App",
            }}
            links={[
              {
                text: "Home",
                url: "/",
              },
              {
                text: "Docs",
                url: "/docs",
              },
              {
                text: "Products",
                url: "/docs/products",
              },
            ]}
            i18n={false}
            sidebarCollapsible={false}
          />
          {/* <CollapsibleSidebar></CollapsibleSidebar> */}
          <StylesProvider {...pageStyles}>
            <div className="flex flex-row">
              <Sidebar
                // {...sidebar}
                className={
                  cn()
                  // "md:ps-[var(--fd-layout-offset)] md:[--fd-nav-height:0px] [--fd-sidebar-height:32px]"
                  // sidebar.className
                }
              >
                <SidebarHeader>
                  <SidebarHeaderItems nav={{}} links={[]}>
                    {/* {nav.children} */}
                    {sidebarCollapsible ? (
                      <SidebarCollapseTrigger className="ms-auto text-fd-muted-foreground" />
                    ) : null}
                  </SidebarHeaderItems>
                  {/* {sidebarBanner} */}
                  {tabs.length > 0 ? (
                    <RootToggle options={tabs} className="-mx-2" />
                  ) : null}
                </SidebarHeader>
                <SidebarViewport className="text-sm">
                  {/* <div className="mb-4 empty:hidden lg:hidden">
                    {links.map((item, i) => (
                      <SidebarLinkItem key={i} item={item} />
                    ))}
                  </div> */}
                  <SidebarPageTree
                  // components={sidebarComponents}
                  />
                </SidebarViewport>
                <SidebarFooter
                  className={
                    cn()
                    // !sidebarFooter && "md:hidden"
                  }
                >
                  {/* {!props.disableThemeSwitch ? ( */}
                  <ThemeToggle />
                  {/* ) : null} */}
                  {/* {sidebarFooter} */}
                </SidebarFooter>
              </Sidebar>
              <div className="flex flex-row flex-1">{children}</div>
            </div>
          </StylesProvider>
        </main>
      </NavProvider>
    </TreeContextProvider>
  );
}
