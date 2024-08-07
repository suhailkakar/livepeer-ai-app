import { InputGroup, Model, Pipeline } from "@/types";
import { Text, Image as ImageIcon, Video, ScanSearch } from "lucide-react";

export const GATEWAYS = {
  LIVEPEER_STUDIO: "https://livepeer.studio/api/beta/generate/",
  // In case Studio gateway is not available, we can use the Livepeer.Cloud gateway
  LIVEPEER_CLOUD: "https://dream-gateway.livepeer.cloud/",
};

const pipeline: Pipeline[] = [
  {
    id: "text-to-image",
    name: "Text To Image",
    description: "Generate images from text",
    icon: <Text className="w-5 h-5" />,
  },
  {
    name: "Image To Video",
    description: "Generate videos from images",
    id: "image-to-video",
    icon: <Video className="w-5 h-5" />,
  },
  {
    name: "Upscale",
    description: "Upscale images",
    id: "upscale",
    icon: <ScanSearch className="w-5 h-5" />,
  },
];

const models: Model[] = [
  {
    pipeline: "text-to-image",
    model_id: "SG161222/RealVisXL_V4.0_Lightning",
  },
  {
    pipeline: "text-to-image",
    model_id: "ByteDance/SDXL-Lightning",
  },
  {
    pipeline: "image-to-image",
    model_id: "timbrooks/instruct-pix2pix",
  },
  {
    pipeline: "upscale",
    model_id: "stabilityai/stable-diffusion-x4-upscaler",
  },
  {
    pipeline: "image-to-video",
    model_id: "stabilityai/stable-video-diffusion-img2vid-xt-1-1",
  },
];

const inputs: InputGroup[] = [
  {
    pipeline: "text-to-image",
    items: [
      {
        type: "select",
        for: "settings",
        name: "Model",
        id: "model_id",
        default_value: "SG161222/RealVisXL_V4.0_Lightning",
        isRequired: true,
      },
      {
        type: "textarea",
        for: "prompt",
        name: "Prompt",
        id: "prompt",
        isRequired: true,
      },
      {
        type: "textarea",
        name: "Negative Prompt",
        for: "prompt",
        id: "negative_prompt",
        isRequired: false,
        default_value:
          "bad anatomy, poorly drawn hands, extra limbs, missing limbs, poorly drawn face, fused face, cloned face,extra eyes, oversized eyes, missing fingers, , extra fingers, elongated fingers, bad photography, bad photo, aberrations, abstract, black and white, collapsed, conjoined, creative, drawing, extra windows, harsh lighting, jpeg artifacts, low saturation, monochrome, multiple levels, overexposed, oversaturated, photoshop, rotten, surreal, twisted, underexposed, unnatural, unreal engine, unrealistic, video game",
      },
      {
        type: "number",
        name: "Width",
        for: "settings",
        id: "width",
        default_value: 512,
        isRequired: true,
      },
      {
        type: "number",
        name: "Height",
        for: "settings",
        id: "height",
        default_value: 512,
        isRequired: true,
      },
      {
        type: "number",
        name: "Number of Images",
        for: "settings",
        id: "num_images_per_prompt",
        default_value: 4,
        isRequired: true,
      },
      {
        type: "number",
        name: "Generation steps",
        for: "settings",
        id: "num_inference_steps",
        default_value: 20,
        isRequired: true,
      },
      {
        type: "boolean",
        name: "Safety Check",
        for: "settings",
        id: "safety_check",
        default_value: false,
        isRequired: false,
      },
    ],
  },
  {
    pipeline: "upscale",
    items: [
      {
        type: "select",
        for: "settings",
        name: "Model",
        id: "model_id",
        default_value: "stabilityai/stable-diffusion-x4-upscaler",
        isRequired: true,
      },
      {
        type: "textarea",
        for: "prompt",
        name: "Prompt",
        default_value: "n/a",
        id: "prompt",
        isRequired: true,
      },
      {
        type: "number",
        name: "Generation steps",
        for: "settings",
        id: "num_inference_steps",
        default_value: 50,
        isRequired: true,
      },
      {
        type: "file",
        for: "settings",
        name: "image",
        id: "image",
        isRequired: true,
      },
    ],
  },
  {
    pipeline: "image-to-image",
    items: [
      {
        type: "select",
        for: "settings",
        name: "Model",
        id: "model_id",
        default_value: "timbrooks/instruct-pix2pix",
        isRequired: true,
      },
      {
        type: "file",
        for: "settings",
        name: "Image",
        id: "image",
        isRequired: true,
      },
      {
        type: "textarea",
        for: "prompt",
        name: "Prompt",
        id: "prompt",
        isRequired: true,
      },
      {
        type: "textarea",
        name: "Negative Prompt",
        for: "prompt",
        id: "negative_prompt",
        isRequired: false,
        default_value:
          "bad anatomy, poorly drawn hands, extra limbs, missing limbs, poorly drawn face, fused face, cloned face,extra eyes, oversized eyes, missing fingers, , extra fingers, elongated fingers, bad photography, bad photo, aberrations, abstract, black and white, collapsed, conjoined, creative, drawing, extra windows, harsh lighting, jpeg artifacts, low saturation, monochrome, multiple levels, overexposed, oversaturated, photoshop, rotten, surreal, twisted, underexposed, unnatural, unreal engine, unrealistic, video game",
      },
      {
        type: "number",
        name: "Strength",
        for: "settings",
        id: "strength",
        default_value: 1,
        isRequired: true,
      },
      {
        type: "number",
        name: "Number of Inference Steps",
        for: "settings",
        id: "num_inference_steps",
        default_value: 10,
        isRequired: true,
      },
      {
        type: "number",
        name: "Number of Images",
        for: "settings",
        id: "num_images_per_prompt",
        default_value: 2,
        isRequired: true,
      },
      {
        type: "number",
        name: "Guidance Scale",
        for: "settings",
        id: "guidance_scale",
        default_value: 1,
        isRequired: true,
      },
      {
        type: "boolean",
        name: "Safety Check",
        for: "settings",
        id: "safety_check",
        default_value: false,
        isRequired: false,
      },
    ],
  },
  {
    pipeline: "image-to-video",
    items: [
      {
        type: "select",
        for: "settings",
        name: "Model",
        id: "model_id",
        default_value: "stabilityai/stable-video-diffusion-img2vid-xt-1-1",
        isRequired: true,
      },
      {
        type: "number",
        name: "Width",
        for: "settings",
        id: "width",
        default_value: 1024,
        isRequired: true,
      },
      {
        type: "number",
        name: "Height",
        for: "settings",
        id: "height",
        default_value: 576,
        isRequired: true,
      },
      {
        type: "number",
        name: "Frames Per Second",
        for: "settings",
        id: "fps",
        default_value: 6,
        isRequired: true,
      },
      {
        type: "number",
        name: "Motion Bucket ID",
        for: "settings",
        id: "motion_bucket_id",
        default_value: 127,
        isRequired: true,
      },
      {
        type: "number",
        name: "Noise Aug Strength",
        for: "settings",
        id: "noise_aug_strength",
        default_value: 0.002,
        isRequired: true,
      },
      {
        type: "boolean",
        name: "Safety Check",
        for: "settings",
        id: "safety_check",
        default_value: false,
        isRequired: false,
      },
      {
        type: "file",
        for: "settings",
        name: "Image",
        id: "image",
        isRequired: true,
      },
    ],
  },
];

export { pipeline, models, inputs };
