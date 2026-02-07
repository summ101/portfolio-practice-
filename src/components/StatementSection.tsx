import { Button } from "@/components/ui/button";
import AnimatedElement from "@/components/AnimatedElement";
import MagnifyText from "@/components/MagnifyText";

const StatementSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <AnimatedElement animation="fadeRight" delay={0}>
          <div className="mb-12">
            <span className="text-xs text-primary">// Intro</span>
          </div>
        </AnimatedElement>

        {/* Main Statement */}
        <div className="max-w-5xl">
          <AnimatedElement animation="fadeUp" delay={100} duration={800}>
            <MagnifyText intensity="medium">
              <h2 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3.5rem] font-semibold leading-[1.15] tracking-[-0.02em] font-display text-foreground mb-8">
                I'm a versatile{" "}
                <span className="text-primary">designer who partners with founders</span>{" "}
                to turn ideas into real products.{" "}
                <span className="text-muted-foreground">
                  I focus on clear interfaces, sharp decisions, and fast execution.
                </span>
              </h2>
            </MagnifyText>
          </AnimatedElement>

          {/* Supporting Text */}
          <AnimatedElement animation="fadeUp" delay={300} duration={800}>
            <p className="text-muted-foreground text-lg max-w-2xl mt-8 mb-12">
              Bringing your vision to life quickly and efficiently—whether it's
              branding, apps, or websites—I've got it covered, delivering smooth
              and effective solutions from start to finish.
            </p>
          </AnimatedElement>

          {/* CTA Button */}
          <AnimatedElement animation="scaleUp" delay={500} duration={600}>
            <Button
              variant="outline"
              onClick={scrollToProjects}
              className="border-foreground/30 text-foreground bg-transparent hover:bg-foreground/10 px-8 py-6 text-sm tracking-wide"
            >
              See my Work
            </Button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default StatementSection;
