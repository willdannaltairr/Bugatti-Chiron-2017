import Nav from "@/components/ui/Nav";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CarModelProvider } from "@/components/three/CarModelProvider";
import Closing from "@/components/sections/Closing";
import Engine from "@/components/sections/Engine";
import Explore from "@/components/sections/Explore";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Performance from "@/components/sections/Performance";
import Signature from "@/components/sections/Signature";

export default function Page() {
  return (
    <CarModelProvider>
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <Signature />
          <Performance />
          <Engine />
          <Explore />
          <Gallery />
          <Closing />
        </main>
        <Footer />
      </SmoothScroll>
    </CarModelProvider>
  );
}