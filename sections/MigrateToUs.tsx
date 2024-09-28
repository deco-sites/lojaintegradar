import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";

interface HeaderProps {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Cor do Título
   * @format color-input
   */
  titleColor?: string;
  /**
   * @title Subtítulo
   */
  subtitle?: string;
  /**
   * @title Cor do Subtítulo
   * @format color-input
   */
  subtitleColor?: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description?: string;
  /**
   * @title Cor da Descrição
   * @format color-input
   */
  descriptionColor?: string;
}

interface ImageProps {
  /**
   * @title Imagem
   */
  src: ImageWidget;
  /**
   * @title Alt
   */
  alt: string;
  /**
   * @title Largura
   */
  width: number;
  /**
   * @title Altura
   */
  height: number;
}

/**
 * @title {{title}}
 */
interface FeatureProps {
  /**
   * @title Imagem
   */
  image: ImageProps;
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Cor do Título
   * @format color-input
   */
  titleColor?: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description: string;
  /**
   * @title Cor da Descrição
   * @format color-input
   */
  descriptionColor?: string;
  url?: string;
  /**
   * @title Cor da Url
   * @format color-input
   */
  urlColor?: string;
}

interface ButtonProps {
  /**
   * @title Texto
   */
  text?: string;
  /**
   * @title Url
   */
  url?: string;
  /**
   * @title Cor do Texto
   * @format color-input
   */
  textColor?: string;
  /**
   * @title Cor do Background
   * @format color-input
   */
  backgroundColor?: string;
}

interface Props {
  header: HeaderProps;
  features: FeatureProps[];
  /**
   * @title Botão
   */
  button: ButtonProps;
}

export default function Migrate({
  header = {
    subtitle: "Planos",
    title: "Como a Loja Integrada pode fazer seu dinheiro render mais",
    subtitleColor: "#808080",
    titleColor: "#4B0082",
  },
  features = [
    {
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
        alt: "feature",
        width: 290,
        height: 244,
      },
      title: "Tráfego qualificado",
      description:
        "Aumente seu tráfego através de campanhas de mídia paga com altíssimo retorno (ROAS), através de integrações nativas com Google Shopping, TikTok, Meta e Whatsapp.",
    },
    {
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
        alt: "feature",
        width: 290,
        height: 244,
      },
      title: "Ticket médio",
      description:
        "Gere mais receita por usuário com baixo esforço, aumentando seu ticket médio com ferramentas nativas como: Promoções, cupons, Carrinho Abandonado e Compre Junto.",
    },
    {
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
        alt: "feature",
        width: 290,
        height: 244,
      },
      title: "Taxa de conversão",
      description:
        "Recupere vendas sem gastar com anúncios pagos, reengajando visitantes que mostraram carrinho e não concluíram suas compras, com a solução nativa do Carrinho Abandonado.",
    },
    {
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
        alt: "feature",
        width: 290,
        height: 244,
      },
      title: "Relacionamento com cliente",
      description:
        "Fale com seus clientes via Whatsapp e converta mais vendas com o aplicativo Conectall.",
    },
  ],
  button = {
    text: "Migre para a Loja Integrada",
    url: "#",
    textColor: "#FFFFFF",
    backgroundColor: "#371e55",
  },
}: Props) {
  return (
    <div class="container mx-auto px-9 py-16 lg:py-8">
      <div class="max-w-[900px] mx-auto mb-12 lg:mb-20">
        {header.subtitle && (
          <p
            class="text-center text-xl font-semibold mb-2"
            style={{ color: header.subtitleColor }}
          >
            {header.subtitle}
          </p>
        )}
        {header.title && (
          <h2
            class="text-2xl lg:text-center lg:text-5xl lg:leading-[57px] font-semibold"
            style={{ color: header.titleColor }}
          >
            {header.title}
          </h2>
        )}
        {header.description && (
          <p
            class="lg:text-lg lg:text-center mt-5"
            style={{ color: header.descriptionColor }}
          >
            {header.description}
          </p>
        )}
      </div>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((feature, index) => (
          <li key={index} class="bg-white rounded-lg">
            {feature.image.src && (
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                width={feature.image.width}
                height={feature.image.height}
                style={{
                  aspectRatio:
                    `${feature.image.width} / ${feature.image.height}`,
                }}
                class="object-cover mb-6 rounded w-full"
              />
            )}
            <h3
              style={{ color: feature.titleColor }}
              class="text-xl font-bold lg:text-2xl lg:font-roboto mb-4"
            >
              {feature.title}
            </h3>
            <p
              style={{ color: feature.descriptionColor }}
              class="text-base lg:text-sm text-gray-600"
            >
              {feature.description}
            </p>
            {feature.url && (
              <a
                style={{
                  color: feature.urlColor,
                }}
                href={feature.url}
                class="flex items-center gap-2 mt-5 w-fit"
              >
                Saiba mais <Icon id="ChevronRight" size={14} strokeWidth={3} />
              </a>
            )}
          </li>
        ))}
      </ul>
      {button.text && (
        <div class="text-center flex justify-center items-center mt-20">
          <a
            href={button.url}
            class="px-5 flex justify-center items-center h-12 rounded-lg"
            style={{
              backgroundColor: button.backgroundColor,
              color: button.textColor,
            }}
          >
            {button.text}
          </a>
        </div>
      )}
    </div>
  );
}
