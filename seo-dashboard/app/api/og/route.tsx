import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get("title") || "Untitled";
    const description = searchParams.get("description") || "";
    const template = searchParams.get("template") || "default";
    const width = parseInt(searchParams.get("width") || "1200");
    const height = parseInt(searchParams.get("height") || "630");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            backgroundImage: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
            padding: "40px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "60px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                background: "linear-gradient(to bottom right, #1e293b, #475569)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1.2,
                textAlign: "center",
                marginBottom: "20px",
                display: "flex",
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: 28,
                  color: "#64748b",
                  textAlign: "center",
                  lineHeight: 1.4,
                  display: "flex",
                }}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
