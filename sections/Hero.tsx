import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";

/** @title {{textBefore}} {{text}} */
export interface Link {
  textBefore?: string;
  text: string;
  href: string;
}

/** @title {{text}} */
export interface CTA {
  href: string;
  text: string;
}

export interface BulletPoints {
  items?: string[];
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
  caption?: string;
}

export interface Props {
  title?: string;
  caption?: string;
  description?: string;
  bulletpoints?: BulletPoints;
  bigNumbers?: BigNumber[];
  image?: IImage;
  video?: VideoWidget;
  use?: 'image' | 'video';
  placement?: "left" | "right";
  ctaTitle?: string;
  cta?: CTA[];
  links?: Link[];
  backgroundImage?: IImage;
}


export default function Hero({
  title,
  caption,
  description,
  bulletpoints,
  bigNumbers,
  image,
  video,
  use = 'image',
  placement = 'left',
  ctaTitle,
  cta = [],
  links = [],
  backgroundImage,
}: Props) {
  return (
    <div class={`flex flex-col lg:flex-row w-full mt-48 text-primary leading-[120%] ${placement == "left" ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      <AnimateOnShow divClass={`relative lg:w-1/2 flex flex-col lg:flex-row ${placement == "left" ? 'justify-start' : 'justify-end'}`} animation="animate-fade-right">
        {backgroundImage?.src && <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt || "background image"}
          width={backgroundImage.width || 1018}
          height={backgroundImage.height || 1237}
          class={`absolute object-fill h-full lg:h-[140%] w-full lg:w-[130%] top-[-25%] ${placement == "left" ? 'left-0' : 'right-0'} -z-50`}
        />}
        <div class="px-7 mb-10 lg:hidden">
          <h2 class="text-2xl font-semibold">{title}</h2>
          <p class="text-lg  mt-2.5 font-semibold">{caption}</p>
        </div>
        {use == "image" && image?.src && <Image src={image.src} alt={image.alt || "hero image"} width={image.width || 809} height={image.height || 675} class="w-full xl:w-auto max-w-[809px] object-contain" />}
        {use == 'video' && video && <video
          width="809"
          height="675"
          autoPlay
          playsInline
          muted
          loading="lazy"
          loop
          class="w-full xl:w-auto max-w-[809px] object-contain"
        >
          <source src={video} type="video/mp4" />
          <object data="" width="320" height="240">
            <embed width="320" height="240" src={video} />
          </object>
        </video>}
      </AnimateOnShow>
      <div class={`lg:w-1/2 flex px-7 justify-center ${placement == "left" ? 'lg:justify-start' : 'lg:justify-end'}`}>
        <div class="max-w-[555px]">
          <AnimateOnShow divClass="text-5xl font-semibold hidden lg:block" animation="animate-fade-left">{title}</AnimateOnShow>
          <AnimateOnShow divClass="text-2xl mt-2.5 font-semibold hidden lg:block" delay={100} animation="animate-fade-left">{caption}</AnimateOnShow>
          <AnimateOnShow divClass="text-base font-normal leading-normal text-base-300 mt-5" delay={200} animation="animate-fade-left">{description}</AnimateOnShow>
          {bulletpoints && <AnimateOnShow divClass="mt-7 text-base-300 text-base flex flex-col gap-2.5" animation="animate-fade-left" delay={300}>
            {bulletpoints.items?.map((item) => (
              <p class="flex gap-2.5">
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
                <p class="text-xl sm:text-2xl lg:text-[34px] leading-[120%] font-bold">{bigNumber.text}</p>
                <p class="text-base-300 text-xs sm:text-sm mt-2">{bigNumber.caption}</p>
              </div>
            )}
          </AnimateOnShow>
          {ctaTitle && <p class="text-base-300 text-base mb-5 mt-7">{ctaTitle}</p>}
          <AnimateOnShow divClass="flex flex-wrap items-center gap-7 mt-5" animation="animate-fade-up" delay={500}>
            {cta.map((button) =>
              <a
                href={button?.href ?? "#"}
                target={button?.href.includes("http") ? "_blank" : "_self"}
                class={`btn btn-primary font-bold px-7 hover:scale-110 text-lg`}
              >
                {button?.text}
              </a>
            )}
            {links.map((link) =>
              <a
                href={link?.href ?? "#"}
                target={link?.href.includes("http") ? "_blank" : "_self"}
                class={`text-primary font-bold hover:scale-110 text-lg transition-transform`}
              >
                {link.textBefore}
                <span class="underline" >{link.text}</span>
                <svg width="19" height="20" viewBox="0 0 19 20" class="fill-current inline" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8441 5.71091V13.4297C14.8441 13.5871 14.7815 13.7382 14.6702 13.8495C14.5588 13.9609 14.4078 14.0234 14.2503 14.0234C14.0929 14.0234 13.9418 13.9609 13.8305 13.8495C13.7191 13.7382 13.6566 13.5871 13.6566 13.4297V7.14407L5.17041 15.631C5.059 15.7424 4.90789 15.805 4.75033 15.805C4.59277 15.805 4.44166 15.7424 4.33025 15.631C4.21884 15.5196 4.15625 15.3685 4.15625 15.2109C4.15625 15.0533 4.21884 14.9022 4.33025 14.7908L12.8172 6.30466H6.53158C6.37411 6.30466 6.22309 6.2421 6.11174 6.13075C6.00039 6.0194 5.93783 5.86838 5.93783 5.71091C5.93783 5.55343 6.00039 5.40241 6.11174 5.29106C6.22309 5.17971 6.37411 5.11716 6.53158 5.11716H14.2503C14.4078 5.11716 14.5588 5.17971 14.6702 5.29106C14.7815 5.40241 14.8441 5.55343 14.8441 5.71091Z" />
                </svg>
              </a>
            )}
          </AnimateOnShow>
        </div>
      </div>
    </div>
  );
}
