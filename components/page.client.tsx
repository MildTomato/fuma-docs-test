"use client";

import {
  Fragment,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";
import {
  type BreadcrumbOptions,
  getBreadcrumbItemsFromPath,
} from "fumadocs-core/breadcrumb";
import { cn } from "fumadocs-ui/components/api";
import { useNav } from "fumadocs-ui/components/layout/nav";
// import {
//   useI18n,
//   usePageStyles,
//   useSidebar,
//   useTreeContext,
//   useTreePath,
// } from "fumadocs-ui/provider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { isActive } from "./SideBar";
import {
  useI18n,
  usePageStyles,
  useSidebar,
  useTreeContext,
  useTreePath,
} from "@/provider";

export function TocNav(props: HTMLAttributes<HTMLDivElement>) {
  const { open } = useSidebar();
  const { tocNav } = usePageStyles();
  const { isTransparent } = useNav();

  return (
    <header
      id="nd-tocnav"
      {...props}
      className={cn(
        "sticky top-[calc(var(--fd-banner-height)+var(--fd-nav-height))] z-10 flex flex-row items-center border-b border-fd-foreground/10 text-sm backdrop-blur-md transition-colors",
        !isTransparent && "bg-fd-background/80",
        open && "opacity-0",
        tocNav,
        props.className
      )}
      style={
        {
          ...props.style,
          "--fd-toc-top-with-offset":
            "calc(4px + var(--fd-banner-height) + var(--fd-nav-height))",
        } as object
      }
    >
      {props.children}
    </header>
  );
}

export function PageBody(props: HTMLAttributes<HTMLDivElement>) {
  const { page } = usePageStyles();

  return (
    <div
      id="nd-page"
      {...props}
      className={cn("flex w-full min-w-0 flex-col", page, props.className)}
    >
      {props.children}
    </div>
  );
}

export function PageArticle(props: HTMLAttributes<HTMLElement>) {
  const { article } = usePageStyles();

  return (
    <article
      {...props}
      className={cn(
        "flex w-full flex-1 flex-col gap-6 px-4 pt-8 md:pt-12 lg:px-8 xl:mx-auto",
        article,
        props.className
      )}
    >
      {props.children}
    </article>
  );
}

export function LastUpdate(props: { date: Date }) {
  const { text } = useI18n();
  const [date, setDate] = useState("");

  useEffect(() => {
    // to the timezone of client
    setDate(props.date.toLocaleDateString());
  }, [props.date]);

  return (
    <p className="text-sm text-fd-muted-foreground">
      {text.lastUpdate} {date}
    </p>
  );
}

export interface FooterProps {
  /**
   * Items including information for the next and previous page
   */
  items?: {
    previous?: { name: string; url: string };
    next?: { name: string; url: string };
  };
}

const itemVariants = cva(
  "flex w-full flex-col gap-2 rounded-lg border bg-fd-card p-4 text-sm transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
);

const itemLabel = cva(
  "inline-flex items-center gap-0.5 text-fd-muted-foreground"
);

function scanNavigationList(tree: PageTree.Node[]) {
  const list: PageTree.Item[] = [];

  tree.forEach((node) => {
    if (node.type === "folder") {
      if (node.index) {
        list.push(node.index);
      }

      list.push(...scanNavigationList(node.children));
      return;
    }

    if (node.type === "page" && !node.external) {
      list.push(node);
    }
  });

  return list;
}

const listCache = new WeakMap<PageTree.Root, PageTree.Item[]>();

export function Footer({ items }: FooterProps) {
  const { root } = useTreeContext();
  const { text } = useI18n();
  const pathname = usePathname();

  const { previous, next } = useMemo(() => {
    if (items) return items;

    const cached = listCache.get(root);
    const list = cached ?? scanNavigationList(root.children);
    listCache.set(root, list);

    const idx = list.findIndex((item) => isActive(item.url, pathname, false));

    if (idx === -1) return {};
    return {
      previous: list[idx - 1],
      next: list[idx + 1],
    };
  }, [items, pathname, root]);

  return (
    <div className="grid grid-cols-2 gap-4 pb-6">
      {previous ? (
        <Link href={previous.url} className={cn(itemVariants())}>
          <div className={cn(itemLabel())}>
            <ChevronLeft className="-ms-1 size-4 shrink-0 rtl:rotate-180" />
            <p>{text.previousPage}</p>
          </div>
          <p className="font-medium">{previous.name}</p>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={next.url}
          className={cn(itemVariants({ className: "col-start-2 text-end" }))}
        >
          <div className={cn(itemLabel({ className: "flex-row-reverse" }))}>
            <ChevronRight className="-me-1 size-4 shrink-0 rtl:rotate-180" />
            <p>{text.nextPage}</p>
          </div>
          <p className="font-medium">{next.name}</p>
        </Link>
      ) : null}
    </div>
  );
}

export type BreadcrumbProps = BreadcrumbOptions;

export function Breadcrumb(options: BreadcrumbProps) {
  const path = useTreePath();
  const { root } = useTreeContext();
  const items = useMemo(() => {
    return getBreadcrumbItemsFromPath(root, path, {
      includePage: options.includePage ?? false,
      ...options,
    });
  }, [options, path, root]);

  if (items.length === 0) return null;

  return (
    <div className="-mb-3 flex flex-row items-center gap-1 text-sm font-medium text-fd-muted-foreground">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && (
            <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
          )}
          {item.url ? (
            <Link
              href={item.url}
              className="truncate hover:text-fd-accent-foreground"
            >
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
