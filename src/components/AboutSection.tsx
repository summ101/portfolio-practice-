import AnimatedElement from "@/components/AnimatedElement";
import MagnifyText from "@/components/MagnifyText";

const AboutSection = () => {
  return (
    <section className="bg-secondary py-24 md:py-32" id="about">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <AnimatedElement animation="fadeRight" delay={0}>
          <div className="mb-16">
            <span className="text-xs text-primary">// About</span>
          </div>
        </AnimatedElement>

        <div className="grid-editorial">
          <AnimatedElement animation="fadeRight" delay={100} duration={1000} className="lg:col-span-2">
            <span 
              className="section-number text-secondary-foreground" 
              style={{ WebkitTextStroke: '1px hsl(var(--secondary-foreground) / 0.3)' }}
            >
              02
            </span>
          </AnimatedElement>

          <div className="lg:col-span-10">
            <AnimatedElement animation="fadeUp" delay={200} duration={800}>
              <MagnifyText intensity="strong">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-12 font-display leading-tight">
                  Philosophy & Approach
                </h3>
              </MagnifyText>
            </AnimatedElement>

            <MagnifyText intensity="subtle" className="grid md:grid-cols-2 gap-12">
              <div>
                <AnimatedElement animation="fadeUp" delay={300} duration={700}>
                  <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-6">
                    I believe great design starts with understanding the problem
                    deeply. Every project begins with listening—to the founder's
                    vision, the market context, and the user's needs.
                  </p>
                </AnimatedElement>
                <AnimatedElement animation="fadeUp" delay={400} duration={700}>
                  <p className="text-secondary-foreground/80 text-lg leading-relaxed">
                    My process is collaborative and iterative. I work closely with
                    teams to ensure every decision is intentional and every pixel
                    serves a purpose.
                  </p>
                </AnimatedElement>
              </div>

              <div>
                <AnimatedElement animation="fadeUp" delay={500} duration={700}>
                  <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-6">
                    Speed matters, but not at the expense of quality. I've refined
                    my workflow to deliver polished work quickly, without cutting
                    corners or compromising on craft.
                  </p>
                </AnimatedElement>
                <AnimatedElement animation="fadeUp" delay={600} duration={700}>
                  <p className="text-secondary-foreground/80 text-lg leading-relaxed">
                    The best designs are invisible—they just work. That's what I
                    strive for: solutions that feel obvious, even if the path to
                    get there wasn't.
                  </p>
                </AnimatedElement>
              </div>
            </MagnifyText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
