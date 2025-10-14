import type { ImageWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

const onChange = (rootId: string, labelColor?: string, disabledLabelColor?: string, annualTagColor?: string, annualTagDisabledColor?: string, annualTagTextColor?: string) => {
    const element = event!.currentTarget as HTMLInputElement;
    const parent = document.getElementById(rootId) as HTMLElement;
    const montlyLabel = element.parentElement?.children[0] as HTMLElement;
    const annualLabel = element.parentElement?.querySelector(".annualLabel") as HTMLElement;
    const annualTag = parent.querySelector(".anualTag") as HTMLElement;
    const montlyValues = parent.querySelectorAll(".montlyValues");
    const annualValues = parent.querySelectorAll(".annualValues");
    const montlyCreateStoreButtons = parent.querySelectorAll(".montlyCreateStoreButton");
    const annualCreateStoreButtons = parent.querySelectorAll(".annualCreateStoreButton");
    const annualTags = parent.querySelectorAll(".annualTag");

    if (!element.checked) {
        montlyValues.forEach((value) => value.classList.remove("hidden"));
        annualValues.forEach((value) => value.classList.add("hidden"));
        montlyCreateStoreButtons.forEach((value) => value.classList.remove("hidden"));
        annualCreateStoreButtons.forEach((value) => value.classList.add("hidden"));
        // annualLabel?.setAttribute("disabled", "");
        // montlyLabel?.removeAttribute("disabled");
        annualLabel.style.color = disabledLabelColor || "#828CA0";
        annualTag.style.backgroundColor = annualTagDisabledColor || "#EBEBEB";
        annualTag.style.color = disabledLabelColor || "";
        montlyLabel.style.color = labelColor || "#371E55";
        annualTags.forEach((annualTag) => annualTag.classList.add("hidden"));
    }
    else {
        montlyValues.forEach((value) => value.classList.add("hidden"));
        annualValues.forEach((value) => value.classList.remove("hidden"));
        montlyCreateStoreButtons.forEach((value) => value.classList.add("hidden"));
        annualCreateStoreButtons.forEach((value) => value.classList.remove("hidden"));
        // montlyLabel?.setAttribute("disabled", "");
        // annualLabel?.removeAttribute("disabled");
        annualLabel.style.color = labelColor || "#371E55";
        annualTag.style.backgroundColor = annualTagColor || "#FFE6A0";
        annualTag.style.color = annualTagTextColor || "";
        montlyLabel.style.color = disabledLabelColor || "#828CA0";
        annualTags.forEach((annualTag) => annualTag.classList.remove("hidden"));
    }
};

const refreshArrowsVisibility = () => {
    const currentTarget = event!.currentTarget as HTMLElement;
    refresh(0);
    function refresh(firstItemLastPosition: number) {
        setTimeout(() => {

            if (currentTarget) {
                const carousel = currentTarget.querySelector(".carousel") as HTMLElement;
                const carouselItems = currentTarget.querySelectorAll(".carousel-item") as NodeListOf<Element>;

                const startDistance = carousel.getBoundingClientRect().left - carouselItems[0].getBoundingClientRect().left;
                const endDistance = carouselItems[carouselItems.length - 1].getBoundingClientRect().right - carousel.getBoundingClientRect().right;
                const prevButton = currentTarget.querySelector(".prev-button") as HTMLElement | null | undefined;
                const nextButton = currentTarget.querySelector(".next-button") as HTMLElement | null | undefined;

                if (prevButton && nextButton) {
                    if (startDistance <= 0) {
                        prevButton.style.opacity = "0.2";
                    } else {
                        prevButton.style.opacity = "1";
                    }

                    if (endDistance <= 10) {
                        nextButton.style.opacity = "0.2";
                    } else {
                        nextButton.style.opacity = "1";
                    }
                }

                if (carouselItems[0].getBoundingClientRect().left != firstItemLastPosition) refresh(carouselItems[0].getBoundingClientRect().left);
            }
        }, 200);
    }
};

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}
/** @title {{text}} */
export interface BulletPointItem {
    text: RichText;
    toolTipText?: string;
    icon?: IImage;
    fontWeight?: number;
    marginTop?: string;
}

export interface BulletPoints {
    items?: BulletPointItem[];
    /** @format color-input */
    itemsTextColor?: string;
    itemsTextProps?: BulletPointsTextProps;
    /** @format color-input */
    tooltipIconColor?: string;
    /** @format color-input */
    tooltipTextColor?: string;
    /** @format color-input */
    tooltipBackgroundColor?: string;
    /** @title Default bullet points icon */
    bulletPointsIcon?: IImage;
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
    ctaStyle: "button" | "link";
    showIcon?: boolean;
    order?: number;
}

export interface TagTextProps {
    fontSize?: string;
    fontWeight?: string;
    letterSpacing?: string;
    lineHeight?: string;
}

export interface BulletPointsTextProps {
    fontFamily?: string;
    fontSize?: string;
    letterSpacing?: string;
    lineHeight?: string;
}

export interface Tag {
    hideTag?: boolean;
    text?: RichText;
    /** @format color-input */
    textColor?: string;
    fontFamily?: string;
    textProps?: TagTextProps;
    icon?: IImage;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
    onlyAnnual?: boolean;
}

/** @title {{title.text}} */
export interface Plan {
    backgroundImage?: IImage;
    /** @format color-input */
    borderColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    tag?: Tag;
    title: Title;
    montlyFee?: Title;
    cutedMontlyFee?: string;
    /** @format color-input */
    cutedMontlyFeeColor?: string;
    annualMontlyFee?: Title;
    createStoreWithPlanCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    bulletPoints?: BulletPoints;
}

export interface SectionBackgroundImage extends IImage {
    verticalPosition?: string;
}

export interface Title {
    text?: RichText;
    /** @format color-input */
    color?: string;
    font?: string;
    fontWeight?: string;
    fontSize?: string;
    letterSpacing?: string;
    lineHeight?: string;
}

export interface Props {
    hideSection?: boolean;
    id?: string;
    backgroundImage?: SectionBackgroundImage;
    title?: Title;
    caption?: Title;
    hideSwitch?: boolean;
    montlyLabel?: string;
    annualLabel?: string;
    annualTag?: string;
    /** @format color-input */
    labelColor?: string;
    /** @format color-input */
    disabledLabelColor?: string;
    switchPaddingTop?: string;
    switchPaddingBottom?: string;
    /** @format color-input */
    switchBackgroundColor?: string;
    /** @format color-input */
    switchBallColor?: string;
    /** @format color-input */
    annualTagColor?: string;
    /** @format color-input */
    annualTagDisabledColor?: string;
    /** @format color-input */
    annualTagTextColor?: string;
    annualTagPosition?: "below" | "aside";
    centralizeSlides?: boolean;
    slides?: Plan[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    bottomCta?: CTAProps[];
    paddingTop?: string;
    paddingBottom?: string;
}

function InfoIcon({ color }: { color: string }) {
    // return <svg width="18" height="19" viewBox="0 0 18 19" class={`fill-current`} style={{color}} xmlns="http://www.w3.org/2000/svg">
    //     <g opacity="0.8">
    //         <path d="M9 2.07495C7.55373 2.07495 6.13993 2.50382 4.9374 3.30733C3.73486 4.11084 2.7976 5.25289 2.24413 6.58908C1.69067 7.92526 1.54586 9.39556 1.82801 10.814C2.11017 12.2325 2.80661 13.5355 3.82928 14.5582C4.85196 15.5808 6.15492 16.2773 7.57341 16.5594C8.99189 16.8416 10.4622 16.6968 11.7984 16.1433C13.1346 15.5899 14.2766 14.6526 15.0801 13.4501C15.8836 12.2475 16.3125 10.8337 16.3125 9.38745C16.3105 7.44868 15.5394 5.58991 14.1685 4.21899C12.7975 2.84808 10.9388 2.077 9 2.07495ZM8.71875 5.44995C8.88563 5.44995 9.04876 5.49944 9.18752 5.59215C9.32627 5.68486 9.43441 5.81664 9.49828 5.97081C9.56214 6.12499 9.57885 6.29464 9.54629 6.45831C9.51373 6.62198 9.43337 6.77232 9.31537 6.89032C9.19737 7.00832 9.04703 7.08868 8.88336 7.12124C8.71969 7.1538 8.55004 7.13709 8.39586 7.07322C8.24169 7.00936 8.10991 6.90122 8.0172 6.76246C7.92449 6.62371 7.875 6.46058 7.875 6.2937C7.875 6.06992 7.9639 5.85531 8.12213 5.69708C8.28037 5.53885 8.49498 5.44995 8.71875 5.44995ZM9.5625 13.325C9.26413 13.325 8.97799 13.2064 8.76701 12.9954C8.55603 12.7845 8.4375 12.4983 8.4375 12.2V9.38745C8.28832 9.38745 8.14525 9.32819 8.03976 9.2227C7.93427 9.11721 7.875 8.97414 7.875 8.82495C7.875 8.67577 7.93427 8.53269 8.03976 8.4272C8.14525 8.32171 8.28832 8.26245 8.4375 8.26245C8.73587 8.26245 9.02202 8.38098 9.233 8.59196C9.44398 8.80293 9.5625 9.08908 9.5625 9.38745V12.2C9.71169 12.2 9.85476 12.2592 9.96025 12.3647C10.0657 12.4702 10.125 12.6133 10.125 12.7625C10.125 12.9116 10.0657 13.0547 9.96025 13.1602C9.85476 13.2657 9.71169 13.325 9.5625 13.325Z"/>
    //     </g>
    // </svg>;

    return <svg width="13" height="13" viewBox="0 0 13 13" class={`fill-current`} style={{ color }} xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.2253 1.18457C3.24669 1.18457 0.832031 3.59923 0.832031 6.57784C0.832031 9.55643 3.24668 11.9711 6.2253 11.9711C9.2039 11.9711 11.6186 9.55644 11.6186 6.57784C11.6186 3.59922 9.20389 1.18457 6.2253 1.18457ZM1.78204 6.57784C1.78204 4.1239 3.77136 2.13458 6.2253 2.13458C8.67923 2.13458 10.6686 4.1239 10.6686 6.57784C10.6686 9.03177 8.67922 11.0211 6.2253 11.0211C3.77136 11.0211 1.78204 9.03177 1.78204 6.57784ZM6.82531 4.17805C6.82531 4.50942 6.55668 4.77805 6.22531 4.77805C5.89394 4.77805 5.62531 4.50942 5.62531 4.17805C5.62531 3.84668 5.89394 3.57805 6.22531 3.57805C6.55668 3.57805 6.82531 3.84668 6.82531 4.17805ZM4.9254 5.27805H5.4254H6.22541C6.50155 5.27805 6.7254 5.50191 6.7254 5.77805V8.47805H7.0254H7.5254V9.47805H7.0254H6.22541H5.4254H4.9254V8.47805H5.4254H5.7254V6.27805H5.4254H4.9254V5.27805Z" />
    </svg>

}

function SliderItem({ slide, id }: {
    slide: Plan;
    id: string;
}) {
    const { title, tag, montlyFee, backgroundImage, borderColor, cutedMontlyFee, annualMontlyFee, cta = [], bulletPoints, backgroundColor, cutedMontlyFeeColor, createStoreWithPlanCta } = slide;

    const dataLayerCtaPush = (eventLabel: string) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'clique',
            'eventCategory': 'loja-integrada:institucional',
            'eventAction': 'PlansV3',
            'eventLabel': eventLabel
        });
    }

    return (<div id={id} class={`px-1 lg:px-[28px] w-full `}>
        <div class={`relative w-full h-full rounded-[20px] text-primary-content ${borderColor && 'border'}`} style={{ background: backgroundColor, borderColor: borderColor }}>
            {backgroundImage?.src && <Image
                src={backgroundImage.src}
                alt={backgroundImage.alt || "plan background image"}
                width={backgroundImage.width || 300}
                height={backgroundImage.height || 617}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                class="absolute -z-40 w-full h-full top-0 left-0 object-cover rounded-[20px]"
            />}
            <div class={`relative flex flex-col justify-between z-10 h-full w-full py-10 px-[17px]`}>
                <div>
                    {!tag?.hideTag && <div class="h-9">
                        {tag?.text && <div class={`inline-block rounded-[5px] overflow-hidden p-[1px] ${tag.onlyAnnual && 'annualTag'}`} style={{ background: tag.borderColor }}>
                            <div class="inline-block rounded-[5px]" style={{ background: tag.backgroundColor }}>
                                <div class={`flex gap-2.5 items-center h-full py-[7px] text-xl px-4 bg-primary-content text-primary-content font-normal `}
                                    style={{ background: tag.textColor, backgroundClip: "text", color: tag.textColor && 'transparent', fontFamily: tag.fontFamily, ...tag.textProps }}>
                                    {tag?.icon?.src && <Image width={tag.icon.width || 20} loading="lazy" decoding="async" fetchPriority="low" height={tag.icon.height || 20} src={tag.icon.src} alt={tag.icon.alt || "tag icon"}
                                        class="h-5 w-5 object-contain" />}
                                    <div dangerouslySetInnerHTML={{ __html: tag.text }} />
                                </div>
                            </div>
                        </div>}
                    </div>}

                    <div class="min-h-44">
                        {title?.text && <div
                            class="text-3xl lg:text-[46px] w-full leading-tight font-normal !bg-clip-text text-transparent pb-1"
                            style={{ fontFamily: title.font, fontSize: title.fontSize, lineHeight: title.lineHeight, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, background: title.color || "black" }}
                            dangerouslySetInnerHTML={{ __html: title.text }} />}


                        <div class="montlyValues mt-2 hidden">
                            <div
                                class="leading-tight !bg-clip-text text-transparent"
                                dangerouslySetInnerHTML={{ __html: montlyFee?.text || "" }}
                                style={{ fontFamily: montlyFee?.font, fontSize: montlyFee?.fontSize, lineHeight: montlyFee?.lineHeight, fontWeight: montlyFee?.fontWeight, letterSpacing: montlyFee?.letterSpacing, background: montlyFee?.color || "black" }} />
                        </div>

                        <div class="annualValues mt-2">
                            <p class="text-base font-normal leading-normal line-through" style={{ color: cutedMontlyFeeColor }}>{cutedMontlyFee}</p>
                            <div class="leading-tight text-transparent !bg-clip-text"
                                dangerouslySetInnerHTML={{ __html: annualMontlyFee?.text || "" }}
                                style={{ fontFamily: annualMontlyFee?.font, fontSize: annualMontlyFee?.fontSize, lineHeight: annualMontlyFee?.lineHeight, fontWeight: annualMontlyFee?.fontWeight, letterSpacing: annualMontlyFee?.letterSpacing, background: annualMontlyFee?.color || "black" }} />
                        </div>
                    </div>



                    <div class={`mt-9 flex flex-col px-4`}>

                        <div hx-on:click={createStoreWithPlanCta && useScript(dataLayerCtaPush, createStoreWithPlanCta.text?.replace(/\s+/g, '-').toLowerCase() || '')} class="flex flex-col gap-[18px] items-center">
                            {createStoreWithPlanCta?.text && <CreateStoreCta
                                period="anual"
                                text={createStoreWithPlanCta.text}
                                planId={createStoreWithPlanCta.planId}
                                showIcon={createStoreWithPlanCta.showIcon}
                                underlineText={createStoreWithPlanCta.underlineText}
                                ctaClass={`${createStoreWithPlanCta.ctaStyle != "link" && 'btn btn-primary px-7'} min-h-10 h-auto py-2 flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm cursor-pointer annualCreateStoreButton w-full`}
                                style={createStoreWithPlanCta.ctaStyle == "button" ? { backgroundColor: createStoreWithPlanCta.backgroundColor, color: createStoreWithPlanCta.textColor, borderColor: createStoreWithPlanCta.borderColor, borderWidth: '1px' } : { color: createStoreWithPlanCta.textColor }}
                            />}
                            {createStoreWithPlanCta?.text && <CreateStoreCta
                                period="mensal"
                                text={createStoreWithPlanCta.text}
                                planId={createStoreWithPlanCta.planId}
                                showIcon={createStoreWithPlanCta.showIcon}
                                underlineText={createStoreWithPlanCta.underlineText}
                                ctaClass={`${createStoreWithPlanCta.ctaStyle != "link" && 'btn btn-primary px-7'} min-h-10 h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm cursor-pointer montlyCreateStoreButton hidden w-full`}
                                style={createStoreWithPlanCta.ctaStyle == "button" ? { backgroundColor: createStoreWithPlanCta.backgroundColor, color: createStoreWithPlanCta.textColor, borderColor: createStoreWithPlanCta.borderColor, borderWidth: '1px' } : { color: createStoreWithPlanCta.textColor }}
                            />}
                            {cta.map((button) => {
                                if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                                    showIcon={button.showIcon}
                                    underlineText={button.underlineText}
                                    text={button.text}
                                    ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} min-h-10 h-auto flex items-center justify-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm w-full cursor-pointer`}
                                    style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, borderWidth: '1px' } : { color: button.textColor }}
                                />
                                return <a
                                    href={button?.href ?? "#"}
                                    target={button?.href.includes("http") ? "_blank" : "_self"}
                                    class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} min-h-10 h-auto flex items-center justify-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm w-full`}
                                    style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, borderWidth: '1px' } : { color: button.textColor }}
                                >
                                    {button?.text}
                                    {button.underlineText && <span class="underline">{button.underlineText}</span>}
                                    {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                                    </svg>}
                                </a>
                            })}
                        </div>

                        {bulletPoints?.items?.map((item) => (<div class="flex gap-2.5 text-primary" style={{ marginTop: item.marginTop || "16px" }}>
                            {(item.icon?.src || bulletPoints.bulletPointsIcon?.src) && <Image
                                width={item.icon?.width || bulletPoints.bulletPointsIcon?.width || 18}
                                height={item.icon?.height || bulletPoints.bulletPointsIcon?.height || 18}
                                loading="lazy"
                                decoding="async"
                                fetchPriority="low"                                
                                class="object-contain" src={item.icon?.src || bulletPoints.bulletPointsIcon?.src || ""}
                                alt={item.icon?.alt || bulletPoints.bulletPointsIcon?.alt || "bullet points icon"} />}
                            <div class="flex w-full gap-2.5">
                                <div class="text-xs font-normal leading-none flex-shrink" style={{ color: bulletPoints.itemsTextColor, fontWeight: item.fontWeight, ...bulletPoints.itemsTextProps }} dangerouslySetInnerHTML={{ __html: item.text }} />
                                {item.toolTipText && <div class={`tooltip tooltip-left h-4 inline-block`} data-tip={item.toolTipText} style={`--tooltip-text-color: ${bulletPoints.tooltipTextColor}; --tooltip-color: ${bulletPoints.tooltipBackgroundColor};`}>
                                    <InfoIcon color={bulletPoints.tooltipIconColor || "white"} />
                                </div>}
                            </div>
                        </div>))}
                    </div>
                </div>

            </div>
        </div>
    </div>);
}
function Buttons({ arrowsColor }: { arrowsColor?: string }) {
    return (<div class="flex gap-4">
        <div class="flex items-center justify-center z-10 ">
            <Slider.PrevButton class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 prev-button opacity-20 transition-opacity" style={{ color: arrowsColor }}>
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                </svg>
            </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 ">
            <Slider.NextButton class="flex items-center justify-center ">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current next-button transition-opacity" style={{ color: arrowsColor }}>
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                </svg>
            </Slider.NextButton>
        </div>
    </div>);
}
function Plans(props: Props) {
    if (props.hideSection) return <></>
    const carouselId = useId();
    const id = props.id || carouselId;
    const { title, caption, bottomCta = [], slides, centralizeSlides, switchPaddingBottom, switchPaddingTop, hideSwitch = false, backgroundImage, montlyLabel, annualLabel, annualTagPosition = "below", annualTag, switchBackgroundColor, switchBallColor, annualTagTextColor, arrows, labelColor, disabledLabelColor, annualTagColor, annualTagDisabledColor, arrowsColor, paddingBottom, paddingTop } = props;
    return (<div id={id} class="relative">
        {backgroundImage?.src && <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt || "plan background image"}
            width={backgroundImage.width || 1440}
            loading="lazy"
            decoding="async"
            fetchPriority="low"            
            height={backgroundImage.height || 1093}
            class="absolute -z-50 w-full h-full top-0 left-0 object-cover"
            style={{ top: backgroundImage.verticalPosition }}
        />}
        <div
            id={carouselId}
            class="min-h-min flex flex-col items-center lg:container md:max-w-[1068px] lg:mx-auto pt-7 lg:pt-[90px]"
            hx-on:click={useScript(refreshArrowsVisibility)}
            hx-on:touchend={useScript(refreshArrowsVisibility)}
            style={{ paddingBottom, paddingTop }}>

            {title?.text && <div
                class="text-3xl lg:text-[46px] w-full leading-tight font-normal !bg-clip-text text-transparent pb-1"
                style={{ fontFamily: title.font, fontSize: title.fontSize, lineHeight: title.lineHeight, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, background: title.color || "black" }}
                dangerouslySetInnerHTML={{ __html: title.text }} />}

            {caption?.text && <div
                class="text-lg lg:text-[22px] w-full leading-normal font-medium !bg-clip-text text-transparent mt-5"
                style={{ fontFamily: caption.font, fontSize: caption.fontSize, lineHeight: caption.lineHeight, fontWeight: caption.fontWeight, letterSpacing: caption.letterSpacing, background: caption.color || "black" }}
                dangerouslySetInnerHTML={{ __html: caption.text }} />}

            {!hideSwitch && <div className={`relative !pt-20 !pb-11 flex items-center ${annualTagPosition == "below" ? ' flex-col gap-4' : 'flex-row'}`} style={{paddingTop: switchPaddingTop + ' !important', paddingBottom: switchPaddingBottom + ' !important'}}>
                <label className={`label cursor-pointer gap-5 !py-0 !px-2.5 `}>
                    {montlyLabel && <span className="text-lg text-primary font-normal leading-tight disabled:text-neutral-content" disabled style={{ color: disabledLabelColor }}>{montlyLabel}</span>}
                    <input type="checkbox" className={`hidden peer border-primary-content bg-primary-content hover:bg-primary-content `} defaultChecked hx-on:change={useScript(onChange, id, labelColor, disabledLabelColor, annualTagColor, annualTagDisabledColor, annualTagTextColor)} />
                    <div class="w-[74px] bg-red-500 rounded-full transition-all py-1 pl-1.5 pr-1.5 peer-checked:pl-11" style={{ background: switchBackgroundColor }}>
                        <div class="h-6 w-6 bg-white rounded-full transition-all" style={{ background: switchBallColor }} />
                    </div>
                    {annualLabel && <span className="annualLabel relative flex text-lg text-primary font-bold leading-tight disabled:text-neutral-content group" style={{ color: labelColor }}>
                        {annualLabel}
                    </span>}
                </label>
                <p
                    class="inline-block h-fit text-nowrap left-full text-base font-bold px-2 bg-info group-disabled:bg-base-200 rounded-[10px] anualTag text-center"
                    style={{ background: annualTagColor, color: annualTagTextColor }}>
                    {annualTag}
                </p>
            </div>}

            <AnimateOnShow animation="animate-pop-up" divClass="w-full" delay={400}>
                <Slider class={`carousel carousel-center py-9 w-full ${centralizeSlides && 'justify-center'}`} rootId={carouselId} infinite>
                    {slides?.map((slide, index) => (<Slider.Item index={index} class={"carousel-item w-[90%] lg:w-1/3"}>
                        <SliderItem slide={slide} id={`${carouselId}-${index}`} />
                    </Slider.Item>))}
                </Slider>

                <div class="flex justify-center pr-[22px] lg:px-9 ">
                    {arrows && <Buttons arrowsColor={arrowsColor} />}
                </div>
            </AnimateOnShow>

            {bottomCta.length > 0 && <div class="flex items-center justify-center gap-4 flex-wrap mt-4 lg:mt-11">
                {bottomCta.map(cta => (
                    <CTA {...cta} />
                ))}
            </div>}
        </div>
    </div>);
}
export default Plans;
