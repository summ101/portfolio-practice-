import AnimatedElement from "@/components/AnimatedElement";
import MagnifyText from "@/components/MagnifyText";

const services = [
  { name: "Brand Strategy and Messaging", number: "01" },
  { name: "Logo Design", number: "02" },
  { name: "Visual Identity", number: "03" },
  { name: "Brand Guidelines & Frameworks", number: "04" },
  { name: "Marketing Materials", number: "05" },
  { name: "Motion Design", number: "06" },
];

const ServicesSection = () => {
  return (
    <section className="bg-background py-24 md:py-32" id="services">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <AnimatedElement animation="fadeRight" delay={0}>
          <div className="mb-16">
            <span className="text-xs text-primary">// Services</span>
          </div>
        </AnimatedElement>

        <div className="grid-editorial">
          {/* Large Number */}
          <AnimatedElement animation="fadeRight" delay={100} duration={1000} className="lg:col-span-4">
            <span className="section-number">01</span>
          </AnimatedElement>

          {/* Services Content */}
          <div className="lg:col-span-8">
            <AnimatedElement animation="fadeUp" delay={200}>
              <MagnifyText intensity="medium">
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
                  Branding & Marketing
                </h3>
              </MagnifyText>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeUp" delay={300}>
              <p className="text-muted-foreground text-lg max-w-xl mb-12">
                Branding that builds trust and drives loyalty through clear visuals
                and messaging, into an unforgettable online experience.
              </p>
            </AnimatedElement>

            {/* Services List */}
            <MagnifyText intensity="subtle" className="border-t border-border/30">
              {services.map((service, index) => (
                <AnimatedElement
                  key={service.number}
                  animation="fadeLeft"
                  delay={400 + index * 100}
                  duration={600}
                >
                  <div className="service-item group cursor-default">
                    <span className="text-foreground text-base md:text-lg">
                      {service.name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {service.number}
                    </span>
                  </div>
                </AnimatedElement>
              ))}
            </MagnifyText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
