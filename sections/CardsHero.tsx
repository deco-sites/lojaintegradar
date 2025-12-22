import type { ImageWidget, VideoWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "site/components/ui/SmartImage.tsx";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface CardImage extends IImage {
    imagePlacement?: 'top' | 'bottom';
}

export interface Title {
    text?: RichText;
    font?: string;
    fontSize?: string;
    letterSpacing?: string;
    fontWeight?: string;
    lineHeight?: string;
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

export interface Tag {
    text?: RichText;
    /** @format color-input */
    backgroundColor?: string;
    textProps?: TextProps;
}

/** @title {{text}} */
export interface BulletPointsItem {
    text: string;
}
export interface BulletPoints {
    items?: BulletPointsItem[];
    bulletPointsIcon?: IImage;
    bulletPointsTextProps?: TextProps;
}

export interface Card {
    image?: CardImage;
    title?: RichText;
    /** @format color-input */
    titleColor?: string;
    titleFont?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleLineHeight?: string;
    titleLetterSpacing?: string;
    titleTag?: Tag;
    spaceBetweenTitleAndText?: string;
    text?: RichText;
    textProps?: TextProps;
    bulletPoints?: BulletPoints;
    cta?: CTAProps[];
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: 'image' | 'video';
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
    borderRadius?: string;
    minHeight?: string;
    padding?: string;
    contentPlacement?: 'top' | 'bottom';
}

export interface Column {
    cards?: Card[];
    cardsMaxWidth?: string;
    /** @hide true */
    distanceBetweenCards?: string;
}

export interface Props {
    hideSection?: boolean;
    tag?: Tag;
    id?: string;
    title?: Title;
    caption?: RichText;
    captionTextProps?: TextProps;
    leftColumn?: Column;
    rightColumn?: Column;
    invertColumns?: boolean;
    paddingTop?: string;
    paddingBottom?: string;
    distanceBetweenColums?: string;
    distanceBetweenCards?: string;
    bottomCta?: CTAProps[];
}

export function CardColumn({ cards = [], cardsMaxWidth, distanceBetweenCards }: Column) {
    return <div class="flex flex-col gap-y-5 max-w-[597px] flex-grow relative z-10" style={{ maxWidth: cardsMaxWidth, rowGap: distanceBetweenCards }}>
        {cards.map((card, index) => (
            <AnimateOnShow
                animation="animate-fade-up50"
                divClass={`relative rounded-md ${card.borderColor && 'border'} group py-5 lg:py-10 px-4 lg:px-7 shadow-spreaded4 flex flex-col overflow-hidden ${card.contentPlacement != "bottom" ? '' : 'justify-end'}`}
                style={{ borderColor: card.borderColor, minHeight: card.minHeight, background: card.backgroundColor, borderRadius: card.borderRadius, padding: card.padding, animationDuration: '1s' }}
                delay={100 * index}>

                {card.image?.src && card.image.imagePlacement !== "bottom" && <div class="flex w-full justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        width={card.image.width || 539}
                        height={card.image.height || 297}
                    />
                </div>}

                <div class="flex flex-wrap-reverse gap-5 items-center">
                    {card.title && <div
                        class="text-2xl py-1 text-primary font-normal w-full lg:w-fit leading-none"
                        style={{ background: card.titleColor, backgroundClip: "text", color: "transparent", fontFamily: card.titleFont, fontSize: card.titleFontSize, letterSpacing: card.titleLetterSpacing, fontWeight: card.titleFontWeight, lineHeight: card.titleLineHeight }}
                        dangerouslySetInnerHTML={{ __html: card.title }}
                    />}
                    {card.titleTag?.text && <div
                        class="rounded-[20px] w-fit font-normal px-4 py-1 text-sm lg:text-lg"
                        style={{ background: card.titleTag.backgroundColor }}
                        dangerouslySetInnerHTML={{ __html: card.titleTag.text }} />
                    }
                </div>

                {card.text && <div dangerouslySetInnerHTML={{ __html: card.text }} class="mt-2.5 text-base font-normal" style={{ marginTop: card.spaceBetweenTitleAndText, ...card.textProps }} />}

                {card.bulletPoints?.items && card.bulletPoints.items.length > 0 && <div class="flex flex-col gap-4 mt-5">
                    {card.bulletPoints?.items?.map((item) => (
                        <p class="flex gap-2 text-sm font-normal" style={{ ...card.bulletPoints?.bulletPointsTextProps }}>
                            {card.bulletPoints?.bulletPointsIcon?.src && <Image
                                height={card.bulletPoints?.bulletPointsIcon?.height || 15}
                                width={card.bulletPoints?.bulletPointsIcon?.width || 15}
                                src={card.bulletPoints?.bulletPointsIcon?.src}
                                alt={card.bulletPoints?.bulletPointsIcon.alt || "bullet point icon"}
                            />}
                            {item.text}
                        </p>
                    ))}
                </div>}

                <div class={`flex flex-wrap gap-7 ${card.contentPlacement != "bottom" ? 'mt-auto' : ''}`}>
                    {card.cta?.map(cta => (
                        <CTA {...cta} />
                    ))}
                </div>

                {card.image?.src && card.image.imagePlacement === "bottom" && <div class="flex w-full justify-center mb-4">
                    <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        width={card.image.width || 539}
                        height={card.image.height || 297}
                    />
                </div>}

                {card.useBackground == "image" && card.backgroundImage?.src && <Image
                    width={card.backgroundImage.width || 597}
                    height={card.backgroundImage.height || 211}
                    src={card.backgroundImage.src}
                    alt={card.backgroundImage.alt || "card background image"}
                    class="absolute w-full h-full top-0 left-0 object-cover object-top -z-50 group-hover:scale-110 duration-300"
                />}
                {card.useBackground == 'video' && card.backgroundVideo && <video
                    width="1280"
                    height="720"
                    autoPlay
                    playsInline
                    muted
                    loading="lazy"
                    loop
                    class="absolute top-0 left-0 w-full h-full object-cover -z-50 group-hover:scale-110 duration-300"
                >
                    <source src={card.backgroundVideo} type="video/mp4" />
                </video>}
            </AnimateOnShow>
        ))}
    </div>
}


export default function CardsHero({ hideSection, tag, distanceBetweenCards, distanceBetweenColums, id, paddingBottom, bottomCta = [], paddingTop, title, caption, captionTextProps, leftColumn = { cards: [] }, rightColumn = { cards: [] }, invertColumns = false }: Props) {
    if (hideSection) return <></>
    leftColumn.distanceBetweenCards = distanceBetweenCards;
    rightColumn.distanceBetweenCards = distanceBetweenCards;
    return <div id={id} class="py-20" style={{ paddingBottom, paddingTop }}>
        <div class="mb-">
            <AnimateOnShow
                animation="animate-fade-up50"
                divClass={`text-5xl lg:text-[70px] leading-[120%] ${caption ? 'mb-4' : 'mb-12 lg:mb-[120px]'}`}>
                {tag?.text && <div
                    class="rounded-[20px] w-fit mx-auto font-normal px-4 py-1 text-sm lg:text-lg"
                    style={{ background: tag.backgroundColor, ...tag.textProps }}
                    dangerouslySetInnerHTML={{ __html: tag.text }} />
                }
                {title?.text && <div class="leading-normal lg:leading-[1.2]"
                    dangerouslySetInnerHTML={{ __html: title.text }}
                    style={{ fontFamily: title.font, fontSize: title.fontSize, letterSpacing: title.letterSpacing, fontWeight: title.fontWeight, lineHeight: title.lineHeight }} />}
            </AnimateOnShow>
            {caption && <AnimateOnShow
                animation="animate-fade-up50"
                divClass="text-base lg:text-2xl font-light leading-normal mb-20">
                <div dangerouslySetInnerHTML={{ __html: caption }} style={{ ...captionTextProps }} />
            </AnimateOnShow>}
        </div>
        <div class={`px-5 lg:px-0 flex flex-wrap lg:flex-nowrap gap-y-7 justify-center gap-5 ${invertColumns && 'flex-row-reverse'}`} style={{ columnGap: distanceBetweenColums, rowGap: distanceBetweenCards }}>
            <CardColumn {...leftColumn} />
            <CardColumn {...rightColumn} />
        </div>
        {bottomCta.length > 0 && <div class={`flex flex-wrap gap-4 justify-center mt-5 lg:mt-20`}>
            {bottomCta.map(cta => (
                <CTA {...cta} />
            ))}
        </div>}
    </div>
}