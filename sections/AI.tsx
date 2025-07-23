import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

/** @title {{alt}} */
export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Props {
    title?: RichText;
    titleTextProps?: TextProps;
    text?: RichText;
    textProps?: TextProps;
    logos?: IImage[];
    backgroundMedia?: BackgroundMedia;
    lcp?: boolean;
    paddingTop?: string;
    paddingBottom?: string;
}

export default function AI({title, titleTextProps, text, textProps, logos = [], backgroundMedia, paddingTop, paddingBottom, lcp}: Props) {
    return <div class="relative pt-16 pb-5" style={{paddingTop, paddingBottom, minHeight: '885px'}}>
        <div class="max-w-[1024px] mx-auto">
            <div class="flex w-full justify-between">
                <div>
                    <div dangerouslySetInnerHTML={{__html: title || ""}} style={{...titleTextProps}} class="text-6xl font-bold mb-6"/>
                    <div dangerouslySetInnerHTML={{__html: text || ""}} style={{...textProps}} class="font-medium"/>
                </div>
                <div class="flex gap-12 flex-wrap items-start">
                    {logos.map(logo => (
                        <Image 
                            src={logo.src || ""}
                            width={logo.width || 135}
                            height={logo.height || 41}
                            alt={logo.alt || "logo"}
                        />
                    ))}
                </div>
            </div>
        </div>
        {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
            src={backgroundMedia.image.src}
            alt={backgroundMedia.image.alt || "background image"}
            width={backgroundMedia.image.width || 1277}
            height={backgroundMedia.image.height || 630}
            class={`absolute -z-40 top-0 left-0 h-full w-full object-cover`}
            loading={lcp ? "eager" : "lazy"}
        />}
        {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading={lcp ? "eager" : "lazy"} loop
            class={`object-cover absolute -z-40 top-0 left-0 h-full w-full`}>
            <source src={backgroundMedia.video} type="video/mp4" />
        </video>}
    </div> 
}