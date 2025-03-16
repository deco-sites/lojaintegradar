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

export interface Title {
    text?: RichText;
    font?: string;
    fontSize?: string;
    letterSpacing?: string;
}

export interface CarouselItem {
    image?: IImage;
    video?: VideoWidget;
    use?: 'image' | 'video';
    title?: Title;
    caption?: RichText;
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
    slides?: CarouselItem[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: Arrows;
    // dots?: boolean;
    // interval?: number;
    paddingTop?: string;
    paddingBottom?: string;
}
function SliderItem({ slide, id }: {
    slide: CarouselItem;
    id: string;
}) {
    const { title, caption, image, video, use = "image", cta = [] } = slide;
  
    return (<div id={id} class={`relative w-full rounded-[20px] shadow-spreaded4 flex flex-col`}>
        {use == "image" && image?.src && <Image 
            src={image.src}
            alt={image.alt}
            width={image.width || 414}
            height={image.height || 331}
            class="w-full"
        />}
        {use == "video" && <video width="414" height="331" autoPlay playsInline muted loading="lazy" loop class="w-full">
            <source src={video} type="video/mp4" />
            <object data="" width="320" height="240">
                <embed width="320" height="240" src={video} />
            </object>
        </video>}
        
        <div class="py-[34px] lg:py-11 px-6 flex flex-col gap-1.5 lg:gap-5 flex-grow">
            {title?.text && <div 
                dangerouslySetInnerHTML={{__html: title.text}} 
                class="w-full text-2xl lg:text-[32px]"
                style={{fontSize: title.fontSize, fontFamily: title.font, letterSpacing: title.letterSpacing}}/>}

            {caption && <div dangerouslySetInnerHTML={{__html: caption}} class="text-xs lg:text-base w-full"/>}
            <div class="flex flex-wrap gap-4 mt-auto">
                {cta.map(cta => (
                    <CTA {...cta} />
                ))}
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
function Buttons({ arrowsColor, arrowsBackgroundColor, arrowsDisableBackgroundColor, arrowsDisableColor}: Arrows) {
    return (<div class="flex gap-4">
        <div class="flex items-center justify-center z-10 p-2 rounded-full prev-button" style={{background: arrowsDisableBackgroundColor}}>
            <Slider.PrevButton class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none" class="rotate-180">
                <path d="M9 17.9028L15 11.9028L9 5.90283" stroke={arrowsDisableColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 p-2 rounded-full next-button" style={{background: arrowsBackgroundColor}}>
            <Slider.NextButton class="flex items-center justify-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 25" fill="none" class="">
                <path d="M9 17.9028L15 11.9028L9 5.90283" stroke={arrowsColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </Slider.NextButton>
        </div>
    </div>);
}
function Carousel(props: Props) {
    if (props.hideSection) return <></>
    const { id, title, caption, slides, paddingBottom, paddingTop, arrows } = { ...props };
    const carouselId = useId();
    return (<div id={id} style={{paddingTop: paddingTop, paddingBottom: paddingBottom}} class="relative" 
        hx-on:click={useScript(refreshArrowsVisibility, {...arrows})} 
        hx-on:touchend={useScript(refreshArrowsVisibility, {...arrows})}>
        {/* <input type="text" value="0" /> */}
            <AnimateOnShow 
                id={carouselId} 
                divClass="min-h-min flex flex-col items-center w-full relative" 
                style={{animationDuration: '700ms'}}
                animation="animate-fade-up50"
                delay={500}>
                    {title?.text && title.text.length > 8 && <AnimateOnShow
                        animation="animate-fade-up50"
                        divClass={`text-5xl lg:text-[70px] leading-[120%] ${caption ? 'mb-4' : 'mb-12 lg:mb-[120px]'}`}>
                        <div class="leading-normal" dangerouslySetInnerHTML={{ __html: title.text }} style={{ fontFamily: title.font, fontSize: title.fontSize, letterSpacing: title.letterSpacing }} />
                    </AnimateOnShow>}
                    {caption && caption.length > 8 && <AnimateOnShow
                        animation="animate-fade-up50"
                        divClass="text-base lg:text-2xl font-light leading-normal mb-4">
                        <div dangerouslySetInnerHTML={{ __html: caption }} />
                    </AnimateOnShow>}

                <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-2 lg:gap-5 px-5 lg:pl-[30px] lg:pr-[22px] py-9 md:px-2.5 max-w-[1340px] relative" rootId={carouselId} interval={0 && 0 * 1e3} infinite id="carouselSlider">
                    {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-[297px] lg:w-[414px]">
                        <SliderItem slide={slide} id={`${carouselId}::${index}`} />
                    </Slider.Item>))}
                    {/* <Slider.Item index={slides?.length || 0} class="carousel-item w-[1px] lg:w-[456px] sm:block" >
                        <div></div>
                    </Slider.Item> */}
                </Slider>

                <AnimateOnShow animation="animate-fade-up" divClass="flex justify-end pr-[22px] lg:px-9 w-full max-w-[1332px] mx-auto">
                    {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                    {props.arrows?.show && <Buttons {...props.arrows} />}
                </AnimateOnShow >
            </AnimateOnShow>
    </div>);
}
export default Carousel;
