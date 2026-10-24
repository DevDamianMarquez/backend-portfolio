import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, rendered at build time. Uses the default font so it never needs a network fetch.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1119",
          color: "#edf1f6",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#93a1b4" }}>{site.url.replace("https://", "")}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 38, color: "#edf1f6" }}>{site.title}</div>
          <div style={{ display: "flex", width: 140, height: 8, marginTop: 36, background: "#ffd43b", borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#93a1b4" }}>
          Python · FastAPI · PostgreSQL · LLM integrations · {site.location}
        </div>
      </div>
    ),
    size,
  );
}
