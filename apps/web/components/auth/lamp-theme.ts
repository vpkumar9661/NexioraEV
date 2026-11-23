export type LampColorId = "green" | "cyan" | "pink" | "amber" | "white";

export interface LampColorTheme {
  id: LampColorId;
  name: string;
  hex: string;
  rgb: string; // for rgba usage
  glow: string;
  accent: string;
  buttonText: string;
  buttonGradient: string;
}

export const LAMP_THEMES: Record<LampColorId, LampColorTheme> = {
  green: {
    id: "green",
    name: "NexioraEV Green",
    hex: "#00E676",
    rgb: "0, 230, 118",
    glow: "rgba(0, 230, 118, 0.28)",
    accent: "#00E676",
    buttonText: "#050A12",
    buttonGradient: "linear-gradient(135deg, #00E676 0%, #00B0FF 100%)",
  },
  cyan: {
    id: "cyan",
    name: "Electric Cyan",
    hex: "#00D4FF",
    rgb: "0, 212, 255",
    glow: "rgba(0, 212, 255, 0.28)",
    accent: "#00D4FF",
    buttonText: "#050A12",
    buttonGradient: "linear-gradient(135deg, #00D4FF 0%, #0088FF 100%)",
  },
  pink: {
    id: "pink",
    name: "Electric Pink",
    hex: "#F23880",
    rgb: "242, 56, 128",
    glow: "rgba(242, 56, 128, 0.28)",
    accent: "#F23880",
    buttonText: "#FFFFFF",
    buttonGradient: "linear-gradient(135deg, #F23880 0%, #D81B60 100%)",
  },
  amber: {
    id: "amber",
    name: "Warm Amber",
    hex: "#FFB547",
    rgb: "255, 181, 71",
    glow: "rgba(255, 181, 71, 0.28)",
    accent: "#FFB547",
    buttonText: "#050A12",
    buttonGradient: "linear-gradient(135deg, #FFB547 0%, #FF8F00 100%)",
  },
  white: {
    id: "white",
    name: "Neutral White",
    hex: "#E5E7EB",
    rgb: "229, 231, 235",
    glow: "rgba(229, 231, 235, 0.24)",
    accent: "#FFFFFF",
    buttonText: "#050A12",
    buttonGradient: "linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)",
  },
};
