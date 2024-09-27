import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import { CSS } from "../static/css2.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

/** @title {{text}} */
export interface CTA {
    id?: string;
    href: string;
    text: string;
    outline?: boolean;
}
/** @title {{text}} */
export interface Link {
    textBefore: string;
    text: string;
    href: string;
}
export interface IImage {
    src: ImageWidget;
    alt?: string;
}
export interface BulletPoints {
    bulletPointsTitle?: string;
    items?: string[];
    bulletPointsIcon?: IImage;
}
/**
 * @title {{title}}
 */
export interface Slide {
    title: string;
    image?: IImage;
    video?: VideoWidget;
    use?: 'image' | 'video';
    bulletPoints?: BulletPoints;
}
export interface Props {
    title?: string;
    slides?: Slide[];
    /**
     * @title Show arrows
     * @description show arrows to navigate through the images
     */
    arrows?: boolean;
    /**
     * @title Show dots
     * @description show dots to navigate through the images
     */
    dots?: boolean;
    /**
     * @title Autoplay interval
     * @description time (in seconds) to start the carousel autoplay
     */
    interval?: number;
    cta?: CTA[];
    links?: Link[];
    backgroundImage?: IImage;
}
function SliderItem({ slide, id }: {
    slide: Slide;
    id: string;
}) {
    const { title, image, bulletPoints, video, use = 'image' } = slide;
    return (<AnimateOnShow animation="animate-fade-in" delay={150}>
        <div id={id} class="relative flex flex-col md:flex-row gap-[84px] md:gap-10 w-full min-h-[292px]">
            <div class="max-w-[730px] flex-grow bg-primary-content bg-opacity-30 rounded-[30px] flex items-center overflow-hidden">
                {use == 'image' && image && <Image width={730} height={553} src={image.src} alt={image.alt || ""} />}
                {use == 'video' && video && <video width="730" height="553" autoPlay playsInline muted loading="lazy" loop class="object-cover object-top h-full w-full">
                    <source src={video} type="video/mp4" />
                    <object data="" width="320" height="240">
                        <embed width="320" height="240" src={video} />
                    </object>
                </video>}
            </div>

            <div class="flex flex-col gap-7 md:max-w-[396px]">
                <h2 class="text-primary text-xl text-center md:text-[40px] font-bold leading-[120%]">{title}</h2>
                <div class="flex flex-wrap gap-1 md:flex-col justify-between">
                    {bulletPoints?.items?.map((bulletPoint) => (<div class="flex gap-[15px] md:gap-5 mt-[10px] w-5/12 md:w-auto">
                        {bulletPoints.bulletPointsIcon && <div class="min-w-[15px] w-[15px] md:w-5 md:min-w-5"><Image src={bulletPoints.bulletPointsIcon.src} alt={bulletPoints.bulletPointsIcon.alt || "bullet point icon"} width={20} height={20} class="object-contain" /></div>}
                        <p class="text-sm md:text-lg font-semibold">{bulletPoint}</p>
                    </div>))}
                </div>
            </div>
        </div>
    </AnimateOnShow>);
}
function Dots({ slides, interval = 0 }: Props) {
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
                                    <p class="text-lg text-primary font-semibold opacity-30 group-disabled:opacity-100">{slide.title}</p>
                                </div>
                                <div class="h-1 mt-2 rounded-full dot overflow-hidden !bg-accent-content">
                                    <div class="h-full w-0 bg-primary group-disabled:animate-progress" style={{ animationDuration: `${interval}s` }} />
                                </div>
                            </div>
                        </Slider.Dot>
                    </li>))}
                </ul>
            </div>
        </div>
    </>);
}
function Buttons() {
    return (<div class="flex gap-4 w-full justify-between">
        <div class="flex items-center justify-center z-10 ">
            <Slider.PrevButton class="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180">
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                </svg>
            </Slider.PrevButton>
        </div>
        <div class="flex items-center justify-center z-10 ">
            <Slider.NextButton class="flex items-center justify-center ">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current">
                    <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                </svg>
            </Slider.NextButton>
        </div>
    </div>);
}
function Carousel(props: Props) {
    const id = useId();
    const { title, slides, interval, backgroundImage, cta, links } = { ...props };
    return (<div id="detailedCarousel" class="relative mt-16">
        {backgroundImage && <div class="absolute w-full h-full top-0 left-0 -z-50"><Image width={1440} height={1104} src={backgroundImage.src} alt={backgroundImage.alt || "carousel background"} class="h-full w-full object-fill" /></div>}
        <div id={id} class="min-h-min flex items-center flex-col lg:container md:max-w-[1220px] lg:mx-auto pt-16 pb-24 lg:pt-24">

            {title && <AnimateOnShow divClass="max-w-[307px] md:max-w-full text-2xl md:text-5xl text-primary text-center font-semibold leading-snug pb-7 md:pb-12 lg:pb-16">
                {title}
            </AnimateOnShow>}

            <div class="relative w-full md:hidden">
                <div class="absolute top-[28vw] left-0 flex justify-end w-full lg:px-9 ">
                    {props.arrows && <Buttons />}
                </div>
            </div>
            {props.dots && <Dots slides={slides} interval={interval} />}{" "}

            <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-9 pl-[30px] pr-[22px] py-0 md:py-9 md:px-9" rootId={id} interval={interval && interval * 1e3} infinite>
                {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-full">
                    <SliderItem slide={slide} id={`${id}::${index}`} />
                </Slider.Item>))}
            </Slider>
            {cta && <AnimateOnShow animation="animate-fade-up" divClass="flex flex-wrap justify-center gap-7 mt-4">
                {cta.map((item) => {
                    if (item.href == '/talkToSpecialist') return <TalkToSpecialistCta text={item.text} ctaClass={`btn btn-primary ${item.outline ? "btn-outline" : ""} font-bold px-7 hover:scale-110 text-lg`} />
                    return <a
                        key={item?.id}
                        id={item?.id}
                        href={item?.href ?? "#"}
                        target={item?.href.includes("http") ? "_blank" : "_self"}
                        class={`btn btn-primary ${item.outline ? "btn-outline" : ""} font-bold px-7 hover:scale-110 text-lg`}
                    >
                        {item?.text}
                    </a>
                })}
            </AnimateOnShow>}
            {links && <div class="mt-5 text-primary flex flex-wrap justify-center gap-5">
                {links.map(link => (<a class="flex items-center text-lg font-medium" href={link.href || "#"} target={link.href.includes("http") ? "_blank" : "_self"}>
                    {link.textBefore}
                    <span class="underline mr-1">{link.text}</span>
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3465 0.75V8.46875C11.3465 8.62622 11.284 8.77725 11.1726 8.8886C11.0613 8.99994 10.9102 9.0625 10.7528 9.0625C10.5953 9.0625 10.4443 8.99994 10.3329 8.8886C10.2216 8.77725 10.159 8.62622 10.159 8.46875V2.18316L1.67285 10.6701C1.56144 10.7815 1.41033 10.8441 1.25277 10.8441C1.09521 10.8441 0.944105 10.7815 0.832693 10.6701C0.721282 10.5587 0.658691 10.4076 0.658691 10.25C0.658691 10.0924 0.721282 9.94133 0.832693 9.82992L9.31961 1.34375H3.03402C2.87655 1.34375 2.72553 1.28119 2.61418 1.16984C2.50283 1.05849 2.44027 0.907472 2.44027 0.75C2.44027 0.592528 2.50283 0.441505 2.61418 0.330155C2.72553 0.218806 2.87655 0.15625 3.03402 0.15625H10.7528C10.9102 0.15625 11.0613 0.218806 11.1726 0.330155C11.284 0.441505 11.3465 0.592528 11.3465 0.75Z" fill="#371E55" />
                    </svg>
                </a>))}
            </div>}
        </div>
    </div>);
}
export default Carousel;
