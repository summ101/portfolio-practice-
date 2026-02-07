import AnimatedElement from "@/components/AnimatedElement";
import MagnifyText from "@/components/MagnifyText";

const ContactSection = () => {
  return (
    <section className="bg-background py-24 md:py-32" id="contact">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <AnimatedElement animation="fadeRight" delay={0}>
          <div className="mb-16">
            <span className="text-xs text-primary">// Contact</span>
          </div>
        </AnimatedElement>

        <div className="max-w-3xl">
          <AnimatedElement animation="slideUp" delay={100} duration={900}>
            <MagnifyText intensity="strong">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 font-display">
                Let's work together.
              </h3>
            </MagnifyText>
          </AnimatedElement>

          <AnimatedElement animation="fadeUp" delay={300} duration={700}>
            <p className="text-muted-foreground text-lg mb-12">
              Have a project in mind? I'm always open to discussing new
              opportunities and creative challenges.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="scaleUp" delay={500} duration={600}>
            <MagnifyText intensity="medium">
              <a
                href="mailto:hello@alexgraham.design"
                className="text-2xl md:text-3xl text-primary hover:text-foreground transition-colors font-display inline-block"
              >
                hello@alexgraham.design
              </a>
            </MagnifyText>
          </AnimatedElement>
        </div>

        {/* Footer */}
        <AnimatedElement animation="fadeUp" delay={700} duration={800}>
          <footer className="mt-32 pt-12 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <span className="text-sm text-muted-foreground">
                © 2024 Alex Graham. All rights reserved.
              </span>

              <div className="flex gap-8">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </footer>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactSection;
