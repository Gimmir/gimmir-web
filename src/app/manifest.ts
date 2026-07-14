import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gimmir",
    short_name: "Gimmir",
    start_url: "/",
    display: "standalone",
  };
}
