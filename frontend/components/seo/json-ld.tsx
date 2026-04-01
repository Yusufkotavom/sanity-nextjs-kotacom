export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // This content is generated server-side from trusted CMS fields.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
