import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";

import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

export interface BulletPoints {
    items?: string[];
    /** @format color-input */
    itemsTextColor?: string;
    bulletPointsIcon?: IImage;
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
}

export interface Title {
    text?: RichText;
    font?: string;
}

export interface Tag {
    text?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    marginTop?: string;
    placement?: 'left' | 'center' | 'right';
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

export interface Div {
    /** @format color-input */
    backgroundColor?: string;
    icon?: IImage;
    contentPlacement?: 'left' | 'center' | 'right';
}

export interface Props {
    hideSection?: boolean;
    id?: string;
    tag?: Tag;
    title?: Title;
    caption?: RichText;
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    bulletpoints?: BulletPoints;
    ctaDiv?: Div;
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
        {media?.use == "image" && media.image?.src && <img
            src={media.image.src}
            alt={media.image.alt || "image"}
            width={media.image.width || 752}
            height={media.image.height || 726}
            class="object-contain"
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen gyroscope; picture-in-picture"
        />}
    </div>
}

export default function HeroV2({ hideSection, id, tag, title, caption, createStoreCta, cta = [], bulletpoints, sectionMinHeight, ctaDiv, media, backgroundMedia, paddingTop, paddingBottom, mediaPlacement = "right", paddingLeft, paddingRight }: Props) {
    if (hideSection) return <></>
    const placement = {
        "left": "justify-start",
        "center": "justify-center",
        "right": "justify-end"
    }
    return <div
        id={id}
        style={{ paddingTop, paddingBottom, paddingRight, paddingLeft, minHeight: sectionMinHeight }}
        class="relative"
    >
        <div class={`flex ${mediaPlacement == 'left' && 'flex-row-reverse'}`}>
            <div class={`w-full ${media?.use && 'lg:w-1/2'} flex justify-center ${mediaPlacement == "right" ? "lg:justify-end" : "lg:justify-start"} ${!media?.use && 'lg:justify-center'}`}>
                <div class={`${mediaPlacement == "left" ? `${media?.use && 'lg:ml-11 max-w-[590px]'}` : `${media?.use && 'lg:mr-11 max-w-[590px]'}`} ${!media?.use && 'w-full'}`}>
                    <div style={{ marginTop: tag?.marginTop }}>
                        {tag?.text && <div class={`flex ${placement[tag?.placement || "left"] || "justify-start"}`}>
                            <AnimateOnShow
                                animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}
                                divClass="py-2.5 px-5 rounded-[20px] mb-11 text-base font-bold"
                                style={{ background: tag.backgroundColor, color: tag.textColor }}>
                                {tag.text}
                            </AnimateOnShow>
                        </div>}
                    </div>
                    {title?.text && <AnimateOnShow
                        animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}
                        divClass="text-5xl lg:text-[64px] leading-[120%] mb-4"
                        style={{ fontFamily: title.font }}>
                        <div dangerouslySetInnerHTML={{ __html: title.text }} />
                    </AnimateOnShow>}
                    {caption && <AnimateOnShow
                        animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}
                        divClass="text-base lg:text-2xl font-normal leading-normal mb-4">
                        <div dangerouslySetInnerHTML={{ __html: caption }} />
                    </AnimateOnShow>}
                    <AnimateOnShow divClass="lg:hidden mt-4 mb-7" animation={mediaPlacement == "right" ? "animate-fade-left" : "animate-fade-right"}>
                        <HeroMedia media={media} />
                    </AnimateOnShow>
                    <AnimateOnShow
                        divClass={`relative flex flex-col rounded-xl lg:rounded-3xl ${ctaDiv?.backgroundColor && 'py-4 px-3 lg:px-6 lg:pt-7 lg:pb-8'}`}
                        style={{ background: ctaDiv?.backgroundColor }}
                        animation={mediaPlacement == "right" ? "animate-fade-right" : "animate-fade-left"}>
                        {ctaDiv?.icon?.src && <img
                            src={ctaDiv.icon.src}
                            width={ctaDiv.icon.width || 31}
                            height={ctaDiv.icon.height || 30}
                            class="absolute bottom-4 right-3 lg:bottom-6 lg:right-8"
                        />}
                        {(cta.length > 0 || createStoreCta?.text) && <div class={`mb-8 flex gap-4 flex-wrap ${placement[ctaDiv?.contentPlacement || "left"]}`}>
                            {createStoreCta?.text && <CreateStoreCta
                                period="anual"
                                text={createStoreCta.text}
                                planId={createStoreCta.planId}
                                showIcon={createStoreCta.showIcon}
                                underlineText={createStoreCta.underlineText}
                                ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                                style={createStoreCta.ctaStyle == "button"
                                    ? { backgroundColor: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order, width: createStoreCta.width }
                                    : { color: createStoreCta.textColor, order: createStoreCta.order, width: createStoreCta.width }}
                                icon={createStoreCta.icon}
                            />}
                            {cta.map((button, index) => {
                                if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                                    showIcon={button.showIcon}
                                    underlineText={button.underlineText}
                                    text={button.text}
                                    ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto cursor-pointer`}
                                    style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                                    icon={button.icon}
                                />
                                return <a
                                    href={button?.href ?? "#"}
                                    target={button?.href.includes("http") ? "_blank" : ""}
                                    class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto`}
                                    style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                                >
                                    {button?.text}
                                    {button.underlineText && <span class="underline">{button.underlineText}</span>}
                                    {button.showIcon && (button.icon?.src
                                        ? <img src={button.icon.src} alt={button.icon.alt || "button icon"} width={button.icon.width || 20} height={button.icon.height || 20} class="object-contain" />
                                        : <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                                        </svg>)}
                                </a>
                            })}
                        </div>}
                        <div class="relative z-10">
                            {bulletpoints?.items?.map((item) => (
                                <p class="flex gap-2.5 text-sm lg:text-lg font-semibold max-w-[85%] lg:max-w-[440px]" style={{ color: bulletpoints.itemsTextColor }}>
                                    {bulletpoints.bulletPointsIcon?.src && <img
                                        height={bulletpoints.bulletPointsIcon?.height || 20}
                                        width={bulletpoints.bulletPointsIcon?.width || 20}
                                        src={bulletpoints.bulletPointsIcon?.src}
                                        alt={bulletpoints.bulletPointsIcon.alt || "bullet point icon"}
                                    />}
                                    {item}
                                </p>
                            ))}
                        </div>
                    </AnimateOnShow>
                </div>
            </div>
            {media?.use && <AnimateOnShow
                divClass={`w-1/2 hidden lg:flex justify-center ${mediaPlacement == "right" ? "lg:justify-end" : "lg:justify-start"} items-center`}
                animation={mediaPlacement == "right" ? "animate-fade-left" : "animate-fade-right"}>
                <HeroMedia media={media} />
            </AnimateOnShow>}
        </div>
        {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <img
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