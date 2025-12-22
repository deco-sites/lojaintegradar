import type { ImageWidget, HTMLWidget, VideoWidget } from "apps/admin/widgets.ts";

import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface Props {
    hideSection?: boolean;
    title?: string;
    /** @format color-input */
    titleColor?: string;
    quote?: HTMLWidget;
    image?: IImage;
    imageCaption?: HTMLWidget;
    backgroundImage?: IImage;
    backgroundVideo?: VideoWidget;
    useBackground?: "image" | "video";
    sectionHeight?: string;
}

export default function Quote({ hideSection, title, titleColor, quote, image, imageCaption, backgroundImage, backgroundVideo, useBackground, sectionHeight }: Props) {
    if (hideSection) return <></>
    return <div class="relative py-20 px-16 flex flex-col items-center gap-8" style={{ height: sectionHeight || "auto" }}>
        {useBackground == "image" && backgroundImage?.src && <img
            src={backgroundImage.src}
            alt={backgroundImage.alt || "background image"}
            width={backgroundImage.width || 1439}
            height={backgroundImage.height || 569}
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
            {title && <h2 class="text-center text-2xl lg:text-lg font-semibold leading-[120%]" style={{ color: titleColor }}>{title}</h2>}
            {quote && <div class="text-lg lg:text-[40px] text-center font-normal lg:font-medium leading-none lg:leading-[120%] max-w-[858px]" dangerouslySetInnerHTML={{ __html: quote }} />}
        </AnimateOnShow>
        <AnimateOnShow divClass="flex flex-col gap-4 items-center">
            {image?.src && <img src={image.src} alt={image.alt || "quoted person picture"} width={image.width || 56} height={image.height || 56} />}
            {imageCaption && <div class="text-base font-normal leading-normal" dangerouslySetInnerHTML={{ __html: imageCaption }} />}
        </AnimateOnShow>
    </div>
}