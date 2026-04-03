import { cn } from "@/lib/utils";

export default function InlineMetaList({
  items,
  className,
  itemClassName,
}: {
  items: Array<string | undefined | null | false>;
  className?: string;
  itemClassName?: string;
}) {
  const normalizedItems = items.filter((item): item is string => Boolean(item));

  if (normalizedItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-3 text-sm text-foreground/70", className)}>
      {normalizedItems.map((item) => (
        <span key={item} className={cn("rounded-full border px-3 py-1", itemClassName)}>
          {item}
        </span>
      ))}
    </div>
  );
}
