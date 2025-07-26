import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  avatar?: ImageWidget;
  content: string;
  rating?: number;
}

export interface Props {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export default function Testimonials({
  title = "O Que Nossos Clientes Dizem",
  subtitle = "Veja os depoimentos de quem já transformou seu negócio conosco",
  testimonials = [
    {
      name: "Maria Silva",
      role: "CEO",
      company: "TechStart",
      content: "Excelente serviço! Nossa empresa cresceu 300% após implementar as soluções recomendadas.",
      rating: 5,
      avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    },
    {
      name: "João Santos",
      role: "Diretor de Marketing",
      company: "Inovação Digital",
      content: "Profissionais extremamente competentes. Superaram todas as nossas expectativas.",
      rating: 5,
      avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    },
    {
      name: "Ana Costa",
      role: "Fundadora",
      company: "E-commerce Plus",
      content: "Resultados incríveis em pouco tempo. Recomendo para qualquer empresa que queira crescer.",
      rating: 5,
      avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"
    }
  ]
}: Props) {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        class={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section class="py-20 bg-white" id="depoimentos">
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
        
        {/* Testimonials Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              class="bg-gray-50 p-8 rounded-xl relative"
            >
              {/* Quote Icon */}
              <div class="absolute top-4 right-4 text-blue-200">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              
              {/* Content */}
              <p class="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Rating */}
              <div class="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Author */}
              <div class="flex items-center">
                <img
                  src={testimonial.avatar || "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9"}
                  alt={testimonial.name}
                  class="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 class="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p class="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && ` • ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}