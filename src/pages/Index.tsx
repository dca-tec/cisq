import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PrinciplesSection />
      <ServicesSection />
      <FeaturedProducts />
      <CTASection />
    </Layout>
  );
};

export default Index;
