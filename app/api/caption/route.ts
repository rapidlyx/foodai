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
              image_url: {
                url: imageURL,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const result = response.choices[0].message.content;

    return NextResponse.json({ caption: result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
