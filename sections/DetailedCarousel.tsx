import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import { useScript } from "deco/hooks/useScript.ts";

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

export interface IImage {
    src: ImageWidget;
    alt?: string;
}
export interface BulletPoints {
    items?: string[];
    /** @format color-input */
    textColor?: string;
    bulletPointsIcon?: IImage;
}
/**
 * @title {{title}}
 */
export interface Slide {
    title: string;
    /** @format color-input */
    titleColor?: string;
    image?: IImage;
    video?: VideoWidget;
    use?: 'image' | 'video';
    bulletPoints?: BulletPoints;
}
export interface Props {
    title?: string;
    /** @format color-input */
    titleColor?: string;
    /** @format color-input */
    slides?: Slide[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /** @format color-input */
    arrowsColor?: string
    /**
     * @title Show dots
     * @description show dots to navigate through the images
     */
    dots?: boolean;
    /** @format color-input */
    dotsColor?: string;
    /**
     * @title Autoplay interval
     * @description time (in seconds) to start the carousel autoplay
     */
    interval?: number;
    cta?: CTA[];
    backgroundImage?: IImage;
}
function SliderItem({ slide, id }: {
    slide: Slide;
    id: string;
}) {
    const { title, image, bulletPoints, video, use = 'image', titleColor } = slide;
    return (<AnimateOnShow animation="animate-fade-in" delay={150}>
        <div id={id} class="relative flex flex-col md:flex-row gap-[84px] md:gap-10 w-full min-h-[292px]">
            <div class="max-w-[730px] flex-grow bg-primary-content bg-opacity-30 rounded-[30px] flex items-center overflow-hidden">
                {use == 'image' && image && <Image width={730} height={553} src={image.src} alt={image.alt || ""} />}
                {use == 'video' && video && <video width="730" height="553" autoPlay playsInline muted loading="lazy" loop class="object-cover object-top h-full w-full">
                    <source src={video} type="video/mp4" />
                    <object data="" width="730" height="553">
                        <embed width="730" height="553" src={video} />
                    </object>
                </video>}
            </div>

            <div class="flex flex-col gap-7 md:max-w-[396px]">
                <h2 class="text-primary text-xl md:text-[40px] font-bold leading-[120%]" style={{ color: titleColor }}>{title}</h2>
                <div class="flex flex-wrap gap-1 md:flex-col justify-between">
                    {bulletPoints?.items?.map((bulletPoint) => (<div class="flex gap-[15px] md:gap-5 mt-[10px] w-5/12 md:w-auto">
                        {bulletPoints.bulletPointsIcon && <div class="min-w-[15px] w-[15px] md:w-5 md:min-w-5"><Image src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet point icon"} width={20} height={20} class="object-contain" /></div>}
                        <p class="text-sm md:text-lg font-semibold" style={{ color: slide.bulletPoints?.textColor }}>{bulletPoint}</p>
                    </div>))}
                </div>
            </div>
        </div>
    </AnimateOnShow>);
}
function Dots({ slides, interval = 0, dotsColor }: Props) {
    return (<>
        <style dangerouslySetInnerHTML={{
            __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }} />
        <div class="relative w-full">
            <div class="absolute top-[70vw] left-0 md:static w-full flex justify-center">
                <ul class="flex gap-1 md:gap-6 z-10">
                    {slides?.map((slide, index) => (<li class="w-11 md:w-auto">
                        <Slider.Dot index={index}>
                            <div class="py-5 h-full">
                                <div class="h-0 w-11 opacity-0 md:opacity-100 md:h-auto md:w-auto">
                                    <p class="text-lg text-primary text-left font-semibold opacity-30 group-disabled:opacity-100" style={{ color: dotsColor }}>{slide.title}</p>
                                </div>
                                <div class="h-1 mt-2 rounded-full dot overflow-hidden bg-accent-content" style={{ backgroundColor: '#A1ABBC' }}>
                                    <div class="h-full w-0 bg-primary group-disabled:animate-progress" style={{ animationDuration: `${interval}s`, backgroundColor: dotsColor }} />
                                </div>
                            </div>
                        </Slider.Dot>
                    </li>))}
                </ul>
            </div>
        </div>
    </>);
}
function Buttons({ arrowsColor }: { arrowsColor?: string }) {
    return (<div class="flex gap-4 w-full justify-between">
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
function Carousel(props: Props) {
    const id = useId();
    const { title, slides, interval, backgroundImage, cta, titleColor, arrowsColor, dotsColor } = { ...props };
    return (<div id="detailedCarousel" class="relative mt-16">
        {backgroundImage && <div class="absolute w-full h-full top-0 left-0 -z-50"><Image width={1440} height={1104} src={backgroundImage.src} alt={backgroundImage.alt || "carousel background"} class="h-full w-full object-fill" /></div>}
        <div id={id} class="min-h-min flex items-center flex-col lg:container relative md:max-w-[1220px] lg:mx-auto pt-16 pb-24 lg:pt-24" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)}>

            {title && <AnimateOnShow divClass="max-w-[307px] md:max-w-full text-2xl md:text-5xl text-primary text-center font-semibold leading-snug pb-7 md:pb-12 lg:pb-16">
                <h2 class="w-full" style={{ color: titleColor }}>{title}</h2>
            </AnimateOnShow>}

            <div class="relative w-full ">
                <div class="absolute top-[28vw] left-0 flex justify-end w-full lg:px-9 ">
                    {props.arrows && <Buttons arrowsColor={arrowsColor} />}
                </div>
            </div>
            {props.dots && <Dots slides={slides} interval={interval} dotsColor={dotsColor} />}{" "}

            <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-9 pl-[30px] pr-[22px] py-0 md:py-9 md:px-9" rootId={id} interval={interval && interval * 1e3} infinite>
                {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-full">
                    <SliderItem slide={slide} id={`${id}::${index}`} />
                </Slider.Item>))}
            </Slider>
            {cta && <AnimateOnShow animation="animate-fade-up" divClass="flex flex-wrap items-center justify-center gap-7 mt-4 px-7">
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
            </AnimateOnShow>}
        </div>

    </div>);
}
export default Carousel;
