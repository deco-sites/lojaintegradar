import type { ImageWidget, VideoWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
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
    ctaStyle?: "button" | "link";
    showIcon?: boolean;
    icon?: IImage;
}

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface Title {
    text?: RichText;
    font?: string;
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
    ctaStyle: "button" | "link";
    showIcon?: boolean;
    icon?: IImage;
    order?: number;
}

export interface Card {
    title?: RichText;
    /** @format color-input */
    titleColor?: string;
    titleFont?: string;
    spaceBetweenTitleAndText?: string;
    text?: HTMLWidget;
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: 'image' | 'video';
    /** @format color-input */
    borderColor?: string;
    minHeight?: string;
}

export interface Props {
    id?: string;
    title?: Title;
    caption?: RichText;
    leftColumn?: {
        cards?: Card[];
    }
    rightColumn?: {
        cards?: Card[];
    }
    invertColumns?: boolean;
    paddingTop?: string;
    paddingBottom?: string;
}

export function CardColumn({ cards = [] }: { cards?: Card[] }) {
    return <div class="flex flex-col gap-y-5 max-w-[597px] flex-grow">
        {cards.map((card, index) => (
            <AnimateOnShow animation="animate-fade-up50" divClass="relative rounded-md border py-5 lg:py-10 px-4 lg:px-7 shadow-spreaded4 flex flex-col overflow-hidden" style={{ borderColor: card.borderColor, minHeight: card.minHeight }} delay={100 * index}>
                {card.title && <div
                    class="text-2xl text-primary font-normal leading-none"
                    style={{ background: card.titleColor, backgroundClip: "text", color: "transparent", fontFamily: card.titleFont }}
                    dangerouslySetInnerHTML={{ __html: card.title }}
                />}
                <div dangerouslySetInnerHTML={{ __html: card.text || "" }} class="mt-2.5 text-base font-normal leading-[120%]" style={{ marginTop: card.spaceBetweenTitleAndText }} />
                <div class="flex flex-wrap gap-7 mt-auto">
                    {card.createStoreCta?.text && <CreateStoreCta
                        period="anual"
                        text={card.createStoreCta.text}
                        planId={card.createStoreCta.planId}
                        showIcon={card.createStoreCta.showIcon}
                        underlineText={card.createStoreCta.underlineText}
                        icon={card.createStoreCta.icon}
                        ctaClass={`${card.createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                        style={card.createStoreCta.ctaStyle == "button"
                            ? { backgroundColor: card.createStoreCta.backgroundColor, color: card.createStoreCta.textColor, borderColor: card.createStoreCta.borderColor, order: card.createStoreCta.order }
                            : { color: card.createStoreCta.textColor, order: card.createStoreCta.order }}
                    />}
                    {card.cta?.map((button, index) => {
                        if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                            showIcon={button.showIcon}
                            underlineText={button.underlineText}
                            text={button.text}
                            icon={button.icon}
                            ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-base h-auto cursor-pointer`}
                            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                        />
                        return <a
                            href={button?.href ?? "#"}
                            target={button?.href.includes("http") ? "_blank" : ""}
                            class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-2.5 border-primary font-bold hover:scale-110 transition-transform text-base`}
                            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
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
                </div>
                {card.useBackground == "image" && card.backgroundImage?.src && <Image
                    width={card.backgroundImage.width || 597}
                    height={card.backgroundImage.height || 211}
                    src={card.backgroundImage.src}
                    alt={card.backgroundImage.alt || "card background image"}
                    class="absolute w-full h-full top-0 left-0 object-cover object-top -z-50"
                />}
                {card.useBackground == 'video' && card.backgroundVideo && <video
                    width="1280"
                    height="720"
                    autoPlay
                    playsInline
                    muted
                    loading="lazy"
                    loop
                    class="absolute top-0 left-0 w-full h-full object-cover -z-50"
                >
                    <source src={card.backgroundVideo} type="video/mp4" />
                </video>}
            </AnimateOnShow>
        ))}
    </div>
}


export default function CardsHero({ id, paddingBottom, paddingTop, title, caption, leftColumn = { cards: [] }, rightColumn = { cards: [] }, invertColumns = false }: Props) {
    return <div id={id} class="py-20" style={{ paddingBottom, paddingTop }}>
        <div class="max-w-[1220px] mx-auto">
            {title?.text && <AnimateOnShow
                animation="animate-fade-up50"
                divClass="text-5xl lg:text-[70px] leading-[120%] mb-4"
                style={{ fontFamily: title.font }}>
                <div dangerouslySetInnerHTML={{ __html: title.text }} />
            </AnimateOnShow>}
            {caption && <AnimateOnShow
                animation="animate-fade-up50"
                divClass="text-base lg:text-2xl font-light leading-normal mb-4">
                <div dangerouslySetInnerHTML={{ __html: caption }} />
            </AnimateOnShow>}
        </div>
        <div class={`max-w-[1220px] mx-auto px-7 lg:px-0 flex flex-wrap gap-y-7 justify-center lg:justify-between ${invertColumns && 'flex-row-reverse'}`}>
            <CardColumn cards={leftColumn.cards} />
            <CardColumn cards={rightColumn.cards} />
        </div>
    </div>
}