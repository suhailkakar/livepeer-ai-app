// @ts-nocheck
import { Livepeer } from "livepeer";
import { modeConfig } from "./modeConfig";

const livepeer = new Livepeer({
  apiKey: process.env.LIVEPEER_API_KEY,
});

const generateImage = async () => {
  const image = await livepeer.ai.textToImage({
    prompt: "A photo of a cat",
    modeConfig,
  });
};
