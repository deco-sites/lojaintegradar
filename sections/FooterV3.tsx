import type { ImageWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useId } from "site/sdk/useId.ts";
import { StringBufferWithCallbacks } from "@hono/hono/utils/html";

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
    id?: string;
    cards?: Card[];
    /** @format color-input */
    cardsBackgroundColor?: string;
    /** @format color-input */
    cardsTextColor?: string;
    /** @format color-input */
    cardsButtonColor?: string;
    /** @format color-input */
    cardsButtonTextColor?: string;
    logo?: IImage;
    logoCaption?: string;
    /** @format color-input */
    logoCaptionColor?: string;
    socialLinks?: socialLink[];
    bottomLinks?: CTA[];
    /** @format color-input */
    bottomLinksColor?: string;
    showForm?: boolean;
    hubspotForm?: HubspotForm;
    backgroundMedia?: BackgroundMedia;
    /** @format color-input */
    lineColor?: string;
}

export default function Footer2({ id, cards = [], logo, logoCaption, socialLinks, bottomLinks, hubspotForm, logoCaptionColor, cardsButtonColor, cardsButtonTextColor, cardsTextColor, bottomLinksColor, cardsBackgroundColor, backgroundMedia, lineColor, showForm }: Props) {
    const randomId = useId();
    const hubspostFormId = randomId + "hubspotForm";
    return <footer id={id} class="relative text-primary pt-[105px]">

        <div class="pb-32">
            <div class="max-w-[1250px] mx-auto">
                <AnimateOnShow divClass="max-w-[1070px] pl-5 py-9 lg:p-0 flex lg:flex-wrap overflow-auto lg:overflow-visible gap-2.5 lg:gap-[42px]" animation="animate-fade-up">
                    {cards.length > 0 && cards.map((card) => (
                        <div class="flex-grow min-w-[78vw] lg:min-w-0 lg:max-w-[500px] rounded-[30px] bg-primary-content py-7 lg:py-10 px-12 lg:px-14 shadow-spreaded3" style={{ background: cardsBackgroundColor, color: cardsTextColor }}>
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
                                style={{ background: cardsButtonColor, color: cardsButtonTextColor, borderColor: cardsButtonColor }}
                            >
                                {card.CTA?.text}
                                <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                                </svg>
                            </a>}
                        </div>
                    ))}
                </AnimateOnShow>
                <div class="max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-4 justify-between items-center mt-9 lg:mt-20">
                    <AnimateOnShow divClass="max-w-[193px] order-1 lg:-order-none" animation="animate-fade-up" delay={100}>
                        {logo?.src && <Image
                            width={logo.width || 193}
                            height={logo.height || 31}
                            src={logo.src}
                            alt={logo.alt || "footer logo"}
                            class="object-contain mb-4"
                        />}
                        <p class="text-sm font-normal leading-normal" style={{ color: logoCaptionColor }}>{logoCaption}</p>
                    </AnimateOnShow>

                    <AnimateOnShow animation="animate-fade-up" delay={250} animationDuration="animate-fade-up">


                        {showForm && <div class="flex flex-wrap gap-5 lg:gap-[85px] items-center justify-center">
                            {hubspotForm?.inputLabel && <p class="text-base font-semibold max-w-[173px]" style={{ color: hubspotForm.inputLabelColor }}>{hubspotForm?.inputLabel}</p>}
                            <div class={hubspostFormId} dangerouslySetInnerHTML={{
                                __html: `<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                            <script>
                            hbspt.forms.create({
                                region: "${hubspotForm?.region || ""}",
                                portalId: "${hubspotForm?.portalId}",
                                formId: "${hubspotForm?.formId}",
                                    });
                                    </script>
                                    `
                            }} />
                        </div>}
                    </AnimateOnShow>

                    <AnimateOnShow divClass="flex gap-5 order-3" delay={400} animation="animate-fade-up">
                        {socialLinks?.map((link) => (
                            <a href={link.href} target="_blank">
                                <Image width={link.icon.width || 21} height={link.icon.height || 21} src={link.icon.src || ""} alt={link.icon.alt || "social media icon"} class="object-contain" />
                            </a>
                        ))}
                    </AnimateOnShow>

                </div>

                <div class="mt-20 mx-auto pt-[62px] border-t border-t-base-200 max-w-[1240px] flex flex-col lg:flex-row flex-wrap gap-y-5 gap-7" style={{ borderColor: lineColor, color: bottomLinksColor }}>
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
        <style dangerouslySetInnerHTML={{
            __html: `
                    .${hubspostFormId} .hs-form-private {
                        position: relative;
                        display: flex; /* flex */
                        flex-wrap: wrap !important;
                        justify-content: space-between; /* justify-between */
                        padding: 0.375rem;
                        font-size: 1rem; /* text-base */
                        border: 1px solid #EBEBEB;
                        --tw-border-opacity: 1;
                        border-radius: 0.75rem;
                        box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
                        --tw-bg-opacity: 1;
                        background-color: white;
                    }
                    
                    .${hubspostFormId} .input {
                        padding-right: 0px;
                    } 

                    .${hubspostFormId} .hs-form-private {
                        flex-wrap: nowrap;
                    }
                        
                    .${hubspostFormId} .hs-input {
                        width: 100%;
                        margin-top: 10px;
                    }
                    
                    .${hubspostFormId} ${hubspotForm?.buttonIcon && '.actions::before'} {
                        content: '';
                        background-image: url("data:image/svg+xml,%3Csvg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='40' height='40' rx='4' fill='white'/%3E%3Cpath d='M26.8087 19.3671L16.4581 12.8195C16.2836 12.709 16.0837 12.6487 15.8791 12.6447C15.6745 12.6408 15.4726 12.6934 15.2943 12.7972C15.1176 12.8993 14.9705 13.0483 14.868 13.2287C14.7654 13.4091 14.7112 13.6145 14.7109 13.8238V26.9175C14.7123 27.2314 14.8341 27.5319 15.0496 27.753C15.2652 27.9741 15.5568 28.0976 15.8604 28.0964C16.0723 28.0963 16.28 28.0359 16.461 27.9218L26.8087 21.3743C26.9751 21.2694 27.1125 21.1221 27.2079 20.9465C27.3033 20.7709 27.3534 20.5728 27.3534 20.3714C27.3534 20.17 27.3033 19.9719 27.2079 19.7963C27.1125 19.6207 26.9751 19.4734 26.8087 19.3685V19.3671Z' fill='%232F575C'/%3E%3C/svg%3E%0A");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                            
                    .${hubspostFormId} .hs-submit {
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }

                    .${hubspostFormId} .actions {
                        display: flex;
                        align-items: center;
                        height: 47px;
                        background-color: ${hubspotForm?.buttonColor};
                        cursor: pointer;
                        border-radius: 8px;
                        padding-left: 4px;
                        transition: transform 0.2s ease-in-out;
                    }
                                
                    .${hubspostFormId} .actions:hover {
                        transform: scale(1.15);
                    }

                    .${hubspostFormId} .hs-button {
                        color: ${hubspotForm?.buttonTextColor};
                        padding: 0px 18px 0px 18px;
                        height: 100%;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        cursor: pointer;
                        text-align: center;
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }
                                    
                    
                                        
                    .${hubspostFormId} .hs-input {
                        outline: none;
                        font-size: 0.875rem; /* text-sm */
                    }
                                            
                                            .${hubspostFormId} .input  {
                                                outline: none; /* Remove a borda padrão */
                                                border: none;
                                                box-shadow: none; /* Remove qualquer sombra */
                                                }
                                                
                                                .${hubspostFormId} .hs-error-msg {
                                                    --tw-text-opacity: 1;
                                                    color: var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)));
                                                    }
                                                    
                                                    .${hubspostFormId} .submitted-message {
                                                        text-align: center;
                                                        }
                                                        
                                                        .${hubspostFormId} .hs-error-msg {
                                                            position: absolute;
                                                            top: 60px;
                                                            left: 24px;
                                                            max-width: 50%;
                                                            color: ${hubspotForm?.errorMessageColor}
                                                            }
                                                            
                                                            .${hubspostFormId} .hs_error_rollup {
                                                                display: none;
                                                                }
                
                                                                @media (min-width: 768px) {
                                                                    .${hubspostFormId} .hs-form-private {
                                                                        width: 471px;
                                                                    }

                                                                    .${hubspostFormId} .hs-input {
                                                                        width: auto;
                                                                        flex-grow: 1;
                                                                        font-size: 1rem; /* text-base */
                                                                        }
                                                                        `
        }} />
    </footer>
}