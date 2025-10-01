import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import Slider from "../components/ui/Slider2.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
import { useScript } from "@deco/deco/hooks";
import TimeTabs, {Props as TimeTabsProps} from "../components/ui/TimeTabs.tsx";

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
                    }
                    else {
                        prevButton.style.opacity = "1";
                    }
                    if (endDistance <= 10) {
                        nextButton.style.opacity = "0.2";
                    }
                    else {
                        nextButton.style.opacity = "1";
                    }
                }
                if (carouselItems[0].getBoundingClientRect().left != firstItemLastPosition)
                    refresh(carouselItems[0].getBoundingClientRect().left);
            }
        }, 200);
    }
};

export interface Tag {
    text?: string;
    fontFamily?: string;
    icon?: IImage;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
}

/** @title {{text}} {{underlineText}} */
export interface CTA {
    href: string;
    text?: RichText;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
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
export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}
export interface PlanTag {
    text?: string;
    icon?: IImage;
}
export interface BulletPoints {
    items?: string[];
    bulletPointsIcon?: IImage;
    /** @format color-input */
    textColor?: string;
}
export interface AnnualValues {
    title?: string;
    /** @format color-input */
    titleColor?:string;
    tag?: string;
    /** @format color-input */
    tagTextColor?: string;
    /** @format color-input */
    tagBackgroundColor?: string;
    text?: RichText;
    promoTag?: Tag;
    saving?: string;
    /** @format color-input */
    savingColor?: string;
}
export interface MontlyValues {
    title?: string;
    /** @format color-input */
    titleColor?:string;
    text?: RichText;
}

export interface TextProps {
  fontFamily?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

/** @title {{title}} */
export interface Slide {
    title?: string;
    /** @format color-input */
    titleColor?: string;
    text?: RichText;
    bulletPoints?: BulletPoints;
    backgroundImage?: IImage;
}

export interface ValuesTag {
    text?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    backgroundColor?: string;
}

export interface Props {
    hideSection?: boolean;
    id?: string;
    backgroundImage?: IImage;
    title: RichText;
    titleTextProps?: TextProps;
    /** @title Timer Tabs */
    tabs?: TimeTabsProps;
    hideValues?: boolean;
    valuesTag?: ValuesTag;
    annualValues?: AnnualValues;
    montlyValues?: MontlyValues;
    /** @format color-input */
    valuesBackgroundColor?: string;
    contentVideo?: VideoWidget;
    contentImage?: IImage;
    useContent?: 'video' | 'image';
    hideContentShadow?: boolean;
    planTag?: PlanTag;
    imageText?: RichText;
    imageTextFont?: string;
    slides?: Slide[];
    showArrows?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    marginTop?: string;
    marginBottom?: string;
    paddingTop?: string;
    paddingBottom?: string;
}
function SliderItem({ slide, id }: {
    slide: Slide;
    id: string;
}) {
    const { title, titleColor, bulletPoints = { items: [] }, backgroundImage, text } = slide;
    return (<div id={id} class="relative w-full px-2.5 py-7 text-primary">
        <div class={`relative text-primary min-h-[187px] rounded-3xl py-5 px-8 h-full overflow-hidden ${!backgroundImage?.src && 'bg-primary-content'}`} style={{boxShadow: '0px 3.49px 26.176px 0px rgba(0, 0, 0, 0.10)'}}>
            {backgroundImage?.src && <Image 
                src={backgroundImage.src}
                alt={backgroundImage.alt || "slide background image"}
                width={backgroundImage.width || 398}
                height={backgroundImage.height || 187}
                class="absolute top-0 left-0 w-full h-full -z-40 object-cover"
            />}
            {title && <h3 class="text-xl font-semibold mb-2.5" style={{color: titleColor}}>{title}</h3>}
            {text && <div class="text-sm" dangerouslySetInnerHTML={{__html: text}}/>}
            <div class="text-sm font-normal flex flex-col gap-2.5" style={{color: bulletPoints.textColor}}>
                {bulletPoints.items && bulletPoints.items.length > 0 && bulletPoints.items.map((item) => (<div class="flex gap-2 items-center">
                        {bulletPoints.bulletPointsIcon?.src && <Image width={bulletPoints.bulletPointsIcon.width || 12} height={bulletPoints.bulletPointsIcon.height || 12} src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bulletpoint icon"}/>}
                        {item}
                    </div>))}
                </div>
        </div>
    </div>);
}
function Dots({ slides, interval = 0 }: {
    slides: Slide[];
    interval: number;
}) {
    return (<>
            <style dangerouslySetInnerHTML={{
            __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
        }}/>
            <ul class="carousel col-span-full gap-3 z-10">
                {slides?.map((_, index) => (<li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="py-5">
                                <div class="w-2 h-2 rounded-full group-disabled:animate-progress dot" style={{ animationDuration: `${interval}s` }}/>
                            </div>
                        </Slider.Dot>
                    </li>))}
            </ul>
        </>);
}
function Buttons({ buttonColor }: {
    buttonColor?: string;
}) {
    return (<div class="flex gap-4 ml-5 lg:ml-0">
            <div class="flex items-center justify-center z-10 ">
                <Slider.PrevButton class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current rotate-180 prev-button opacity-20 transition-opacity" style={{ color: buttonColor }}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-10 ">
                <Slider.NextButton class="flex items-center justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current next-button transition-opacity" style={{ color: buttonColor }}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.NextButton>
            </div>
        </div>);
}
export default function PlanDetails2({ hideSection, id, title, titleTextProps, hideContentShadow, hideValues, marginBottom, marginTop, imageTextFont, tabs, arrowsColor, valuesTag, useContent, cta = [], backgroundImage, planTag, imageText, contentImage, contentVideo, slides, showArrows, annualValues, montlyValues, valuesBackgroundColor, createStoreCta, paddingBottom, paddingTop }: Props) {
    if (hideSection) return <></>
    const carouselId = useId();
    return <div id={id} class="relative pt-10 mt-12 lg:mt-0 pb-12 lg:py-20 text-primary" style={{marginBottom, marginTop, paddingTop, paddingBottom}}>
        {backgroundImage?.src && <Image width={backgroundImage.width || 1440} height={backgroundImage.height || 950} src={backgroundImage.src} alt={backgroundImage.alt || "background image"} class="object-cover object-top absolute h-full w-full top-0 left-0 -z-50"/>}
        <AnimateOnShow divClass="mt-4 lg:mt-0 text-[32px] lg:text-[56px] font-normal leading-[120%] px-6 lg:px-0 max-w-[1244px] mx-auto" animation="animate-fade-down">
            {title && <div dangerouslySetInnerHTML={{__html: title}} style={{...titleTextProps}}/>}
        </AnimateOnShow>
        <div class="max-w-[1244px] mx-auto flex flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap justify-between gap-[18px]  py-[60px]">
            <div class="lg:w-[606px] max-w-[606px] w-full" > 
                <div class="px-7 lg:px-0">
                    <TimeTabs {...tabs}/>
                    {!hideValues && <AnimateOnShow divClass="inline-flex flex-wrap justify-center lg:justify-start mt-11 p-7 gap-5 rounded-bl-[20px] rounded-br-[20px] lg:rounded-[20px] relative" animation="animate-fade-up" delay={300} style={{background: valuesBackgroundColor}}>
                        {valuesTag?.text && <div 
                            class="absolute left-0 top-[-45px] h-16 p-3.5 -z-40 rounded-tr-xl rounded-tl-xl lg:rounded-tl-none w-full lg:w-auto"
                            style={{color: valuesTag.textColor, background: valuesTag.backgroundColor}}
                        >
                            {valuesTag.text}
                        </div>}
                        {annualValues?.title && <div class="w-[207px] lg:w-auto max-w-[235px]">
                            <h3 class="text-2xl font-semibold flex flex-wrap items-center" style={{color: annualValues.titleColor}}>
                                {annualValues.title}
                                {annualValues.tag && <span
                                    class="text-primary text-xs py-1 px-4 ml-1.5 bg-info rounded-[20px]"
                                    style={{color: annualValues.tagTextColor, background: annualValues.tagBackgroundColor}}
                                >
                                    {annualValues.tag}
                                </span>}
                            </h3>
                            {annualValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: annualValues.text }}/>}
                            {annualValues.promoTag?.text && <div class="inline-block rounded-[5px] overflow-hidden p-[1px] mt-3.5" style={{background: annualValues.promoTag.borderColor}}>
                                <div class="inline-block rounded-[5px]" style={{background: annualValues.promoTag.backgroundColor}}>
                                    <p class={`flex gap-2.5 items-center h-full py-[7px] text-sm px-4 bg-primary-content text-primary-content font-semibold `} style={{background: annualValues.promoTag.textColor, backgroundClip: "text", color: annualValues.promoTag.textColor && 'transparent', fontFamily: annualValues.promoTag.fontFamily}}>
                                        {annualValues.promoTag?.icon?.src && <Image width={annualValues.promoTag.icon.width || 20} height={annualValues.promoTag.icon.height || 20} src={annualValues.promoTag.icon.src} alt={annualValues.promoTag.icon.alt || "annualValues.promoTag icon"} class="h-5 w-5 object-contain"/>}
                                        {annualValues.promoTag.text}
                                    </p>
                                </div>
                            </div>} 
                            {annualValues.saving && <p class="mt-3 text-base font-medium" style={{color: annualValues.savingColor}}>{annualValues.saving}</p>}
                        </div>}
                        {montlyValues?.title && <div class="w-[207px] lg:w-auto max-w-[235px]">
                            <h3 class="text-2xl font-semibold" style={{color: montlyValues.titleColor}}>{montlyValues.title}</h3>
                            {montlyValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: montlyValues.text }}/>}
                        </div>}
                    </AnimateOnShow>}
                </div>
                <AnimateOnShow divClass="mt-7 flex flex-wrap justify-center lg:justify-start lg:flex-nowrap items-start lg:items-center gap-5 px-6 lg:px-0" animation="animate-fade-up" delay={400}>
                    {createStoreCta?.text && <CreateStoreCta period="anual" text={createStoreCta.text} planId={createStoreCta.planId} showIcon={createStoreCta.showIcon} underlineText={createStoreCta.underlineText} ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`} style={createStoreCta.ctaStyle == "button" ? { backgroundColor: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor } : { color: createStoreCta.textColor }}/>}
                    {cta.map((button) => {
                        if (button.href == '/talkToSpecialist')
                            return <TalkToSpecialistCta showIcon={button.showIcon} text={button.text} ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`} style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, borderColor: button.borderColor, color: button.textColor } : {color: button.textColor}}/>;
                        return <a href={button?.href ?? "#"} target={button?.href.includes("http") ? "_blank" : ""} class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`} style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, borderColor: button.borderColor, color: button.textColor  } : {color: button.textColor  }}>
                                        <div style={{color: button.textColor}} dangerouslySetInnerHTML={{__html: button.text || ""}}/>
                                        {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z"/>
                                        </svg>}
                                    </a>;
                    })}
                </AnimateOnShow>
            </div>
            <AnimateOnShow animation="animate-fade-left" divClass="w-auto px-6 lg:px-0">
                <div class="w-full lg:min-w-[606px] lg:w-[606px] h-[62vw] lg:h-[687px] overflow-hidden rounded-[30px] lg:rounded-[40px] px-5 lg:px-11 py-6 lg:pt-7 lg:pb-10 flex flex-col justify-between relative" 
                    style={{boxShadow: !hideContentShadow ? "0px 4px 64px 0px rgba(17, 26, 26, 0.40)" : "", height: `${contentImage?.height}px`, width: `${contentImage?.width}px`, minWidth: `${contentImage?.width}px` }}>
                    {useContent == "video" && contentVideo && <video width="532" height="747" autoPlay playsInline muted loading="lazy" loop class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10">
                        <source src={contentVideo} type="video/mp4"/>
                    </video>}
                    {useContent == "image" && contentImage?.src && <Image width={contentImage.width || 532} height={contentImage.height || 747} src={contentImage.src} alt={contentImage.alt || "content background image"} class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10"/>}
                    <div>
                        {planTag?.text && <div class="inline-flex gap-2 px-3 lg:px-4 py-1 lg:py-1.5 rounded-[20px] items-center bg-primary-content text-primary text-xs lg:text-sm font-semibold" >
                            {planTag?.icon?.src && <Image width={planTag.icon.width || 18} height={planTag.icon.height || 18} src={planTag.icon.src} alt={planTag.icon.alt || "plan tag icon"} class="h-[18px] w-[18px] object-contain inline-block"/>}
                            {planTag?.text && <p class="inline-block">{planTag.text}</p>}
                        </div>}
                    </div>
                    <div class="text-primary text-2xl lg:text-[35px] leading-[120%] font-normal" dangerouslySetInnerHTML={{ __html: imageText || "" }} style={{fontFamily: imageTextFont}}/>
                </div>
            </AnimateOnShow>
        </div>
        <AnimateOnShow animation="animate-fade-up50" divClass="max-w-[1244px] mx-auto flex justify-center xl:items-end w-full relative" delay={300}>
            <div id={carouselId} class="min-h-min flex flex-col w-full lg:w-full lg:-ml-2.5" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)}>
                <Slider class="carousel carousel-center w-full col-span-full row-span-full" rootId={carouselId} interval={0 && 0 * 1e3} infinite>
                    {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-[80%] lg:w-1/3">
                        <SliderItem slide={slide} id={`${carouselId}::${index}`} />
                    </Slider.Item>))}
                </Slider>

                <div class="lg:ml-2.5 flex justify-end pr-[22px]">
                    {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                    {showArrows && <Buttons buttonColor={arrowsColor}/>}
                </div>
            </div>
        </AnimateOnShow>
    </div>;
}
