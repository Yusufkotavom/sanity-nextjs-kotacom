export function normalizeSeoDescription(input?: string | null) {
  const cleaned = (input || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";

  if (cleaned.length >= 120 && cleaned.length <= 155) return cleaned;
  if (cleaned.length < 120) {
    const suffix =
      " Dapatkan pendekatan terstruktur dari tim Kotacom sesuai kebutuhan bisnis Anda.";
    const expanded = `${cleaned}${suffix}`;
    if (expanded.length <= 155) return expanded;
    return `${expanded.slice(0, 152).replace(/[,:;\-–—\s]+$/g, "")}...`;
  }

  const softCut = cleaned.slice(0, 152).replace(/[,:;\-–—\s]+$/g, "");
  if (softCut.length < 120) {
    return `${cleaned.slice(0, 155).trimEnd()}...`;
  }
  return `${softCut}...`;
}

export function normalizeSeoTitle(input?: string | null) {
  const cleaned = (input || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";

  if (cleaned.length >= 30 && cleaned.length <= 60) return cleaned;
  if (cleaned.length < 30) {
    let expanded = `${cleaned} | Kotacom`;
    if (expanded.length < 30) {
      expanded = `${expanded} Indonesia`;
    }
    if (expanded.length <= 60) return expanded;
    return expanded.slice(0, 60).trimEnd();
  }

  const separatorParts = cleaned
    .split(/[-|:]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const viable = separatorParts.find((part) => part.length >= 35 && part.length <= 60);
  if (viable) return viable;

  const softCut = cleaned.slice(0, 57).replace(/[,:;\-–—\s]+$/g, "");
  if (softCut.length < 30) {
    return cleaned.slice(0, 60).trimEnd();
  }
  return `${softCut}...`;
}
