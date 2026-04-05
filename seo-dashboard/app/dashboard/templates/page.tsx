import { TemplatesPanel } from "@/components/templates-panel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Templates</CardTitle>
          <CardDescription>Preview variables and queue AI output in bulk.</CardDescription>
        </CardHeader>
        <CardContent>
          <TemplatesPanel />
        </CardContent>
      </Card>
    </div>
  );
}
