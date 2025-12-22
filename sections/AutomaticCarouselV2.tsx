import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "site/components/ui/SmartImage.tsx";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

const onLoad = (rootId: string) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const stickParent = parent.querySelector(".stickParent") as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const carousel = parent.querySelector('.automaticCarousel') as HTMLElement;
  let progressPercent = 0;

  const handleScroll = () => {
    const parentRect = stickParent.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const distanceFromParentTop = stickyRect.top - parentRect.top;
    const parentHeight = parentRect.height - stickyRect.height;

    progressPercent = distanceFromParentTop / parentHeight;

    const scrollAmount = (carousel.scrollWidth - carousel.offsetWidth) * progressPercent;
    carousel.scrollLeft = scrollAmount;
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Title {
  text?: RichText;
  /** @format color-input */
  color?: string;
  font?: string;
  fontWeight?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface Caption extends Title {
  /** @format color-input */
  backgroundColor?: string;
}

export interface IBackgroundMedia {
  image?: IImage;
  videoContent?: VideoWidget;
  use?: "image" | "video";
}

/** @title {{title.text}} */
export interface Item {
  title?: Title;
  caption?: Caption;
  media?: IBackgroundMedia;
  /** @format color-input */
  textBackgroundColor?: string;
  /** @default true */
  textBackgroundColorDegrade?: boolean
}

export interface Props {
  hideSection?: boolean;
  /** @format color-input */
  backgroundColor?: string;
  title?: Title;
  caption?: Title;
  items?: Item[];
  cta?: CTAProps[];
  paddingTop?: string;
  paddingBottom?: string;
}

export default function AutomaticCarousel({ hideSection, backgroundColor, title, caption, items = [], paddingBottom, paddingTop, cta = [] }: Props) {
  if (hideSection) return <></>
  const rootId = useId();
  return <div id={rootId} class={`relative min-h-[100vh] ${rootId}-container `} style={{ paddingTop, paddingBottom }}>
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />
    <style dangerouslySetInnerHTML={{
      __html: `
        @media (min-width: 1024px) {
          .${rootId}-container .stickParent {
            height: ${items.length * 50}vh;
          }
        }
      `}} />
    <div class="flex flex-col justify-center w-full ">

      {title?.text && <div
        class="text-3xl lg:text-[46px] leading-[110%] font-normal"
        style={{ fontFamily: title.font, fontSize: title.fontSize, lineHeight: title.lineHeight, fontWeight: title.fontWeight, letterSpacing: title.letterSpacing, color: title.color }}
        dangerouslySetInnerHTML={{ __html: title.text }} />}

      {caption?.text && <div
        class="text-lg lg:text-[22px] leading-[120%] font-medium mt-5"
        style={{ fontFamily: caption.font, fontSize: caption.fontSize, lineHeight: caption.lineHeight, fontWeight: caption.fontWeight, letterSpacing: caption.letterSpacing, color: caption.color }}
        dangerouslySetInnerHTML={{ __html: caption.text }} />}
    </div>
    <div class="stickParent">
      <div class="sticky top-[5vh] min-h-[100vh] pb-7 pt-7 lg:pt-20 w-full lg:w-auto" style={{ background: backgroundColor }}>
        <div class="automaticCarousel overflow-auto flex flex-col lg:flex-row items-center gap-4 lg:gap-10 w-full px-7 lg:px-20" style={{ scrollbarWidth: "none" }}>

          {items.map((item) => (
            <div
              class="relative p-7 rounded-xl lg:rounded-[30px] overflow-hidden w-full h-[167vw] lg:min-w-[49.45vh] lg:w-[49.45vh] lg:h-[83vh] group"
            >
              {item.media?.use == "image" && <Image
                src={item.media.image?.src || ""}
                alt={item.media.image?.alt || "Carousel image"}
                width={item.media?.image?.width || 942}
                height={item.media?.image?.height || 729}
                class="absolute top-0 left-0 h-full w-full -z-50 object-cover"
              />}
              {item.media?.use == "video" && item.media.videoContent && <video width={942} height={729} autoPlay playsInline muted loading="lazy" loop
                class="object-cover absolute top-0 left-0 h-full w-full -z-50">
                <source src={item.media.videoContent} type="video/mp4" />
              </video>}

              {item.title?.text && <div
                class="leading-[120%] text-lg lg:text-4xl"
                dangerouslySetInnerHTML={{ __html: item.title.text }}
                style={{ fontFamily: item.title?.font, fontSize: item.title?.fontSize, lineHeight: item.title?.lineHeight, fontWeight: item.title?.fontWeight, letterSpacing: item.title?.letterSpacing, color: item.title?.color }} />}

              {item.caption?.text && <div
                class="absolute  w-full left-0 px-7 pb-14 pt-20 bottom-0 lg:bottom-[-100%] group-hover:lg:bottom-0 transition-all duration-300 backdrop-blur-[10px]"
                dangerouslySetInnerHTML={{ __html: item.caption?.text }}
                style={{ fontFamily: item.caption?.font, fontSize: item.caption?.fontSize, lineHeight: item.caption?.lineHeight, fontWeight: item.caption?.fontWeight, letterSpacing: item.caption?.letterSpacing, color: item.caption?.color, background: item.caption?.backgroundColor }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
    {cta.length > 0 && <div class="flex flex-wrap justify-center gap-7">
      {cta.map(cta => (
        <CTA {...cta} />
      ))}
    </div>}
  </div>
}