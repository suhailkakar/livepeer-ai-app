import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container mx-auto flex w-screen bg-background/50 my-6">
        <Hero />
      </div>
    </div>
  );
}
