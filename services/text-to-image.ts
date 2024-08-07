import { GATEWAYS } from "@/lib/constants";
import { Payload } from "@/types";

const textToImage = async (payload: Payload) => {
  if (!payload.prompt) {
    throw new Error("prompt is required");
  }

  const filteredBody = Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value)
  );

  delete filteredBody.pipeline;

  try {
    const res = await fetch(GATEWAYS.LIVEPEER_STUDIO + "text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_STUDIO_API_KEY}`,
      },
      body: JSON.stringify(filteredBody),
    });

    if (!res.ok) {
      throw new Error(`error ${res.status}`);
    }
    const data = await res.json();
    return data.images;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export default textToImage;
