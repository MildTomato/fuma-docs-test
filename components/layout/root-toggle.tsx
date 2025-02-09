"use client";

const USE_BASE_URL = true; // Set to true to enable filtering

import { ChevronDown } from "lucide-react";
import { type HTMLAttributes, type ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { isActive } from "@/utils/is-active";
import { useSidebar } from "@/contexts/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export interface Option {
  /**
   * Redirect URL of the folder, usually the index page
   */
  url: string;

  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  /**
   * Detect from a list of urls
   */
  urls?: Set<string>;

  props?: HTMLAttributes<HTMLElement>;

  baseUrl?: string;
}

export function RootToggle({
  options,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  options: Option[];
} & HTMLAttributes<HTMLButtonElement>) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();

  // Group options by baseUrl
  const visibleOptions = useMemo(() => {
    if (!USE_BASE_URL) return options;

    console.log("Current pathname:", pathname);

    // Log all baseUrls
    console.log(
      "Available baseUrls:",
      options.map((opt) => ({
        title: opt.title,
        baseUrl: opt.baseUrl,
        url: opt.url,
      }))
    );

    // Find which baseUrl matches our current path
    const matchingBaseUrl = options
      .map((opt) => opt.baseUrl)
      .filter(Boolean)
      .find((baseUrl) => pathname.startsWith(baseUrl));

    console.log("Matching baseUrl:", matchingBaseUrl);

    // If we found a matching baseUrl, only show options with that baseUrl
    const filtered = matchingBaseUrl
      ? options.filter((opt) => opt.baseUrl === matchingBaseUrl)
      : options;

    console.log(
      "Filtered options:",
      filtered.map((opt) => opt.title)
    );

    return filtered;
  }, [options, pathname]);

  const selected = useMemo(() => {
    return visibleOptions.findLast((item) =>
      item.urls
        ? item.urls.has(
            pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
          )
        : isActive(item.url, pathname, true)
    );
  }, [visibleOptions, pathname]);

  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };

  // Add debug log for selected
  console.log("Selected:", selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        {...props}
        className={cn(
          "flex flex-row items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-fd-accent/50 hover:text-fd-accent-foreground",
          props.className
        )}
      >
        {selected ? (
          <Item {...selected} />
        ) : (
          <span className="text-fd-muted-foreground">Select an option...</span>
        )}
        <ChevronDown className="me-2 size-4 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden p-0">
        {visibleOptions.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            onClick={onClick}
            {...item.props}
            className={cn(
              "flex w-full flex-row items-center gap-2 px-2 py-1.5",
              selected === item
                ? "bg-fd-accent text-fd-accent-foreground"
                : "hover:bg-fd-accent/50",
              item.props?.className
            )}
          >
            <Item {...item} />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function Item(props: Option) {
  return (
    <>
      {props.icon}
      <div className="flex-1 text-start">
        <p className="text-sm font-medium">{props.title}</p>
        {props.description ? (
          <p className="text-xs text-fd-muted-foreground">
            {props.description}
          </p>
        ) : null}
      </div>
    </>
  );
}
