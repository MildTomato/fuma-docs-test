import { cn } from "fumadocs-ui/components/api";

import type { PageTree } from "fumadocs-core/server";
import { LinkItemType } from "fumadocs-ui/layouts/docs";

import { buttonVariants } from "fumadocs-ui/components/api";
import { Title } from "fumadocs-ui/components/layout/nav";
import {
  LargeSearchToggle,
  SearchToggle,
} from "fumadocs-ui/components/layout/search-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { type SidebarOptions } from "fumadocs-ui/layouts/docs/shared";
import { SidebarCollapseTrigger } from "fumadocs-ui/layouts/docs/sidebar";
import { BaseLinkItem } from "fumadocs-ui/layouts/links";
import { BaseLayoutProps, SharedNavProps } from "fumadocs-ui/layouts/shared";
import { Fragment, HTMLAttributes, ReactNode } from "react";
import { Navbar, NavbarSidebarTrigger } from "./NavBar";
import Link from "next/link";
// import { LanguageToggle } from "fumadocs-ui/components/layout/language-toggle";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;

  sidebar?: Omit<Partial<SidebarOptions>, "component" | "enabled">;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsNavbar({
  sidebarCollapsible,
  links,
  nav = {},
  //   i18n,
}: {
  nav: DocsLayoutProps["nav"];
  sidebarCollapsible: boolean;
  i18n: boolean;
  links: LinkItemType[];
}) {
  return (
    <Navbar>
      {sidebarCollapsible ? (
        <SidebarCollapseTrigger className="-ms-1.5 text-fd-muted-foreground data-[collapsed=false]:hidden max-md:hidden" />
      ) : null}
      <LargeSearchToggle
        hideIfDisabled
        className="w-full max-w-[240px] rounded-lg max-md:hidden"
      />
      <Title url={nav.url} title={nav.title} className="md:hidden" />
      <div className="flex flex-1 flex-row items-center gap-6 px-2">
        {links
          .filter((item) => item.type !== "icon")
          .map((item, i) => (
            <NavbarLinkItem
              key={i}
              item={item}
              className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-accent-foreground max-lg:hidden"
            />
          ))}
        {nav.children}
      </div>
      <SearchToggle hideIfDisabled className="md:hidden" />
      <NavbarSidebarTrigger className="-me-1.5 md:hidden" />
      <div className="flex flex-row items-center empty:hidden max-lg:hidden">
        {links
          .filter((item) => item.type === "icon")
          .map((item, i) => (
            <BaseLinkItem
              key={i}
              item={item}
              className={cn(
                buttonVariants({ size: "icon", color: "ghost" }),
                "text-fd-muted-foreground"
              )}
              aria-label={item.label}
            >
              {item.icon}
            </BaseLinkItem>
          ))}
      </div>
      {/* {i18n ? (
        <LanguageToggle>
          <Languages className="size-5" />
        </LanguageToggle>
      ) : null} */}
      {/* <ThemeToggle className="max-md:hidden" mode="light-dark-system" /> */}
    </Navbar>
  );
}

function NavbarLinkItem({
  item,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === "menu") {
    return (
      <Popover>
        <PopoverTrigger
          {...props}
          className={cn("inline-flex items-center gap-1.5", props.className)}
        >
          {item.text}
          {/* <ChevronDown className="size-3" /> */}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          {item.items.map((child, i) => {
            if (child.type === "custom")
              return <Fragment key={i}>{child.children}</Fragment>;

            return (
              <BaseLinkItem
                key={i}
                item={child}
                className="inline-flex items-center gap-2 rounded-md p-2 text-start hover:bg-fd-accent hover:text-fd-accent-foreground data-[active=true]:text-fd-primary [&_svg]:size-4"
              >
                {child.icon}
                {child.text}
              </BaseLinkItem>
            );
          })}
        </PopoverContent>
      </Popover>
    );
  }

  if (item.type === "custom") return item.children;

  return (
    <BaseLinkItem item={item} {...props}>
      {item.text}
    </BaseLinkItem>
  );
}

export function SidebarHeaderItems({
  links,
  nav = {},
  children,
}: SharedNavProps & {
  nav: DocsLayoutProps["nav"];
  links: LinkItemType[];
  children: ReactNode;
}) {
  const isEmpty = !nav.title && !nav.children && links.length === 0;
  if (isEmpty) return null;

  return (
    <div className="flex flex-row items-center max-md:hidden">
      {nav.title ? (
        <Link
          href={nav.url ?? "/"}
          className="inline-flex items-center gap-2.5 py-1 font-medium md:px-2"
        >
          {nav.title}
        </Link>
      ) : null}
      {children}
    </div>
  );
}
