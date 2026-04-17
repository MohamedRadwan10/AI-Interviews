import { NextResponse } from "next/server";

const BACKEND_BASE_URL = "https://intellhire.runasp.net/api";

async function handler(request, { params }) {
  try {
    const { path } = await params;
    const segments = Array.isArray(path) ? path : [path];
    const backendPath = segments.join("/");

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const targetUrl = `${BACKEND_BASE_URL}/${backendPath}${queryString ? `?${queryString}` : ""}`;

    const forwardHeaders = new Headers();
    for (const [key, value] of request.headers.entries()) {
      const lk = key.toLowerCase();
      // Skip headers that should be handled by the fetch call itself
      if (["host", "origin", "referer", "content-length"].includes(lk)) continue;
      forwardHeaders.set(key, value);
    }

    let body = null;
    if (!["GET", "HEAD"].includes(request.method)) {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("multipart/form-data")) {
        // For multipart data, we must pass the body as a blob/arrayBuffer 
        // to prevent encoding issues with request.text()
        body = await request.arrayBuffer();
      } else {
        body = await request.text();
      }
    }

    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: body || undefined,
      cache: "no-store",
    });

    const responseBody = await backendResponse.arrayBuffer();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type": backendResponse.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error("[Proxy] Error:", error);
    return NextResponse.json(
      { error: "Proxy request failed", detail: error.message },
      { status: 502 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
