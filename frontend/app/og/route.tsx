import { ImageResponse } from "next/og";

export const runtime = "edge";

// Dynamic branded social/hero image with WhatsApp CTA.
// /og?title=...&sub=...&tag=kotacom.id
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Kotacom — Percetakan & Solusi Digital").slice(0, 110);
  const sub = (searchParams.get("sub") || "Cetak buku, kalender, website & software").slice(0, 150);
  const tag = (searchParams.get("tag") || "kotacom.id").slice(0, 40);
  const titleSize = title.length > 78 ? 50 : title.length > 52 ? 58 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#121212",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "20px", height: "20px", background: "#D02020" }} />
          <div
            style={{
              color: "#F0C020",
              fontSize: "30px",
              fontWeight: 900,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            color: "#FFFFFF",
            fontSize: `${titleSize}px`,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-1px",
            display: "flex",
            maxWidth: "1050px",
          }}
        >
          {title}
        </div>

        <div style={{ marginTop: "20px", color: "#B5B5B5", fontSize: "30px", display: "flex", maxWidth: "1050px" }}>
          {sub}
        </div>

        <div style={{ marginTop: "38px", display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              background: "#1040C0",
              color: "#FFFFFF",
              fontSize: "28px",
              fontWeight: 700,
              padding: "14px 30px",
            }}
          >
            Chat WhatsApp &rarr;
          </div>
          <div
            style={{
              display: "flex",
              background: "#F0C020",
              color: "#121212",
              fontSize: "28px",
              fontWeight: 700,
              padding: "14px 30px",
            }}
          >
            0857-9952-0350
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
