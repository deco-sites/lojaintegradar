import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import extend from "apps/vtex/loaders/product/extend.ts";
import AiChat from "site/components/AiChat.tsx";

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

/** @title {{text}} */
interface Text {
    text?: RichText;
    textProps?: TextProps;
}

export interface AiChatProps {
    suggestedQuestions?: string[];
    aiName?: string;
}

interface floatingImage extends IImage {
    horizontalPosition?: string;
    verticalPosition?: string;
}

interface GoToNextSectionButton {
    href?: string;
    text?: RichText;
    textProps?: TextProps;
    /** @format color-input */
    backgroundColor?: string;
    floatingImage?: floatingImage;
}

export interface Props {
    logos?: IImage[];
    title?: RichText;
    titleTextProps?: TextProps;
    texts?: Text[];
    image?: IImage;
    aiChatProps?: AiChatProps;
    backgroundMedia?: BackgroundMedia;
    lcp?: boolean;
    goToNextSectionButton?: GoToNextSectionButton;
    paddingTop?: string;
    paddingBottom?: string;
}

export default function AI({ title, titleTextProps, texts = [], image, aiChatProps, logos = [], backgroundMedia, goToNextSectionButton, paddingTop, paddingBottom, lcp }: Props) {
    return <div class="relative pt-16 pb-8 px-5 lg:min-h-[885px] overflow-hidden" style={{ paddingTop, paddingBottom }}>
        <div class="max-w-[1024px] mx-auto flex flex-col items-center lg:items-start">
            {logos.length > 0 && <div class="flex gap-12 flex-wrap items-start mb-9">
                {logos.map(logo => (
                    <Image
                        src={logo.src || ""}
                        width={logo.width || 135}
                        height={logo.height || 41}
                        alt={logo.alt || "logo"}
                    />
                ))}
            </div>}
            <div class="w-full">
                <div dangerouslySetInnerHTML={{ __html: title || "" }} style={{ ...titleTextProps }} class="text-[32px] lg:text-6xl font-bold mb-6 w-full" />
                {texts?.length > 0 && texts?.map(text => (
                    <div dangerouslySetInnerHTML={{ __html: text.text || "" }} style={{ ...text.textProps }} class="font-medium mb-5 text-xs lg:text-base w-full" />
                ))}
            </div>
            {image?.src && <Image 
                src={image.src}
                width={image.width || 276}
                height={image.height || 319}
                alt={image.alt || "image above ai chat"}
                class="mt-2.5"
            />}
            <AiChat {...aiChatProps} />
        </div>
        {goToNextSectionButton?.text && <div class="hidden lg:flex items-end absolute right-32 top-0 h-[calc(100vh+24px)] max-h-[calc(100%+24px)]">
            <a 
                class=" w-24 h-28  backdrop-blur-sm rounded-xl hover:scale-110 transition-transform cursor-pointer animate-bounce-down"
                href={goToNextSectionButton.href}
                style={{background: goToNextSectionButton.backgroundColor, ...goToNextSectionButton.textProps}}>
                <div class="relative py-4 px-1.5 flex flex-col items-center">
                    <div class="text-xs font-bold leading-[140%]" dangerouslySetInnerHTML={{__html: goToNextSectionButton.text}}/>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current" style={{color: goToNextSectionButton.textProps?.color}} width="23" height="22" viewBox="0 0 23 22" >
                        <path d="M18.8615 11.2011C18.9255 11.265 18.9762 11.3408 19.0108 11.4242C19.0454 11.5077 19.0632 11.5972 19.0632 11.6875C19.0632 11.7779 19.0454 11.8673 19.0108 11.9508C18.9762 12.0342 18.9255 12.1101 18.8615 12.1739L11.9865 19.0489C11.9227 19.1128 11.8469 19.1636 11.7634 19.1982C11.6799 19.2327 11.5905 19.2506 11.5001 19.2506C11.4098 19.2506 11.3203 19.2327 11.2369 19.1982C11.1534 19.1636 11.0776 19.1128 11.0137 19.0489L4.13873 12.1739C4.00973 12.0449 3.93726 11.87 3.93726 11.6875C3.93726 11.5051 4.00973 11.3301 4.13873 11.2011C4.26773 11.0721 4.4427 10.9996 4.62514 10.9996C4.80758 10.9996 4.98254 11.0721 5.11154 11.2011L11.5001 17.5906L17.8887 11.2011C17.9526 11.1372 18.0284 11.0865 18.1119 11.0519C18.1953 11.0173 18.2848 10.9995 18.3751 10.9995C18.4655 10.9995 18.5549 11.0173 18.6384 11.0519C18.7219 11.0865 18.7977 11.1372 18.8615 11.2011ZM11.0137 12.1739C11.0776 12.2378 11.1534 12.2886 11.2369 12.3232C11.3203 12.3577 11.4098 12.3756 11.5001 12.3756C11.5905 12.3756 11.6799 12.3577 11.7634 12.3232C11.8469 12.2886 11.9227 12.2378 11.9865 12.1739L18.8615 5.29892C18.9905 5.16992 19.063 4.99495 19.063 4.81252C19.063 4.63008 18.9905 4.45511 18.8615 4.32611C18.7325 4.19711 18.5576 4.12463 18.3751 4.12463C18.1927 4.12463 18.0177 4.19711 17.8887 4.32611L11.5001 10.7156L5.11154 4.32611C4.98254 4.19711 4.80758 4.12463 4.62514 4.12463C4.4427 4.12463 4.26773 4.19711 4.13873 4.32611C4.00973 4.45511 3.93726 4.63008 3.93726 4.81252C3.93726 4.99495 4.00973 5.16992 4.13873 5.29892L11.0137 12.1739Z" />
                    </svg>
                    {goToNextSectionButton.floatingImage?.src && <Image 
                        src={goToNextSectionButton.floatingImage.src}
                        width={goToNextSectionButton.floatingImage.width || 52}
                        height={goToNextSectionButton.floatingImage.height || 56}
                        alt={goToNextSectionButton.floatingImage.alt || "floating image around the go to the next section button"}
                        class="absolute z-10"
                        style={{top: goToNextSectionButton.floatingImage.verticalPosition, left: goToNextSectionButton.floatingImage.horizontalPosition}}
                    />}
                </div>
            </a>
        </div>}
        {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
            src={backgroundMedia.image.src}
            alt={backgroundMedia.image.alt || "background image"}
            width={backgroundMedia.image.width || 1277}
            height={backgroundMedia.image.height || 630}
            class={`absolute -z-40 top-0 left-0 h-full w-full object-cover object-top`}
            loading={lcp ? "eager" : "lazy"}
        />}
        {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading={lcp ? "eager" : "lazy"} loop
            class={`object-cover absolute -z-40 top-0 left-0 h-full w-full`}>
            <source src={backgroundMedia.video} type="video/mp4" />
        </video>}
    </div>
}