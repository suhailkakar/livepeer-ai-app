import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky border-b bg-transparent p-4 px-0">
      <div className="container mx-auto flex items-center justify-between top-0 z-10 gap-1  ">
        <Link href={"https://livepeer.studio"} target="_blank">
          <Image
            src="/livepeer-studio.svg"
            alt="Logo"
            width={120}
            height={120}
            layout="fixed"
          />
        </Link>
        <div className="flex flex-row space-x-4">
          <Button className="ml-auto gap-1.5 text-sm" asChild>
            <Link href={"https://docs.livepeer.org"} target="_blank">
              Documentation
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className="ml-auto gap-1.5 text-sm"
            asChild
          >
            <Link
              href={"https://github.com/livepeer/ai-starter-kit"}
              target="_blank"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
