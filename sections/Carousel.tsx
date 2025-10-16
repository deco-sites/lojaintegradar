import type { ImageWidget, HTMLWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

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

export interface TextProps extends TitleTextProps {
    fontFamily?: string;
}

export interface TitleTextProps {
    fontSize?: string;
    fontWeight?: string;
    letterSpacing?: string;
    lineHeight?: string;
  }

export interface CarouselIcon {
    src?: ImageWidget;
    alt?: string;
    placement?: 'Top right' | 'Top left' | 'Bottom left' | 'Bottom right';
    width?: number;
    height?: number;
}
export interface IImage {
    src?: ImageWidget;
    alt?: string;
    height?: number;
    width?:number;
}
export interface BulletPoints {
    bulletPointsTitle?: string;
    items?: string[];
    bulletPointsIcon?: IImage;
}
/** @title {{title}} */
export interface CarouselItem {
    title?: string;
    /** @format color-input */
    textColor?: string;
    titleTextProps?: TextProps;
    caption: RichText;
    captionTextProps?: TextProps;
    textPlacement: "Top" | "Bottom";
    icon?: CarouselIcon;
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: 'image' | 'video';
    bulletPoints?: BulletPoints;
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
    ctaStyle?: "button" | "link";
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
    ctaStyle?: "button" | "link";
    showIcon?: boolean;
    order?: number;
}

export interface Props {
    hideSection?: boolean;
    id?: string;
    title?: RichText;
    titleFont?: string;
    /** @format color-input */
    titleColor?: string;
    titleTextProps?: TitleTextProps;
    titlePaddingBottom?: string;
    caption?: RichText;
    captionFont?: string;
    /** @format color-input */
    captionColor?: string;
    captionTextProps?: TitleTextProps;
    slides?: CarouselItem[];
    slidesHeight?: string;
    slidesWidth?: string;
    slidesGap?: string;
    containerWidth?: string;
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    // dots?: boolean;
    createStoreCta?: CreateStoreWithPlanCTA;
    cta?: CTA[];
    /** @format color-input */
    backgroundColor?: string;
    backgroundImage?: IImage;
    // interval?: number;
    marginTop?: string;
    paddingTop?: string;
    paddingBottom?: string;
}
function SliderItem({ slide, id, slidesHeight }: {
    slide: CarouselItem;
    id: string;
    slidesHeight?: string;
}) {
    const { title, titleTextProps, caption, captionTextProps, textPlacement, textColor, icon, backgroundImage, bulletPoints, useBackground = 'image', backgroundVideo } = slide;
    const iconPosition = {
        'Top left': 'top-0 left-0',
        'Top right': 'top-0 right-0',
        'Bottom left': 'bottom-0 left-0',
        'Bottom right': 'bottom-0 right-0',
    };
    console.log(icon?.width," ",icon?.height)
    return (<div id={id} class={`relative w-full h-[400px] sm:h-[484px] rounded-[30px] overflow-y-auto p-6 md:p-8 'text-primary' `} style={{ color: textColor, height: slidesHeight }}>

        {useBackground == 'image' && backgroundImage?.src && <div class="absolute top-0 left-0 z-0 h-full w-full"><Image src={backgroundImage.src} loading="lazy" decoding="async" fetchPriority="low" alt={backgroundImage.alt || "carousel item background image"} width={backgroundImage.width || 456} height={backgroundImage.height || 608} class="w-full h-full object-cover object-top" /></div>}
        {useBackground == 'video' && backgroundVideo && <video width="456" height="608" autoPlay playsInline muted loading="lazy" loop class="absolute top-0 left-0 z-0 h-full w-full object-cover object-top">
            <source src={backgroundVideo} type="video/mp4" />
            <object data="" width="320" height="240">
                <embed width="320" height="240" src={backgroundVideo} />
            </object>
        </video>}
        <div class={`relative w-full h-full flex justify-between ${textPlacement == 'Top' ? 'flex-col' : 'flex-col-reverse'}`}>
            {icon?.src && <Image loading="lazy" decoding="async" fetchPriority="low" src={icon.src} alt={icon.alt || "carousel item background image"} width={icon.width || 32} height={icon.width || 32} class={` object-contain absolute h-8 w-8 ${iconPosition[icon.placement || 'Top right']}`} />}
            <div>
                {title && <h2 class="text-lg md:text-2xl pr-12 md:mb-5" style={{...titleTextProps}}>{title}</h2>}
                <div class="text-xs md:text-sm " dangerouslySetInnerHTML={{ __html: caption }} style={{...captionTextProps}}/>
            </div>
            <div>
                {bulletPoints?.bulletPointsTitle && <p class="text-sm">{bulletPoints.bulletPointsTitle}</p>}
                {bulletPoints?.items?.map((bulletPoint) => (<div class="flex gap-2 mt-[10px]">
                    {bulletPoints.bulletPointsIcon?.src && <Image loading="lazy" decoding="async" fetchPriority="low" src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet point icon"} width={bulletPoints.bulletPointsIcon.width || 20} height={bulletPoints.bulletPointsIcon.height || 20} class="object-contain" />}
                    <p class="text-sm">{bulletPoint}</p>
                </div>))}
            </div>
        </div>
    </div>);
}
// function Dots({ slides, interval = 0 }: Props) {
//     return (<>
//         <style dangerouslySetInnerHTML={{
//             __html: `
//           @property --dot-progress {
//             syntax: '<percentage>';
//             inherits: false;
//             initial-value: 0%;
//           }
//           `,
//         }} />
//         <ul class="carousel col-span-full gap-3 z-10">
//             {slides?.map((_, index) => (<li class="carousel-item">
//                 <Slider.Dot index={index}>
//                     <div class="py-5">
//                         <div class="w-2 h-2 rounded-full group-disabled:animate-progress dot" style={{ animationDuration: `${interval}s` }} />
//                     </div>
//                 </Slider.Dot>
//             </li>))}
//         </ul>
//     </>);
// }
function Buttons({ arrowsColor }: { arrowsColor?: string }) {
    return (<div class="flex gap-4">
        <div class="flex items-center justify-center z-10 ">
            <Slider.PrevButton class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 opacity-20 prev-button transition-opacity" style={{ color: arrowsColor }}>
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
function Carousel(props: Props) {
    if (props.hideSection) return <></>
    const { id, title, titleFont, titleTextProps, marginTop, titlePaddingBottom, caption, captionFont, captionTextProps, slides, slidesHeight, slidesGap, slidesWidth, containerWidth, backgroundImage, createStoreCta, cta, titleColor, captionColor, arrowsColor, paddingBottom, paddingTop, backgroundColor } = { ...props };
    const carouselId = useId();
    return (<div id={id} style={{background: backgroundColor, paddingTop: paddingTop, paddingBottom: paddingBottom, marginTop}} style="min-height: 400px;" class="relative pt-7 lg:pt-14">
        {/* <input type="text" value="0" /> */}
            <div id={carouselId} class="min-h-min flex flex-col items-center w-full relative" width="100%" height="100%" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)}>
                {backgroundImage?.src && <div class="absolute hidden md:block -z-50 top-0 left-0 h-full w-full"><Image src={backgroundImage.src} alt={backgroundImage.alt || "background image"} height={backgroundImage.height || 780} width={backgroundImage.width || 460} class="h-full object-contain" /></div>}

                <AnimateOnShow animation="animate-fade-up" delay={200}>
                    {title && <div 
                        class="text-2xl md:text-5xl font-normal text-center text-primary leading-snug max-w-[942px] lg:pb-16" 
                        style={{ color: titleColor, fontFamily: titleFont, paddingBottom: titlePaddingBottom, ...titleTextProps }} 
                        dangerouslySetInnerHTML={{__html: title}} />}

                    {caption && <div 
                        class="text-xl md:text-2xl font-semibold text-center text-primary leading-snug max-w-[942px]" 
                        style={{ color: captionColor, fontFamily: captionFont, ...captionTextProps }}
                        dangerouslySetInnerHTML={{__html: caption}}
                        />}

                </AnimateOnShow>
                <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-[30px] pl-[30px] pr-[22px] py-9 md:px-0 max-w-[1480px] relative" style={{width: containerWidth, gap: slidesGap}} rootId={carouselId} interval={0 && 0 * 1e3} infinite id="carouselSlider" > 
                    {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-full xl:w-1/3 sm:max-w-[456px]" style={{width: slidesWidth}}>
                        <SliderItem slide={slide} id={`${carouselId}::${index}`} slidesHeight={slidesHeight}/>
                    </Slider.Item>))}
                    {/* <Slider.Item index={slides?.length || 0} class="carousel-item w-[1px] lg:w-[456px] sm:block" >
                        <div></div>
                    </Slider.Item> */}
                </Slider>

                <AnimateOnShow animation="animate-fade-up" divClass="flex justify-end pr-[22px] lg:px-9 w-full max-w-[1332px] mx-auto">
                    {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                    {props.arrows && <Buttons arrowsColor={arrowsColor} />}
                </AnimateOnShow >
                {cta && <AnimateOnShow divClass="flex flex-wrap justify-center items-center gap-7 mt-4 px-7" animation="animate-fade-up">
                    {createStoreCta?.text && <CreateStoreCta
                            period="anual"
                            text={createStoreCta.text}
                            planId={createStoreCta.planId}
                            showIcon={createStoreCta.showIcon}
                            underlineText={createStoreCta.underlineText}
                            ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                            style={createStoreCta.ctaStyle != "link"
                                ? { background: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order }
                                : { color: createStoreCta.textColor, order: createStoreCta.order }}
                        />}
                    {cta.map((button, index) => {
                        if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                            showIcon={button.showIcon}
                            underlineText={button.underlineText}
                            text={button.text}
                            ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                            style={button.ctaStyle == "button" ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                        />
                        return <a
                            href={button?.href ?? "#"}
                            target={button?.href.includes("http") ? "_blank" : ""}
                            class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                            style={button.ctaStyle == "button" ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                        >
                            {button?.text}
                            {button.underlineText && <span class="underline">{button.underlineText}</span>}
                            {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                            </svg>}
                        </a>
                    })}
                </AnimateOnShow>}
            </div>
    </div>);
}
export default Carousel;
