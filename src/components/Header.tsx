import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger header animation on mount
    setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/90 backdrop-blur-sm" : "bg-transparent"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className={`text-sm font-medium text-foreground transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          © Alex Design & Strategy
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Projects", "About", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`text-sm text-foreground hover:text-primary transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
