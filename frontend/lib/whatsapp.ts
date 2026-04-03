type BuildWhatsAppHrefInput = {
  phoneNumber: string;
  predefinedText?: string;
  currentPage?: string;
  fromPage?: string;
  sourceUrl?: string;
};

export function normalizeWhatsAppPhone(phoneNumber: string) {
  const digits = phoneNumber.replace(/\D+/g, "");

  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

export function buildWhatsAppHref({
  phoneNumber,
  predefinedText,
  currentPage,
  fromPage,
  sourceUrl,
}: BuildWhatsAppHrefInput) {
  const normalizedPhone = normalizeWhatsAppPhone(phoneNumber);

  if (!normalizedPhone) return null;

  const lines: string[] = [];

  if (predefinedText?.trim()) {
    lines.push(predefinedText.trim());
  }

  if (currentPage?.trim()) {
    lines.push(`Page: ${currentPage.trim()}`);
  }

  if (fromPage?.trim()) {
    lines.push(`From: ${fromPage.trim()}`);
  }

  if (sourceUrl?.trim()) {
    lines.push(`Source: ${sourceUrl.trim()}`);
  }

  const url = new URL(`https://wa.me/${normalizedPhone}`);
  const text = lines.join("\n\n");

  if (text) {
    url.searchParams.set("text", text);
  }

  return url.toString();
}
