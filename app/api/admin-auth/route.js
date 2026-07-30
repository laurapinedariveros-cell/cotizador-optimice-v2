export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD || "Optimice2026";
  const ok = typeof password === "string" && password === expected;
  return Response.json({ ok });
}
