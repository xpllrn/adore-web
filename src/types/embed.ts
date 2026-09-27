export type Mode = "embed" | "container";

export type EmbedField = {
  id: number;
  name: string;
  value: string;
  inline: boolean;
};

export type MessageButton = {
  id: number;
  label: string;
  url?: string;
  style?: "primary" | "secondary" | "success" | "danger" | "link";
  disabled?: boolean;
  emoji?: string;
};

export type Block =
  | { id: number; type: "text"; text: string }
  | {
      id: number;
      type: "section";
      text: string;
      accessory: "thumbnail" | "button";
      url: string;
      label: string;
    }
  | { id: number; type: "separator" }
  | { id: number; type: "image"; url: string; description: string }
  | { id: number; type: "gallery"; images: { id: number; url: string; description: string }[] };

export type EmbedState = {
  title: string;
  description: string;
  color: string;
  authorName: string;
  authorIcon: string;
  authorUrl: string;
  thumbnail: string;
  image: string;
  footer: string;
  footerIcon: string;
  timestamp: boolean;
  fields: EmbedField[];
};

export const initialEmbed: EmbedState = {
  title: "Welcome to the community",
  description: "Read the rules, choose your roles, and make yourself at home.",
  color: "#8b8d92",
  authorName: "",
  authorIcon: "",
  authorUrl: "",
  thumbnail: "",
  image: "",
  footer: "Powered by adore",
  footerIcon: "",
  timestamp: false,
  fields: [],
};
