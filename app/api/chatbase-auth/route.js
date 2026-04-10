const jwt = require("jsonwebtoken");
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const user = body.user;

    if (!user) {
      return NextResponse.json({ error: "User is required" }, { status: 400 });
    }

    const secret = process.env.CHATBOT_IDENTITY_SECRET;
    
    if (!secret) {
      return NextResponse.json({ error: "Secret is missing" }, { status: 500 });
    }

    const token = jwt.sign(
      {
        user_id: user.id || user.userId || user.email, 
        email: user.email,
        name: user.name,
      },
      secret,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Chatbase Auth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
