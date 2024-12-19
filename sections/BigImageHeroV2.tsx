import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
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
    ctaStyle?: "button" | "link";
    showIcon?: boolean;
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
    order?: number;
}

/** @title {{title}} */
export interface Feature {
    icon?: IImage;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    text?: string;
    /** @format color-input */
    textColor?: string;
}

export interface Props {
    id?: string;
    title?: RichText;
    titleFont?: string;
    caption?: RichText;
    captionFont?: string;
    features?: Feature[];
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    paddingTop?: string;
    paddingBottom?: string;
}

export default function BigHeroImageV2({ title, createStoreCta, titleFont, caption, captionFont, image, video, use = "image", features, cta, paddingBottom, paddingTop, id }: Props) {
    return <div id={id} style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }} class="pt-10 lg:pt-28">
        <div class="max-w-[1440px] mx-auto">
            <div class="px-7 mb-5">
                <AnimateOnShow animation="animate-fade-up50">
                    {title && <div class="text-[32px] lg:text-[70px] font-normal mb-7 leading-[120%]" style={{ fontFamily: titleFont }} dangerouslySetInnerHTML={{ __html: title }} />}
                    {caption && <div class="text-base font-normal leading-normal" style={{ fontFamily: captionFont }} dangerouslySetInnerHTML={{ __html: caption }} />}
                </AnimateOnShow>
                <div class="mt-11 flex justify-between gap-7 overflow-auto lg:overflow-visible">
                    {features?.map((feature, index) => (
                        <AnimateOnShow divClass="min-w-[251px] w-[251px]" animation="animate-fade-up" delay={index * 100}>
                            <div class="flex gap-2.5">
                                {feature.icon?.src && <Image
                                    width={feature.icon.width || 20}
                                    height={feature.icon.height || 20}
                                    src={feature.icon.src}
                                    alt={feature.icon.alt || "feature title icon"}
                                />}
                                <h3 class="text-base lg:text-lg font-semibold leading-[120%]" style={{ color: feature.titleColor }}>{feature.title}</h3>
                            </div>
                            <p class="mt-2.5 text-sm font-normal leading-normal" style={{ color: feature.textColor }}>
                                {feature.text}
                            </p>
                        </AnimateOnShow>
                    ))}
                </div>
            </div>
            <AnimateOnShow animation="animate-pop-up" delay={300}>
                {use == "image" && image?.src && <Image
                    src={image.src}
                    alt={image.alt || "big image"}
                    width={image.width || 1700}
                    height={image.height || 800}
                    class="object-contain h-full w-full"
                />}
                {use == "video" && video && <video
                    width="1700"
                    height="800"
                    autoPlay
                    playsInline
                    muted
                    loading="lazy"
                    loop
                    class="object-contain"
                >
                    <source src={video} type="video/mp4" />
                </video>}
            </AnimateOnShow>
            {cta && <AnimateOnShow divClass="flex flex-wrap justify-center items-center gap-7 mt-4 px-7" animation="animate-fade-up">
                {createStoreCta?.text && <CreateStoreCta
                    period="anual"
                    text={createStoreCta.text}
                    planId={createStoreCta.planId}
                    showIcon={createStoreCta.showIcon}
                    underlineText={createStoreCta.underlineText}
                    ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                    style={createStoreCta.ctaStyle == "button"
                        ? { backgroundColor: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order }
                        : { color: createStoreCta.textColor, order: createStoreCta.order }}
                />}
                {cta.map((button) => {
                    if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                        showIcon={button.showIcon}
                        underlineText={button.underlineText}
                        text={button.text}
                        ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                        style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                    />
                    return <a
                        href={button?.href ?? "#"}
                        target={button?.href.includes("http") ? "_blank" : ""}
                        class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                        style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                    >
                        {button?.text}
                        {button.underlineText && <span class="underline">{button.underlineText}</span>}
                        {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                        </svg>}
                    </a>
                })}
            </AnimateOnShow>}
        </div>
    </div>
}