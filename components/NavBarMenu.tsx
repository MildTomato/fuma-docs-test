"use client";

import { Database } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/utils/cn";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Supabase
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      The open source Firebase alternative. Build faster and
                      scale smarter with the features you love.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/quickstart" title="Quickstart">
                Get started with Supabase in under 5 minutes.
              </ListItem>
              <ListItem href="/docs/guides" title="Guides">
                In-depth tutorials and how-to guides.
              </ListItem>
              <ListItem href="/docs/architecture" title="Architecture">
                Understanding Supabase's platform architecture.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[750px] p-6 grid grid-cols-3 gap-6">
              {/* Column 1: Database Card */}
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/docs/products/database"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-5 w-5" />
                      <h4 className="text-lg font-medium">Database</h4>
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Powerful Postgres database with extensions for
                      authentication, vectorization, and real-time
                      subscriptions.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              {/* Column 2: Products */}
              <ul className="space-y-3">
                <ListItem href="/docs/auth" title="Auth">
                  User authentication and authorization system.
                </ListItem>
                <ListItem href="/docs/storage" title="Storage">
                  Store and serve large files and media assets.
                </ListItem>
                <ListItem href="/docs/edge-functions" title="Edge Functions">
                  Deploy serverless functions globally.
                </ListItem>
                <ListItem href="/docs/realtime" title="Realtime">
                  Build real-time applications.
                </ListItem>
              </ul>

              {/* Column 3: Postgres Modules */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                  Postgres Modules
                </h3>
                <ul className="space-y-3">
                  <ListItem href="/docs/ai-vectors" title="AI & Vectors">
                    Build AI-powered applications.
                  </ListItem>
                  <ListItem href="/docs/cron" title="Cron">
                    Schedule recurring tasks.
                  </ListItem>
                  <ListItem href="/docs/queues" title="Queues">
                    Manage background jobs.
                  </ListItem>
                </ul>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Build</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[400px] p-4 space-y-3">
              <ListItem href="/docs/local-dev" title="Local Development & CLI">
                Set up your local development environment.
              </ListItem>

              <ListItem href="/docs/deployment" title="Deployment">
                Deploy your application to production.
              </ListItem>

              <ListItem href="/docs/self-hosting" title="Self-Hosting">
                Host Supabase on your own infrastructure.
              </ListItem>

              <ListItem href="/docs/integrations" title="Integrations">
                Connect with your favorite tools and services.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/docs/resources"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Platform Resources
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Everything you need to build and scale your Supabase
                      projects successfully.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/glossary" title="Glossary">
                Terms and definitions used throughout the docs.
              </ListItem>
              <ListItem href="/docs/changelog" title="Changelog">
                Latest updates and changes to the platform.
              </ListItem>
              <ListItem href="/docs/contributing" title="Contributing">
                How to contribute to Supabase's development.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Reference</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[600px] p-4 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  CLIENT LIBRARY REFERENCE
                </h3>
                <ul className="space-y-2">
                  <ListItem
                    href="/docs/reference/javascript"
                    title="JavaScript"
                  >
                    @supabase/supabase-js
                  </ListItem>
                  <ListItem href="/docs/reference/flutter" title="Flutter">
                    @supabase/supabase-flutter
                  </ListItem>
                  <ListItem href="/docs/reference/swift" title="Swift">
                    @supabase/supabase-swift
                  </ListItem>
                  <ListItem href="/docs/reference/python" title="Python">
                    @supabase/supabase-py
                  </ListItem>
                  <ListItem href="/docs/reference/csharp" title="C#">
                    @supabase/supabase-csharp
                  </ListItem>
                  <ListItem href="/docs/reference/kotlin" title="Kotlin">
                    @supabase/supabase-kt
                  </ListItem>
                </ul>
              </div>

              <div>
                <ul className="space-y-2">
                  <ListItem href="/docs/reference/cli" title="CLI Commands">
                    Command line interface.
                  </ListItem>
                  <ListItem href="/docs/management-api" title="Management API">
                    Management API for projects.
                  </ListItem>

                  <li className="mt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      DATA API
                    </h3>
                    <ul className="space-y-2">
                      <ListItem href="/docs/reference/rest" title="REST">
                        Auto-generated REST API for your database.
                      </ListItem>
                      <ListItem href="/docs/reference/graphql" title="GraphQL">
                        Auto-generated GraphQL API for your database.
                      </ListItem>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
