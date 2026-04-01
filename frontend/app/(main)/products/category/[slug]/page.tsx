import { redirect } from "next/navigation";

export default async function LegacyProductCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  redirect(`/products/${params.slug}`);
}
