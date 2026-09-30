import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} | Gen AI Engineer & Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 72,
          background: "#0d0e11",
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(59,130,246,0.35), transparent 55%)",
          color: "#f9fafb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            BK
          </div>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#9ca3af" }}>bhautik.co.in</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 38, color: "#3b82f6", fontWeight: 700 }}>Gen AI Engineer & Full-Stack Developer</div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#9ca3af", maxWidth: 900 }}>
            RAG pipelines · AI agents · .NET, Node, React & Angular
          </div>
        </div>
      </div>
    ),
    size,
  );
}
