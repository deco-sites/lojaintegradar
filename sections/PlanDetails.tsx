import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "site/sdk/useId.ts";
import Slider from "../components/ui/Slider3.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";
const onLoad = (rootId: string, words: string[], wordDelay: number, letterDelay: number) => {
    const typingSpan = document.getElementById(rootId + 'typingSpan') as HTMLElement | null;
    if (typingSpan) {
        typingSpan.textContent = "";
        typeLetter(typingSpan, words, 0, 0);
    }
    function typeLetter(element: HTMLElement, words: string[], letter: number, word: number) {
        setTimeout(() => {
            const currentWord = words[word];
            element.textContent += currentWord[letter];
            if (letter < currentWord.length - 1)
                typeLetter(element, words, letter + 1, word);
            else {
                setTimeout(() => {
                    eraseLetter(element, words, letter, word);
                }, wordDelay);
            }
        }, letterDelay);
    }
    function eraseLetter(element: HTMLElement, words: string[], letter: number, word: number) {
        setTimeout(() => {
            const currentWord = words[word];
            element.textContent = currentWord.slice(0, letter);
            if (letter > 0)
                eraseLetter(element, words, letter - 1, word);
            else if (word < words.length - 1)
                typeLetter(element, words, 0, word + 1);
            else
                typeLetter(element, words, 0, 0);
        }, letterDelay);
    }
};
export interface CTA {
    href: string;
    text: string;
    outline?: boolean;
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
    cta?: CTA;
    link?: Link;
}
/** @title {{title}} */
export interface Slide {
    title: string;
    bulletPoints?: BulletPoints;
}
export interface Props {
    backgroundVideo?: VideoWidget;
    backgroundImage?: IImage;
    useBackground?: 'video' | 'image';
    planTag?: PlanTag;
    title: string;
    titleTyping?: string[];
    /** @description Time in milisseconds that takes to type and erase a letter */
    letterDelay?: number;
    /** @description Time in milisseconds that a word should stay on screen */
    wordDelay?: number;
    slidesTitle?: string;
    slidesTitleIcon?: IImage;
    slides?: Slide[];
    showArrows?: boolean;
    annualValues?: AnnualValues;
    montlyValues?: MontlyValues;
    bottomBackground?: IImage;
    /** @format color-input */
    color3?: string;
}
function SliderItem({ slide, id }: {
    slide: Slide;
    id: string;
}) {
    const { title, bulletPoints = { items: [] } } = slide;
    return (<div id={id} class="relative w-full px-5 lg:pr-10 lg:pl-0 text-primary">
            <div class="bg-primary-content text-primary min-h-[215px] rounded-3xl py-5 px-8 h-full">
                <h3 class="text-xl font-semibold">{title}</h3>
                <div class="mt-2.5 text-sm font-normal flex flex-col gap-2.5">
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
function Buttons() {
    return (<div class="flex gap-4 ml-5 lg:ml-0">
            <div class="flex items-center justify-center z-10 ">
                <Slider.PrevButton class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current rotate-180">
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.PrevButton>
            </div>
            <div class="flex items-center justify-center z-10 ">
                <Slider.NextButton class="flex items-center justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" class="text-primary-content fill-current">
                        <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
                    </svg>
                </Slider.NextButton>
            </div>
        </div>);
}
export default function PlanDetails({ title, titleTyping = [], color3, letterDelay, wordDelay, backgroundVideo, backgroundImage, useBackground, planTag, slidesTitle, slidesTitleIcon, slides, showArrows = true, annualValues, montlyValues, bottomBackground }: Props) {
    const id = useId();
    const carouselId = `${id}carousel`;
    return (<div class={`overflow-hidden ${!useBackground && 'bg-primary'} leading-[120%] text-primary-content`}>
            <div class="relative flex justify-center items-center w-full h-[86vw] lg:h-[43vw]">
                {planTag?.text && <div class="absolute w-full top-0 left-0">
                    <div class="w-full max-w-[1200px] mx-auto mt-">
                        <AnimateOnShow divClass="py-2 px-4 ml-7 mt-20 lg:mt-24 bg-primary rounded-[20px] inline-flex gap-2.5" animation="animate-pop-up">
                            {planTag.icon?.src && <Image width={planTag.icon.width || 20} height={planTag.icon.height || 20} src={planTag.icon.src} alt={planTag.icon.alt || "plan tag icon"}/>}
                            {planTag.text}
                        </AnimateOnShow>
                    </div>
                </div>}
                {useBackground == 'video' && backgroundVideo && <video width="730" height="553" autoPlay playsInline muted loading="lazy" loop class="object-cover object-top w-full h-full absolute top-0 left-0 -z-10">
                    <source src={backgroundVideo} type="video/mp4"/>
                    <object data="" width="1440" height="618">
                        <embed width="1440" height="618" src={backgroundVideo}/>
                    </object>
                </video>}
                {useBackground == "image" && backgroundImage?.src && <Image width={backgroundImage.width || 1440} height={backgroundImage.height || 618} src={backgroundImage.src} alt={backgroundImage.alt || "background image"} class="object-cover object-top w-full absolute top-0 left-0 -z-10"/>}
                <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, titleTyping, wordDelay || 3000, letterDelay || 100) }}/>
                <AnimateOnShow animation="animate-fade-down" divClass="text-2xl lg:text-5xl px-7 lg:px-0 text-center font-semibold max-w-[870px] leading-[120%]">
                    {title}
                    {titleTyping.length > 0 && <span id={id + 'typingSpan'} style={{ color: color3 }}>
                        {titleTyping[0]}
                    </span>}
                    {titleTyping.length > 0 && <span class="animate-blink" style={{ color: color3 }}>|</span>}
                </AnimateOnShow>
            </div>
            <div class="h-[-20px] lg:h-[130px] mt-[-20px] lg:mt-[-130px]"/>
            <div class={`${!bottomBackground?.src && 'bg-primary'} min-h-[340px] relative`}>
                {bottomBackground?.src && <Image width={bottomBackground.width || 1440} height={bottomBackground.height || 340} src={bottomBackground.src} alt={bottomBackground.alt || "bottom background image"} class="absolute w-full h-full object-cover object-right -z-20"/>}
                <div class="max-w-[1200px] s1800:max-w-[1365px] mx-auto pb-[72px]">
                    <AnimateOnShow animation="animate-fade-up50" divClass="flex flex-wrap xl:flex-nowrap items-start xl:items-end relative" delay={300}>
                        <div id={carouselId} class="min-h-min flex flex-col w-full lg:w-[600px] mt-[-20px] lg:mt-[-130px]">
                            <div class="mb-6 hidden lg:flex gap-7">
                                {slidesTitleIcon && slidesTitleIcon.src && <Image width={slidesTitleIcon.width || 36} height={slidesTitleIcon.height || 24} src={slidesTitleIcon.src} alt={slidesTitleIcon.alt || "slides title icon"} class="object-contain"/>}
                                {slidesTitle && <h2 class="text-lg font-semibold">{slidesTitle}</h2>}
                            </div>
                            <Slider class="carousel carousel-center w-full col-span-full row-span-full" rootId={carouselId} interval={0 && 0 * 1e3} infinite>
                                {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item w-[80%] lg:w-1/2">
                                        <SliderItem slide={slide} id={`${carouselId}::${index}`}/>
                                    </Slider.Item>))}
                            </Slider>

                            <div class="flex pr-[22px] mt-6">
                                {/* {props.dots && <Dots slides={slides} interval={interval} />}{" "} */}
                                {showArrows && <Buttons />}
                            </div>
                        </div>
                        {annualValues?.title && <div class="max-w-40 pb-[70px] mt-6 lg:mt-0 ml-5 lg:ml-0">
                            <h3 class="text-2xl font-semibold flex flex-wrap items-center">
                                {annualValues.title}
                                {annualValues.tag && <span class="text-primary text-xs py-1 px-4 ml-1.5 bg-info rounded-[20px]">{annualValues.tag}</span>}
                            </h3>
                            {annualValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: annualValues.text }}/>}
                            {annualValues.saving && <p class="mt-3" style={{ color: color3 }}>{annualValues.saving}</p>}
                        </div>}
                        {montlyValues?.title && <div class="ml-5 pb-[70px] mt-6">
                            <h3 class="text-2xl font-semibold">{montlyValues.title}</h3>
                            {montlyValues.text && <div class="mt-3" dangerouslySetInnerHTML={{ __html: montlyValues.text }}/>}
                            <div class="mt-3 hidden xl:flex flex-wrap lg:flex-nowrap items-start lg:items-center gap-5">
                                {montlyValues.cta?.text && <a href={montlyValues.cta?.href ?? "#"} target={montlyValues.cta?.href.includes("http") ? "_blank" : "_self"} class={`btn  ${montlyValues.cta.outline ? "bg-primary text-primary-content" : "bg-primary-content text-primary"} font-bold px-7 hover:scale-110 text-lg`}>
                                    {montlyValues?.cta.text}
                                </a>}
                                {montlyValues.link?.text && <a href={montlyValues?.link.href ?? "#"} target={montlyValues?.link.href.includes("http") ? "_blank" : "_self"} class={`text-primary-content font-bold hover:scale-110 text-lg transition-transform min-w-[270px]`}>
                                    {montlyValues?.link.textBefore}
                                    <span class="underline">{montlyValues.link.text}</span>
                                    <svg width="19" height="20" viewBox="0 0 19 20" class="fill-current inline" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.8441 5.71091V13.4297C14.8441 13.5871 14.7815 13.7382 14.6702 13.8495C14.5588 13.9609 14.4078 14.0234 14.2503 14.0234C14.0929 14.0234 13.9418 13.9609 13.8305 13.8495C13.7191 13.7382 13.6566 13.5871 13.6566 13.4297V7.14407L5.17041 15.631C5.059 15.7424 4.90789 15.805 4.75033 15.805C4.59277 15.805 4.44166 15.7424 4.33025 15.631C4.21884 15.5196 4.15625 15.3685 4.15625 15.2109C4.15625 15.0533 4.21884 14.9022 4.33025 14.7908L12.8172 6.30466H6.53158C6.37411 6.30466 6.22309 6.2421 6.11174 6.13075C6.00039 6.0194 5.93783 5.86838 5.93783 5.71091C5.93783 5.55343 6.00039 5.40241 6.11174 5.29106C6.22309 5.17971 6.37411 5.11716 6.53158 5.11716H14.2503C14.4078 5.11716 14.5588 5.17971 14.6702 5.29106C14.7815 5.40241 14.8441 5.55343 14.8441 5.71091Z"/>
                                    </svg>
                                </a>}
                            </div>
                        </div>}
                        {montlyValues?.title && <div class="mt-3 px-5 flex xl:hidden flex-wrap lg:flex-nowrap items-start lg:items-center gap-5">
                            {montlyValues.cta?.text && <a href={montlyValues.cta?.href ?? "#"} target={montlyValues.cta?.href.includes("http") ? "_blank" : "_self"} class={`btn  ${montlyValues.cta.outline ? "bg-primary text-primary-content" : "bg-primary-content text-primary"} font-bold px-7 hover:scale-110 text-lg`}>
                                {montlyValues?.cta.text}
                            </a>}
                            {montlyValues.link?.text && <a href={montlyValues?.link.href ?? "#"} target={montlyValues?.link.href.includes("http") ? "_blank" : "_self"} class={`text-primary-content font-bold hover:scale-110 text-lg transition-transform min-w-[270px]`}>
                                {montlyValues?.link.textBefore}
                                <span class="underline">{montlyValues.link.text}</span>
                                <svg width="19" height="20" viewBox="0 0 19 20" class="fill-current inline" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.8441 5.71091V13.4297C14.8441 13.5871 14.7815 13.7382 14.6702 13.8495C14.5588 13.9609 14.4078 14.0234 14.2503 14.0234C14.0929 14.0234 13.9418 13.9609 13.8305 13.8495C13.7191 13.7382 13.6566 13.5871 13.6566 13.4297V7.14407L5.17041 15.631C5.059 15.7424 4.90789 15.805 4.75033 15.805C4.59277 15.805 4.44166 15.7424 4.33025 15.631C4.21884 15.5196 4.15625 15.3685 4.15625 15.2109C4.15625 15.0533 4.21884 14.9022 4.33025 14.7908L12.8172 6.30466H6.53158C6.37411 6.30466 6.22309 6.2421 6.11174 6.13075C6.00039 6.0194 5.93783 5.86838 5.93783 5.71091C5.93783 5.55343 6.00039 5.40241 6.11174 5.29106C6.22309 5.17971 6.37411 5.11716 6.53158 5.11716H14.2503C14.4078 5.11716 14.5588 5.17971 14.6702 5.29106C14.7815 5.40241 14.8441 5.55343 14.8441 5.71091Z"/>
                                </svg>
                            </a>}
                        </div>}
                    </AnimateOnShow>
                </div>
            </div>
        </div>);
}
