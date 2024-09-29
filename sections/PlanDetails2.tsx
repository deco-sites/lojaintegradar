import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import Slider from "../components/ui/Slider3.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";

export interface CTA {
    href?: string;
    text?: string;
}

export interface Link {
    textBefore?: string;
    text: string;
    href: string;
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
}

export interface AnnualValues {
    title?: string;
    tag?: string;
    text?: HTMLWidget;
    saving?: string;
}

export interface MontlyValues {
    title?: string;
    text?: HTMLWidget;
}

/** @title {{title}} */
export interface Slide {
    title: string;
    bulletPoints?: BulletPoints;
}

export interface Props {
    backgroundImage?: IImage;
    contentVideo?: VideoWidget;
    contentImage?: IImage;
    useContent?: 'video' | 'image';
    planTag?: PlanTag;
    imageText?: HTMLWidget;
    title: string;
    caption?: string;
    slides?: Slide[];
    showArrows?: boolean;
    annualValues?: AnnualValues;
    montlyValues?: MontlyValues;
    cta?: CTA;
    link?: Link;
    /** 
     * @format color-input 
     * @description background color in case there is no image
    */
    color1?: string;
    /** @format color-input */
    color2?: string;
    /** @format color-input */
    color3?: string;
    /** @format color-input */
    color4?: string;
    /** @format color-input */
    color5?: string;
    /** @format color-input */
    color6?: string;
    /** @format color-input */
    color7?: string;
    /** @format color-input */
    color8?: string;
}

function SliderItem(
    { slide, id, backgroundColor, textColor }: { slide: Slide; id: string, backgroundColor?: string, textColor?: string },
) {
    const {
        title, bulletPoints = { items: [] }
    } = slide;

    return (
        <div
            id={id}
            class="relative w-full px-6 py-7 text-primary"
        >
            <div class="bg-primary-content text-primary min-h-[215px] rounded-3xl py-5 px-8 h-full shadow-tinyspread" style={{ backgroundColor, color: textColor }}>
                <h3 class="text-xl font-semibold">{title}</h3>
                <div class="mt-2.5 text-sm font-normal flex flex-col gap-2.5">
                    {bulletPoints.items && bulletPoints.items.length > 0 && bulletPoints.items.map((item) => (
                        <div class="flex gap-2 items-center">
                            {bulletPoints.bulletPointsIcon?.src && <Image
                                width={bulletPoints.bulletPointsIcon.width || 12}
                                height={bulletPoints.bulletPointsIcon.height || 12}
                                src={bulletPoints.bulletPointsIcon.src}
                                alt={bulletPoints.bulletPointsIcon.alt || "bulletpoint icon"}
                            />}
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Dots({ slides, interval = 0 }: { slides: Slide[], interval: number }) {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
                }}
            />
            <ul class="carousel col-span-full gap-3 z-10">
                {slides?.map((_, index) => (
                    <li class="carousel-item">
                        <Slider.Dot index={index}>
                            <div class="py-5">
                                <div
                                    class="w-2 h-2 rounded-full group-disabled:animate-progress dot"
                                    style={{ animationDuration: `${interval}s` }}
                                />
                            </div>
                        </Slider.Dot>
                    </li>
                ))}
            </ul>
        </>
    );
}

function Buttons({ buttonColor }: { buttonColor?: string }) {
    return (
        <div class="flex gap-4 ml-5 lg:ml-0">
            <div class="flex items-center justify-center z-10 ">
                <Slider.PrevButton class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current rotate-180" style={{ color: buttonColor }}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                    </svg>
                </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-10 ">
                <Slider.NextButton class="flex items-center justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current" style={{ color: buttonColor }}>
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
                    </svg>
                </Slider.NextButton>
            </div>
        </div>
    );
}

export default function PlanDetails2({ color1, color2, color3, color4, color5, color6, color7, color8, title, useContent, cta, link, backgroundImage, planTag, imageText, contentImage, contentVideo, caption, slides, showArrows, annualValues, montlyValues }: Props) {
    const backgroundColor = backgroundImage?.src ? "transparent" : color1;
    const contentBackgroundColor = useContent ? "transparent" : color1;

    const id = useId();
    const carouselId = `${id}carousel`;

    return <div class="relative pt-10 mt-12 lg:mt-0 pb-12 lg:py-[118px] text-primary" style={{ backgroundColor, color: color2 }}>
        {backgroundImage?.src && <Image
            width={backgroundImage.width || 1440}
            height={backgroundImage.height || 950}
            src={backgroundImage.src}
            alt={backgroundImage.alt || "background image"}
            class="object-cover object-top absolute h-full w-full top-0 left-0 -z-50"
        />}
        <div class="max-w-[1244px] mx-auto flex flex-wrap lg:flex-nowrap justify-center gap-[18px] lg:gap-[100px]">
            <AnimateOnShow animation="animate-fade-right" divClass="w-full xl:w-auto px-6 lg:px-0">
                <div class="w-full xl:min-w-[532px] xl:w-[532px] h-[62vw] lg:h-[747px] overflow-hidden rounded-[30px] lg:rounded-[40px] px-5 lg:px-11 py-6 lg:pt-7 lg:pb-10 flex flex-col justify-between relative" style={{ backgroundColor: contentBackgroundColor }}>
                    {useContent == "video" && contentVideo && <video
                        width="532"
                        height="747"
                        autoPlay
                        playsInline
                        muted
                        loading="lazy"
                        loop
                        class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10"
                    >
                        <source src={contentVideo} type="video/mp4" />
                        <object data="" width="532" height="747">
                            <embed width="532" height="747" src={contentVideo} />
                        </object>
                    </video>}
                    {useContent == "image" && contentImage?.src && <Image
                        width={contentImage.width || 532}
                        height={contentImage.height || 747}
                        src={contentImage.src}
                        alt={contentImage.alt || "content background image"}
                        class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10"
                    />}
                    <div>
                        {planTag?.text && <div class="inline-flex gap-2 px-3 lg:px-4 py-1 lg:py-1.5 rounded-[20px] items-center bg-primary-content text-primary text-xs lg:text-sm font-semibold" style={{ backgroundColor: color2, color: color3 }}>
                            {planTag?.icon?.src && <Image
                                width={planTag.icon.width || 18}
                                height={planTag.icon.height || 18}
                                src={planTag.icon.src}
                                alt={planTag.icon.alt || "plan tag icon"}
                                class="h-[18px] w-[18px] object-contain inline-block"
                            />}
                            {planTag?.text && <p class="inline-block">{planTag.text}</p>}
                        </div>}
                    </div>
                    <div class="text-primary text-2xl lg:text-[32px] leading-[120%]" style={{ color: color2 }} dangerouslySetInnerHTML={{ __html: imageText || "" }} />
                </div>
            </AnimateOnShow>
            <div class="max-w-[613px] w-full" style={{ color: color5 }} >
                <AnimateOnShow divClass="text-2xl mt-4 lg:mt-0 lg:text-[56px] font-bold leading-[120%] px-6 lg:px-0" animation="animate-fade-down">{title}</AnimateOnShow>
                {caption && <AnimateOnShow animation="animate-fade-down" delay={200}><p class="font-light text-lg lg:text-2xl text-primary leading-[120%] px-6 lg:px-0 mt-1 lg:mt-0" style={{ color: color5 }} >{caption}</p></AnimateOnShow>}
                <AnimateOnShow animation="animate-fade-up50" divClass="items-start xl:items-end w-full relative" delay={300}>
                    <div
                        id={carouselId}
                        class="min-h-min flex flex-col w-full lg:w-[600px]"
                    >
                        <Slider
                            class="carousel carousel-center w-full col-span-full row-span-full"
                            rootId={carouselId}
                            interval={0 && 0 * 1e3}
                            infinite
                        >
                            {slides?.map((slide, index) => (
                                <Slider.Item
                                    index={index}
                                    class="carousel-item w-[80%] lg:w-1/2"
                                >
                                    <SliderItem
                                        slide={slide}
                                        id={`${carouselId}::${index}`}
                                        backgroundColor={color2}
                                        textColor={color3}
                                    />
                                </Slider.Item>
                            ))}
                        </Slider>

                        <div class="flex pr-[22px]">
                            {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                            {showArrows && <Buttons buttonColor={color5} />}
                        </div>
                    </div>
                </AnimateOnShow>
                <AnimateOnShow divClass="flex flex-wrap mt-7 gap-5" animation="animate-fade-up" delay={300}>
                    {annualValues?.title && <div class="max-w-40 ml-5 lg:ml-0">
                        <h3 class="text-2xl font-semibold flex flex-wrap items-center">
                            {annualValues.title}
                            {annualValues.tag && <span class="text-primary text-xs py-1 px-4 ml-1.5 bg-info rounded-[20px]" style={{ backgroundColor: color4 }}>{annualValues.tag}</span>}
                        </h3>
                        {annualValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: annualValues.text }} />}
                        {annualValues.saving && <p class="mt-3" style={{ color: color6 }}>{annualValues.saving}</p>}
                    </div>}
                    {montlyValues?.title && <div>
                        <h3 class="text-2xl font-semibold">{montlyValues.title}</h3>
                        {montlyValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: montlyValues.text }} />}
                    </div>}
                </AnimateOnShow>
                <AnimateOnShow divClass="mt-7 flex flex-wrap lg:flex-nowrap items-start lg:items-center gap-5 px-6 lg:px-0" animation="animate-fade-up" delay={400}>
                    {cta?.text && <a
                        href={cta?.href ?? "#"}
                        target={cta?.href?.includes("http") ? "_blank" : "_self"}
                        class={`btn font-bold px-7 hover:scale-110 text-lg`}
                        style={{ backgroundColor: color7, color: color8, borderColor: color7 }}
                    >
                        {cta.text}
                    </a>}
                    {link?.text && <a
                        href={link.href ?? "#"}
                        target={link.href.includes("http") ? "_blank" : "_self"}
                        class={`text-primary-content font-bold hover:scale-110 text-lg transition-transform min-w-[270px]`}
                        style={{ color: color7 }}
                    >
                        {link.textBefore}
                        <span class="underline" >{link.text}</span>
                        <svg width="19" height="20" viewBox="0 0 19 20" class="fill-current inline" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8441 5.71091V13.4297C14.8441 13.5871 14.7815 13.7382 14.6702 13.8495C14.5588 13.9609 14.4078 14.0234 14.2503 14.0234C14.0929 14.0234 13.9418 13.9609 13.8305 13.8495C13.7191 13.7382 13.6566 13.5871 13.6566 13.4297V7.14407L5.17041 15.631C5.059 15.7424 4.90789 15.805 4.75033 15.805C4.59277 15.805 4.44166 15.7424 4.33025 15.631C4.21884 15.5196 4.15625 15.3685 4.15625 15.2109C4.15625 15.0533 4.21884 14.9022 4.33025 14.7908L12.8172 6.30466H6.53158C6.37411 6.30466 6.22309 6.2421 6.11174 6.13075C6.00039 6.0194 5.93783 5.86838 5.93783 5.71091C5.93783 5.55343 6.00039 5.40241 6.11174 5.29106C6.22309 5.17971 6.37411 5.11716 6.53158 5.11716H14.2503C14.4078 5.11716 14.5588 5.17971 14.6702 5.29106C14.7815 5.40241 14.8441 5.55343 14.8441 5.71091Z" />
                        </svg>
                    </a>}
                </AnimateOnShow>
            </div>
        </div>
    </div>
}