import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { isSupportedImageType, schema } from "@/app/utils";


export async function POST(req: Request) {
	const base64 = await req.json();
	if (typeof base64 !== "string")
		return new Response("Invalid image data", { status: 400 });

	// roughly 4.5MB in base64
	if (base64.length > 6_464_471) {
		return new Response("Image too large, maximum file size is 4.5MB.", {
			status: 400,
		});
	}

	const { mediaType, image } = decodeBase64Image(base64);

	if (!mediaType || !image)
		return new Response("Invalid image data", { status: 400 });

	if (!isSupportedImageType(mediaType)) {
		return new Response(
			"Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported.",
			{ status: 400 }
		);
	}

	const result = await generateObject({
		model: google("gemini-2.5-flash"),
		maxOutputTokens: 8192,
		schema,
		providerOptions: {
			google: {
				thinkingConfig: {
					thinkingBudget: 0,
				},
			},
		},
		system:
			"Analyze the image and return ONLY a valid JSON object matching the schema. No explanations, no markdown, no code fences, no text before or after the JSON.",
		messages: [
			{
				role: "user",
				content: [
					{
						type: "image",
						image,
						mediaType,
					},
				],
			},
		],
	});

	return Response.json(result.object);
}

function decodeBase64Image(dataString: string) {
	const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

	return {
		mediaType: matches?.[1],
		image: matches?.[2],
	};
}
