import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";

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
}

export interface Title {
  text?: RichText
  font?: string;
}

export interface Card {
  image?: IImage;
  title?: RichText;
  text?: RichText;
  /** @format color-input */
  backgroundColor?: string;
}

export interface Props {
  hideSection?: boolean;
  tag?: Tag;
  title?: Title;
  cards?: Card[];
  paddingTop?: string;
  paddingBottom?: string;
}

export default function GridCards({ hideSection, tag, title, cards = [], paddingBottom, paddingTop }: Props) {
  if (hideSection) return <></>
  const position = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }
  return <div style={{ paddingBottom, paddingTop }}>
    <div class="max-w-[1282px] mx-auto pt-28" >

      <AnimateOnShow animation="animate-fade-up50">
        {tag?.text && <div
          class="rounded-[20px] mb-5 w-fit mx-auto font-normal px-4 text-sm lg:text-lg"
          style={{ background: tag.backgroundColor }}
          dangerouslySetInnerHTML={{ __html: tag.text }} />
        }

        {title?.text && <div
          class="font-medium w-full mb-[120px] text-[32px] lg:text-[56px]"
          style={{ fontFamily: title.font }}
          dangerouslySetInnerHTML={{ __html: title.text }}
        />}
      </AnimateOnShow>


      <div class="w-full flex flex-wrap gap-2 lg:gap-12 gap-y-12 justify-center lg:justify-start">
        {cards.map((card, index) => (
          <AnimateOnShow
            divClass="rounded-[20px] max-w-[162px] lg:min-w-[284px] lg:max-w-[284px] p-5"
            style={{ background: card.backgroundColor }}
            delay={index * 100}
            animation="animate-fade-up"
          >
            {card.image?.src && <div class={`flex mb-[17px] lg:mb-8 ${position[card.image?.position || "left"]}`}>
              <Image
                src={card.image.src}
                alt={card.image.alt || ""}
                width={card.image.width || 60}
                height={card.image.height || 60} />
            </div>}
            <div class="font-normal lg:font-bold text-sm lg:text-[22px] leading-normal mb-4 w-full" dangerouslySetInnerHTML={{ __html: card.title || "" }} />
            <div class="font-normal text-xs lg:text-base w-full" dangerouslySetInnerHTML={{ __html: card.text || "" }} />
          </AnimateOnShow>
        ))}
      </div>

    </div>
  </div>
}