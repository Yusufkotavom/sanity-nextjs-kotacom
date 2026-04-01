import { redirect } from "next/navigation";

export default async function LegacyServiceCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  redirect(`/services/${params.slug}`);
}
