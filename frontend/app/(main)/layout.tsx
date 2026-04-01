import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import ReusableSlotSections from "@/components/reusable-slot-sections";
import { fetchSanityReusableSections } from "@/sanity/lib/fetch";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reusableSections = await fetchSanityReusableSections();

  return (
    <>
      <ReusableSlotSections sections={reusableSections} slot="beforeHeader" />
      <Header />
      <ReusableSlotSections sections={reusableSections} slot="afterHeader" />
      <main>{children}</main>
      <ReusableSlotSections sections={reusableSections} slot="beforeFooter" />
      <Footer />
      <ReusableSlotSections sections={reusableSections} slot="afterFooter" />
      <FloatingWhatsApp />
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
