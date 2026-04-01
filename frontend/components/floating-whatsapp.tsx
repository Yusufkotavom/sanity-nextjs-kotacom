import { fetchSanitySettings } from "@/sanity/lib/fetch";
import FloatingWhatsAppClient from "@/components/floating-whatsapp-client";

export default async function FloatingWhatsApp() {
  const settings = (await fetchSanitySettings()) as any;
  const whatsApp = settings?.whatsApp;

  if (!whatsApp?.enabled || !whatsApp?.phoneNumber) return null;

  return (
    <FloatingWhatsAppClient
      phoneNumber={whatsApp.phoneNumber}
      predefinedText={whatsApp.predefinedText}
      ctaText={whatsApp.ctaText}
      enableAnimation={whatsApp.enableAnimation}
      sourceUrl={whatsApp.sourceUrl}
    />
  );
}
