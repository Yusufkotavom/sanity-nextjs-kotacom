import { createClient } from "@sanity/client";

export function getSanityClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn = false,
}: {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn?: boolean;
}) {
  if (!projectId || !dataset) {
    throw new Error("Sanity projectId/dataset missing");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  });
}
