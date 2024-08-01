import React from "react";
import { Button } from "../ui/button";
import { Share } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky border-b bg-transparent p-4 px-0">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between top-0 z-10 gap-1  ">
        <Image
          src="/livepeer-studio.svg"
          alt="Logo"
          width={120}
          height={120}
          layout="fixed"
        />
        <div className="flex flex-row space-x-4">
          <Button className="ml-auto gap-1.5 text-sm">Documentation</Button>
          <Button variant={"outline"} className="ml-auto gap-1.5 text-sm">
            GitHub
          </Button>
        </div>
      </div>
    </header>
  );
}
