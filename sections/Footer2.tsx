import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

/** @title {{title}} */
export interface Card {
    cardIcon?: IImage;
    title?: string;
    text?: string;
    CTA?: CTA;
}

/** @title {{text}} */
export interface CTA {
    href: string;
    text: string;
}

/** @title {{href}} */
export interface socialLink {
    icon: IImage;
    href: string;
}

export interface emailForm {
    inputName?: string;
    inputLabel?: string;
    inputPlaceHolder?: string;
    submitText?: string;
    action?: string;
}

export interface Props {
    title?: string;
    backgroundVideo?: VideoWidget;
    backgroundImage?: IImage;
    useBackground?: "video" | "image";
    cards?: Card[];
    logo?: IImage;
    logoCaption?: string;
    formCaption?: string;
    socialLinks?: socialLink[];
    bottomLinks?: CTA[];
    emailForm?: emailForm;
    showForm?: boolean;
    bottomBackground?: IImage;
    /** @format color-input */
    color1?: string;
    /** @format color-input */
    color2?: string;
    /** @format color-input */
    color3?: string;
    /** @format color-input */
    color4?: string;
    /** @format color-input */
}

export default function Footer2({ title, backgroundImage, backgroundVideo, useBackground, cards = [], logo, logoCaption, formCaption, socialLinks, bottomLinks, emailForm, color1, color2, color3, color4, showForm, bottomBackground }: Props) {
    const backgroundColor = useBackground ? "transparent" : color1;
    return <footer class="text-primary" style={{ color: color1 }}>
        <div class={`relative w-full h-[56vw] lg:h-[42vw] flex justify-center items-end  ${!useBackground && "bg-primary"}`} style={{ backgroundColor: backgroundColor }}>
            {useBackground == "video" && backgroundVideo && <video
                width="1440"
                height="611"
                autoPlay
                playsInline
                muted
                loading="lazy"
                loop
                class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10"
            >
                <source src={backgroundVideo} type="video/mp4" />
                <object data="" width="1440" height="611">
                    <embed width="1440" height="611" src={backgroundVideo} />
                </object>
            </video>}
            {useBackground == "image" && backgroundImage?.src && <Image
                width={backgroundImage.width || 1440}
                height={backgroundImage.height || 611}
                src={backgroundImage.src}
                alt={backgroundImage.alt || "background image"}
                class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10"
            />}
            <h2 class="pb-14 lg:pb-[14vw] text-center text-2xl lg:text-[40px] leading-[120%] font-medium max-w-[576px] text-primary-content" style={{ color: color2 }}>{title}</h2>
        </div>
        <div class="relative pb-32">
            {bottomBackground?.src && <Image
                width={bottomBackground.width || 1440}
                height={bottomBackground.height || 420}
                src={bottomBackground.src}
                alt={bottomBackground.alt || "footer bottom background image"}
                class="absolute h-full w-full top-0 left-0 object-fill -z-50"
            />}
            <div class="max-w-[1070px] pl-7 py-9 lg:p-0 lg:mx-auto -mt-[68px] lg:-mt-28 flex lg:flex-wrap overflow-auto lg:overflow-visible lg:justify-center gap-2.5 lg:gap-[42px]">
                {cards.length > 0 && cards.map((card) => (
                    <div class="flex-grow min-w-[78vw] lg:min-w-0 lg:max-w-[500px] rounded-[30px] bg-primary-content py-7 lg:py-10 px-12 lg:px-14 shadow-spreaded3" style={{ backgroundColor: color2 }}>
                        <div class="flex gap-2.5 lg:gap-5 items-center">
                            {card.cardIcon?.src && <Image
                                width={card.cardIcon.width || 40}
                                height={card.cardIcon.height || 40}
                                src={card.cardIcon.src}
                                alt={card.cardIcon.alt || "card icon"}
                                class="object-contain h-7 lg:h-10 w-7 lg:w-10"
                            />}
                            <h3 class="text-base lg:text-xl font-semibold leading-[120%]">{card.title}</h3>
                        </div>
                        <p class="text-sm lg:text-base font-normal leading-normal mt-2.5 py-2.5">{card.text}</p>
                        {card.CTA?.text && <a
                            href={card.CTA?.href ?? "#"}
                            target={card.CTA?.href.includes("http") ? "_blank" : "_self"}
                            class={`btn btn-primary border-primary font-bold px-7 hover:scale-110 text-lg mt-2.5`}
                            style={{ backgroundColor: color1, color: color2, borderColor: color1 }}
                        >
                            {card.CTA?.text}
                            <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                            </svg>
                        </a>}
                    </div>
                ))}
            </div>
            <div class="max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-4 justify-between items-center mt-9 lg:mt-20">
                <div class="max-w-[193px] order-1 lg:-order-none">
                    {logo?.src && <Image
                        width={logo.width || 193}
                        height={logo.height || 31}
                        src={logo.src}
                        alt={logo.alt || "footer logo"}
                        class="object-contain mb-4"
                    />}
                    <p class="text-sm font-normal leading-normal">{logoCaption}</p>
                </div>

                {showForm && <form class="flex flex-wrap gap-5 items-center justify-center" action={emailForm?.action}>
                    {emailForm?.inputLabel && <p class="text-base font-semibold max-w-[173px]">{emailForm?.inputLabel}</p>}
                    <div class={`bg-primary-content flex justify-between py-1.5 pr-1.5 text-base text-primary border border-base-200 rounded-xl shadow-spreaded h-[63px] `} style={{ borderColor: color3 }}>
                        <input
                            type="email"
                            required
                            class="w-1/2 md:w-auto md:flex-grow h-[47px] pl-2 md:pl-7 focus:outline-none text-sm md:text-base"
                            placeholder={emailForm?.inputPlaceHolder}
                        />
                        <button type="submit" class="btn btn-primary font-bold px-7 hover:scale-110 text-lg" style={{ backgroundColor: color1, borderColor: color1 }}>
                            {emailForm?.submitText}
                        </button>
                    </div>
                </form>}

                <div class="flex gap-5 order-3">
                    {socialLinks?.map((link) => (
                        <a href={link.href} target="_blank">
                            <Image width={link.icon.width || 21} height={link.icon.height || 21} src={link.icon.src || ""} alt={link.icon.alt || "social media icon"} class="object-contain" />
                        </a>
                    ))}
                </div>

            </div>

            <div class="mt-20 mx-auto pt-7 border-t border-t-base-200 max-w-[1240px] flex flex-col lg:flex-row flex-wrap gap-y-5 gap-7" style={{ borderColor: color4 }}>
                {bottomLinks?.map((link) => {
                    if (link.href == '/talkToSpecialist') return <TalkToSpecialistCta text={link.text} ctaClass="text-sm font-normal leading-normal cursor-pointer text-center mx-auto" divClass="text-center" />
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
    </footer>
}