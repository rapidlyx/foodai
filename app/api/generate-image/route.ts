import { openaiTextToImage } from "@/lib/openai-image-generate";
import { error } from "console";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  const buffer = await openaiTextToImage(prompt);

  if (!buffer) {
    return NextResponse.json(
      { error: "Failed to generate image!" },
      { status: 500 },
    );
  }

  const base64Image = buffer.toString("base64");

  return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
};
