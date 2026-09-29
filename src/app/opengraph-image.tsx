import { ImageResponse } from "next/og";

export const alt = "Shubham Singh — AI Engineer & GenAI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "linear-gradient(135deg, #070b10 0%, #0b1118 60%, #083344 100%)",
        color: "#e6edf3",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            background: "#22d3ee",
            borderRadius: "50%",
          }}
        />
        <span style={{ color: "#22d3ee", fontSize: 28 }}>
          ~/shubham $ whoami
        </span>
      </div>
      <div
        style={{
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 20,
        }}
      >
        Shubham Singh
      </div>
      <div style={{ fontSize: 36, color: "#67e8f9", marginBottom: 32 }}>
        Aspiring Machine Learning Engineer · GenAI · Cloud AI
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {[
          "MuRIL · FinBERT NLP",
          "RAG Chatbots",
          "GCP Arcade Champion",
          "CodeVita Top 1500",
        ].map((t) => (
          <div
            key={t}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(34,211,238,0.4)",
              color: "#b6c2cf",
              fontSize: 22,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
