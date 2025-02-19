import { HTMLWidget, ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

/** @title {{title}} */
export interface TimelineItem {
    title?: string;
    /** @format color-input */
    titleColor?: string;
    /** @format color-input */
    titleBackgroundColor?: string;
    /** @format rich-text */
    caption?: string;
    /** @format rich-text */
    text?: string;
}

export interface Props {
    hideSection?: boolean;
    caption?: HTMLWidget;
    title?: HTMLWidget;
    TimelineItems?: TimelineItem[];
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: "image" | "video";
    /** @format color-input */
    firstAndLastItemDotColor?: string;
    /** @format color-input */
    itemsDotColor?: string;
    /** @format color-input */
    dotedLineColor?: string;
}

export default function TimeLine({ hideSection, caption, title, TimelineItems = [], backgroundImage, backgroundVideo, useBackground = "image", firstAndLastItemDotColor, itemsDotColor, dotedLineColor }: Props) {
    if (hideSection) return <></>
    return <div class="relative min-h-[666px] px-7 pt-11 lg:pt-[92px]">
        {useBackground == "image" && backgroundImage?.src && <Image
            src={backgroundImage.src}
            alt={backgroundImage.alt || "background image"}
            width={backgroundImage.width || 1439}
            height={backgroundImage.height || 666}
            class="absolute left-0 top-0 w-full h-full object-cover -z-50"
        />}
        {useBackground == "video" && backgroundVideo && <video
            width="1280"
            height="720"
            autoPlay
            playsInline
            muted
            loading="lazy"
            loop
            class="object-cover w-full h-full absolute top-0 left-0 -z-50"
        >
            <source src={backgroundVideo} type="video/mp4" />
        </video>}
        <AnimateOnShow animation="animate-fade-up">
            {caption && <div class="text-center text-sm lg:text-2xl font-medium lg:font-semibold leading-[120%] mb-4 lg:mb-5" dangerouslySetInnerHTML={{ __html: caption }} />}
            {title && <div class="text-[22px] lg:text-5xl text-center font-bold lg:font-semibold leading-[120%] mb-10 lg:mb-12" dangerouslySetInnerHTML={{ __html: title }} />}
        </AnimateOnShow>
        <div class="max-h-[382px] gap-20 carousel flex flex-col">
            {TimelineItems.map((item, index) => {

                const even = index % 2 == 0;
                return (
                    <div class={`relative flex gap-5 justify-center group even:flex-row-reverse`}>
                        <AnimateOnShow animation={even ? "animate-fade-right" : "animate-fade-left"} divClass="w-[40%] lg:w-[264px] mt-6">
                            {item.caption && <div class="mb-3 text-sm lg:text-[26px] text-primary font-bold leading-normal" dangerouslySetInnerHTML={{ __html: item.caption }} />}
                            {item.text && <div class="text-primary-content text-xs lg:text-sm font-normal leading-normal" dangerouslySetInnerHTML={{ __html: item.text }} />}
                        </AnimateOnShow>

                        {index == 0 || index == TimelineItems.length - 1
                            ? <svg width="31" height="30" class="mt-6 fill-current" style={{ color: firstAndLastItemDotColor || "rgba(55, 30, 85)", stroke: firstAndLastItemDotColor || "rgba(55, 30, 85)" }} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 15.371C5 9.64472 9.72621 5 15.5562 5C21.3862 5 26.1124 9.64472 26.1124 15.371C26.1124 21.0973 21.3862 25.742 15.5562 25.742C9.72621 25.742 5 21.0973 5 15.371Z" fill-opacity="0.7" stroke-opacity="0.2" stroke-width="8.48818" stroke-miterlimit="8" />
                            </svg>
                            : <svg width="31" height="30" class="mt-6 fill-current" style={{ color: itemsDotColor || "#2C92A1", stroke: itemsDotColor || "#2C92A1" }} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 15.371C5 9.64472 9.72621 5 15.5562 5C21.3862 5 26.1124 9.64472 26.1124 15.371C26.1124 21.0973 21.3862 25.742 15.5562 25.742C9.72621 25.742 5 21.0973 5 15.371Z" fill-opacity="0.7" stroke-opacity="0.2" stroke-width="8.48818" stroke-miterlimit="8" />
                            </svg>
                        }

                        <AnimateOnShow animation={even ? "animate-fade-left" : "animate-fade-right"} divClass="w-[40%] lg:w-[264px]">
                            <h3 class="text-xl lg:text-[34px] font-extrabold rounded-xl px-5 lg:px-9 py-1.5 lg:py-3 relative mx-4 mt-5 lg:mt-4" style={{ color: item.titleColor, background: item.titleBackgroundColor || "rgba(255,255,255,0.5)" }}>
                                {item.title}
                                {even && <div class="absolute h-full flex items-center top-0 right-full">
                                    <svg width="17" height="19" viewBox="0 0 17 19" class="fill-current" style={{ color: item.titleBackgroundColor || "rgba(255,255,255,0.5)" }} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.824632 10.5053C0.0136847 10.0371 0.0136834 8.86657 0.82463 8.39836L14.5094 0.497482C15.3203 0.0292809 16.334 0.614532 16.334 1.55093L16.334 17.3527C16.334 18.2891 15.3203 18.8744 14.5094 18.4062L0.824632 10.5053Z" />
                                    </svg>
                                </div>}
                                {!even && <div class="absolute h-full flex items-center top-0 left-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" class="fill-current" style={{ color: item.titleBackgroundColor || "rgba(255,255,255,0.5)" }} viewBox="0 0 17 19">
                                        <path d="M15.8323 8.83116C16.6433 9.29936 16.6433 10.4699 15.8324 10.9381L2.14762 18.8389C1.33667 19.3071 0.322988 18.7219 0.322988 17.7855L0.322988 1.98372C0.322988 1.04732 1.33667 0.462073 2.14762 0.930274L15.8323 8.83116Z" />
                                    </svg>
                                </div>}
                            </h3>
                        </AnimateOnShow>
                        <div class="absolute w-full top-14 left-0 flex justify-center group-last:hidden" style="height: calc(100% + 50px);">
                            <div class="border-l-[2.5px] border-dashed" style={{ borderColor: dotedLineColor || "#00969C" }} />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
}