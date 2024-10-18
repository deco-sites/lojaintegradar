import type { ImageWidget, VideoWidget, HTMLWidget } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

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

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

/** @title {{title}} */
export interface Card {
    icon?: IImage;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    text?: string;
    /** @format color-input */
    textColor?: string;
}

export interface Props {
    /** @format color-input */
    backgroundColor?: string;
    title?: HTMLWidget;
    caption?: string;
    /** @format color-input */
    captionColor?: string;
    cards?: Card[];
    image?: IImage;
    cta?: CTA[];
}

export default function DetailedHero({ backgroundColor, title, caption, captionColor, cards, cta = [], image }: Props) {
    return <div class="py-[52px] px-7 xl:px-24" style={{ background: backgroundColor }}>
        <div class="flex justify-center lg:justify-between flex-wrap lg:flex-nowrap">
            <div class="max-w-full lg:max-w-[764px]">
                <AnimateOnShow animation="animate-fade-up">
                    {caption && <p class="text-base font-normal leading-normal mb-5" style={{ color: captionColor }}>{caption}</p>}
                    {title && <div dangerouslySetInnerHTML={{ __html: title }} class="text-3xl lg:text-5xl font-semibold leading-[120%] lg:w-[120%]" />}
                </AnimateOnShow>
                <div class="flex overflow-auto lg:overflow-visible lg:flex-wrap gap-14 gap-y-9">
                    {cards?.map((card, index) => (
                        <AnimateOnShow divClass="min-w-[60vw] lg:min-w-[0] w-[60vw] lg:w-auto lg:max-w-[342px] flex-grow flex flex-col gap-5 mt-4" delay={index * 50} animation="animate-fade-up">
                            {card.icon?.src && <Image
                                width={card.icon.width || 39}
                                height={card.icon.height || 39}
                                src={card.icon.src}
                                alt={card.icon.alt || "card icon"}
                            />}
                            {card.title && <h3 class="text-xl font-semibold leading-[120%]" style={{ color: card.titleColor }}>{card.title}</h3>}
                            {card.text && <p class="text-sm font-normal leading-normal" style={{ color: card.textColor }}>{card.text}</p>}
                        </AnimateOnShow>
                    ))}
                </div>
            </div>
            <div class="flex items-center">
                {image?.src && <Image
                    src={image.src}
                    alt={image.alt || "right image"}
                    width={image.width || 515}
                    height={image.height || 747}
                />}
            </div>
        </div>
        <AnimateOnShow divClass="flex flex-wrap items-center justify-center gap-7 mt-14" animation="animate-fade-up">
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