import type { ImageWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useId } from "site/sdk/useId.ts";
import { StringBufferWithCallbacks } from "@hono/hono/utils/html";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

export interface TextProps {
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

export interface BackgroundMedia {
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
}

/** @title {{title}} */
export interface Card {
    /** @format color-input */
    backgroundColor?: string;
    cardIcon?: IImage;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    titleTextProps?: TextProps;
    text?: string;
    /** @format color-input */
    textColor?: string;
    textProps?: TextProps;
    CTA?: CTAProps;
}

/** @title {{text}} */
export interface CTA {
    href: string;
    text: string;
}

/** @title {{icon.alt}} */
export interface socialLink {
    icon: IImage;
    href: string;
}

export interface HubspotForm {
    region?: string;
    portalId?: string;
    formId?: string;
    inputLabel?: string;
    /** @format color-input */
    inputLabelColor?: string;
    /** @format color-input */
    buttonColor?: string;
    /** @format color-input */
    buttonTextColor?: string;
    /** @format color-input */
    buttonIcon?: boolean;
    buttonWidth?: 'min' | 'full';
    /** @format color-input */
    errorMessageColor?: string;
}

export interface Props {
    hideSection?: boolean;
    id?: string;
    centralizeCards?: boolean;
    cards?: Card[];
    showLogo?: boolean;
    logo?: IImage;
    logoCaption?: string;
    logoPosition?: "below" | "above"
    socialLinksCaption?: RichText;
    /** @format color-input */
    logoCaptionColor?: string;
    socialLinks?: socialLink[];
    centralizeLogoAndSocialLinks?: boolean;
    bottomLinks?: CTA[];
    /** @format color-input */
    bottomLinksColor?: string;
    centralizeBottomLinks?: boolean;
    backgroundMedia?: BackgroundMedia;
    /** @format color-input */
    lineColor?: string;
    paddingTop?: string;
}

export default function Footer2({ hideSection, id, centralizeCards = false, showLogo, paddingTop, centralizeBottomLinks = false, centralizeLogoAndSocialLinks = false, cards = [], logo, socialLinksCaption, logoCaption, logoPosition, socialLinks, bottomLinks, logoCaptionColor, bottomLinksColor, backgroundMedia, lineColor }: Props) {
    if (hideSection) return <></>
    //const randomId = useId();
    //const hubspostFormId = randomId + "hubspotForm";
    return <footer id={id} class="relative text-primary pt-14 lg:pt-[105px] z-10" style={{ paddingTop }}>

        <div class="pb-32">
            <div class="max-w-[1250px] mx-auto">
                <AnimateOnShow divClass={`${centralizeCards && 'mx-auto'} w-full justify-center px-5 lg:p-0 flex flex-wrap gap-[42px]`} animation="animate-fade-up">
                    {cards.length > 0 && cards.map((card) => (
                        <div class="flex-grow min-w-[78vw] lg:min-w-0 lg:max-w-[500px] rounded-[20px] bg-primary-content py-7 lg:py-10 px-12 lg:px-14 shadow-spreaded4 lg:shadow-spreaded5" style={{ background: card.backgroundColor }}>
                            <div class="flex gap-2.5 lg:gap-5 items-center">
                                {card.cardIcon?.src && <Image
                                    width={card.cardIcon.width || 40}
                                    height={card.cardIcon.height || 40}
                                    src={card.cardIcon.src}
                                    alt={card.cardIcon.alt || "card icon"}
                                    class="object-contain h-7 lg:h-10 w-7 lg:w-10"
                                />}
                                <h3 class="text-base lg:text-xl font-semibold leading-[120%]" style={{ color: card.titleColor, ...card.titleTextProps }}>{card.title}</h3>
                            </div>
                            <p class="text-sm lg:text-base font-normal leading-normal mt-2.5 py-2.5" style={{ color: card.textColor, ...card.textProps }}>{card.text}</p>
                            {card.CTA && <CTA {...card.CTA} />}
                        </div>
                    ))}
                </AnimateOnShow>
                <div class={`max-w-[1240px] mx-auto flex flex-col gap-4 justify-between items-center mt-9 lg:mt-20 ${!centralizeLogoAndSocialLinks && 'lg:flex-row '}`}>
                    <div class="max-w-[1240px] mx-auto flex flex-col lg:flex-row flex-wrap gap-x-4 lg:gap-x-20 gap-y-4 justify-center items-center mt-9">
                        {showLogo && <AnimateOnShow divClass={`w-full ${logoPosition == "below" && 'max-w-[193px]'} order-1 lg:-order-none`} animation="animate-fade-up" delay={100}>
                            <div class="max-w-[193px] mx-auto">
                                {logo?.src && <Image
                                    width={logo.width || 193}
                                    height={logo.height || 31}
                                    src={logo.src}
                                    alt={logo.alt || "footer logo"}
                                    class="object-contain mb-4"
                                />}
                                <p class="text-sm font-normal leading-normal">{logoCaption}</p>
                            </div>
                        </AnimateOnShow>}

                        <AnimateOnShow divClass="flex gap-5 order-3" delay={400} animation="animate-fade-up">
                            {socialLinksCaption && <div class="text-2xl" dangerouslySetInnerHTML={{ __html: socialLinksCaption }} />}
                            {socialLinks?.map((link) => (
                                <a href={link.href} target="_blank" class="flex">
                                    <Image width={link.icon.width || 21} height={link.icon.height || 21} src={link.icon.src || ""} alt={link.icon.alt || "social media icon"} class="object-contain" />
                                </a>
                            ))}
                        </AnimateOnShow>

                    </div>

                </div>

                <div class={`mt-20 mx-5 lg:mx-auto pt-[62px] border-t border-t-base-200 max-w-[1240px] flex flex-col lg:flex-row flex-wrap gap-y-5 gap-7 ${centralizeBottomLinks && 'justify-center'}`} style={{ borderColor: lineColor, color: bottomLinksColor }}>
                    {bottomLinks?.map((link) => {
                        if (link.href == '/talkToSpecialist') return <TalkToSpecialistCta text={link.text} ctaClass="text-sm font-normal leading-normal cursor-pointer text-center" divClass="text-center" />
                        return <a
                            href={link.href}
                            target={link.href.includes("http") ? "_blank" : "_self"}
                            class="text-sm font-normal leading-normal cursor-pointer text-center"
                        >
                            {link.text}
                        </a>
                    })}
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

    </footer>
}