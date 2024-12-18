import type { ImageWidget, VideoWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";

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

export interface Card {
    title?: RichText;
    /** @format color-input */
    titleColor?: string;
    titleFont?: string;
    spaceBetweenTitleAndText?: string;
    text?: HTMLWidget;
    cta?: CTA[];
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: 'image' | 'video';
    /** @format color-input */
    borderColor?: string;
    minHeight?: string;
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
                    {card.cta?.map((button) => {
                        return <a
                            href={button?.href ?? "#"}
                            target={button?.href.includes("http") ? "_blank" : ""}
                            class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
                            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                        >
                            {button?.text}
                            {button.underlineText && <span class="underline">{button.underlineText}</span>}
                            {button.showIcon && <svg width="32" height="16" viewBox="0 0 32 16" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31.7071 8.70711C32.0976 8.31658 32.0976 7.68342 31.7071 7.29289L25.3431 0.928932C24.9526 0.538408 24.3195 0.538408 23.9289 0.928932C23.5384 1.31946 23.5384 1.95262 23.9289 2.34315L29.5858 8L23.9289 13.6569C23.5384 14.0474 23.5384 14.6805 23.9289 15.0711C24.3195 15.4616 24.9526 15.4616 25.3431 15.0711L31.7071 8.70711ZM0 9H31V7H0V9Z" />
                            </svg>}
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

export interface Props {
    leftColumn?: {
        cards?: Card[];
    }
    rightColumn?: {
        cards?: Card[];
    }
    invertColumns?: boolean;
}

export default function CardsHero({ leftColumn = { cards: [] }, rightColumn = { cards: [] }, invertColumns = false }: Props) {
    return <div class={`max-w-[1220px] mx-auto py-20 px-7 lg:px-0 flex flex-wrap gap-y-7 justify-center lg:justify-between ${invertColumns && 'flex-row-reverse'}`}>
        <CardColumn cards={leftColumn.cards} />
        <CardColumn cards={rightColumn.cards} />
    </div>
}