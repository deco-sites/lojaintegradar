import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "site/components/ui/Icon.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

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
  header: HeaderProps;
  features: FeatureProps[];
  cta?: CTA[];
}

export default function Migrate({
  header,
  features,
  cta = [],
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
      <div class="text-center flex justify-center items-center mt-20">
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
  );
}
