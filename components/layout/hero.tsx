"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import textToImage from "@/services/text-to-image";
import { OutputDisplay } from "../output";
import upscale from "@/services/upscale";
import imageToVideo from "@/services/image-to-video";
import { inputs, pipeline } from "@/lib/constants";
import renderInput from "../render-inputs";
import { Loader2 } from "lucide-react";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPipline, setSelectedPipline] = useState("text-to-image");
  const [output, setOutput] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const formObject: { [key: string]: any } = {};

    Array.from(formData.entries()).forEach(([key, value]) => {
      if (
        key === "width" ||
        key === "height" ||
        key === "num_images_per_prompt" ||
        key === "num_inference_steps"
      ) {
        formObject[key] = parseInt(value as string, 10);
      } else if (key === "safety_check") {
        formObject[key] = value === "true";
      } else if (key === "image") {
        formObject[key] = value as File;
      } else {
        formObject[key] = value;
      }
    });

    try {
      let res;
      switch (selectedPipline) {
        case "text-to-image":
          res = await textToImage(formObject);
          break;
        case "upscale":
          res = await upscale(formObject);
          break;
        case "image-to-video":
          res = await imageToVideo(formObject);
          break;
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
                onValueChange={(value) => {
                  setOutput(null);
                  setSelectedPipline(value);
                }}
                defaultValue={selectedPipline}
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
                .filter((item) => item.pipeline === selectedPipline)
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
                        {renderInput(input, selectedPipline)}
                      </div>
                    ))
                )}
            </div>
          </fieldset>

          {inputs
            .filter((item) => item.pipeline === selectedPipline)
            .some((item) =>
              item.items.some((input) => input.for === "prompt")
            ) && (
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">Prompt</legend>
              {inputs
                .filter((item) => item.pipeline === selectedPipline)
                .map((item) =>
                  item.items
                    .filter((input) => input.for === "prompt")
                    .map((input) => (
                      <div className="flex flex-col gap-3" key={input.id}>
                        <Label htmlFor={input.id}>{input.name}</Label>
                        {renderInput(input, selectedPipline)}
                      </div>
                    ))
                )}
            </fieldset>
          )}

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
      <OutputDisplay output={output} pipeline={selectedPipline} />
    </main>
  );
}
