import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const user = body.user;

    if (!user) {
      return NextResponse.json({ error: "User is required" }, { status: 400 });
    }

    const secret = process.env.CHATBOT_IDENTITY_SECRET;
    
    if (!secret) {
      return NextResponse.json({ 
        customerIdentity: user.email || user.id || "anonymous"
      }, { status: 200 });
    }

    const customerIdentity = user.email || user.id || "anonymous";

    const userHash = crypto
      .createHmac("sha256", secret)
      .update(customerIdentity)
      .digest("hex");

    return NextResponse.json({ 
      customerIdentity,
      userHash 
    }, { status: 200 });

  } catch (error) {
    console.error("Chatbase Auth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
