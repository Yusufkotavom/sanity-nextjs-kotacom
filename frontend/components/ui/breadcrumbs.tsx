import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

type BreadcrumbLinkType = {
  label: string;
  href: string;
};

export default function Breadcrumbs({
  links,
}: {
  links: BreadcrumbLinkType[];
}) {
  if (!links?.length) return null;

  return (
    <Breadcrumb className="mb-3 lg:mb-6">
      <BreadcrumbList>
        {links.map((link, index) => {
          const isCurrent = index === links.length - 1;
          return (
            <Fragment key={`${link.href}-${index}`}>
              <BreadcrumbItem>
                {isCurrent ? (
                  <BreadcrumbPage>{link.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isCurrent ? <BreadcrumbSeparator /> : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
