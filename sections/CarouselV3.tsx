import type { ImageWidget, HTMLWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"
import CTA, {Props as CTAProps} from "site/components/ui/CTA.tsx";
import { textShortner } from "apps/website/components/_seo/helpers/textShortner.tsx";

const refreshArrowsVisibility = ({arrowsColor, arrowsBackgroundColor, arrowsDisableBackgroundColor, arrowsDisableColor}: Arrows) => {
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
                        // prevButton.style.opacity = "0.2";
                        prevButton.style.background = arrowsDisableBackgroundColor || "";
                        (prevButton.querySelector("path") as SVGElement)?.setAttribute("stroke", arrowsDisableColor || "");
                    } else {
                        // prevButton.style.opacity = "1";
                        prevButton.style.background = arrowsBackgroundColor || "";
                        (prevButton.querySelector("path") as SVGElement)?.setAttribute("stroke", arrowsColor || "");
                    }
    
                    if (endDistance <= 10) {
                        // nextButton.style.opacity = "0.2";
                        nextButton.style.background = arrowsDisableBackgroundColor || "";
                        (nextButton.querySelector("path") as SVGElement)?.setAttribute("stroke", arrowsDisableColor || "");
                    } else {
                        // nextButton.style.opacity = "1";
                        nextButton.style.background = arrowsBackgroundColor || "";
                        (nextButton.querySelector("path") as SVGElement)?.setAttribute("stroke", arrowsColor || "");
                    }
                }

                console.log(prevButton, nextButton);

                if(carouselItems[0].getBoundingClientRect().left != firstItemLastPosition) refresh(carouselItems[0].getBoundingClientRect().left);
            }
        }, 200);
    }
};

export interface BackgroundMedia {
/** @format color-input */
  backgroundColor?: string;
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
  postition?: "top" | "bottom";
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

export interface CarouselIcon {
    src?: ImageWidget;
    alt?: string;
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

export interface CarouselItem {
    /** @format color-input */
    backgroundColor?: string;
    icon?: CarouselIcon;
    title?: Title;
    caption?: RichText;
    captionTextProps?: TextProps;
    image?: IImage;
    video?: VideoWidget;
    use?: 'image' | 'video';
    cta?: CTAProps[];
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

export interface Arrows {
    show?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    /** @format color-input */
    arrowsBackgroundColor?: string;
    /** @format color-input */
    arrowsDisableColor?: string;
    /** @format color-input */
    arrowsDisableBackgroundColor?: string;
}
export interface Props {
    hideSection?: boolean;
    id?: string;
    title?: Title;
    caption?: RichText;
    captionTextProps?: TextProps;
    slides?: CarouselItem[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: Arrows;
    // dots?: boolean;
    // interval?: number;
    cta?: CTAProps[];
    backgroundMedia?: BackgroundMedia;
    paddingTop?: string;
    paddingBottom?: string;
}
function SliderItem({ slide, id }: {
    slide: CarouselItem;
    id: string;
}) {
    const { title, caption, captionTextProps, image, video, use = "image", cta = [], icon, backgroundColor } = slide;
    return (<div id={id} class={`relative w-full rounded-md lg:rounded-lg flex flex-col group overflow-hidden z-10 `} >
        <div class="p-6 lg:p-8 flex flex-col gap-2.5 lg:gap-3 min-h-[282px]" style={{background: backgroundColor}}>
            {icon?.src && <Image 
                src={icon.src}
                alt={icon.alt || "icon"}
                width={icon.width || 40}
                height={icon.height || 40}
            />}
            {title?.text && <div 
                dangerouslySetInnerHTML={{__html: title.text}} 
                class="w-full text-2xl lg:text-[32px]"
                style={{color: title.color, fontFamily: title?.font, fontWeight: title?.fontWeight, fontSize: title?.fontSize, letterSpacing: title?.letterSpacing, lineHeight: title?.lineHeight}}/>}

            {caption && <div dangerouslySetInnerHTML={{__html: caption}} class="text-xs lg:text-base w-full" style={{...captionTextProps}}/>}
            {cta.length > 0 && <div class="flex flex-wrap gap-4 mt-auto">
                {cta.map(cta => (
                    <CTA {...cta} />
                ))}
            </div>}
        </div>

        <div class="overflow-hidden relative h-full">
            {use == "image" && image?.src && <Image 
                src={image.src}
                alt={image.alt}
                width={image.width || 414}
                height={image.height || 331}
                class="w-full group-hover:scale-110 transition-transform ease-in-out duration-300 h-full object-cover"
            />}
            {use == "video" && <video width="414" height="331" autoPlay playsInline muted loading="lazy" loop 
            class="w-full group-hover:scale-110 transition-transform ease-in-out duration-300">
                <source src={video} type="video/mp4" />
                <object data="" width="320" height="240">
                    <embed width="320" height="240" src={video} />
                </object>
            </video>}
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
function Buttons({ arrowsColor, arrowsBackgroundColor, arrowsDisableBackgroundColor, arrowsDisableColor}: Arrows) {
    return (<div class="flex gap-4">
        <Slider.PrevButton class="flex items-center justify-center">
            <div class="flex items-center justify-center z-10 p-2 rounded-full prev-button" style={{background: arrowsDisableBackgroundColor}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none" class="rotate-180">
                    <path d="M9 17.9028L15 11.9028L9 5.90283" stroke={arrowsDisableColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </Slider.PrevButton>
        <Slider.NextButton class="flex items-center justify-center ">
            <div class="flex items-center justify-center z-10 p-2 rounded-full next-button" style={{background: arrowsBackgroundColor}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none" class="">
                    <path d="M9 17.9028L15 11.9028L9 5.90283" stroke={arrowsColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </Slider.NextButton>
    </div>);
}
function Carousel(props: Props) {
    if (props.hideSection) return <></>
    const { id, title, caption, captionTextProps, slides, paddingBottom, paddingTop, arrows, cta = [], backgroundMedia } = { ...props };
    const carouselId = useId();
    return (<div id={id} style={{paddingTop: paddingTop, paddingBottom: paddingBottom, background: backgroundMedia?.backgroundColor}} class="relative overflow-hidden" 
        hx-on:click={useScript(refreshArrowsVisibility, {...arrows})} 
        hx-on:touchend={useScript(refreshArrowsVisibility, {...arrows})}>
        {/* <input type="text" value="0" /> */}
            <AnimateOnShow 
                id={carouselId} 
                divClass="min-h-min flex flex-col items-center w-full relative" 
                style={{animationDuration: '700ms'}}
                animation="animate-fade-up50"
                delay={200}>
                    {title?.text && title.text.length > 8 && <AnimateOnShow
                        animation="animate-fade-up50"
                        divClass={`text-5xl lg:text-[70px] leading-[120%] ${caption ? 'mb-4' : 'mb-12 lg:mb-[120px]'}`}>
                        <div class="leading-normal" dangerouslySetInnerHTML={{ __html: title.text }} style={{ color: title.color, fontFamily: title.font, fontSize: title.fontSize, letterSpacing: title.letterSpacing }} />
                    </AnimateOnShow>}
                    {caption && caption.length > 8 && <AnimateOnShow
                        animation="animate-fade-up50"
                        divClass="text-base lg:text-2xl font-light leading-normal mb-4">
                        <div dangerouslySetInnerHTML={{ __html: caption }} style={{...captionTextProps}} />
                    </AnimateOnShow>}

                <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-2 lg:gap-5 px-5 lg:pl-[30px] lg:pr-[22px] py-9 md:px-2.5 max-w-[1169px] relative" rootId={carouselId} interval={0 && 0 * 1e3} infinite id="carouselSlider">
                    {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-[319px] lg:w-[363px]">
                        <SliderItem slide={slide} id={`${carouselId}::${index}`} />
                    </Slider.Item>))}
                    {/* <Slider.Item index={slides?.length || 0} class="carousel-item w-[1px] lg:w-[456px] sm:block" >
                        <div></div>
                    </Slider.Item> */}
                </Slider>

                <AnimateOnShow animation="animate-fade-up" divClass="flex justify-end pr-[22px] px-7 lg:px-0 w-full max-w-[1169px] mx-auto">
                    {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                    {props.arrows?.show && <Buttons {...props.arrows} />} 
                </AnimateOnShow >
            </AnimateOnShow>
            <AnimateOnShow divClass="flex flex-wrap justify-center items-center gap-7 mt-4 lg:mt-11 px-7 lg:px-0" animation="animate-fade-up">
                {cta.map(cta => (
                    <CTA {...cta} />
                ))}
            </AnimateOnShow>
        {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
        src={backgroundMedia.image.src}
        alt={backgroundMedia.image.alt || "background image"}
        width={backgroundMedia.image.width || 1277}
        height={backgroundMedia.image.height || 630}
        class={`absolute -z-50 top-0 left-0 h-full w-full object-cover `}
      />}
      {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
        class={`object-cover absolute -z-50 top-0 left-0 h-full w-full `}>
        <source src={backgroundMedia.video} type="video/mp4" />
      </video>}
    </div>);
}
export default Carousel;
