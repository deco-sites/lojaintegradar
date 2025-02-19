import type { ImageWidget, HTMLWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import { HeroMedia } from "site/sections/HeroV2.tsx";

const openModal = (modalId: string) => {
    event!.preventDefault();
    const modal = document.getElementById(modalId) as HTMLElement;
    modal?.classList.remove("hidden");
};
const closeModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLElement;
    modal?.classList.add("hidden");
};
export interface BulletPoints {
    show?: boolean;
    title?: HTMLWidget;
    bulletPointsIcon?: IImage;
    items?: string[];
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
}

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface IVideo {
    src?: VideoWidget;
    width?: string;
    height?: string;
}

export interface Media {
    image?: IImage;
    video?: IVideo;
    use?: "image" | "video" | "embed";
}

/** @title {{text}} */
export interface CTA {
    href?: string;
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
export interface HubspotForm {
    region?: string;
    portalId?: string;
    formId?: string;
}
export interface Modal {
    title: string;
    /** @format color-input */
    titleColor?: string;
    text?: string;
    /** @format color-input */
    textColor?: string;
    media?: Media;
    cta?: CTA[];
}
export interface Props {
    hideSection?: boolean;
    id?: string;
    captionAbove?: RichText;
    title: RichText;
    titleFont?: string;
    /** @format color-input */
    titleColor?: string;
    caption?: RichText;
    inputLabel?: string;
    /** @format color-input */
    inputLabelColor?: string;
    /** @format color-input */
    inputLabelBackgroundColor?: string;
    inputLabelWidth?: 'min' | 'full';
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
    htmlContent?: HTMLWidget;
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: "image" | "video";
    lcp?: boolean;
    hubspotForm?: HubspotForm;
    /** @format color-input */
    hubspotFormButtonColor?: string;
    /** @format color-input */
    hubspotFormButtonTextColor?: string;
    /** @format color-input */
    hubspotFormButtonIcon?: boolean;
    hubspotFormButtonWidth?: 'min' | 'full';
    /** @format color-input */
    hubspotErrorMessageColor?: string;
    bulletPoints?: BulletPoints;
    modal?: Modal;
    sectionMinHeight?: string;
}
export default function MainHero({ hideSection, id, title, caption = "", inputLabel, hubspotFormButtonWidth, backgroundVideo, lcp, useBackground = 'image', hubspotFormButtonIcon, titleFont, sectionMinHeight, backgroundImage, inputLabelWidth = 'min', image, hubspotForm, htmlContent, titleColor, bulletPoints, inputLabelColor, inputLabelBackgroundColor, hubspotErrorMessageColor, hubspotFormButtonColor, hubspotFormButtonTextColor, video, use, modal, captionAbove }: Props) {
    if (hideSection) return <></>
    const randomId = useId();
    const modalId = randomId + "modal";
    const hubspostFormId = randomId + "hubspotForm";
    return <div class="relative">
        <div id={id} class={`flex flex-wrap gap-y-7 lg:flex-nowrap min-h-96 pt-[92px] lg:pt-40 overflow-hidden ${!bulletPoints?.show && 'pb-12'}`} style={{minHeight: sectionMinHeight}}>
            {useBackground == "image" && backgroundImage?.src && <Image width={backgroundImage.width || 1440} height={backgroundImage.height || 926} 
                class="w-full h-full absolute object-cover top-0 left-0 -z-50 object-right-top" 
                // style={{ objectPosition: "top right" }}
                alt={backgroundImage?.alt || "background image"} src={backgroundImage.src} loading={lcp ? "eager" : "lazy"} preload={true}
            />}
            {useBackground == "video" && backgroundVideo && <video width="1280" height="720" autoPlay playsInline muted loading={lcp ? "eager" : "lazy"} loop class="absolute w-full h-full object-cover top-0 left-0 -z-50 ">
                    <source src={backgroundVideo} type="video/mp4"/>
                </video>}
            <div class={`lg:pb-20 flex-grow flex justify-center items-center w-full ${(use == "image" || use == "video") ? "xl:w-1/2 xl:justify-end" : "justify-center"} px-7 md:px-0 border-base`}>
                <script dangerouslySetInnerHTML={{ __html: useScript(openModal, modalId) }}/>
                <div class={`flex-grow flex flex-col gap-2.5 ${(use == "image" || use == "video") ? "max-w-[630px]" : "items-center max-w-[1220px]"} z-10`}>
                    {captionAbove && <div class="text-base-300 text-lg md:text-[32px] font-normal leading-[120%] w-full" dangerouslySetInnerHTML={{ __html: captionAbove }}/>}
                    <div 
                        class="text-primary w-full text-2xl md:text-[56px] font-normal leading-[1.2] pt-2 lg:pt-0" 
                        style={{ background: titleColor, backgroundClip: "text", color: titleColor && 'transparent', fontFamily: titleFont }} 
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div class="text-base-300 text-lg md:text-[32px] font-normal leading-[120%] w-full" dangerouslySetInnerHTML={{ __html: caption }}/>
                    <label class="pt-5 md:pt-10 lg:w-[600px]">
                        {inputLabel && <p 
                            class={`bg-info-content rounded-tl-xl rounded-tr-xl py-1.5 pl-2.5 lg:pl-4 text-sm lg:text-base text-primary inline-block ${inputLabelWidth == 'full' ? "w-full text-center px-1" : "pr-12"}`} 
                            style={{ color: inputLabelColor, background: inputLabelBackgroundColor }}
                        >
                            {inputLabel}
                        </p>}
                        <div class={hubspostFormId} dangerouslySetInnerHTML={{
                            __html: `
                            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                            <script>
                            hbspt.forms.create({
                                region: "${hubspotForm?.region || ""}",
                                portalId: "${hubspotForm?.portalId}",
                                formId: "${hubspotForm?.formId}",
                                onFormSubmit: function($form) {
                                    const modal = document.getElementById("${modalId}");
                                    if (modal) modal.classList.remove('hidden');
                                }
                            });
                            </script>` 
                        }}/>                        
                    </label>
                </div>
            </div>

            <div class={`md:flex-grow md:flex flex-col justify-end items-end ${(use == "image" || use == "video") && "lg:w-1/2"}`}>
                {htmlContent && <div class="px-7 flex justify-center w-[98vw] md:w-auto" dangerouslySetInnerHTML={{ __html: htmlContent }}/>}
                {use == "image" && image?.src && <Image width={image.width || 697} height={image.height || 592} src={image.src} alt={image.src || ""} class=" object-contain hidden md:block"/>}
                {use == "video" && video && <video width="697" height="592" autoPlay playsInline muted loading="lazy" loop class="w-full xl:w-auto max-w-[809px] object-contain hidden md:block">
                    <source src={video} type="video/mp4"/>
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
                        border-radius: ${inputLabel ? '0 0.75rem 0.75rem 0.75rem' : '0.75rem'};
                        ${inputLabel && inputLabelWidth == 'full' && 'border-radius: 0 0 0.75rem 0.75rem;'}
                        box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
                        --tw-bg-opacity: 1;
                        background-color: white;
                    }
                    
                    .${hubspostFormId} span {
                        display: none;
                    }

                    .${hubspostFormId} .submitted-message {
                        text-align: center;
                        background: white;
                        border-radius: 0 0 10px 10px;
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
                    
                    .${hubspostFormId} ${hubspotFormButtonIcon && '.actions::before'} {
                        content: '';
                        background-image: url("data:image/svg+xml,%3Csvg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='40' height='40' rx='4' fill='white'/%3E%3Cpath d='M26.8087 19.3671L16.4581 12.8195C16.2836 12.709 16.0837 12.6487 15.8791 12.6447C15.6745 12.6408 15.4726 12.6934 15.2943 12.7972C15.1176 12.8993 14.9705 13.0483 14.868 13.2287C14.7654 13.4091 14.7112 13.6145 14.7109 13.8238V26.9175C14.7123 27.2314 14.8341 27.5319 15.0496 27.753C15.2652 27.9741 15.5568 28.0976 15.8604 28.0964C16.0723 28.0963 16.28 28.0359 16.461 27.9218L26.8087 21.3743C26.9751 21.2694 27.1125 21.1221 27.2079 20.9465C27.3033 20.7709 27.3534 20.5728 27.3534 20.3714C27.3534 20.17 27.3033 19.9719 27.2079 19.7963C27.1125 19.6207 26.9751 19.4734 26.8087 19.3685V19.3671Z' fill='%232F575C'/%3E%3C/svg%3E%0A");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                            
                    .${hubspostFormId} .hs-submit {
                        ${hubspotFormButtonWidth == 'full' && 'width: 100%;'}
                    }

                    .${hubspostFormId} .actions {
                        display: flex;
                        align-items: center;
                        height: 47px;
                        background-color: ${hubspotFormButtonColor};
                        cursor: pointer;
                        border-radius: 8px;
                        padding-left: 4px;
                        transition: transform 0.2s ease-in-out;
                    }
                                
                    .${hubspostFormId} .actions:hover {
                        transform: scale(1.15);
                    }

                    .${hubspostFormId} .hs-button {
                        color: ${hubspotFormButtonTextColor};
                        padding: 0px 18px 0px 18px;
                        height: 100%;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        cursor: pointer;
                        text-align: center;
                        ${hubspotFormButtonWidth == 'full' && 'width: 100%;'}
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
                                                            top: 83px;
                                                            left: 24px;
                                                            max-width: 50%;
                                                            color: ${hubspotErrorMessageColor}
                                                            }
                                                            
                                                            .${hubspostFormId} .hs_error_rollup {
                                                                display: none;
                                                                }
                
                                                                @media (min-width: 768px) {
                                                                    .${hubspostFormId} .hs-input {
                                                                        width: auto;
                                                                        flex-grow: 1;
                                                                        font-size: 1rem; /* text-base */
                                                                        }
                                                                        `
                                                                    }}/>

            <div id={modalId} class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-[60] overflow-auto hidden px-6">            
                <div class="bg-primary-content lg:rounded-[30px] p-7 lg:p-12 animate-pop-up relative pt-12" style={{ animationDuration: "0.3s" }}>
                    <button class="text-primary font-black p-2.5 absolute top-2.5 right-[19px]" hx-on:click={useScript(closeModal, modalId)}>
                        <svg width="20" height="20" viewBox="0 0 19 19" class="text-primary fill-current" style={{ color: modal?.titleColor }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5997 16.6802C18.8546 16.935 18.9977 17.2807 18.9977 17.6411C18.9977 18.0015 18.8546 18.3471 18.5997 18.602C18.3448 18.8568 17.9992 19 17.6387 19C17.2783 19 16.9326 18.8568 16.6778 18.602L9.5 11.4224L2.31996 18.5997C2.06509 18.8546 1.71943 18.9977 1.359 18.9977C0.99857 18.9977 0.652903 18.8546 0.398042 18.5997C0.14318 18.3449 5.37081e-09 17.9992 0 17.6388C-5.37081e-09 17.2784 0.14318 16.9328 0.398042 16.6779L7.57809 9.50057L0.400302 2.32095C0.145441 2.0661 0.00226112 1.72046 0.00226113 1.36005C0.00226113 0.999641 0.145441 0.653995 0.400302 0.399148C0.655164 0.144302 1.00083 0.00113028 1.36126 0.00113028C1.72169 0.00113028 2.06735 0.144302 2.32222 0.399148L9.5 7.57877L16.68 0.398017C16.9349 0.143171 17.2806 -6.00439e-09 17.641 0C18.0014 6.00439e-09 18.3471 0.143171 18.602 0.398017C18.8568 0.652864 19 0.99851 19 1.35892C19 1.71932 18.8568 2.06497 18.602 2.31982L11.4219 9.50057L18.5997 16.6802Z"/>
                        </svg>
                    </button>
                    <h2 class="font-normal text-[32px] leading-[130%] max-w-[475px] max-w-[700px] " style={{ color: modal?.titleColor }}>{modal?.title}</h2>
                    <p class="mt-7 text-xl text-neutral font-medium leading-[120%] max-w-[700px] " style={{ color: modal?.textColor }}>{modal?.text}</p>
                    <HeroMedia media={modal?.media} />
                    <div class="flex flex-wrap items-center gap-7 mt-5">
                        {modal?.cta?.map((button) => {
                return <a href={button?.href ?? "#"} target={button?.href?.includes("http") ? "_blank" : ""} hx-on:click={useScript(closeModal, modalId)} class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`} style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}>
                            {button?.text}
                            {button.underlineText && <span class="underline">{button.underlineText}</span>}
                            {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z"/>
                            </svg>}
                        </a>;
            })}
                    </div>
                </div>
            </div>

        </div>
        {bulletPoints?.show && <div class="backdrop-blur-3xl py-9 px-7 mt-7 lg:mt-0" style={{background: bulletPoints?.backgroundColor}}>
            <div class="max-w-[1260px] mx-auto">
                {bulletPoints?.title && <div class="leading-[130%] text-[32px]" dangerouslySetInnerHTML={{__html: bulletPoints.title}}/>}
                <div class="flex overflow-auto lg:overflow-visible gap-7 lg:gap-[88px] mt-7 pb-4">
                    {bulletPoints?.items?.map((item) => (
                        <div class="flex gap-3.5 min-w-[210px] lg:min-w-0">
                            {bulletPoints?.bulletPointsIcon?.src && <Image 
                                src={bulletPoints?.bulletPointsIcon?.src}
                                alt={bulletPoints?.bulletPointsIcon.alt}
                                width={bulletPoints?.bulletPointsIcon.width || 18}
                                height={bulletPoints?.bulletPointsIcon.height || 18}
                                class="self-start"
                            />}
                            <p class="font-normal lg:font-semibold text-sm lg:text-lg leading-[120%]" style={{color: bulletPoints.textColor}}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>}
    </div>;
}
