import { NextResponse } from "next/server";

const PROJECT_TYPES = [
  "Website",
  "Mobile app",
  "AI automation",
  "Embedded programming",
];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, projectType, message } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (
    typeof name !== "string" ||
    name.trim().length === 0 ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof projectType !== "string" ||
    !PROJECT_TYPES.includes(projectType) ||
    typeof message !== "string" ||
    message.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "All fields are required and email must be valid." },
      { status: 400 },
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("Contact form: WEB3FORMS_ACCESS_KEY is not set.");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New inquiry: ${projectType} — ${name.trim()}`,
        from_name: "Yugam Labs website",
        name: name.trim(),
        email,
        project_type: projectType,
        message: message.trim(),
      }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      console.error("Contact form: delivery failed.", data.message);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Contact form: delivery failed.", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
