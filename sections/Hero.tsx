import type { ImageWidget } from "apps/admin/widgets.ts";
import { TextArea } from "apps/admin/widgets.ts";

export interface CTA {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface Props {
  title?: string;
  subtitle?: TextArea;
  description?: TextArea;
  image?: ImageWidget;
  ctas?: CTA[];
  backgroundImage?: ImageWidget;
}

export default function Hero({
  title = "Transforme Sua Presença Digital",
  subtitle = "Soluções inovadoras para o seu negócio crescer online",
  description = "Oferecemos as melhores ferramentas e estratégias para levar sua empresa ao próximo nível no mundo digital.",
  image = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9",
  ctas = [
    { text: "Começar Agora", href: "#contato", variant: "primary" },
    { text: "Saiba Mais", href: "#sobre", variant: "secondary" }
  ],
  backgroundImage
}: Props) {
  return (
    <section 
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={backgroundImage ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;` : "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
    >
      {/* Overlay */}
      <div class="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div class="text-white space-y-6">
            <h1 class="text-4xl md:text-6xl font-bold leading-tight">
              {title}
            </h1>
            
            <h2 class="text-xl md:text-2xl font-light opacity-90">
              {subtitle}
            </h2>
            
            <p class="text-lg opacity-80 max-w-lg">
              {description}
            </p>
            
            {/* CTAs */}
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              {ctas?.map((cta, index) => (
                <a
                  key={index}
                  href={cta.href}
                  class={`px-8 py-4 rounded-lg font-semibold text-center transition-all duration-300 ${
                    cta.variant === "primary"
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                      : "border-2 border-white text-white hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {cta.text}
                </a>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div class="relative">
            <img
              src={image}
              alt="Hero Image"
              class="w-full h-auto rounded-lg shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}