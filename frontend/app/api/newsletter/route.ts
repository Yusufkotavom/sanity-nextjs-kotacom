import { Resend } from "resend";

export const POST = async (request: Request) => {
  const { email } = await request.json();
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return Response.json(
      { error: "Newsletter service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  // Create contact
  try {
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { error: "Error subscribing to updates" },
      { status: 400 }
    );
  }
};
