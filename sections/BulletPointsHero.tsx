import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

const onClick = () => {
  const parent = event!.currentTarget as HTMLElement;
  const video = parent.querySelector("video") as HTMLVideoElement;
  const mutedIcon = parent.querySelector(".mutedIcon") as HTMLElement || undefined;

  if (video.muted) {
    // video.currentTime = 0;
    // video.play();
    // mutedIcon.classList.add("hidden");
    // video.muted = false;
    mutedIcon.classList.add("hidden");
    video.muted = false;
    video.currentTime = 0;
    video.play();
    video.controls = true;
  } else {
    // video.muted = true;
    // mutedIcon.classList.remove("hidden");
  }
};

/** @title {{title}} */
export interface BulletPoints {
  title?: string;
  /** @format color-input */
  titleColor?: string;
  items?: string[];
  /** @format color-input */
  itemsTextColor?: string;
  bulletPointsIcon?: IImage;
  /** @format color-input */
  backgroundColor?: string;
}

export interface CreateStoreWithPlanCTA {
  planId: string;
  text?: string;
  underlineText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  borderColor?: string;
  ctaStyle?: "button" | "link";
  showIcon?: boolean;
  icon?: IImage;
  width?: string;
  order?: number;
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
  icon?: IImage;
  width?: string;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
  mutedIcon?: IImage;
}

export interface Title {
  text?: RichText;
  font?: string;
}

export interface Media {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video" | "embed";
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Props {
  hideSection?: boolean;
  id?: string;
  title?: Title;
  caption?: RichText;
  bulletpointSections?: BulletPoints[];
  createStoreCta?: CreateStoreWithPlanCTA;
  cta?: CTA[];
  media?: Media;
  mediaPlacement?: "right" | "left";
  backgroundMedia?: BackgroundMedia;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
  sectionMinHeight?: string;
}

export function HeroMedia({ media }: { media?: Media }) {
  return <div>
    {media?.use == "image" && media.image?.src && <Image
      src={media.image.src}
      alt={media.image.alt || "image"}
      width={media.image.width || 400}
      height={media.image.height || 710}
      class="object-contain"
    />}
    {media?.use == "video" && media.video?.src && <div class="relative" hx-on:click={useScript(onClick)}>
        <video width={media.video.width || 1280} height={media.video.height || 720} autoPlay playsInline muted loading="lazy" loop
        class="object-cover"
        style={{ width: media.video.width ? media.video.width + "px" : "400px", height: media.video.height ? media.video.height + "px" : "710px" }}>
        <source src={media.video.src} type="video/mp4" />
      </video>
      {media.video.mutedIcon?.src && <div class="absolute w-full h-full top-0 left-0 mutedIcon"><Image 
        src={media.video.mutedIcon.src}
        alt={media.video.mutedIcon.alt || "muted icon"}
        width={media.video.mutedIcon.width || 30}
        height={media.video.mutedIcon.height || 30}
        class="object-contain absolute bottom-5 right-5"
      /></div>}
    </div>}
    {media?.use == "embed" && <iframe
      width={"100%"}
      height={"100%"}
      src={`${media.video?.src}`}
      frameborder="0"
      style={{ width: media.video?.width || 410, height: media.video?.height || 710 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen gyroscope; picture-in-picture"
    />}
  </div>
}

export default function BulletPointsHero({ hideSection, id, title, paddingBottom, bulletpointSections = [], createStoreCta, cta = [], paddingLeft, caption, paddingRight, paddingTop, sectionMinHeight, backgroundMedia, media, mediaPlacement = "left" }: Props) {
  if (hideSection) return <></>
  return <div id={id} style={{ paddingTop, paddingBottom, paddingRight, paddingLeft, minHeight: sectionMinHeight }} class="relative">
    <div class={`max-w-[1210px] mx-auto flex flex-wrap lg:flex-nowrap gap-7 ${media?.use ? 'justify-between' : 'justify-center' } ${mediaPlacement == "right" && 'flex-row-reverse'}`}>
      {media?.use && <AnimateOnShow
        divClass="flex justify-center lg:justify-left w-full lg:w-auto"
        animation={mediaPlacement == "right" ? "animate-fade-left" : "animate-fade-right"}>
        <HeroMedia media={media} />
      </AnimateOnShow>}
      <div class={`max-w-[710px] flex flex-col items-center lg:items-start ${!media?.use && 'lg:items-center'}`}>
        {title?.text && <AnimateOnShow
          animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}
          divClass="text-5xl lg:text-[56px] leading-[120%] mb-2.5 w-full"
          style={{ fontFamily: title.font }}>
          <div dangerouslySetInnerHTML={{ __html: title.text }} />
        </AnimateOnShow>}
        {caption && <AnimateOnShow
          animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}
          divClass="text-sm lg:text-lg font-light leading-[120%] mb-7 w-full">
          <div dangerouslySetInnerHTML={{ __html: caption }} />
        </AnimateOnShow>}
        <AnimateOnShow divClass="flex gap-10 gap-y-3 flex-wrap mb-7 justify-center lg:justify-left" animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}>
          {bulletpointSections.map((bps) => (
            <div class="w-full lg:max-w-[235px] lg:min-h-[284px] rounded-3xl py-9 px-6 flex flex-col gap-2.5" style={{background: bps.backgroundColor}}>
              {bps.title && <h3 class="text-xl font-semibold leading-[120%]" style={{color: bps.titleColor}}>{bps.title}</h3>}
              {bps?.items?.map((item) => (
                                <p class="flex gap-2 text-sm font-normal" style={{ color: bps.itemsTextColor }}>
                                    {bps.bulletPointsIcon?.src && <Image
                                        height={bps.bulletPointsIcon?.height || 12}
                                        width={bps.bulletPointsIcon?.width || 12}
                                        src={bps.bulletPointsIcon?.src}
                                        alt={bps.bulletPointsIcon.alt || "bullet point icon"}
                                    />}
                                    {item}
                                </p>
                            ))}
            </div>
          ))}
        </AnimateOnShow>
        <AnimateOnShow divClass="flex flex-wrap gap-4" animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}>
        {createStoreCta?.text && <CreateStoreCta
                                period="anual"
                                text={createStoreCta.text}
                                planId={createStoreCta.planId}
                                showIcon={createStoreCta.showIcon}
                                icon={createStoreCta.icon}
                                underlineText={createStoreCta.underlineText}
                                ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                                style={createStoreCta.ctaStyle == "button"
                                    ? { backgroundColor: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order, width: createStoreCta.width || "fit-content" }
                                    : { color: createStoreCta.textColor, order: createStoreCta.order, width: createStoreCta.width || "fit-content" }}
                            />}
          {cta.map((button, index) => {
                                  if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                                      showIcon={button.showIcon}
                                      underlineText={button.underlineText}
                                      text={button.text}
                                      icon={createStoreCta?.icon}
                                      ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto cursor-pointer`}
                                      style={button.ctaStyle == "button" 
                                        ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } 
                                        : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                                  />
                                  return <a
                                      href={button?.href ?? "#"}
                                      target={button?.href.includes("http") ? "_blank" : ""}
                                      class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto`}
                                      style={button.ctaStyle == "button" 
                                        ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } 
                                        : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                                  >
                                      {button?.text}
                                      {button.underlineText && <span class="underline">{button.underlineText}</span>}
                                      {button.showIcon && (button.icon?.src
                                        ? <Image src={button.icon.src} alt={button.icon.alt || "button icon"} width={button.icon.width || 20} height={button.icon.height || 20} class="object-contain" />
                                        : <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                                        </svg>)}
                                  </a>
                              })}
        </AnimateOnShow>
      </div>
    </div>
    {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
      src={backgroundMedia.image.src}
      alt={backgroundMedia.image.alt || "background image"}
      width={backgroundMedia.image.width || 1440}
      height={backgroundMedia.image.height || 960}
      class="absolute -z-50 top-0 left-0 h-full w-full object-cover"
    />}
    {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
      class="object-cover absolute -z-50 top-0 left-0 h-full w-full">
      <source src={backgroundMedia.video} type="video/mp4" />
    </video>}
  </div>
}