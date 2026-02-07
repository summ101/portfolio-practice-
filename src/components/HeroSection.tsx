import { useEffect, useState, useRef } from "react";

interface Annotation {
  id: string;
  label: string;
  x: number; // percentage from left
  y: number; // percentage from top
  delay: number;
}

const annotations: Annotation[] = [
  { id: "name", label: "Alex Graham", x: 50, y: 25, delay: 0 },
  { id: "role", label: "Art Director", x: 25, y: 40, delay: 200 },
  { id: "mindset1", label: "Curious", x: 75, y: 35, delay: 400 },
  { id: "mindset2", label: "Builder", x: 30, y: 65, delay: 600 },
  { id: "mindset3", label: "Obsessed", x: 70, y: 60, delay: 800 },
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setViewportHeight(window.innerHeight);

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, -rect.top);
        setScrollY(scrollProgress);
      }
    };

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate animation values based on scroll
  const maxScroll = viewportHeight * 1.5;
  const progress = Math.min(scrollY / maxScroll, 1);

  // Image effects
  const scale = 1.15 - progress * 0.15; // 1.15 -> 1
  const blur = Math.max(0, 8 - progress * 12); // 8px -> 0px
  const parallaxY = scrollY * 0.3; // Parallax effect

  // Text fade
  const textOpacity = Math.max(0, 1 - progress * 3);
  const textScale = 1 - progress * 0.1;

  // Annotations appear after initial scroll
  const annotationsVisible = progress > 0.3;
  const annotationProgress = Math.max(0, (progress - 0.3) / 0.5);

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] overflow-visible"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Grain overlay */}
        <div
          className="absolute inset-0 z-30 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / ${0.05 + progress * 0.05}) 0%, transparent 70%)`,
            opacity: 0.5 + progress * 0.5,
          }}
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0 z-10 bg-background/40"
          style={{
            opacity: 0.3 + progress * 0.2,
          }}
        />

        {/* Hero image with zoom/blur/parallax */}
        <div
          className="absolute inset-0 z-0 transition-[filter] duration-100"
          style={{
            transform: `scale(${scale}) translateY(${parallaxY}px)`,
            filter: `blur(${blur}px)`,
          }}
         >
         <img
          src="/hero.png"
          alt="Hero background"
          className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Initial "Let's Roll" text */}
        <div
          className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale})`,
          }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-foreground tracking-[-0.02em]">
              Let's Roll
            </h1>
            <div
              className="mt-6 flex items-center justify-center gap-2 text-muted-foreground"
              style={{ opacity: textOpacity }}
            >
              <div className="w-4 h-px bg-muted-foreground animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
              <div className="w-4 h-px bg-muted-foreground animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating annotations */}
        {annotations.map((annotation) => {
          const annotationOpacity = annotationsVisible
            ? Math.min(1, (annotationProgress - annotation.delay / 1000) * 2)
            : 0;

          return (
            <div
              key={annotation.id}
              className="absolute z-40 pointer-events-none"
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
                transform: `translate(-50%, -50%)`,
                opacity: Math.max(0, annotationOpacity),
                transition: "opacity 0.6s ease-out",
              }}
            >
              <AnnotationElement
                label={annotation.label}
                progress={annotationOpacity}
                isName={annotation.id === "name"}
              />
            </div>
          );
        })}

        {/* Scroll indicator lines */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
          style={{
            opacity: textOpacity,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground/50 to-muted-foreground animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface AnnotationElementProps {
  label: string;
  progress: number;
  isName?: boolean;
}

const AnnotationElement = ({ label, progress, isName }: AnnotationElementProps) => {
  const lineLength = progress * 40;

  return (
    <div className="relative flex items-center gap-3">
      {/* Connecting line */}
      <div
        className="h-px bg-gradient-to-r from-primary/60 to-primary"
        style={{
          width: `${lineLength}px`,
          opacity: progress,
        }}
      />

      {/* Dot */}
      <div
        className="w-2 h-2 rounded-full bg-primary"
        style={{
          opacity: progress,
          transform: `scale(${0.5 + progress * 0.5})`,
          boxShadow: `0 0 ${8 + progress * 8}px hsl(var(--primary) / 0.5)`,
        }}
      />

      {/* Label */}
      <div
        className={`whitespace-nowrap ${
          isName
            ? "text-2xl md:text-4xl font-display font-bold text-foreground"
            : "text-sm md:text-base font-medium text-foreground/80"
        }`}
        style={{
          opacity: progress,
          transform: `translateX(${(1 - progress) * 20}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {label}

        {/* Subtle underline for keywords */}
        {!isName && (
          <div
            className="mt-1 h-px bg-primary/40"
            style={{
              width: `${progress * 100}%`,
              transition: "width 0.4s ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
