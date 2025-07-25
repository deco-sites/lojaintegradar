import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Product {
  name?: string;
  price?: string;
  originalPrice?: string;
  image?: ImageWidget;
  link?: string;
  badge?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

export default function FeaturedProducts({
  title = "Produtos em Destaque",
  subtitle = "Peças selecionadas especialmente para você",
  products = [
    {
      name: "Vestido Midi Floral",
      price: "R$ 299,90",
      originalPrice: "R$ 399,90",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      link: "/produto/vestido-midi-floral",
      badge: "25% OFF"
    },
    {
      name: "Blazer Oversized",
      price: "R$ 459,90",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      link: "/produto/blazer-oversized",
      badge: "NOVO"
    },
    {
      name: "Calça Wide Leg",
      price: "R$ 199,90",
      originalPrice: "R$ 249,90",
      image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?w=400&h=600&fit=crop",
      link: "/produto/calca-wide-leg",
      badge: "20% OFF"
    },
    {
      name: "Blusa Cropped",
      price: "R$ 129,90",
      image: "https://images.unsplash.com/photo-1564257577-2d3b9c8b6e8e?w=400&h=600&fit=crop",
      link: "/produto/blusa-cropped"
    }
  ]
}: Props) {
  return (
    <section class="py-16 px-4 bg-gray-50">
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
        
        {/* Products Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product, index) => (
            <div key={index} class="group cursor-pointer">
              <a href={product.link} class="block">
                {/* Product Image */}
                <div class="relative overflow-hidden bg-white rounded-lg shadow-md mb-4">
                  {product.badge && (
                    <div class="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-sm font-medium uppercase tracking-wide">
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Quick View Overlay */}
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button class="bg-white text-black px-6 py-2 font-medium uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Ver Produto
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div class="text-center">
                  <h3 class="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span class="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div class="text-center mt-12">
          <a 
            href="/produtos"
            class="inline-block bg-black text-white px-8 py-4 text-lg font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors duration-300"
          >
            Ver Todos os Produtos
          </a>
        </div>
      </div>
    </section>
  );
}