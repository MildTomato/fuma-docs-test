// import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { cn } from "fumadocs-ui/components/api";
import { NavProvider } from "fumadocs-ui/components/layout/nav";
// import { CollapsibleSidebar } from "fumadocs-ui/layouts/docs/sidebar";
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";

import {
  PageStyles,
  StylesProvider,
  TreeContextProvider,
} from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { DocsNavbar, SidebarHeaderItems } from "../components/DocsNavBar";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarPageTree,
} from "../components/SideBar";
import { SidebarViewport } from "fumadocs-ui/layouts/docs/sidebar";
import { BoxIcon, RocketIcon } from "lucide-react";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";

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
    {
      title: "Database",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <RocketIcon />
        </span>
      ),
      url: "/docs/products/database",
    },
    {
      title: "Authentication",
      icon: (
        <span className="border border-fd-foreground/50 bg-gradient-to-t from-fd-foreground/30 rounded-lg p-1 text-fd-foreground">
          <RocketIcon />
        </span>
      ),
      url: "/docs/products/authentication",
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
                className={cn(
                  "md:ps-[var(--fd-layout-offset)] md:[--fd-nav-height:0px] [--fd-sidebar-height:32px]"
                  // sidebar.className
                )}
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
                <SidebarViewport>
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
                  <ThemeToggle className="w-fit md:hidden" />
                  {/* ) : null} */}
                  {/* {sidebarFooter} */}
                </SidebarFooter>
              </Sidebar>
              {children}
            </div>
          </StylesProvider>
        </main>
      </NavProvider>
    </TreeContextProvider>
  );
}
