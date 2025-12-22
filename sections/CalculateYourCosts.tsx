import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "site/components/ui/SmartImage.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

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

/** @title {{text}} {{underlineText}} */
export interface CTA {
  href: string;
  text?: string;
  underlineText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  borderColor?: string;
  ctaStyle: "button" | "link";
  showIcon?: boolean;
}

interface Props {
  hideSection?: boolean;
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
  backgroundColor?: string;
  /**
   * @title Imagem decorativa
   * @description A imagem decorativa no canto superior direito
   */
  decorativeImage?: ImageProps;
  /**
   * @title Cards
   */
  cards?: Card[];
  cta?: CTA[];
  /** @format color-input */
}

export default function CalculateYourCosts({
  hideSection,
  title,
  titleColor,
  subtitle,
  subtitleColor,
  decorativeImage,
  cards = [],
  cta = [],
  backgroundColor,
}: Props) {
  if (hideSection) return <></>
  return (
    <div
      class="px-8 py-10 md:px-24 md:py-20 min-h-[663px] overflow-clip mt-20"
      style={{ background: backgroundColor }}
    >
      <div class="container 2xl:max-w-[1536px] mx-auto relative">
        {decorativeImage?.src && (
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
        <div class="flex gap-4 flex-wrap mt-12">
          {cta.map((button) => {
            if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
              showIcon={button.showIcon}
              underlineText={button.underlineText}
              text={button.text}
              ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
              style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
            />
            return <a
              href={button?.href ?? "#"}
              target={button?.href.includes("http") ? "_blank" : ""}
              class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
              style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
            >
              {button?.text}
              {button.underlineText && <span class="underline">{button.underlineText}</span>}
              {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
              </svg>}
            </a>
          })}
        </div>
      </div>
    </div>
  );
}
