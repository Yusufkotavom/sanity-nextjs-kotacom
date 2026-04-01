import Link from "next/link";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductCard from "@/components/ui/product-card";
import ServiceCard from "@/components/ui/service-card";

export const metadata = {
  title: "Style Guide",
  description: "Reference page for component styles used in the frontend.",
};

export default function StyleGuidePage() {
  return (
    <section>
      <div className="container py-16 xl:py-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            links={[
              { label: "Home", href: "/" },
              { label: "Style Guide", href: "/style-guide" },
            ]}
          />

          <div className="mb-10">
            <h1 className="text-4xl font-bold md:text-5xl">Style Guide</h1>
            <p className="mt-3 max-w-2xl text-foreground/70">
              Reference for reusable UI styles and components in this project.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Buttons</h2>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link" asChild>
                  <Link href="#">Link Button</Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Badges</h2>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Form Controls</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Sample Form Row</CardTitle>
                  <CardDescription>Inputs and labels used in forms.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Accordion</h2>
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is this page for?</AccordionTrigger>
                      <AccordionContent>
                        A visual reference for shared UI styling.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Can I reuse these blocks?</AccordionTrigger>
                      <AccordionContent>
                        Yes. This page uses the same reusable components imported across the app.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Content Cards</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ProductCard
                  title="Sample Product"
                  slug={{ current: "sample-product" }}
                  excerpt="Reference product card styling used for product listing."
                  price={150000}
                  currency="IDR"
                  availability="in-stock"
                />
                <ServiceCard
                  title="Sample Service"
                  slug={{ current: "sample-service" }}
                  excerpt="Reference service card styling used for service listing."
                  duration="2 weeks"
                  startingPrice={250000}
                  currency="IDR"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
