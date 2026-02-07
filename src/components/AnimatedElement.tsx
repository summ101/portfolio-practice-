import { ReactNode } from "react";
import { useScrollAnimation, animationVariants } from "@/hooks/useScrollAnimation";

type AnimationType = keyof typeof animationVariants;

interface AnimatedElementProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

const AnimatedElement = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.1,
}: AnimatedElementProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const variant = animationVariants[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? variant.visible : variant.hidden
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
