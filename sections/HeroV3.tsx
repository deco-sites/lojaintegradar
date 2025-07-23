import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

export interface TextProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
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

export interface TextProps {
  fontFamily?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
}

/** @title {{text}} */
export interface BulletPointsItem {
  text: string;
}
export interface BulletPoints {
  items?: BulletPointsItem[];
  /** @format color-input */
  bulletPointsColor?: string;
  textProps?: TextProps;
  bulletPointsIcon?: IImage;
}

export interface Media {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video" | "embed";
  placement?: "right" | "left" | "bellow";
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Container {
  /** @format color-input */
  backgroundColor?: string;
  backgroundMedia?: BackgroundMedia;
  marginTop?: string;
  marginBottom?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  minHeight?: string;
}

export interface backgroundMediaWithColor extends BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
}

export interface Props {
  title?: Title;
  distanceBetweenTitleAndText?: string;
  text?: RichText;
  textProps?: TextProps;
  bulletPoints?: BulletPoints;
  cta?: CTAProps[];
  ctaPlacement?: 'left' | 'center' | 'right';
  media?: Media;
  container?: Container;
  sectionBackground?: backgroundMediaWithColor;
  floatingImage?: FloatingImage;
  lcp?: boolean;
}

export function HeroMedia({ media }: { media?: Media }) {
  return <>
    {media?.use == "image" && media.image?.src && <Image
      src={media.image.src}
      alt={media.image.alt || "image"}
      class="object-contain"
      width={media.image.width || 534}
      height={media.image.height || 534}
    />}
    {media?.use == "video" && media.video?.src && <video width={media.video.width || 1280} height={media.video.height || 720} autoPlay playsInline muted loading="lazy" loop
      class="object-cover"
      style={{ width: media.video.width + "px" || "1280px", height: media.video.height + "px" || "720px" }}>
      <source src={media.video.src} type="video/mp4" />
    </video>}
    {media?.use == "embed" && <iframe
      width={"100%"}
      height={"100%"}
      src={media.video?.src}
      frameborder="0"
      style={{ width: media.video?.width || 854, height: media.video?.height || 480 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />}
  </>
}

export default function HeroV3({ title, text, textProps, bulletPoints, cta = [], media, distanceBetweenTitleAndText, container, ctaPlacement, sectionBackground, lcp, floatingImage }: Props) {
  const placement = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }
  const mediaPlacement = {
    "left": "lg:justify-between flex-row-reverse flex-wrap-reverse",
    "right": "lg:justify-between flex-row flex-wrap",
    "bellow": "flex-row flex-wrap lg:flex-col"
  }
  return <div class="px-5 lg:px-0 relative py-12" style={{ background: sectionBackground?.backgroundColor, paddintTop: container?.marginTop, paddingBottom: container?.marginBottom }}>
    <div
      class={`max-w-[1288px] relative z-10 mx-auto rounded-[20px] overflow-hidden p-[30px] lg:p-12 flex gap-5 lg:gap-y-9 lg:flex-nowrap items-center justify-center ${mediaPlacement[media?.placement || "right"]}`}
      style={{ background: container?.backgroundColor, paddingTop: container?.paddingTop, paddingLeft: container?.paddingLeft, paddingBottom: container?.paddingBottom, paddingRight: container?.paddingRight, minHeight: container?.minHeight }}>
      <AnimateOnShow animation="animate-fade-up50" divClass={`${(media?.use && media.placement != "bellow") && 'max-w-[448px]'} w-full flex flex-col gap-6`} style={{ animationDuration: '1s', maxWidth: title?.titleMaxWidth }}>

        {floatingImage?.src && <Image
          src={floatingImage.src}
          alt={floatingImage.alt || "floating image"}
          width={floatingImage.width || 378}
          height={floatingImage.height || 168}
          class="absolute z-10"
          style={{ top: floatingImage.verticalPosition, left: floatingImage.horizontalPosition }}
        />}

        {title?.text && <div
          dangerouslySetInnerHTML={{ __html: title.text }}
          class={`w-full text-[32px] lg:text-[56px] lg:leading-[1.2] !text-transparent !bg-clip-text pb-1`}
          style={{ fontSize: title.fontSize, fontFamily: title.font, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, background: title.color, lineHeight: title.lineHeight, marginBottom: distanceBetweenTitleAndText }} />}

        {text && <div dangerouslySetInnerHTML={{ __html: text }} class="text-sm lg:text-lg w-full pb-1" style={{ ...textProps }} />}

        {bulletPoints?.items && <div class="flex flex-col gap-4">
          {bulletPoints?.items?.map((item) => (
            <p class="flex gap-2 text-sm font-normal" style={{ color: bulletPoints?.bulletPointsColor, ...bulletPoints.textProps }}>
              {bulletPoints?.bulletPointsIcon?.src && <Image
                height={bulletPoints?.bulletPointsIcon?.height || 15}
                width={bulletPoints?.bulletPointsIcon?.width || 15}
                src={bulletPoints?.bulletPointsIcon?.src}
                alt={bulletPoints?.bulletPointsIcon.alt || "bullet point icon"}
              />}
              {item.text}
            </p>
          ))}
        </div>}

        {cta.length > 0 && <div class={`flex flex-wrap gap-4 mt-auto ${placement[ctaPlacement || "left"]}`}>
          {cta.map(cta => (
            <CTA customEvent={"HeroV3"} customEventCategory={"loja-integrada:institucional"} customEventLabel={"criar-loja-gratis"} {...cta} />
          ))}
        </div>}
      </AnimateOnShow>


      {media?.use && <AnimateOnShow
        delay={200}
        style={{ animationDuration: "1s" }}
        animation={"animate-fade-up50"}>
        <HeroMedia media={media} />
      </AnimateOnShow>}


      {container?.backgroundMedia?.use == "image" && container?.backgroundMedia.image?.src && <Image
        src={container?.backgroundMedia.image.src}
        alt={container?.backgroundMedia.image.alt || "background image"}
        width={container?.backgroundMedia.image.width || 1277}
        height={container?.backgroundMedia.image.height || 630}
        class="absolute -z-50 top-0 left-0 h-full w-full object-cover"
      />}
      {container?.backgroundMedia?.use == "video" && container?.backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
        class="object-cover absolute -z-50 top-0 left-0 h-full w-full">
        <source src={container?.backgroundMedia.video} type="video/mp4" />
      </video>}
    </div>
    {sectionBackground?.use == "image" && sectionBackground.image?.src && <Image
      src={sectionBackground.image.src}
      alt={sectionBackground.image.alt || "background image"}
      width={sectionBackground.image.width || 1277}
      height={sectionBackground.image.height || 630}
      class="absolute -z-50 top-0 left-0 h-full w-full object-cover"
      loading={lcp ? "eager" : "lazy"}
    />}
    {sectionBackground?.use == "video" && sectionBackground.video && <video width={1280} height={720} autoPlay playsInline muted loading={lcp ? "eager" : "lazy"} loop
      class="object-cover absolute -z-50 top-0 left-0 h-full w-full">
      <source src={sectionBackground.video} type="video/mp4" />
    </video>}
  </div>
}