import { createClient } from "@sanity/client";
import { Buffer } from "buffer";

async function run() {
  console.log("Starting Sanity test upload...");
  
  const client = createClient({
    projectId: "b017f7tl",
    dataset: "production",
    token: "skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC",
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  // Create a minimal transparent 1x1 png image
  const minimalPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=",
    "base64"
  );
  
  try {
    console.log("Uploading small PNG buffer to Sanity...");
    const asset = await client.assets.upload("image", minimalPng, {
      filename: "test-upload.png",
      title: "Test CLI Upload",
    });
    console.log("Upload successful!");
    console.log("Asset ID:", asset._id);
    console.log("Asset URL:", asset.url);
  } catch (error) {
    console.error("Upload failed!");
    console.error(error);
  }
}

run();
