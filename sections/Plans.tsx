import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

const onClick = (rootId: string) => {
    const parent = document.getElementById(rootId) as HTMLElement;
    const fullBulletPoints = parent?.querySelector("#" + rootId + "fullBulletPoints") as HTMLElement;
    const firstBulletPoints = parent?.querySelector("#" + rootId + "firstBulletPoints");
    firstBulletPoints?.classList.add("hidden");
    fullBulletPoints?.classList.remove("hidden");
    fullBulletPoints.classList.add("flex");
};

const onChange = (rootId: string, labelColor?: string, disabledLabelColor?: string, annualTagColor?: string, annualTagDisabledColor?: string) => {
    const element = event!.currentTarget as HTMLInputElement;
    const parent = document.getElementById(rootId) as HTMLElement;
    const montlyLabel = element.parentElement?.children[0] as HTMLElement;
    const annualLabel = element.parentElement?.children[2] as HTMLElement;
    const annualTag = annualLabel.querySelector("p") as HTMLElement;
    const montlyValues = parent.querySelectorAll(".montlyValues");
    const annualValues = parent.querySelectorAll(".annualValues");
    const montlyCreateStoreButtons = parent.querySelectorAll(".montlyCreateStoreButton");
    const annualCreateStoreButtons = parent.querySelectorAll(".annualCreateStoreButton");

    console.log(annualTag);
    if (!element.checked) {
        montlyValues.forEach((value) => value.classList.remove("hidden"));
        annualValues.forEach((value) => value.classList.add("hidden"));
        montlyCreateStoreButtons.forEach((value) => value.classList.remove("hidden"));
        annualCreateStoreButtons.forEach((value) => value.classList.add("hidden"));
        // annualLabel?.setAttribute("disabled", "");
        // montlyLabel?.removeAttribute("disabled");
        annualLabel.style.color = disabledLabelColor || "#828CA0";
        annualTag.style.backgroundColor = annualTagDisabledColor || "#EBEBEB";
        montlyLabel.style.color = labelColor || "#371E55";
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
        montlyLabel.style.color = disabledLabelColor || "#828CA0";
    }
};

const refreshArrowsVisibility = () => {
    const currentTarget = event!.currentTarget as HTMLElement;
    refresh(0);
    function refresh (firstItemLastPosition: number) {
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

                if(carouselItems[0].getBoundingClientRect().left != firstItemLastPosition) refresh(carouselItems[0].getBoundingClientRect().left);
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
    text: string;
    toolTipText?: string;
}
export interface BulletPoints {
    items?: BulletPointItem[];
    /** @format color-input */
    itemsTextColor?: string;
    /** @format color-input */
    tooltipTextColor?: string;
    /** @format color-input */
    tooltipBackgroundColor?: string;
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
}

export interface Tag {
    text?: string;
    icon?: IImage;
}
/** @title {{title}} */
export interface Plan {
    /** @format color-input */
    backgroundColor?: string;
    topImage?: IImage;
    tag?: Tag;
    /** @format color-input */
    tagColor?: string;
    /** @format color-input */
    tagBackgroundColor?: string;
    title: string;
    /** @format color-input */
    titleColor?: string;
    montlyFee?: HTMLWidget;
    cutedMontlyFee?: string;
    /** @format color-input */
    cutedMontlyFeeColor?: string;
    annualMontlyFee?: HTMLWidget;
    annualSaving?: string;
    /** @format color-input */
    annualSavingColor?: string;
    createStoreWithPlanCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    bulletPoints?: BulletPoints;
    seeMoreButtonText?: string;
}

export interface Props {
    id?: string;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    caption?: string;
    /** @format color-input */
    captionColor?: string;
    montlyLabel?: string;
    annualLabel?: string;
    annualTag?: string;
    /** @format color-input */
    labelColor?: string;
    /** @format color-input */
    disabledLabelColor?: string;
    /** @format color-input */
    annualTagColor?: string;
    /** @format color-input */
    annualTagDisabledColor?: string;
    slides?: Plan[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    bottomCaption?: string;
    /** @format color-input */
    bottomCaptionColor?: string;
    bottomTitle?: string;
    /** @format color-input */
    bottomTitleColor?: string;
    bottomCreateStoreCta?: CreateStoreWithPlanCTA;
}

function InfoIcon({color}: {color: string}) {
    return <svg width="18" height="19" viewBox="0 0 18 19" class={`fill-current`} style={{color}} xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.8">
            <path d="M9 2.07495C7.55373 2.07495 6.13993 2.50382 4.9374 3.30733C3.73486 4.11084 2.7976 5.25289 2.24413 6.58908C1.69067 7.92526 1.54586 9.39556 1.82801 10.814C2.11017 12.2325 2.80661 13.5355 3.82928 14.5582C4.85196 15.5808 6.15492 16.2773 7.57341 16.5594C8.99189 16.8416 10.4622 16.6968 11.7984 16.1433C13.1346 15.5899 14.2766 14.6526 15.0801 13.4501C15.8836 12.2475 16.3125 10.8337 16.3125 9.38745C16.3105 7.44868 15.5394 5.58991 14.1685 4.21899C12.7975 2.84808 10.9388 2.077 9 2.07495ZM8.71875 5.44995C8.88563 5.44995 9.04876 5.49944 9.18752 5.59215C9.32627 5.68486 9.43441 5.81664 9.49828 5.97081C9.56214 6.12499 9.57885 6.29464 9.54629 6.45831C9.51373 6.62198 9.43337 6.77232 9.31537 6.89032C9.19737 7.00832 9.04703 7.08868 8.88336 7.12124C8.71969 7.1538 8.55004 7.13709 8.39586 7.07322C8.24169 7.00936 8.10991 6.90122 8.0172 6.76246C7.92449 6.62371 7.875 6.46058 7.875 6.2937C7.875 6.06992 7.9639 5.85531 8.12213 5.69708C8.28037 5.53885 8.49498 5.44995 8.71875 5.44995ZM9.5625 13.325C9.26413 13.325 8.97799 13.2064 8.76701 12.9954C8.55603 12.7845 8.4375 12.4983 8.4375 12.2V9.38745C8.28832 9.38745 8.14525 9.32819 8.03976 9.2227C7.93427 9.11721 7.875 8.97414 7.875 8.82495C7.875 8.67577 7.93427 8.53269 8.03976 8.4272C8.14525 8.32171 8.28832 8.26245 8.4375 8.26245C8.73587 8.26245 9.02202 8.38098 9.233 8.59196C9.44398 8.80293 9.5625 9.08908 9.5625 9.38745V12.2C9.71169 12.2 9.85476 12.2592 9.96025 12.3647C10.0657 12.4702 10.125 12.6133 10.125 12.7625C10.125 12.9116 10.0657 13.0547 9.96025 13.1602C9.85476 13.2657 9.71169 13.325 9.5625 13.325Z"/>
        </g>
    </svg>;
}

function SliderItem({ slide, id }: {
    slide: Plan;
    id: string;
}) {
    const { title, tag, montlyFee, cutedMontlyFee, annualMontlyFee, annualSaving, cta = [], bulletPoints, topImage, seeMoreButtonText, backgroundColor, titleColor, tagColor, tagBackgroundColor, cutedMontlyFeeColor, annualSavingColor, createStoreWithPlanCta } = slide;
    return (<div id={id} class={`px-1 lg:px-4 w-full ${!topImage?.src && 'pt-[73px]'}`}>
            <div class={`relative w-full h-full lg:min-h-[864px] rounded-3xl shadow-spreaded3 overflow-hidden bg-primary text-primary-content`} style={{background: backgroundColor}}>
                
                {topImage?.src && <Image width={topImage.width || 200} height={topImage.height || 226} src={topImage.src} alt={topImage.alt || "background top image"} class="w-[200px] h-[226px] object-contain absolute top-0 right-0"/>}
                <div class={`relative z-10 h-full w-full py-9 px-6 ${topImage?.src && 'pt-[109px]'}`}>
                    <div class="h-9">
                        {tag?.text && <p class={`inline-flex gap-2.5 items-center h-full py-[7px] px-4 bg-primary-content text-primary-content font-semibold bg-opacity-20 rounded-[20px]`} style={{color: tagColor, background: tagBackgroundColor}}>
                            {tag?.icon?.src && <Image width={tag.icon.width || 20} height={tag.icon.height || 20} src={tag.icon.src} alt={tag.icon.src || "tag icon"} class="h-5 w-5 object-contain"/>}
                            {tag.text}
                        </p>}
                    </div>
                    <h2 class="text-[13vw] lg:text-[40px] font-bold lg:font-medium leading-tight mt-2" style={{color: titleColor}}>{title}</h2>

                    <div class="montlyValues hidden">
                        <div class="leading-tight" dangerouslySetInnerHTML={{ __html: montlyFee || ""}}/>
                    </div>

                    <div class="annualValues mt-7">
                        <p class="text-base font-normal leading-normal line-through" style={{color: cutedMontlyFeeColor}}>{cutedMontlyFee}</p>
                        <div class="leading-tight" dangerouslySetInnerHTML={{ __html: annualMontlyFee || "" }}/>
                        <p class="italic text-base font-normal leading-normal" style={{color: annualSavingColor}}>{annualSaving}</p>     
                    </div>

                    <div class="mt-9 flex flex-wrap gap-[18px] items-center">
                    {createStoreWithPlanCta?.text && <CreateStoreCta 
                        period="anual"
                        text={createStoreWithPlanCta.text} 
                        planId={createStoreWithPlanCta.planId}
                        showIcon={createStoreWithPlanCta.showIcon}
                        underlineText={createStoreWithPlanCta.underlineText}
                        ctaClass={`${createStoreWithPlanCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer annualCreateStoreButton`}
                        style={createStoreWithPlanCta.ctaStyle == "button" ? { backgroundColor: createStoreWithPlanCta.backgroundColor, color: createStoreWithPlanCta.textColor, borderColor: createStoreWithPlanCta.borderColor } : { color: createStoreWithPlanCta.textColor }}
                    />}
                    {createStoreWithPlanCta?.text && <CreateStoreCta 
                        period="mensal"
                        text={createStoreWithPlanCta.text} 
                        planId={createStoreWithPlanCta.planId}
                        showIcon={createStoreWithPlanCta.showIcon}
                        underlineText={createStoreWithPlanCta.underlineText}
                        ctaClass={`${createStoreWithPlanCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer montlyCreateStoreButton hidden`}
                        style={createStoreWithPlanCta.ctaStyle == "button" ? { backgroundColor: createStoreWithPlanCta.backgroundColor, color: createStoreWithPlanCta.textColor, borderColor: createStoreWithPlanCta.borderColor } : { color: createStoreWithPlanCta.textColor }}
                    />}
                    {cta.map((button) => {
                    if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                        showIcon={button.showIcon}
                        underlineText={button.underlineText}
                        text={button.text}
                        ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                        style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                    />
                    return <a
                        href={button?.href ?? "#"}
                        target={button?.href.includes("http") ? "_blank" : "_self"}
                        class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                        style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                    >
                        {button?.text}
                        {button.underlineText && <span class="underline">{button.underlineText}</span>}
                        {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                        </svg>}
                    </a>
                })}
                    </div>

                    <div id={id + "fullBulletPoints"} class={`mt-7 ${bulletPoints?.items && bulletPoints?.items.length > 4 ? "hidden lg:flex" : "flex"} flex-col gap-[30px]`}>
                        {bulletPoints?.items?.map((item) => (<div class="flex gap-3.5 text-pri">
                            {bulletPoints.bulletPointsIcon?.src && <Image width={bulletPoints.bulletPointsIcon.width || 18} height={bulletPoints.bulletPointsIcon.height || 18} class="h-[18px] w-[18px] object-contain" src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet points icon"}/>}
                            <div class="flex w-full justify-between">
                                <p class="text-lg font-normal leading-none" style={{color: bulletPoints.itemsTextColor}} >{item.text}</p>
                                {item.toolTipText && <div class={`tooltip tooltip-left h-4`} data-tip={item.toolTipText} style={`--tooltip-text-color: ${bulletPoints.tooltipTextColor}; --tooltip-color: ${bulletPoints.tooltipBackgroundColor};`}>
                                    <InfoIcon color={bulletPoints.itemsTextColor || "white"} />
                                </div>}
                            </div>
                        </div>))}
                    </div>
                    <div id={id + "firstBulletPoints"} class={`${bulletPoints?.items && bulletPoints?.items.length <= 4 && 'hidden'} mt-7 flex lg:hidden flex-col gap-[30px]`}>
                        {bulletPoints?.items?.slice(0, 4).map((item) => (<div class="flex gap-3.5 text-pri">
                            {bulletPoints.bulletPointsIcon?.src && <Image width={bulletPoints.bulletPointsIcon.width || 18} height={bulletPoints.bulletPointsIcon.height || 18} class="h-[18px] w-[18px] object-contain" src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet points icon"}/>}
                            <div class="flex w-full justify-between">
                                <p class="text-lg font-normal leading-none" style={{color: bulletPoints.itemsTextColor}}>{item.text}</p>
                                {item.toolTipText && <div class={`tooltip tooltip-left h-4`} data-tip={item.toolTipText} style={`--tooltip-text-color: ${bulletPoints.tooltipTextColor}; --tooltip-color: ${bulletPoints.tooltipBackgroundColor};`}>
                                    <InfoIcon color={bulletPoints.itemsTextColor || "white"} />
                                </div>}
                            </div>
                        </div>))}
                        {bulletPoints?.items && bulletPoints?.items.length > 4 && <div id={id + "firstBulletPoints"} class="flex justify-center">
                            <button class="text-neutral-content text-base font-medium leading-normal" hx-on:click={useScript(onClick, id)} style={{color: bulletPoints.itemsTextColor}}>
                                {seeMoreButtonText || "Ver mais"}
                                <svg width="16" height="16" viewBox="0 0 16 16" class="text-neutral-content fill-current inline ml-1" style={{color: bulletPoints.itemsTextColor}} xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_121_3611)">
                                        <path d="M14.5237 5.65973L8.06468 12.2379C8.00469 12.2991 7.93346 12.3476 7.85505 12.3807C7.77663 12.4138 7.69258 12.4309 7.6077 12.4309C7.52282 12.4309 7.43877 12.4138 7.36036 12.3807C7.28195 12.3476 7.21072 12.2991 7.15073 12.2379L0.691726 5.65973C0.570529 5.53629 0.502441 5.36888 0.502441 5.19432C0.502441 5.01976 0.570529 4.85234 0.691726 4.72891C0.812924 4.60548 0.977302 4.53613 1.1487 4.53613C1.3201 4.53613 1.48448 4.60548 1.60568 4.72891L7.6077 10.8425L13.6097 4.72891C13.6697 4.66779 13.741 4.61931 13.8194 4.58623C13.8978 4.55316 13.9818 4.53613 14.0667 4.53613C14.1516 4.53613 14.2356 4.55316 14.314 4.58623C14.3924 4.61931 14.4637 4.66779 14.5237 4.72891C14.5837 4.79003 14.6313 4.86259 14.6638 4.94244C14.6963 5.0223 14.713 5.10789 14.713 5.19432C14.713 5.28075 14.6963 5.36634 14.6638 5.4462C14.6313 5.52605 14.5837 5.59861 14.5237 5.65973Z"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_121_3611">
                                            <rect width="15" height="15" fill="white" transform="translate(0.502441 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>);
}
function Buttons({arrowsColor}: {arrowsColor?: string}) {
    return (<div class="flex gap-4">
            <div class="flex items-center justify-center z-10 ">
                <Slider.PrevButton class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 prev-button opacity-20 transition-opacity" style={{color: arrowsColor}}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-10 ">
                <Slider.NextButton class="flex items-center justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current next-button transition-opacity" style={{color: arrowsColor}}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.NextButton>
            </div>
        </div>);
}
function Plans(props: Props) {
    const carouselId = useId();
    const id = props.id || carouselId;
    const { title, caption, slides, montlyLabel, annualLabel, annualTag, arrows, bottomCaption, bottomTitle, bottomCreateStoreCta, titleColor, captionColor, labelColor, disabledLabelColor, annualTagColor, annualTagDisabledColor, bottomCaptionColor, bottomTitleColor, arrowsColor } = { ...props };
    return (<div id={id}>

            <div id={carouselId} class="min-h-min flex flex-col items-center lg:container md:max-w-[1500px] lg:mx-auto pt-7 lg:pt-[90px]" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)} >
                <AnimateOnShow animation="animate-fade-down" >
                    <p class="text-lg lg:text-2xl text-neutral-content font-semibold leading-tight" style={{color: captionColor}}>{caption}</p>
                </AnimateOnShow>

                {title && <AnimateOnShow animation="animate-fade-down" animationDuration="1.1s" divClass="text-2xl lg:text-5xl text-primary text-center leading-tight font-semibold lg:w-[911px] pb-12 lg:pb-16 mx-auto" style={{color: titleColor}}>
                    {title}
                </AnimateOnShow>}
                
                <div className="form-control">
                    <label className="label cursor-pointer gap-5">
                        {montlyLabel && <button className="text-lg text-primary font-semibold leading-tight disabled:text-neutral-content" disabled style={{color: disabledLabelColor}}>{montlyLabel}</button>}
                        <input type="checkbox" className={`toggle border-primary-content bg-primary-content [--tglbg:purple] hover:bg-primary-content`} style={`--tglbg: ${labelColor}`} defaultChecked hx-on:click={useScript(onChange, id, labelColor, disabledLabelColor, annualTagColor, annualTagDisabledColor)}/>
                        {annualLabel && <button className="relative flex text-lg text-primary font-semibold leading-tight disabled:text-neutral-content group" style={{color: labelColor}}>
                            {annualLabel}
                            {annualTag && <p class="lg:absolute text-nowrap left-full top-0 text-base px-2 py-0.5 bg-info group-disabled:bg-base-200 ml-2.5 rounded-[3px] " style={{background: annualTagColor}}>{annualTag}</p>}
                        </button>}
                    </label>
                </div>

                <AnimateOnShow animation="animate-pop-up" divClass="w-full" delay={400}>
                    <Slider class="carousel carousel-center lg:px-[30px] py-9 w-full" rootId={carouselId} infinite>
                        {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-[90%] lg:w-1/3">
                                <SliderItem slide={slide} id={`${carouselId}-${index}`}/>
                            </Slider.Item>))}
                    </Slider>

                    <div class="flex justify-center pr-[22px] lg:px-9 ">
                        {arrows && <Buttons arrowsColor={arrowsColor}/>}
                    </div>
                </AnimateOnShow>

                <div class="mt-12">
                    <p class="text-center text-xl font-normal leading-tight text-neutral-content" style={{color: bottomCaptionColor}}>{bottomCaption}</p>
                    <p class="text-center mt-[6px] text-primary text-2xl font-semibold" style={{color: bottomTitleColor}}>{bottomTitle}</p>
                    <div class="flex flex-wrap gap-[18px] justify-center mt-5">
                    {bottomCreateStoreCta?.text && <CreateStoreCta
                            planId={bottomCreateStoreCta.planId}
                            period="anual"
                            ctaClass={`${bottomCreateStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                            style={bottomCreateStoreCta.ctaStyle == "button" ? { backgroundColor: bottomCreateStoreCta.backgroundColor, color: bottomCreateStoreCta.textColor, borderColor: bottomCreateStoreCta.borderColor } : { color: bottomCreateStoreCta.textColor }}
                            text={bottomCreateStoreCta.text}
                            underlineText={bottomCreateStoreCta.underlineText}
                            showIcon={bottomCreateStoreCta.showIcon}
                        />}
                    </div>
                </div>
            </div>
        </div>);
}
export default Plans;
