import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";
import { HeroMedia } from "../sections/HeroV3.tsx";

export interface Media {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video" | "embed";
}

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface FloatingImage extends IImage {
  horizontalPosition?: string;
  verticalPosition?: string;
}

export interface Title {
  text?: RichText;
  /** @format color-input */
  color?: string;
  font?: string;
  fontWeight?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  titleMaxWidth?: string;
}

/** @title {{logo.alt}} */
export interface SocialMedia {
  logo?: IImage;
  href?: string;
}

export interface Props {
  title?: Title;
  text?: RichText;
  textProps?: TextProps;
  cta?: CTAProps[];
  ctaPlacement?: 'left' | 'center' | 'right';
  ctaFloatingImage?: FloatingImage;
  socialMedias?: SocialMedia[];
  media?: Media;
  backgroundMedia?: BackgroundMedia;
}

export default function Footer({ title, text, textProps, cta = [], ctaPlacement, ctaFloatingImage, media, backgroundMedia, socialMedias = [] }: Props) {
  const placement = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }

  return (
    <div class="relative pt-[60px] pb-8 lg:pt-[124px] lg:pb-8 px-5 lg:px-0">
      <div class="max-w-[1120px] mx-auto">

        {title?.text && <div
          dangerouslySetInnerHTML={{ __html: title.text }}
          class={`w-full text-[32px] pb-1 lg:text-[62px] lg:leading-none !text-transparent !bg-clip-text`}
          style={{ fontSize: title.fontSize, fontFamily: title.font, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, background: title.color, lineHeight: title.lineHeight }} />}

        {text && <div dangerouslySetInnerHTML={{ __html: text }} class="text-sm lg:text-base w-full mt-5 lg:mt-10" style={{ ...textProps }} />}

        {cta.length > 0 && <div class={`flex flex-wrap mt-10 ${placement[ctaPlacement || "left"]}`}>
          <div class="flex gap-4 relative">
            {cta.map(cta => (
              <CTA {...cta} />
            ))}
            {ctaFloatingImage?.src && <Image
              src={ctaFloatingImage.src}
              width={ctaFloatingImage.width || 47}
              height={ctaFloatingImage.height || 47}
              alt={ctaFloatingImage.alt || "floating image around the buttons"}
              class="absolute z-10 pointer-events-none top-0 left-0"
              style={{ top: ctaFloatingImage.verticalPosition, left: ctaFloatingImage.horizontalPosition }}
            />}
          </div>
        </div>}

        {socialMedias.length > 0 && <div class="flex gap-4 justify-center items-center mt-[60px] lg:mt-[40px]">
          {socialMedias.map((social, index) => (
            <a hx-on:click={`window.dataLayer = window.dataLayer || []; window.dataLayer.push({event: 'clique', custom_section: 'lp-komea', custom_type: 'footer', custom_title: '${social.logo?.alt || `Social ${index + 1}`}'});`} target={social.href?.includes("http") ? "_blank" : "_self"} href={social.href}>
              <Image src={social.logo?.src || ""} width={social.logo?.width || 26} height={social.logo?.height || 26} alt={social.logo?.alt || "social media logo"} />
            </a>
          ))}
        </div>}

        {media?.use && <div class="flex justify-center items-center mt-7 lg:mt-[90px]">
          <HeroMedia media={media} />
        </div>}
      </div>

      {backgroundMedia?.backgroundColor && <div style={{ background: backgroundMedia.backgroundColor }} class="absolute top-0 left-0 h-full w-full -z-50" />}
      {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
        src={backgroundMedia.image.src}
        alt={backgroundMedia.image.alt || "background image"}
        width={backgroundMedia.image.width || 1277}
        height={backgroundMedia.image.height || 630}
        class={`absolute -z-40 top-0 left-0 h-full w-full object-cover`}
        loading={"lazy"}
      />}
      {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading={"lazy"} loop
        class={`object-cover absolute -z-40 top-0 left-0 h-full w-full`}>
        <source src={backgroundMedia.video} type="video/mp4" />
      </video>}
    </div>
  );
}
