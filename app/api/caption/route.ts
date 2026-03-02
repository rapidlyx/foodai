import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (req: Request) => {
  try {
    const { prompt, imageURL } = await req.json();
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt || "mongol heleer tailbarlajbichne uu",
            },
            {
              type: "image_url",
              image_url: imageURL || "https://example.com/image.jpg",
            },
          ],
        },
      ],
      max_tokens: 500,
    });
    return NextResponse.json({ result: "zxc" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid" }, { status: 500 });
  }
};
