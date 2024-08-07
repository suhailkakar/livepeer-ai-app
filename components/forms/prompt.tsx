"use client";

import React from "react";
import { Text, Image, Video, ScanSearch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import textToImage from "@/services/text-to-image";
import { InputGroup, Model, Pipeline, InputField } from "@/types";
import { useAppContext } from "@/context";
import { OutputDisplay } from "../output";

const pipeline: Pipeline[] = [
  {
    id: "text-to-image",
    name: "Text To Image",
    description: "Generate images from text",
    icon: <Text className="w-5 h-5" />,
  },
  {
    name: "Image To Image",
    description: "Generate images from images",
    id: "image-to-image",
    icon: <Image className="w-5 h-5" />,
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
        type: "file",
        for: "settings",
        name: "image",
        id: "image",
        isRequired: true,
      },
    ],
  },
];

export default function Hero() {
  const { payload, setPayload, setOutput, isLoading, setIsLoading } =
    useAppContext();

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      let res;
      switch (payload.pipeline) {
        case "text-to-image":
          res = await textToImage(payload);
          break;
        // Add other cases for different pipelines
        default:
          break;
      }
      setOutput(res);
    } catch (error) {
      console.error("Error generating output:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setPayload((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const renderInput = (input: InputField) => {
    switch (input.type) {
      case "number":
        return (
          <Input
            type="number"
            id={input.id}
            name={input.id}
            defaultValue={Number(input.default_value)}
            onChange={handleChange}
          />
        );
      case "boolean":
        return (
          <Switch
            id={input.id}
            name={input.id}
            defaultChecked={Boolean(input.default_value)}
            onCheckedChange={(checked) =>
              setPayload((prev) => ({ ...prev, [input.id]: checked }))
            }
          />
        );
      case "select":
        if (input.id === "model_id") {
          return (
            <Select
              defaultValue={input.default_value}
              onValueChange={(value) =>
                setPayload((prev) => ({ ...prev, model_id: value }))
              }
            >
              <SelectTrigger
                id="model_id"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models
                  .filter((item) => item.pipeline === payload.pipeline)
                  .map((item) => (
                    <SelectItem key={item.model_id} value={item.model_id}>
                      <div className="flex items-start text-muted-foreground">
                        <div className="grid">
                          <p>{item.model_id}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          );
        }
        return null;
      case "file":
        return (
          <Input
            type="file"
            accept="image/*"
            id={input.id}
            name={input.id}
            onChange={handleChange}
          />
        );
      case "textarea":
        return (
          <Textarea
            id={input.id}
            name={input.id}
            defaultValue={input.default_value as string}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col md:flex-row flex-1 gap-4 overflow-auto mt-4">
      <div className="flex flex-col md:w-1/3">
        <form
          onSubmit={handleGenerate}
          className="grid w-full items-start gap-6 "
        >
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="pipeline">Pipeline</Label>
              <Select
                defaultValue={payload.pipeline}
                onValueChange={(value) =>
                  setPayload((prev) => ({ ...prev, pipeline: value }))
                }
              >
                <SelectTrigger
                  id="pipeline"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a pipeline" />
                </SelectTrigger>
                <SelectContent>
                  {pipeline.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      <div className="flex items-start text-muted-foreground gap-1">
                        {item.icon}
                        <div className="grid gap-0.5 ml-2">
                          <p>{item.name}</p>
                          <p className="text-xs" data-description>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {inputs
                .filter((item) => item.pipeline === payload.pipeline)
                .map((item) =>
                  item.items
                    .filter((input) => input.for === "settings")
                    .map((input) => (
                      <div
                        className={
                          input.type !== "boolean"
                            ? "flex flex-col gap-3"
                            : "flex flex-row justify-between w-full items-center"
                        }
                        key={input.id}
                      >
                        <Label htmlFor={input.id}>{input.name}</Label>
                        {renderInput(input)}
                      </div>
                    ))
                )}
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Prompt</legend>
            {inputs
              .filter((item) => item.pipeline === payload.pipeline)
              .map((item) =>
                item.items
                  .filter((input) => input.for === "prompt")
                  .map((input) => (
                    <div className="flex flex-col gap-3" key={input.id}>
                      <Label htmlFor={input.id}>{input.name}</Label>
                      {renderInput(input)}
                    </div>
                  ))
              )}
          </fieldset>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </form>
      </div>
      <OutputDisplay />
    </main>
  );
}
