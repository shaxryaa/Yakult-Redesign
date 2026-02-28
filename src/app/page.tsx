import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
import StoreLocator from "@/components/sections/StoreLocator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <StoreLocator />
    </>
  );
}
