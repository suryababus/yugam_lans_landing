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

  // Placeholder: wire this to your email provider (Resend, SES) or CRM.
  console.log("Contact inquiry:", { name, email, projectType });

  return NextResponse.json({ ok: true });
}
