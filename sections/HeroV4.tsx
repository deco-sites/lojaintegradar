import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";
import HubspotForm, { Props as HubspotFormProps } from "../components/HubspotForm.tsx";

const openModal = (modalId: string) => {
  event!.preventDefault();
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.remove("hidden");
};
const closeModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.add("hidden");
};


export interface TextProps {
  /** @format color-input */
  color?: string;
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
  /** @format color-input */
  color?: string;
  fontFamily?: string;
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
  cornerImage?: boolean;
  video?: IVideo;
  use?: "image" | "video" | "embed";
}

export interface MediaWithPlacement extends Media {
  placement?: "right" | "left" | "bellow" | "above";
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
  postition?: "top" | "bottom";
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

export interface sectionBackgroundMedia extends BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
  customHeight?: string;
}

export interface Props {
  hideSection?: boolean;
  title?: Title;
  distanceBetweenTitleAndText?: string;
  text?: RichText;
  textProps?: TextProps;
  bulletPoints?: BulletPoints;
  cta?: CTAProps[];
  ctaPlacement?: 'left' | 'center' | 'right';
  media?: MediaWithPlacement;
  hubspotForm?: HubspotFormProps;
  container?: Container;
  sectionMarginTop?: string;
  sectionBackground?: sectionBackgroundMedia;
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
      style={{ width: media.image.width + 'px' }}
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

export default function HeroV3({ hideSection, title, text, textProps, bulletPoints, cta = [], media, hubspotForm, distanceBetweenTitleAndText, container, ctaPlacement, sectionBackground, sectionMarginTop, lcp, floatingImage }: Props) {
  if (hideSection) return <></>;
  const placement = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }
  const mediaPlacement = {
    "left": "lg:justify-between flex-row-reverse flex-wrap-reverse",
    "right": "lg:justify-between flex-row flex-wrap",
    "bellow": "flex-row flex-wrap lg:flex-col",
    "above": "flex-row-reverse flex-wrap lg:flex-col-reverse"
  }
  const backgroundMediaPlacement = {
    "top": "object-top",
    "center": "",
    "bottom": "object-bottom"
  }

  return <div class=" relative py-12" style={{ paddingTop: container?.marginTop, paddingBottom: container?.marginBottom, marginTop: sectionMarginTop }}>
    <div
      class={`max-w-[1120px] relative z-10 mx-auto rounded-[20px] px-3.5 lg:px-0 flex gap-5 gap-y-10 lg:gap-y-20 lg:flex-nowrap items-center justify-center ${mediaPlacement[media?.placement || "right"]}`}
      style={{ background: container?.backgroundColor, paddingTop: container?.paddingTop, paddingLeft: container?.paddingLeft, paddingBottom: container?.paddingBottom, paddingRight: container?.paddingRight, minHeight: container?.minHeight }}>
      <AnimateOnShow animation="animate-fade-up50" divClass={`${(media?.use && media.placement != "bellow" && media.placement != "above") && 'max-w-[656px]'} flex flex-grow flex-col gap-6`} style={{ animationDuration: '1s', maxWidth: title?.titleMaxWidth }}>

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
          class={`w-full text-[32px] lg:text-[56px] lg:leading-[1.2] !text-transparent !bg-clip-text`}
          style={{ fontSize: title.fontSize, fontFamily: title.font, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, background: title.color, lineHeight: title.lineHeight, marginBottom: distanceBetweenTitleAndText }} />}

        {text && <div dangerouslySetInnerHTML={{ __html: text }} class="text-sm lg:text-lg w-full" style={{ ...textProps }} />}

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

        {hubspotForm?.show && <HubspotForm {...hubspotForm} />}

        {cta.length > 0 && <div class={`flex flex-wrap gap-4 mt-auto pt-2 ${placement[ctaPlacement || "left"]}`}>
          {cta.map(cta => (
            <CTA {...cta} />
          ))}
        </div>}
      </AnimateOnShow>


      {media?.use && <AnimateOnShow
        delay={200}
        style={{ animationDuration: "1s" }}
        animation={"animate-fade-up50"}>
        <div class={`${media.cornerImage && 'opacity-0'}`}><HeroMedia media={media} /></div>
      </AnimateOnShow>}


      {container?.backgroundMedia?.use == "image" && container?.backgroundMedia.image?.src && <Image
        src={container?.backgroundMedia.image.src}
        alt={container?.backgroundMedia.image.alt || "background image"}
        width={container?.backgroundMedia.image.width || 1277}
        height={container?.backgroundMedia.image.height || 630}
        class={`absolute -z-30 top-0 left-0 h-full w-full object-cover ${backgroundMediaPlacement[container.backgroundMedia.postition || 'center']}`}
      />}
      {container?.backgroundMedia?.use == "video" && container?.backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
        class={`object-cover absolute -z-30 top-0 left-0 h-full w-full ${backgroundMediaPlacement[container.backgroundMedia.postition || 'center']}`}>
        <source src={container?.backgroundMedia.video} type="video/mp4" />
      </video>}
    </div>
    {sectionBackground?.backgroundColor && <div style={{ background: sectionBackground.backgroundColor }} class="absolute top-0 left-0 h-full w-full -z-40" />}
    {sectionBackground?.use == "image" && sectionBackground.image?.src && <Image
      src={sectionBackground.image.src}
      alt={sectionBackground.image.alt || "background image"}
      width={sectionBackground.image.width || 1277}
      height={sectionBackground.image.height || 630}
      class={`absolute -z-40 top-0 left-0 h-full w-full object-cover ${backgroundMediaPlacement[sectionBackground.postition || "center"]}`}
      style={{ height: sectionBackground.customHeight }}
      loading={lcp ? "eager" : "lazy"}
    />}
    {sectionBackground?.use == "video" && sectionBackground.video && <video width={1280} height={720} autoPlay playsInline muted loading={lcp ? "eager" : "lazy"} loop
      class={`object-cover absolute -z-40 top-0 left-0 h-full w-full ${backgroundMediaPlacement[sectionBackground.postition || "center"]}`}
      style={{ height: sectionBackground.customHeight }}>
      <source src={sectionBackground.video} type="video/mp4" />
    </video>}

    {media?.cornerImage && media.use == "image" && <div class={`absolute h-full ${media.placement == "left" ? "left-0" : "right-0"} top-0 flex items-center`}>
      {media?.use == "image" && media.image?.src && <Image
        src={media.image.src}
        alt={media.image.alt || "image"}
        class="object-contain"
        width={media.image.width || 534}
        height={media.image.height || 534}
        style={{ width: media.image.width + 'px' }}
      />}
    </div>}
  </div>
}