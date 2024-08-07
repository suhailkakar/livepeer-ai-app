import { GATEWAYS } from "@/lib/constants";
import { Payload } from "@/types";

const upscale = async (payload: { [key: string]: any }) => {
  const formData = new FormData();

  for (const key in payload) {
    if (key !== "pipeline") {
      formData.append(key, payload[key]);
    }
  }

  try {
    const res = await fetch(GATEWAYS.LIVEPEER_CLOUD + "upscale", {
      method: "POST",
      body: formData,
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

export default upscale;
