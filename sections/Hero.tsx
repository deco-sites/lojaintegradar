import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";
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

export interface BulletPoints {
  items?: string[];
  /** @format color-input */
  itemsTextColor?: string;
  bulletPointsIcon?: IImage;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

/** @title {{text}} */
export interface BigNumber {
  text: string;
  /** @format color-input */
  textColor?: string;
  caption?: string;
  /** @format color-input */
  captionColor?: string;
}

export interface Props {
  id?: string;
  title?: string;
  /** @format color-input */
  titleColor?: string;
  caption?: string;
  /** @format color-input */
  captionColor?: string;
  description?: string;
  /** @format color-input */
  descriptionColor?: string;
  bulletpoints?: BulletPoints;
  bigNumbers?: BigNumber[];
  image?: IImage;
  video?: VideoWidget;
  use?: 'image' | 'video';
  placement?: "left" | "right";
  /** @title Text Below */
  ctaTitle?: string;
  /** @format color-input */
  textBelowColor?: string;
  cta?: CTA[];
  backgroundImage?: IImage;
}


export default function Hero({
  id,
  title,
  titleColor,
  caption,
  captionColor,
  description,
  descriptionColor,
  bulletpoints,
  bigNumbers,
  image,
  video,
  use = 'image',
  placement = 'left',
  ctaTitle,
  textBelowColor,
  cta = [],
  backgroundImage,
}: Props) {
  return (
    <div id={id} class={`relative flex flex-col lg:flex-row w-full mt-48 text-primary leading-[120%] ${placement == "left" ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      <AnimateOnShow divClass={`lg:relative lg:w-1/2 flex flex-col lg:flex-row ${placement == "left" ? 'justify-start' : 'justify-end'}`} animation="animate-fade-right">
        {backgroundImage?.src && <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt || "background image"}
          width={backgroundImage.width || 1018}
          height={backgroundImage.height || 1237}
          class={`absolute object-fill h-[140%] w-full lg:w-[130%] top-[-25%] ${placement == "left" ? 'left-0' : 'right-0'} -z-50`}
        />}
        <div class="px-7 mb-10 lg:hidden">
          <h2 class="text-2xl font-semibold" style={{ color: titleColor }}>{title}</h2>
          <p class="text-lg  mt-2.5 font-semibold" style={{ color: captionColor }}>{caption}</p>
        </div>
        {use == "image" && image?.src && <Image src={image.src} alt={image.alt || "hero image"} width={image.width || 809} height={image.height || 675} class="w-full xl:w-auto max-w-[809px] object-contain" />}
        {use == 'video' && video && <video
          width="1018"
          height="1237"
          autoPlay
          playsInline
          muted
          loading="lazy"
          loop
          class="w-full xl:w-auto max-w-[809px] object-contain"
        >
          <source src={video} type="video/mp4" />
          <object data="" width="1018" height="1237">
            <embed width="1018" height="1237" src={video} />
          </object>
        </video>}
      </AnimateOnShow>
      <div class={`lg:w-1/2 flex px-7 justify-center ${placement == "left" ? 'lg:justify-start' : 'lg:justify-end'}`}>
        <div class="max-w-[555px]">
          <AnimateOnShow divClass="text-5xl font-semibold hidden lg:block" animation="animate-fade-left" style={{ color: titleColor }}>{title}</AnimateOnShow>
          <AnimateOnShow divClass="text-2xl mt-2.5 font-semibold hidden lg:block" delay={100} animation="animate-fade-left" style={{ color: captionColor }}>{caption}</AnimateOnShow>
          <AnimateOnShow divClass="text-base font-normal leading-normal text-neutral-content mt-5" delay={200} animation="animate-fade-left" style={{ color: descriptionColor }}>{description}</AnimateOnShow>
          {bulletpoints && <AnimateOnShow divClass="mt-7 text-neutral-content text-base flex flex-col gap-2.5" animation="animate-fade-left" delay={300}>
            {bulletpoints.items?.map((item) => (
              <p class="flex gap-2.5" style={{ color: bulletpoints.itemsTextColor }}>
                {bulletpoints.bulletPointsIcon?.src && <Image
                  height={bulletpoints.bulletPointsIcon?.height || 16}
                  width={bulletpoints.bulletPointsIcon?.width || 16}
                  src={bulletpoints.bulletPointsIcon?.src}
                  alt={bulletpoints.bulletPointsIcon.alt || ""}
                />}
                {item}
              </p>
            ))}
          </AnimateOnShow>}
          <AnimateOnShow divClass="flex flex-wrap" delay={400} animation="animate-fade-left">
            {bigNumbers?.map((bigNumber) =>
              <div class="w-1/3 px-3 mt-10">
                <p class="text-xl sm:text-2xl lg:text-[34px] leading-[120%] font-bold" style={{ color: bigNumber.textColor }}>{bigNumber.text}</p>
                <p class="text-neutral-content text-xs sm:text-sm mt-2" style={{ color: bigNumber.captionColor }}>{bigNumber.caption}</p>
              </div>
            )}
          </AnimateOnShow>
          {ctaTitle && <p class="text-neutral-content text-base mb-5 mt-7" style={{ color: textBelowColor }}>{ctaTitle}</p>}
          <AnimateOnShow divClass="flex flex-wrap items-center gap-7 mt-5" animation="animate-fade-up" delay={500}>
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
          </AnimateOnShow>
        </div>
      </div>
    </div>
  );
}
