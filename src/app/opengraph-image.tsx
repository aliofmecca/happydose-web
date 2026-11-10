import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { strings } from "@/constants/strings";

export const runtime = "nodejs";
export const alt = strings.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Embed the logo file as base64 so it renders inside the OG image
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          backgroundColor: "#fff9f5",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 105, 21, 0.18) 0%, transparent 60%), linear-gradient(180deg, #fff9f5 0%, #ffe9d6 100%)",
        }}
      >
        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          <img src={logoBase64} alt="" width={80} height={80} />
          <span
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#1a0f08",
              letterSpacing: "-1.5px",
            }}
          >
            {strings.brand.name}
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#1a0f08",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "1000px",
              letterSpacing: "-2px",
            }}
          >
            {strings.hero.titleBefore}
          </h1>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ff6915",
              fontStyle: "italic",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "1000px",
              letterSpacing: "-2px",
            }}
          >
            {strings.hero.titleHighlight}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "26px",
            color: "rgba(26, 15, 8, 0.7)",
            textAlign: "center",
            maxWidth: "850px",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {strings.meta.ogDescription}
        </p>
      </div>
    ),
    { ...size },
  );
}
