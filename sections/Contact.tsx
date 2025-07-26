export interface ContactInfo {
  label: string;
  value: string;
  icon?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  contactInfo?: ContactInfo[];
  showForm?: boolean;
}

export default function Contact({
  title = "Pronto Para Começar?",
  subtitle = "Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer",
  ctaText = "Falar com Especialista",
  ctaHref = "#",
  showForm = true,
  contactInfo = [
    { label: "Email", value: "contato@empresa.com", icon: "📧" },
    { label: "Telefone", value: "(11) 99999-9999", icon: "📱" },
    { label: "Endereço", value: "São Paulo, SP", icon: "📍" }
  ]
}: Props) {
  return (
    <section class="py-20 bg-gradient-to-br from-blue-600 to-purple-700" id="contato">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div class="text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              {title}
            </h2>
            <p class="text-xl mb-8 opacity-90">
              {subtitle}
            </p>
            
            {/* Contact Info */}
            <div class="space-y-4 mb-8">
              {contactInfo?.map((info, index) => (
                <div key={index} class="flex items-center space-x-3">
                  <span class="text-2xl">{info.icon}</span>
                  <div>
                    <span class="font-semibold">{info.label}: </span>
                    <span class="opacity-90">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <a
              href={ctaHref}
              class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              {ctaText}
            </a>
          </div>
          
          {/* Contact Form */}
          {showForm && (
            <div class="bg-white rounded-xl p-8 shadow-2xl">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                Envie uma Mensagem
              </h3>
              
              <form class="space-y-6">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Como podemos ajudar você?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}