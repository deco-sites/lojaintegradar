import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Category {
  name?: string;
  image?: ImageWidget;
  link?: string;
  description?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  categories?: Category[];
}

export default function FashionCategories({
  title = "Explore por Categoria",
  subtitle = "Encontre o estilo perfeito para cada ocasião",
  categories = [
    {
      name: "Vestidos",
      image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b8b1e8?w=600&h=800&fit=crop",
      link: "/categoria/vestidos",
      description: "Elegância para todos os momentos"
    },
    {
      name: "Blazers",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
      link: "/categoria/blazers",
      description: "Sofisticação no trabalho e além"
    },
    {
      name: "Calças",
      image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=600&h=800&fit=crop",
      link: "/categoria/calcas",
      description: "Conforto e estilo em cada passo"
    },
    {
      name: "Acessórios",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      link: "/categoria/acessorios",
      description: "Detalhes que fazem a diferença"
    }
  ]
}: Props) {
  return (
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Categories Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category, index) => (
            <div key={index} class="group cursor-pointer">
              <a href={category.link} class="block">
                <div class="relative overflow-hidden rounded-lg shadow-lg">
                  {/* Category Image */}
                  <div class="aspect-[3/4] overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 class="text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p class="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        {category.description}
                      </p>
                      
                      {/* Arrow */}
                      <div class="mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                        <div class="inline-flex items-center text-sm font-medium uppercase tracking-wide">
                          Explorar
                          <svg class="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}