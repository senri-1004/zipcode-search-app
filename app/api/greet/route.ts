import { greet } from "@/handlers/greet";
import { NextRequest, NextResponse } from "next/server";

function getName(request: NextRequest, body?: { name?: unknown }): string | null {
  const queryName = request.nextUrl.searchParams.get("name");
  if (typeof queryName === "string" && queryName.length > 0) {
    return queryName;
  }

  if (typeof body?.name === "string" && body.name.length > 0) {
    return body.name;
  }

  return null;
}

async function handleGreet(request: NextRequest, body?: { name?: unknown }) {
  const name = getName(request, body);

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  return new Response(greet({ name }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  return handleGreet(request);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return handleGreet(request, body);
}
