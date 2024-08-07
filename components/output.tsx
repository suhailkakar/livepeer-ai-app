import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

export const OutputDisplay = ({
  output,
  pipeline,
}: {
  output: any;
  pipeline: string;
}) => {
  const downloadImage = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.png";
    a.click();
  };

  return (
    <div className="flex flex-col md:w-2/3 min-h-[75vh]">
      <div className="relative flex flex-col flex-grow rounded-xl bg-muted/30 p-4">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <div className="flex-grow">
          {pipeline === "upscale" && output && (
            <Image
              src={output?.[0].url}
              width={1000}
              height={1000}
              alt="output"
              className="rounded-lg mt-12"
            />
          )}
          {pipeline === "image-to-video" && output && (
            <video
              src={output?.[0].url}
              controls
              className="rounded-lg mt-12"
            />
          )}
          {pipeline === "text-to-image" && output && (
            <div className="grid gap-4 grid-cols-2 mt-12">
              {output?.map((item, index) => (
                <div key={index} className="relative">
                  <Image
                    src={item.url}
                    width={512}
                    height={512}
                    alt="output"
                    className="rounded-lg"
                  />
                  <button
                    onClick={() => downloadImage(item.url)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
