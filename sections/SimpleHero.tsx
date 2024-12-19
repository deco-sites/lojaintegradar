import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

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

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface Props {
    text?: HTMLWidget;
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: "image" | "video";
    sectionHeight?: string;
}

export default function FloatingImagesHero({ text, cta = [], createStoreCta, backgroundImage, backgroundVideo, sectionHeight, useBackground }: Props) {
    return <div class="relative flex flex-col gap-5 lg:gap-10 lg:justify-center items-center overflow-hidden py-[38px] px-7" style={{ height: sectionHeight || "auto" }}>
        {useBackground == "image" && backgroundImage?.src && <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt || "background image"}
            width={backgroundImage.width || 1439}
            height={backgroundImage.height || 569}
            class="absolute left-0 top-0 w-full h-full object-cover -z-50"
        />}
        {useBackground == "video" && backgroundVideo && <video
            width="1280"
            height="720"
            autoPlay
            playsInline
            muted
            loading="lazy"
            loop
            class="object-cover w-full h-full absolute top-0 left-0 -z-50"
        >
            <source src={backgroundVideo} type="video/mp4" />
        </video>}
        <AnimateOnShow animation="animate-fade-down50">
            {text && <div class="text-2xl lg:text-[56px] font-bold leading-[120%] max-w-[1130px]" dangerouslySetInnerHTML={{ __html: text }} />}
        </AnimateOnShow>
        <AnimateOnShow divClass="flex flex-wrap items-center justify-center gap-7" animation="animate-fade-up">
            {createStoreCta?.text && <CreateStoreCta
                period="anual"
                text={createStoreCta.text}
                planId={createStoreCta.planId}
                showIcon={createStoreCta.showIcon}
                underlineText={createStoreCta.underlineText}
                ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                style={createStoreCta.ctaStyle == "button"
                    ? { backgroundColor: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order }
                    : { color: createStoreCta.textColor, order: createStoreCta.order }}
            />}
            {cta.map((button) => {
                if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                    showIcon={button.showIcon}
                    underlineText={button.underlineText}
                    text={button.text}
                    ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                    style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                />
                return <a
                    href={button?.href ?? "#"}
                    target={button?.href.includes("http") ? "_blank" : ""}
                    class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
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
}