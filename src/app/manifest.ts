import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gimmir",
    short_name: "Gimmir",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F4EE",
    theme_color: "#C9F23D",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
