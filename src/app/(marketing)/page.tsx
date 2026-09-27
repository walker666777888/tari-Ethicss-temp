import { Channels } from "@/components/marketing/Channels";
import { Features } from "@/components/marketing/Features";
import { Closing, Footer, Proof } from "@/components/marketing/Closing";
import { Hero } from "@/components/marketing/Hero";
import { Lifecycle } from "@/components/marketing/Lifecycle";
import { Safeguards } from "@/components/marketing/Safeguards";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Proof />
      <Features />
      <Channels />
      <Lifecycle />
      <Safeguards />
      <Closing />
      <Footer />
    </>
  );
}
