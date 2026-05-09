import { NextResponse } from "next/server";

const BACKEND_BASE_URL = "https://intellhire.runasp.net/api";

async function handler(request, { params }) {
  try {
    const { path } = await params;
    const segments = Array.isArray(path) ? path : [path];
    const backendPath = segments.join("/");

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    // Special case for endpoints that are not under the /api prefix (like /selfie or /CheckJobMatch)
    const targetUrl = (segments[0] === "selfie" || segments[0] === "CheckJobMatch")
      ? `https://intellhire.runasp.net/${backendPath}${queryString ? `?${queryString}` : ""}`
      : `${BACKEND_BASE_URL}/${backendPath}${queryString ? `?${queryString}` : ""}`;

    const forwardHeaders = new Headers();
    for (const [key, value] of request.headers.entries()) {
      const lk = key.toLowerCase();
      if (["host", "origin", "referer", "content-length"].includes(lk)) continue;
      forwardHeaders.set(key, value);
    }

    let body = null;
    let contentType = request.headers.get("content-type") || "";

    if (!["GET", "HEAD"].includes(request.method)) {
      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        body = formData;
        forwardHeaders.delete("content-type");
      } else if (contentType.includes("application/json")) {
        body = await request.text();
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
