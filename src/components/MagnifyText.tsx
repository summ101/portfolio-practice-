import { useState, useEffect, useRef, useCallback } from "react";

interface MagnifyTextProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

const MagnifyText = ({ children, className = "", intensity = "medium" }: MagnifyTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const animationFrameRef = useRef<number>();

  const scaleValues = {
    subtle: { scale: 1.08, radius: 80 },
    medium: { scale: 1.15, radius: 100 },
    strong: { scale: 1.25, radius: 120 },
  };

  const { scale, radius } = scaleValues[intensity];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  // Smooth position with inertia
  useEffect(() => {
    const animate = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{
        // CSS custom properties for the magnify effect
        "--magnify-x": `${smoothPosition.x}px`,
        "--magnify-y": `${smoothPosition.y}px`,
        "--magnify-scale": scale,
        "--magnify-radius": `${radius}px`,
        "--magnify-active": isActive ? 1 : 0,
      } as React.CSSProperties}
    >
      <div 
        className="magnify-content transition-all duration-300 ease-out"
        style={{
          filter: isActive ? "blur(0.3px)" : "none",
          opacity: isActive ? 0.7 : 1,
          transition: "filter 0.5s ease-out, opacity 0.5s ease-out",
        }}
      >
        {children}
      </div>
      
      {/* Magnified overlay */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <div
          className="absolute"
          style={{
            left: smoothPosition.x - radius,
            top: smoothPosition.y - radius,
            width: radius * 2,
            height: radius * 2,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: isActive 
              ? "0 0 40px hsl(var(--primary) / 0.1), inset 0 0 30px hsl(var(--background) / 0.3)" 
              : "none",
            transition: "box-shadow 0.4s ease-out",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -(smoothPosition.x - radius),
              top: -(smoothPosition.y - radius),
              width: containerRef.current?.offsetWidth || 0,
              height: containerRef.current?.offsetHeight || 0,
              transform: `scale(${scale})`,
              transformOrigin: `${smoothPosition.x}px ${smoothPosition.y}px`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Subtle glow around cursor */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          width: radius * 2.5,
          height: radius * 2.5,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 70%)`,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default MagnifyText;
