import projectBranding from "@/assets/project-branding.jpg";
import projectWeb from "@/assets/project-web.jpg";
import projectApp from "@/assets/project-app.jpg";
import AnimatedElement from "@/components/AnimatedElement";
import MagnifyText from "@/components/MagnifyText";

const projects = [
  {
    title: "Brand Identity System",
    description:
      "Complete brand identity for a premium tech company, including logo, guidelines, and marketing collateral.",
    role: "Brand Design, Art Direction",
    image: projectBranding,
    layout: "left",
  },
  {
    title: "E-commerce Platform",
    description:
      "Modern web design for a direct-to-consumer brand, focusing on conversion and user experience.",
    role: "Web Design, UX Strategy",
    image: projectWeb,
    layout: "right",
  },
  {
    title: "Mobile App Design",
    description:
      "iOS and Android app design for a fintech startup, featuring dark mode and intuitive navigation.",
    role: "Product Design, UI/UX",
    image: projectApp,
    layout: "left",
  },
];

const ProjectsSection = () => {
  return (
    <section className="bg-background py-24 md:py-32" id="projects">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <AnimatedElement animation="fadeRight" delay={0}>
          <div className="mb-16">
            <span className="text-xs text-primary">// Projects</span>
          </div>
        </AnimatedElement>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="grid-editorial items-center"
            >
              {/* Image */}
              <AnimatedElement
                animation={project.layout === "right" ? "fadeRight" : "fadeLeft"}
                delay={100}
                duration={900}
                className={`lg:col-span-7 ${
                  project.layout === "right" ? "lg:order-2" : ""
                }`}
              >
                <div className="overflow-hidden group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              </AnimatedElement>

              {/* Content */}
              <div
                className={`lg:col-span-5 mt-8 lg:mt-0 ${
                  project.layout === "right" ? "lg:order-1 lg:pr-12" : "lg:pl-12"
                }`}
              >
                <AnimatedElement
                  animation={project.layout === "right" ? "fadeLeft" : "fadeRight"}
                  delay={200}
                  duration={700}
                >
                  <span className="text-muted-foreground text-sm mb-4 block">
                    0{index + 1}
                  </span>
                </AnimatedElement>
                
                <AnimatedElement
                  animation="fadeUp"
                  delay={300}
                  duration={700}
                >
                  <MagnifyText intensity="medium">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                      {project.title}
                    </h3>
                  </MagnifyText>
                </AnimatedElement>
                
                <AnimatedElement
                  animation="fadeUp"
                  delay={400}
                  duration={700}
                >
                  <p className="text-muted-foreground text-base mb-6">
                    {project.description}
                  </p>
                </AnimatedElement>
                
                <AnimatedElement
                  animation="fadeUp"
                  delay={500}
                  duration={700}
                >
                  <MagnifyText intensity="subtle">
                    <span className="text-foreground text-sm">{project.role}</span>
                  </MagnifyText>
                </AnimatedElement>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
