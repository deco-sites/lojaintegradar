import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
    fit?: "cover" | "fill";
}

export interface IVideo {
    src?: VideoWidget;
    fit?: "cover" | "fill";
}

export interface Props {
    divisionHeight?: string;
    divisionImage?: IImage;
    divisionVideo?: IVideo;
    useDivision?: "image" | "video";
    /** @format color-input */
    divisionColor?: string;
}

export default function Division({ divisionColor, divisionHeight, divisionImage, divisionVideo, useDivision }: Props) {
    return <div class="h-16" style={{ height: divisionHeight, background: divisionColor }}>
        {useDivision == "image" && divisionImage?.src && <Image
            src={divisionImage.src}
            width={divisionImage.width || 1456}
            height={divisionImage.height || 70}
            alt={divisionImage.alt || "division image"}
            class={`w-full h-full ${divisionImage.fit == "fill" ? "object-fill" : "object-cover"}`}
        />}
        {useDivision == "video" && divisionVideo?.src && <video width="1280" height="720" autoPlay playsInline muted loading="lazy" loop
            class={`w-full h-full ${divisionVideo?.fit == "fill" ? "object-fill" : "object-cover"}`}>
            <source src={divisionVideo.src} type="video/mp4" />
        </video>}
    </div>
}

export function LoadingFallback() {
    return <h2 class="text-center">loading...</h2>
}