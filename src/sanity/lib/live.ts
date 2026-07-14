import { defineLive } from "next-sanity/live";

import { apiVersion } from "../env";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion }),
  serverToken: token,
  browserToken: token,
});
