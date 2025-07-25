import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Feature {
  icon?: ImageWidget;
  title: string;
  description: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function Features({
  title = "Por Que Escolher Nossos Serviços?",
  subtitle = "Oferecemos soluções completas e personalizadas para o seu negócio",
  features = [
    {
      title: "Tecnologia Avançada",
      description: "Utilizamos as mais modernas tecnologias para garantir performance e segurança.",
      icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    },
    {
      title: "Suporte 24/7",
      description: "Nossa equipe está sempre disponível para ajudar você quando precisar.",
      icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    },
    {
      title: "Resultados Garantidos",
      description: "Comprovamos nossos resultados com métricas claras e transparentes.",
      icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    }
  ]
}: Props) {
  return (
    <section class="py-20 bg-gray-50" id="recursos">
      <div class="container mx-auto px-4">
        {/* Header */}
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Features Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                {feature.icon ? (
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    class="w-8 h-8"
                  />
                ) : (
                  <div class="w-8 h-8 bg-blue-600 rounded"></div>
                )}
              </div>
              
              {/* Content */}
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}