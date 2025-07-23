import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
  marginTop?: string;
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

export interface sectionBackgroundMedia extends BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
  customHeight?: string;
}

/** @title {{text}} */
export interface MarkdownText {
  text?: RichText
  textProps?: TextProps;
  /** @format color-input */
  markdownColor?: string;
  markdownVerticalScale?: string;
  markdownHorizontalScale?: string;
  markdownVerticalPosition?: string;
  markdownHorizontalPosition?: string;
}

export interface BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
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

/** @title {{text}} */
export interface BulletPointsItem {
  text: string;
}
export interface BulletPoints {
  items?: BulletPointsItem[];
  textProps?: TextProps;
  bulletPointsIcon?: IImage;
}

export interface Props {
  texts?: MarkdownText[];
  bulletPoints?: BulletPoints;
  cta?: CTAProps[];
  container?: Container;
  sectionBackground?: sectionBackgroundMedia;
}

export default function BulletPointsHero({ texts, bulletPoints, cta = [], container, sectionBackground }: Props) {
  return <div class="relative px-5 lg:px-0 py-[60px] lg:pt-20 lg:pb-[124px]" style={{ paddingTop: container?.marginTop, marginBottom: container?.paddingBottom, }}>
    <div class="relative max-w-[1120px] mx-auto flex flex-wrap justify-center lg:justify-between gap-7 lg:gap-14 rounded-lg py-[60px] px-2.5 lg:py-16 lg:px-16 overflow-hidden"
      style={{ paddingTop: container?.paddingTop, paddingBottom: container?.paddingBottom, paddingLeft: container?.paddingLeft, paddingRight: container?.paddingRight }}>
      <div class="max-w-[278px] lg:max-w-[700px] flex flex-col items-center lg:items-start">
        {texts?.map(text => (
          <div class="relative inline-block">
            <div dangerouslySetInnerHTML={{ __html: text.text || "" }} style={{ ...text.textProps }} />
            <div class="absolute h-full w-full top-0 left-0 -z-30"
              style={{ background: text.markdownColor, transform: `scale(${text.markdownHorizontalScale || '100%'}, ${text.markdownVerticalScale || '100%'}) translate(${text.markdownHorizontalPosition || '0'}, ${text.markdownVerticalPosition || '0'})` }} />
          </div>
        ))}
        <div class="flex flex-wrap gap-8 mt-7 lg:mt-16">
          {bulletPoints?.items?.map((item) => (
            <p class="flex gap-4 items-center text-sm font-normal w-full lg:w-[280px]" style={{ ...bulletPoints.textProps }}>
              {bulletPoints?.bulletPointsIcon?.src && <Image
                height={bulletPoints?.bulletPointsIcon?.height || 22}
                width={bulletPoints?.bulletPointsIcon?.width || 22}
                src={bulletPoints?.bulletPointsIcon?.src}
                alt={bulletPoints?.bulletPointsIcon.alt || "bullet point icon"}
              />}
              {item.text}
            </p>
          ))}
        </div>
      </div>

      <div class="flex flex-wrap justify-center items-end gap-4">
        {cta.map(cta => (
          <CTA {...cta} />
        ))}
      </div>

      {container?.backgroundColor && <div style={{ background: container.backgroundColor }} class="absolute top-0 left-0 h-full w-full -z-40" />}
      {container?.backgroundMedia?.use == "image" && container?.backgroundMedia.image?.src && <Image
        src={container?.backgroundMedia.image.src}
        alt={container?.backgroundMedia.image.alt || "background image"}
        width={container?.backgroundMedia.image.width || 1277}
        height={container?.backgroundMedia.image.height || 630}
        class={`absolute -z-40 top-0 left-0 h-full w-full object-cover `}
      />}
      {container?.backgroundMedia?.use == "video" && container?.backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
        class={`object-cover absolute -z-40 top-0 left-0 h-full w-full `}>
        <source src={container?.backgroundMedia.video} type="video/mp4" />
      </video>}
    </div>

    {sectionBackground?.backgroundColor && <div style={{ background: sectionBackground.backgroundColor }} class="absolute top-0 left-0 h-full w-full -z-50" />}
    {sectionBackground?.use == "image" && sectionBackground.image?.src && <Image
      src={sectionBackground.image.src}
      alt={sectionBackground.image.alt || "background image"}
      width={sectionBackground.image.width || 1277}
      height={sectionBackground.image.height || 630}
      class={`absolute -z-40 top-0 left-0 h-full w-full object-cover `}
      style={{ height: sectionBackground.customHeight }}
      loading={"lazy"}
    />}
    {sectionBackground?.use == "video" && sectionBackground.video && <video width={1280} height={720} autoPlay playsInline muted loading={"lazy"} loop
      class={`object-cover absolute -z-40 top-0 left-0 h-full w-full `}
      style={{ height: sectionBackground.customHeight }}>
      <source src={sectionBackground.video} type="video/mp4" />
    </video>}
  </div>
}