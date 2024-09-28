import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface ImageProps {
  /**
   * @title Imagem
   */
  src?: string;
  /**
   * @title Alt
   */
  alt?: string;
  /**
   * @title Largura
   */
  width?: number;
  /**
   * @title Altura
   */
  height?: number;
}

interface Gradient {
  /**
   * @title Cor de início
   * @format color-input
   */
  startColor?: string;
  /**
   * @title Cor de transição
   * @format color-input
   */
  middleColor?: string;
  /**
   * @title Cor de fim
   * @format color-input
   */
  endColor?: string;
}

interface Icon {
  /**
   * @title Imagem
   */
  src?: ImageWidget;
  /**
   * @title Largura
   */
  width?: number;
  /**
   * @title Altura
   */
  height?: number;
}

/**
 * @title {{title}}
 */
interface Card {
  icon: Icon;
  /**
   * @title Titulo
   */
  title: string;
  /**
   * @title Cor do título
   * @format color-input
   */
  titleColor?: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description: string;
  /**
   * @title Cor da descrição
   * @format color-input
   */
  descriptionColor?: string;
}

interface Button {
  /**
   * @title Texto do botão
   */
  text?: string;
  /**
   * @title Cor do Texto
   * @format color-input
   */
  color?: string;
  /**
   * @title Cor do fundo
   * @format color-input
   */
  backgroundColor?: string;
  url?: string;
}

interface Props {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Cor do titulo
   * @format color-input
   */
  titleColor?: string;
  /**
   * @title Subtítulo
   * @format textarea
   */
  subtitle?: string;
  /**
   * @title Cor do subtítulo
   * @format color-input
   */
  subtitleColor?: string;
  /**
   * @title Cor de fundo
   */
  backgroundColor?: Gradient;
  /**
   * @title Imagem decorativa
   * @description A imagem decorativa no canto superior direito
   */
  decorativeImage?: ImageProps;
  /**
   * @title Cards
   */
  cards?: Card[];
  /**
   * @title botão
   */
  button?: Button;
  /**
   * @title Espaçamento superior desktop
   */
  spacingTop?: number;
  /**
   * @title Espaçamento inferior desktop
   */
  spacingBottom?: number;
  /**
   * @title Espaçamento superior mobile
   */
  spacingTopMobile?: number;
  /**
   * @title Espaçamento inferior mobile
   */
  spacingBottomMobile?: number;
}

export default function CalculateYourCosts({
  title = "Custo Total de Propriedade (TCO) de um ecommerce",
  titleColor = "#1B1525",
  subtitle =
    "O TCO é a soma de todos os custos relacionados à implementação, operação e manutenção de uma loja virtual ao longo de sua vida útil. Por considerar um ciclo de vida completo, o TCO mostra quanto seu ecommerce realmente custa para o seu bolso.",
  subtitleColor = "#1B1525",
  backgroundColor = {
    startColor: "#A482F966",
    middleColor: "#DED2FD",
    endColor: "#fdfdff",
  },
  decorativeImage = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
    alt: "Decorative",
    width: 232,
    height: 208,
  },
  cards = [{
    icon: {
      src:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      width: 17,
      height: 25,
    },
    title: "Negócio",
    description:
      "Compare seus custos mensais de plataforma e comissão versus sua receita.",
    titleColor: "#1B1525",
    descriptionColor: "#1B1525",
  }, {
    icon: {
      src:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      width: 17,
      height: 25,
    },
    title: "Pagamento",
    description:
      "Analise seus custos com tarifas de cartão de crédito, pix, boleto e ferramentas antifraude.",
    titleColor: "#1B1525",
    descriptionColor: "#1B1525",
  }, {
    icon: {
      src:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
      width: 17,
      height: 25,
    },
    title: "Envio",
    description:
      "Leve em consideração todos os custos que sua loja possui com o envio de produtos.",
    titleColor: "#1B1525",
    descriptionColor: "#1B1525",
  }],
  button = {
    text: "Calcule seus custos e compare",
    backgroundColor: "#1B1525",
    color: "#ffffff",
    url: "#",
  },
  spacingTop = 80,
  spacingBottom = 80,
  spacingTopMobile = 16,
  spacingBottomMobile = 16,
}: Props) {
  return (
    <div
      class="px-8 py-10 md:px-24 md:py-20 overflow-clip mt-[--spacing-top-mobile] mb-[--spacing-bottom-mobile] md:mt-[--spacing-top-desktop] md:mb-[--spacing-bottom-desktop]"
      style={{
        "--spacing-top-desktop": `${spacingTop}px`,
        "--spacing-top-mobile": `${spacingTopMobile}px`,
        "--spacing-bottom-desktop": `${spacingBottom}px`,
        "--spacing-bottom-mobile": `${spacingBottomMobile}px`,
        backgroundImage:
          `linear-gradient(160deg, ${backgroundColor.startColor} 3.14%, ${backgroundColor.middleColor} 21.82%, ${backgroundColor.endColor} 52.7%)`,
        color: titleColor,
      }}
    >
      <div class="container 2xl:max-w-[1536px] mx-auto relative">
        {decorativeImage.src && (
          <Image
            src={decorativeImage.src}
            width={decorativeImage.width || 232}
            height={decorativeImage.height || 208}
            alt={decorativeImage.alt || "Decorative"}
            class="absolute -top-[72px] -right-24 lg:top-0 lg:right-0 scale-50 md:scale-100"
          />
        )}
        <div class="w-full max-w-[663px] mb-10 z-[1]">
          <h1
            class="text-2xl md:text-5xl font-bold mb-5 lg:mb-10 max-w-[300px] sm:max-w-[400px] md:max-w-full"
            style={{ color: titleColor }}
          >
            {title}
          </h1>
          <p class="lg:text-lg" style={{ color: subtitleColor }}>{subtitle}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            return (
              <div>
                {card.icon.src && (
                  <Image
                    src={card.icon.src}
                    width={card.icon.width || 17}
                    height={card.icon.height || 25}
                    alt="Icone"
                    class="mb-3"
                  />
                )}
                <h2
                  class="text-3xl font-bold font-roboto mb-3"
                  style={{ color: card.titleColor }}
                >
                  {card.title}
                </h2>
                <p style={{ color: card.descriptionColor }}>
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
        {button.text && (
          <a
            href={button.url}
            class="px-5 flex justify-center items-center h-12 rounded-lg w-fit mt-12"
            style={{
              backgroundColor: button.backgroundColor,
              color: button.color,
            }}
          >
            {button.text}
          </a>
        )}
      </div>
    </div>
  );
}
