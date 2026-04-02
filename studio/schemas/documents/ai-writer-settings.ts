import { defineArrayMember, defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aiWriterSettings",
  title: "AI Writer Settings",
  type: "document",
  icon: Sparkles,
  fields: [
    defineField({
      name: "enabled",
      title: "Enable AI Writer",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "mode",
      title: "Provider Mode",
      type: "string",
      initialValue: "gateway",
      options: {
        list: [
          { title: "Vercel AI Gateway", value: "gateway" },
          { title: "Direct Gemini (Key Rotation)", value: "direct-gemini" },
          { title: "Direct Groq (Key Rotation)", value: "direct-groq" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "defaultModel",
      title: "Default Model",
      type: "string",
      initialValue: "openai/gpt-5.4",
      description:
        "Use provider/model format for gateway mode, for example openai/gpt-5.4 or google/gemini-2.5-flash.",
    }),
    defineField({
      name: "fallbackModels",
      title: "Fallback Models",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { sortable: true },
      description:
        "Optional fallback model chain for gateway mode. Use provider/model IDs.",
    }),
    defineField({
      name: "gatewayProviderOrder",
      title: "Gateway Provider Order",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { sortable: true },
      description:
        "Optional provider priority for gateway routing, for example google, openai, anthropic.",
    }),
    defineField({
      name: "temperature",
      title: "Temperature",
      type: "number",
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(2),
    }),
    defineField({
      name: "maxOutputTokens",
      title: "Max Output Tokens",
      type: "number",
      initialValue: 1400,
      validation: (Rule) => Rule.min(128).max(8192),
    }),
    defineField({
      name: "gatewayApiKeyEncrypted",
      title: "AI Gateway API Key (Encrypted)",
      type: "string",
      description:
        "Managed by API endpoint. Leave empty when using OIDC token (recommended).",
    }),
    defineField({
      name: "geminiApiKeysEncrypted",
      title: "Gemini API Keys (Encrypted)",
      type: "text",
      rows: 4,
      description:
        "Managed by API endpoint. Stores encrypted newline list for direct-gemini key rotation.",
    }),
    defineField({
      name: "groqApiKeysEncrypted",
      title: "Groq API Keys (Encrypted)",
      type: "text",
      rows: 4,
      description:
        "Managed by API endpoint. Stores encrypted newline list for direct-groq key rotation.",
    }),
    defineField({
      name: "prompts",
      title: "Prompt Templates",
      type: "object",
      fields: [
        defineField({
          name: "globalSystem",
          title: "Global System Prompt",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "postRewrite",
          title: "Post Rewrite Prompt",
          type: "text",
          rows: 6,
        }),
        defineField({
          name: "serviceRewrite",
          title: "Service Rewrite Prompt",
          type: "text",
          rows: 6,
        }),
        defineField({
          name: "projectRewrite",
          title: "Project Rewrite Prompt",
          type: "text",
          rows: 6,
        }),
      ],
    }),
    defineField({
      name: "notes",
      title: "Ops Notes",
      type: "text",
      rows: 4,
      description: "Do not store raw API keys in notes.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "AI Writer Settings",
        subtitle: "Provider mode, model routing, prompts, and encrypted key pools",
      };
    },
  },
});
