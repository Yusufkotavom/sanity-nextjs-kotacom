import Blocks from "@/components/blocks";
import {
  ReusablePlacementSlot,
  ReusableSectionItem,
} from "@/sanity/lib/fetch";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type PageBlock = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];

function buildSlotBlocks(
  sections: ReusableSectionItem[],
  slot: ReusablePlacementSlot,
): PageBlock[] {
  return sections.flatMap((section) => {
    if (!section.placements?.includes(slot) || !section.blocks?.length) {
      return [];
    }

    return section.blocks.map((block, index) => ({
      ...block,
      _key: `${section._id}-${slot}-${block._key || index}`,
    })) as PageBlock[];
  });
}

export default function ReusableSlotSections({
  sections,
  slot,
}: {
  sections: ReusableSectionItem[];
  slot: ReusablePlacementSlot;
}) {
  const slotBlocks = buildSlotBlocks(sections, slot);

  if (!slotBlocks.length) return null;

  return <Blocks blocks={slotBlocks} />;
}
