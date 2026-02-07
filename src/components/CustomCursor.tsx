import { useState, useEffect, useCallback } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Add mouse event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Find all interactive elements and add hover listeners
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
    );

    const handleElementEnter = (e: Event) => {
      setIsHovering(true);
      const target = e.target as HTMLElement;
      const text = target.getAttribute("data-cursor-text");
      if (text) setCursorText(text);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setCursorText("");
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementEnter);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
      });

      document.body.style.cursor = "auto";
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  // Re-attach listeners when DOM changes (for dynamic content)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );

      const handleElementEnter = () => setIsHovering(true);
      const handleElementLeave = () => {
        setIsHovering(false);
        setCursorText("");
      };

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementEnter);
        el.removeEventListener("mouseleave", handleElementLeave);
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        <div
          className={`rounded-full bg-foreground transition-all duration-300 ease-out ${
            isHovering
              ? "w-16 h-16 opacity-100"
              : "w-3 h-3 opacity-100"
          }`}
          style={{
            transform: isClicking ? "scale(0.8)" : "scale(1)",
          }}
        />
      </div>

      {/* Cursor ring / follower */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-500 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border border-foreground/50 transition-all duration-300 ease-out flex items-center justify-center ${
            isHovering
              ? "w-20 h-20 border-primary bg-primary/10"
              : "w-8 h-8"
          } ${isClicking ? "scale-90" : "scale-100"}`}
        >
          {cursorText && isHovering && (
            <span className="text-xs text-foreground font-medium">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
