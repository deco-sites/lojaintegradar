import type { ImageWidget, HTMLWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";
import { useScript } from "@deco/deco/hooks";
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

export interface IVideo {
    src?: VideoWidget;
    width?: string;
    height?: string;
}

export interface Title {
    text?: RichText;
    font?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
}


export interface IImage {
    src: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}
export interface BulletPoints {
    items?: string[];
    /** @format color-input */
    textColor?: string;
    bulletPointsIcon?: IImage;
}

export interface Media {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video" | "embed";
  placement?: "right" | "left";
}

/**
 * @title {{title}}
 */
export interface Slide {
    title: string;
    contentTitle?: Title;
    caption?: Title;
    textContainer?: {
        /** @format color-input */
        backgroundColor?: string;
    }
    media?: Media;
    bulletPoints?: BulletPoints;
}
export interface Props {
    hideSection?: boolean;
    id?: string;
    title?: Title;
    caption?: Title;
    /** @format color-input */
    slides?: Slide[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /** @format color-input */
    arrowsColor?: string;
    /**
     * @title Show dots
     * @description show dots to navigate through the images
     */
    dots?: boolean;
    dotsProgressBarPlacement?: "above" | "below";
    /** @format color-input */
    dotsColor?: string;
    /** @format color-input */
    dotsTextColor?: string;
    cta?: CTAProps[];
    backgroundImage?: IImage;
    /** @format color-input */
    backgroundColor?: string;
    paddingTop?: string;
    paddingBottom?: string;
}

export function HeroMedia({ media }: { media?: Media }) {
  return <>
    {media?.use == "image" && media.image?.src && <Image
      src={media.image.src}
      alt={media.image.alt || "image"}
      class="object-contain rounded-md"
      width={media.image.width || 594}
      height={media.image.height || 431}
    />}
    {media?.use == "video" && media.video?.src && <video width={media.video.width || 1280} height={media.video.height || 720} autoPlay playsInline muted loading="lazy" loop
      class="object-cover rounded-md"
      style={{ width: (media.video.width || 594) + "px", height: (media.video.height || 431) + "px" }}>
      <source src={media.video.src} type="video/mp4" />
    </video>}
    {media?.use == "embed" && <iframe
      width={"100%"}
      height={"100%"}
      src={media.video?.src}
      frameborder="0"
      class="rounded-md"
      style={{ width: media.video?.width || 594, height: media.video?.height || 431 }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen gyroscope; picture-in-picture"
    />}
  </>
}

function SliderItem({ slide, id }: {
    slide: Slide;
    id: string;
}) {
    const { contentTitle, caption, media, bulletPoints, textContainer } = slide;
    return (<div>
        <div id={id} class="relative flex flex-col md:flex-row gap-10 md:gap-14 w-full min-h-[292px]">
                
            <div class="flex flex-col gap-5 p-5 rounded-md justify-center min-h-[90vw] lg:min-h-0" style={{background: textContainer?.backgroundColor}}>
                {contentTitle?.text && <div dangerouslySetInnerHTML={{__html: contentTitle.text}} class="text-[38px] leading-tight"
                    style={{fontFamily: contentTitle.font, fontSize: contentTitle.fontSize, lineHeight: contentTitle.lineHeight, letterSpacing: contentTitle.letterSpacing, fontWeight: contentTitle.fontWeight}}/>}
                {caption?.text && <div dangerouslySetInnerHTML={{__html: caption.text}} class="text-base" 
                    style={{fontFamily: caption.font, fontSize: caption.fontSize, lineHeight: caption.lineHeight, letterSpacing: caption?.letterSpacing, fontWeight: caption?.fontWeight}}/>}
                <div>
                    {bulletPoints?.items?.map((bulletPoint) => (<div class="flex gap-[15px] md:gap-5 mt-[10px] md:w-auto">
                        {bulletPoints.bulletPointsIcon && <div class="min-w-[15px] w-[15px] md:w-5 md:min-w-5"><Image src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet point icon"} width={bulletPoints.bulletPointsIcon.width || 20} height={bulletPoints.bulletPointsIcon.height || 20} class="object-contain"/></div>}
                        <p class="text-sm md:text-lg font-semibold" style={{ color: slide.bulletPoints?.textColor }}>{bulletPoint}</p>
                    </div>))}
                </div>
            </div>
            
            <HeroMedia media={media} />
        </div>
    </div>);
}
function Dots({ slides, dotsColor, dotsTextColor, dotsProgressBarPlacement = "below" }: Props) {
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
        <div class="relative w-full mt-10">
            <div class="left-0 md:static w-full flex justify-center">
                <ul class="flex gap-1 md:gap-11 z-10 w-full justify-center">
                    {slides?.map((slide, index) => (<li class="w-11 md:w-auto max-w-[187px]">
                        <Slider.Dot index={index}>
                            <div class={`pt-5 h-full flex ${dotsProgressBarPlacement == "above" ? 'flex-col-reverse' : 'flex-col'} hover:scale-100`}>
                                <div class="h-0 w-11 opacity-0 md:opacity-100 md:h-auto md:w-auto">
                                    <p class="text-base text-primary text-left font-normal opacity-30 group-disabled:opacity-100" style={{ color: dotsTextColor }}>{slide.title}</p>
                                </div>
                                <div class="h-0.5 mt-2 rounded-full dot overflow-hidden bg-accent-content opacity-30 lg:opacity-0 group-disabled:opacity-100" style={{ background: dotsColor || '#A1ABBC' }}>
                                </div>
                            </div>
                        </Slider.Dot>
                    </li>))}
                </ul>
            </div>
            <div class="hidden lg:block w-full h-0.5 rounded-sm opacity-20 mt-[-2px]" style={{background: dotsColor}}/>
        </div>
    </>);
}
function Buttons({ arrowsColor }: {
    arrowsColor?: string;
}) {
    return (<div class="flex gap-4 w-full justify-between">
        <div class="flex items-center justify-center z-10 ">
            <Slider.PrevButton class="flex items-center justify-center ml-[-95%] lg:ml-[-200%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 prev-button opacity-20 transition-opacity" style={{ color: arrowsColor }}>
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                </svg>
            </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 ">
            <Slider.NextButton class="flex items-center justify-center mr-[-90%] lg:mr-[-200%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current next-button transition-opacity" style={{ color: arrowsColor }}>
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                </svg>
            </Slider.NextButton>
        </div>
    </div>);
}
function Carousel(props: Props) {
    if (props.hideSection) return <></>
    const rootId = useId();
    const { id, title, caption, slides, backgroundImage, cta = [], arrowsColor, dotsTextColor, backgroundColor, dotsColor, dotsProgressBarPlacement, paddingBottom, paddingTop } = { ...props };
    return (<div id={id} class="relative" style={{background: backgroundColor}}>
        {backgroundImage?.src && <div class="absolute w-full h-full top-0 left-0 -z-50"><Image width={backgroundImage.width || 1440} height={backgroundImage.height || 1104} src={backgroundImage.src} alt={backgroundImage.alt || "carousel background"} class="h-full w-full object-cover"/></div>}
        <div id={rootId} class="min-h-min flex items-center flex-col lg:container relative md:max-w-[1066px] px-5 lg:px-0 lg:mx-auto pt-16 pb-24 lg:pt-24" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)} style={{paddingBottom, paddingTop}}>
            {title?.text && <AnimateOnShow
                        animation="animate-fade-up50"
                        divClass="text-5xl lg:text-[70px] leading-[120%] mb-4"
                        style={{ fontFamily: title.font, fontSize: title.fontSize, letterSpacing: title.letterSpacing, lineHeight: title.lineHeight, fontWeight: title.fontWeight }}>
                        <div dangerouslySetInnerHTML={{ __html: title.text }} />
                    </AnimateOnShow>}
            {caption?.text && <AnimateOnShow
                animation="animate-fade-up50"
                divClass="text-base lg:text-2xl font-light leading-normal mb-4">
                <div dangerouslySetInnerHTML={{ __html: caption.text }} 
                style={{ fontFamily: caption.font, fontSize: caption.fontSize, letterSpacing: caption.letterSpacing, lineHeight: caption.lineHeight, fontWeight: caption.fontWeight }}/>
            </AnimateOnShow>}

            {props.dots && <Dots slides={slides} dotsColor={dotsColor} dotsTextColor={dotsTextColor} dotsProgressBarPlacement={dotsProgressBarPlacement} />}{" "}

            <div class="relative w-full ">
                <div class="absolute top-[89vw] lg:top-[232px] left-0 flex justify-end w-full ">
                    {props.arrows && <Buttons arrowsColor={arrowsColor}/>}
                </div>
            </div>
            <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-9 py-0 md:pt-10" rootId={rootId}>
                {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-full">
                    <SliderItem slide={slide} id={`${rootId}::${index}`}/>
                </Slider.Item>))}
            </Slider>
            <AnimateOnShow divClass="flex flex-wrap justify-center items-center gap-7 mt-5 lg:mt-20 px-7" animation="animate-fade-up">
            {cta.map(cta => (
                <CTA {...cta} />
            ))}
            </AnimateOnShow>
        </div>

    </div>);
}
export default Carousel;
