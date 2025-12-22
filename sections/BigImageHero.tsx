import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";

import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";

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
    hideSection?: boolean;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    caption?: string;
    /** @format color-input */
    captionColor?: string;
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
    features?: Feature[];
    cta?: CTA[];
    backgroundImage?: IImage;
    bottomFloatingImage?: IImage;
}

export default function BigHeroImage({ hideSection, title, titleColor, caption, captionColor, image, video, use, features, cta = [], backgroundImage, bottomFloatingImage }: Props) {
    if (hideSection) return <></>
    return <div class={`relative text-primary ${bottomFloatingImage?.src && 'mb-[157px]'} mt-[110px] px-7 lg:px-0`}>
        {backgroundImage?.src && <img
            width={backgroundImage.width || 1440}
            height={backgroundImage.height || 960}
            src={backgroundImage.src}
            alt={backgroundImage.alt || ""}
            class="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />}
        {use == "image" && image?.src && <img
            width={image.width || 1154}
            height={image.height || 1000}
            src={image.src}
            alt={image.alt || "section main image"}
            class="absolute h-full max-w-[60vw] right-0 bottom-0 object-contain -z-40 object-bottom hidden lg:block"
        />}
        {use == "video" && video && <video
            width="1154"
            height="308"
            autoPlay
            playsInline
            muted
            loading="lazy"
            loop
            class="absolute h-full max-w-[60vw] right-0 bottom-0 object-contain -z-40 object-bottom hidden lg:block"
        >
            <source src={video} type="video/mp4" />
            <object data="" width="1154" height="1000">
                <embed width="1154" height="1000" src={video} />
            </object>
        </video>}

        <div class="max-w-[1250px] mx-auto py-[76px]">
            <AnimateOnShow divClass="text-2xl lg:text-5xl font-semibold leading-[120%] max-w-[470px]" style={{ color: titleColor }} animation="animate-fade-right">{title}</AnimateOnShow>
            <AnimateOnShow divClass="text-lg lg:text-2xl font-semibold leading-[120%] max-w-[437px] mt-4" style={{ color: captionColor }} animation="animate-fade-right" delay={100}>{caption}</AnimateOnShow>
            <div class="mt-11 flex lg:flex-col gap-7 overflow-auto lg:overflow-visible">
                {features?.map((feature, index) => (
                    <AnimateOnShow divClass="min-w-[239px] w-[239px]" animation="animate-fade-right" delay={index * 100}>
                        <div class="flex gap-2.5">
                            {feature.icon?.src && <img
                                width={feature.icon.width || 20}
                                height={feature.icon.height || 20}
                                src={feature.icon.src}
                                alt={feature.icon.alt || "feature title icon"}
                            />}
                            <h3 class="text-base lg:text-lg font-semibold leading-[120%]" style={{ color: feature.titleColor }}>{feature.title}</h3>
                        </div>
                        <p class="mt-2.5 text-base font-normal leading-normal" style={{ color: feature.textColor }}>
                            {feature.text}
                        </p>
                    </AnimateOnShow>
                ))}
            </div>
            <AnimateOnShow divClass="mt-11 flex flex-col gap-y-7" animation="animate-fade-right">
                {cta?.map((button) => {
                    if (button.href == "/talkToSpecialist") {
                        return <TalkToSpecialistCta
                            text={button.text}
                            ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center  gap-1 border-primary font-bold hover:scale-110 transition-transform cursor-pointer text-lg`}
                            divClass="self-start"
                            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                            underlineText={button.underlineText}
                            showIcon={button.showIcon}
                        />
                    }
                    return <a
                        href={button?.href ?? "#"}
                        target={button?.href.includes("http") ? "_blank" : "_self"}
                        class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
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
        {use == "image" && image?.src && <img
            width={image.width || 428}
            height={image.height || 308}
            src={image.src}
            alt={image.alt || "section main image"}
            class="object-contain object-bottom lg:hidden"
        />}
        {use == "video" && video && <video
            width="428"
            height="308"
            autoPlay
            playsInline
            muted
            loading="lazy"
            loop
            class="object-contain object-bottom lg:hidden"
        >
            <source src={video} type="video/mp4" />
            <object data="" width="428" height="308">
                <embed width="428" height="308" src={video} />
            </object>
        </video>}
        <div class="absolute w-full -bottom-28 left-0">
            <div class="max-w-[1250px] flex justify-center lg:justify-start mx-auto">
                {bottomFloatingImage?.src && <img
                    width={bottomFloatingImage.width || 476}
                    height={bottomFloatingImage.height || 155}
                    src={bottomFloatingImage.src}
                    alt={bottomFloatingImage.alt || "floating image"}
                    class="lg:ml-[194px] object-contain"
                />}
            </div>
        </div>
    </div>
}