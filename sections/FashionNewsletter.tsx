import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: ImageWidget;
  placeholder?: string;
  buttonText?: string;
  discount?: string;
}

export default function FashionNewsletter({
  title = "Fique por Dentro das Novidades",
  subtitle = "Newsletter Exclusiva",
  description = "Seja a primeira a saber sobre lançamentos, promoções exclusivas e dicas de estilo",
  backgroundImage = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop",
  placeholder = "Seu melhor e-mail",
  buttonText = "Inscrever-se",
  discount = "10% OFF"
}: Props) {
  return (
    <section class="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div class="relative z-10 max-w-4xl mx-auto text-center text-white">
        {/* Discount Badge */}
        {discount && (
          <div class="inline-block bg-white text-black px-6 py-2 text-lg font-bold uppercase tracking-wide mb-6 transform rotate-3">
            {discount} na primeira compra
          </div>
        )}
        
        <h3 class="text-lg md:text-xl font-light tracking-widest uppercase mb-4 opacity-90">
          {subtitle}
        </h3>
        <h2 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h2>
        <p class="text-xl md:text-2xl font-light mb-10 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        
        {/* Newsletter Form */}
        <form class="max-w-md mx-auto">
          <div class="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder={placeholder}
              required
              class="flex-1 px-6 py-4 text-lg text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            />
            <button 
              type="submit"
              class="bg-white text-black px-8 py-4 text-lg font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
            >
              {buttonText}
            </button>
          </div>
          
          <p class="text-sm opacity-75 mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade
          </p>
        </form>
        
        {/* Social Proof */}
        <div class="mt-12 flex items-center justify-center gap-8 text-sm opacity-75">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Sem spam</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Cancele quando quiser</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>+10k inscritas</span>
          </div>
        </div>
      </div>
    </section>
  );
}