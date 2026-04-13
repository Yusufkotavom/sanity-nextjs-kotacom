import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const FALLBACK_OG_IMAGE_URL =
  "https://www.kotacom.id/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fb017f7tl%2Fproduction%2Fadbb1e64ffa7b2b719d8c705aff151901082526e-1024x1024.jpg%3Fw%3D960%26fm%3Dwebp%26q%3D75%26fit%3Dcrop&w=828&q=75";

const LOGO_URL =
  "https://cdn.sanity.io/images/b017f7tl/production/53f4340b4153bacc7e593584daad4d6a94f78a3f-1857x427.png?rect=0,0,430,427&fm=png&q=90&fit=crop";

const GEIST_FONT_BASE_URL =
  "https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-sans";

let geistRegularFontPromise: Promise<ArrayBuffer | null> | null = null;
let geistSemiBoldFontPromise: Promise<ArrayBuffer | null> | null = null;
let geistBoldFontPromise: Promise<ArrayBuffer | null> | null = null;

function truncateText(input: string, max: number): string {
  return input.length > max ? `${input.substring(0, max)}…` : input;
}

function isSafeRemoteImageUrl(value: string | null): value is string {
  if (!value) return false;

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:") return false;
    return true;
  } catch {
    return false;
  }
}

async function loadGeistFont(
  weight: "Regular" | "SemiBold" | "Bold"
): Promise<ArrayBuffer | null> {
  const fontUrl = `${GEIST_FONT_BASE_URL}/Geist-${weight}.ttf`;
  try {
    const response = await fetch(fontUrl, { cache: "force-cache" });
    if (!response.ok) return null;
    return response.arrayBuffer();
  } catch {
    return null;
  }
}

async function getGeistRegularFontData(): Promise<ArrayBuffer | null> {
  geistRegularFontPromise ??= loadGeistFont("Regular");
  return geistRegularFontPromise;
}

async function getGeistSemiBoldFontData(): Promise<ArrayBuffer | null> {
  geistSemiBoldFontPromise ??= loadGeistFont("SemiBold");
  return geistSemiBoldFontPromise;
}

async function getGeistBoldFontData(): Promise<ArrayBuffer | null> {
  geistBoldFontPromise ??= loadGeistFont("Bold");
  return geistBoldFontPromise;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const rawTitle = searchParams.get("title") || "Kotacom.id";
    const title = truncateText(rawTitle, 72);
    const description = searchParams.get("description") || "";
    const safeDesc = truncateText(description, 96);

    const width = parseInt(searchParams.get("width") || "1200");
    const height = parseInt(searchParams.get("height") || "630");

    const titleSize =
      title.length > 64 ? 42 : title.length > 54 ? 46 : title.length > 44 ? 50 : 56;
    const explicitImage = searchParams.get("image");
    const chosenImage = (isSafeRemoteImageUrl(explicitImage) && explicitImage) || FALLBACK_OG_IMAGE_URL;
    const [geistRegular, geistSemiBold, geistBold] = await Promise.all([
      getGeistRegularFontData(),
      getGeistSemiBoldFontData(),
      getGeistBoldFontData(),
    ]);
    const ogFonts = [
      geistRegular && {
        name: "Geist",
        data: geistRegular,
        style: "normal" as const,
        weight: 400 as const,
      },
      geistSemiBold && {
        name: "Geist",
        data: geistSemiBold,
        style: "normal" as const,
        weight: 600 as const,
      },
      geistBold && {
        name: "Geist",
        data: geistBold,
        style: "normal" as const,
        weight: 700 as const,
      },
    ].filter(Boolean) as Array<{
      name: string;
      data: ArrayBuffer;
      style: "normal";
      weight: 400 | 600 | 700;
    }>;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eef3f7",
            position: "relative",
          }}
        >
          {/* Soft background accents */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              backgroundImage:
                "radial-gradient(circle at 10% 10%, rgba(99,102,241,0.16), transparent 45%), radial-gradient(circle at 88% 70%, rgba(14,165,233,0.18), transparent 40%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              backgroundImage:
                "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: 0.9,
            }}
          />

          {/* Split card */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
              width: "1080px",
              height: "540px",
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
              border: "1px solid rgba(148,163,184,0.28)",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(248,250,255,0.98) 58%, rgba(239,246,255,0.98) 100%)",
            }}
          >
            <div
              style={{
                width: "56%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "50px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  backgroundImage:
                    "linear-gradient(rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.07) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LOGO_URL}
                    alt="Kotacom"
                    width="58"
                    height="58"
                    style={{
                      width: "52px",
                      height: "52px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      fontSize: 36,
                      color: "#0f172a",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      fontFamily: "Geist",
                    }}
                  >
                    kotacom
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: titleSize,
                    fontWeight: 900,
                    color: "#0f172a",
                    lineHeight: 1.05,
                    textAlign: "left",
                    letterSpacing: "-0.035em",
                    fontFamily: "Geist",
                    maxHeight: "250px",
                    overflow: "hidden",
                  }}
                >
                  {title}
                </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: "#475569",
                  lineHeight: 1.45,
                  textAlign: "left",
                  maxWidth: "92%",
                  fontFamily: "Geist",
                  maxHeight: "92px",
                  overflow: "hidden",
                }}
              >
                {safeDesc}
              </div>
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 19,
                  color: "#ffffff",
                  backgroundColor: "#000000",
                  padding: "10px 16px",
                  borderRadius: "0px",
                  fontWeight: 700,
                  fontFamily: "Geist",
                  alignSelf: "flex-start",
                  letterSpacing: "-0.01em",
                  position: "relative",
                  marginTop: "12px",
                }}
              >
                WA 085799520350 · kotacom.id
              </div>
            </div>

            <div
              style={{
                width: "44%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "28px",
                background:
                  "linear-gradient(130deg, rgba(15,23,42,0.96), rgba(30,41,59,0.9) 50%, rgba(37,99,235,0.72))",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 14px 36px rgba(2,6,23,0.46)",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={chosenImage}
                  alt=""
                  width={520}
                  height={520}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    background:
                      "linear-gradient(180deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.32) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
        fonts: ogFonts,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
