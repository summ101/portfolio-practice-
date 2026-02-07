import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <main className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Header />
      <HeroSection />
      <StatementSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Index;
