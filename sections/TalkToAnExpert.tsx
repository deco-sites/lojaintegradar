import { ImageWidget } from "apps/admin/widgets.ts";

import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

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


interface ImageProps {
  /**
   * @title Imagem
   */
  src?: ImageWidget;
  /**
   * @title Texto alternativo
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
  cta?: CTA[];
  /**
   * @title Cor do fundo
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @title Imagem da Esquerda
   */
  leftImage?: ImageProps;
  /**
   * @title Imagem da Direita
   */
  rightImage?: ImageProps;
}

export default function TalkToAnExpert({
  hideSection,
  title,
  titleColor = "#371E55",
  subtitle,
  subtitleColor = "#371E55",
  cta = [],
  backgroundColor = "#ffc19f",
  leftImage,
  rightImage,
}: Props) {
  if (hideSection) return <></>
  return (
    <div
      class="overflow-clip relative "
    >
      <div class="-z-50 absolute top-0 left-0 h-full w-full" style={{ background: backgroundColor }} />
      <div class="container flex flex-col justify-center-center md:justify-center p-8 relative min-h-[310px]">
        {leftImage?.src && (
          <img
            src={leftImage.src}
            alt={leftImage.alt}
            width={leftImage.width || 389}
            height={leftImage.height}
            class="h-full w-auto object-contain absolute top-0 bottom-0 hidden md:block left-[-15%] xl:left-0 -z-40"
          />
        )}
        <div class="md:text-center max-w-[261px] sm:max-w-[50%] md:max-w-[500px] lg:mx-auto">
          <h2 style={{ color: titleColor }} class="text-2xl font-bold lg:text-center">
            {title}
          </h2>
          <p style={{ color: subtitleColor }} class="text-lg lg:text-center">{subtitle}</p>
        </div>
        <div class="flex flex-wrap lg:justify-center gap-4 mt-5 ">
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
        {rightImage?.src && (
          <img
            src={rightImage.src}
            alt={rightImage.alt}
            width={rightImage.width || 315}
            height={rightImage.height}
            class="h-full w-auto object-contain absolute top-0 bottom-0 right-0 md:right-[-15%] xl:right-0 -z-40"
          />
        )}
      </div>
    </div>
  );
}
