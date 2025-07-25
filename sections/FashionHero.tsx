import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: ImageWidget;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function FashionHero({
  title = "Nova Coleção",
  subtitle = "Primavera/Verão 2024",
  description = "Descubra as últimas tendências da moda com peças exclusivas e estilo único",
  backgroundImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
  ctaText = "Ver Coleção",
  ctaLink = "/colecao",
  secondaryCtaText = "Lookbook",
  secondaryCtaLink = "/lookbook"
}: Props) {
  return (
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 class="text-lg md:text-xl font-light tracking-widest uppercase mb-4 opacity-90">
          {subtitle}
        </h2>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {title}
        </h1>
        <p class="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        {/* CTAs */}
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={ctaLink}
            class="bg-white text-black px-8 py-4 text-lg font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors duration-300 min-w-[200px]"
          >
            {ctaText}
          </a>
          <a 
            href={secondaryCtaLink}
            class="border-2 border-white text-white px-8 py-4 text-lg font-medium uppercase tracking-wide hover:bg-white hover:text-black transition-colors duration-300 min-w-[200px]"
          >
            {secondaryCtaText}
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}