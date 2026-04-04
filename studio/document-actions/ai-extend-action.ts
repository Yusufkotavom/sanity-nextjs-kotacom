import type { DocumentActionComponent, SanityDocumentLike } from "sanity";

type ExtendActionProps = {
  id: string;
  type: string;
  draft?: SanityDocumentLike | null;
  published?: SanityDocumentLike | null;
  onComplete: () => void;
};

function getFrontendBaseUrl() {
  const fromEnv = process.env.SANITY_STUDIO_PREVIEW_URL;
  return (fromEnv || "http://localhost:3000").replace(/\/+$/, "");
}

function getActionSecret() {
  return process.env.SANITY_STUDIO_AI_WRITER_ACTION_SECRET || "";
}

const SUPPORTED_TYPES = new Set(["post", "service", "project"]);

export const aiExtendAction: DocumentActionComponent = (props) => {
  const typed = props as unknown as ExtendActionProps;
  const { type, draft, published, onComplete } = typed;

  if (!SUPPORTED_TYPES.has(type)) {
    return null;
  }

  const document = (draft || published) as Record<string, unknown> | undefined;

  return {
    label: "AI Extend",
    tone: "caution",
    disabled: !document,
    onHandle: async () => {
      if (!document) {
        onComplete();
        return;
      }

      const instruction =
        window.prompt(
          "Instruksi tambahan untuk extend (opsional, kosongkan untuk default):",
          "",
        ) || "";

      try {
        const response = await fetch(`${getFrontendBaseUrl()}/api/ai/rewrite/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(getActionSecret()
              ? { "x-ai-writer-action-secret": getActionSecret() }
              : {}),
          },
          body: JSON.stringify({
            id: typed.id,
            type: typed.type,
            instruction,
            document,
            mode: "extend",
          }),
        });

        const json = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          message?: string;
        };

        if (!response.ok || !json.ok) {
          throw new Error(json.message || "AI extend failed");
        }

        window.alert("AI extend applied to draft. Refreshing document.");
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "AI extend failed");
      } finally {
        onComplete();
      }
    },
  };
};