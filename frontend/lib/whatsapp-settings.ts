import { cache } from "react";
import { fetchSanitySettings } from "@/sanity/lib/fetch";

export const getGlobalWhatsAppSettings = cache(async () => {
  const settings = await fetchSanitySettings();
  return settings?.whatsApp || null;
});
