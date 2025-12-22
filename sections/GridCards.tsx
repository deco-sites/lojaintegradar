import type { ImageWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";

import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useId } from "../sdk/useId.ts";

export interface TextProps {
  fontFamily?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
  position?: 'left' | 'center' | 'right';
}

export interface Tag {
  text?: RichText;
  /** @format color-input */
  backgroundColor?: string;
  textProps?: TextProps;
}

export interface Title {
  text?: RichText;
  /** @format color-input */
  color?: string;
  font?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  fontWeight?: string;
}

export interface Card {
  image?: IImage;
  title?: RichText;
  titleTextProps?: TextProps;
  text?: RichText;
  textProps?: TextProps;
}

export interface BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Props {
  hideSection?: boolean;
  tag?: Tag;
  title?: Title;
  cards?: Card[];
  cardsWidth?: string;
  cardsGap?: string;
  cardsContainerWidth?: string;
  /** @format color-input */
  cardsBackgroundColor?: string;
  /** @format color-input */
  cardsHoverBackgroundColor?: string;
  /** @format color-input */
  cardsIconBackgroundColor?: string;
  /** @format color-input */
  cardsHoverIconBackgroundColor?: string;
  backgroundMedia?: BackgroundMedia
  paddingTop?: string;
  paddingBottom?: string;
}

export default function GridCards({ hideSection, tag, title, cards = [], cardsContainerWidth, cardsGap, cardsWidth, paddingBottom, paddingTop, cardsBackgroundColor, backgroundMedia, cardsHoverBackgroundColor, cardsHoverIconBackgroundColor, cardsIconBackgroundColor }: Props) {
  if (hideSection) return <></>
  const position = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }

  const cardsClass = `GridCards-${useId()}`;

  return <div style={{ background: backgroundMedia?.backgroundColor }} class="relative">
    <div class="max-w-[1282px] mx-auto pt-16 lg:pt-28 relative z-10" style={{width: cardsContainerWidth, paddingBottom, paddingTop }}>

      <AnimateOnShow animation="animate-fade-up50">
        {tag?.text && <div
          class="rounded-[20px] mb-5 w-fit mx-auto font-normal px-4 py-1 text-sm lg:text-lg"
          style={{ background: tag.backgroundColor, ...tag.textProps }}
          dangerouslySetInnerHTML={{ __html: tag.text }} />
        }

        {title?.text && <div
          class="font-medium w-full mb-12 lg:mb-[120px] text-[32px] lg:text-[56px] lg:leading-[1.2]"
          style={{ fontFamily: title.font, fontSize: title.fontSize, letterSpacing: title.letterSpacing, color: title.color, lineHeight: title.lineHeight, fontWeight: title.fontWeight }}
          dangerouslySetInnerHTML={{ __html: title.text }}
        />}
      </AnimateOnShow>


      <div class="w-full flex flex-wrap gap-2 lg:gap-12 gap-y-12 justify-center lg:justify-start" style={{gap: cardsGap}}>
        {cards.map((card, index) => (
          <AnimateOnShow
            divClass={`rounded-[20px] max-w-[43.1vw] lg:min-w-[284px] lg:max-w-[284px] p-5 ${cardsClass} transition-colors`}
            delay={index * 100}
            animation="animate-fade-up"
            style={{minWidth: cardsWidth, width: cardsWidth}}
          >
            {card.image?.src && <div class={`flex mb-[17px] lg:mb-8 ${position[card.image?.position || "left"]}`}>
              <div class="p-2.5 lg:p-5 cardIcon rounded-[10px]">
                <img
                  src={card.image.src}
                  alt={card.image.alt || "card image"}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"    
                  width={card.image.width || 20}
                  height={card.image.height || 20} />
              </div>
            </div>}
            <div class="font-normal lg:font-bold text-sm lg:text-[22px] leading-normal mb-4 w-full" dangerouslySetInnerHTML={{ __html: card.title || "" }} style={{ ...card.titleTextProps }} />
            <div class="font-normal text-xs lg:text-base w-full" dangerouslySetInnerHTML={{ __html: card.text || "" }} style={{ ...card.textProps }} />
          </AnimateOnShow>
        ))}
      </div>

    </div>
    <style dangerouslySetInnerHTML={{
      __html: `
      .${cardsClass} {
        background: ${cardsBackgroundColor}
      }

      .${cardsClass}:hover {
        background: ${cardsHoverBackgroundColor};
      }

      .${cardsClass} .cardIcon {
        background: ${cardsIconBackgroundColor};
      }

      .${cardsClass}:hover .cardIcon {
        background: ${cardsHoverIconBackgroundColor};
      `}} />

      {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <img
      src={backgroundMedia.image.src}
      alt={backgroundMedia.image.alt || "background image"}
      width={backgroundMedia.image.width || 1280}
      height={backgroundMedia.image.height || 720}
      class={`absolute -z-40 top-0 left-0 h-full w-full object-cover`}
      loading="lazy"
      decoding="async"
      fetchPriority="low" 
    />}
    {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
      class={`object-cover absolute -z-40 top-0 left-0 h-full w-full`}>
      <source src={backgroundMedia.video} type="video/mp4" />
    </video>}
  </div>
}