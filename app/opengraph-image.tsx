import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "white",
          padding: 72,
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(45,195,255,.35), transparent 28%), radial-gradient(circle at 82% 28%, rgba(151,71,255,.32), transparent 28%), linear-gradient(135deg, rgba(255,255,255,.08), transparent 44%)"
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              border: "1px solid rgba(255,255,255,.22)",
              borderRadius: 8,
              background: "rgba(255,255,255,.08)"
            }}
          >
            PR
          </div>
          <div style={{ fontSize: 30, opacity: 0.72 }}>Digital Portfolio</div>
        </div>
        <div style={{ zIndex: 1 }}>
          <div style={{ fontSize: 86, fontWeight: 700 }}>{siteConfig.portfolio.person.fullName}</div>
          <div style={{ marginTop: 18, fontSize: 38, color: "#8eeaff" }}>
            {siteConfig.portfolio.person.headline} · AI Enthusiast · Problem Solver
          </div>
        </div>
      </div>
    ),
    size
  );
}
