import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

const onLoad = (rootId: string) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const carousel = parent.querySelector('.automaticCarousel') as HTMLElement;

  let progressPercent = 0;

  const handleScroll = () => {
    const parentRect = parent.getBoundingClientRect();
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

export interface ITitle {
  text?: RichText;
  font?: string;
}

export interface IBackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Item {
  title?: ITitle;
  caption?: RichText;
  media?: IBackgroundMedia;
  /** @format color-input */
  textBackgroundColor?: string;
  /** @default true */
  textBackgroundColorDegrade?: boolean
}

export interface Props {
  /** @format color-input */
  backgroundColor?: string;
  title?: ITitle;
  caption?: RichText;
  items?: Item[];
}

export default function AutomaticCarousel({ backgroundColor, title, caption, items = [] }: Props) {
  const rootId = useId();
  return <div id={rootId} class={`relative min-h-[100vh] ${rootId}-container `}>
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />
    <style dangerouslySetInnerHTML={{
      __html: `
        @media (min-width: 1024px) {
          .${rootId}-container {
            height: ${items.length * 100}vh;
          }
        }
      `}} />
    <div class="sticky top-0 min-h-[100vh] flex items-end pb-7 pt-7 lg:pt-0 w-full lg:w-auto" style={{ background: backgroundColor }}>
      <div class="automaticCarousel overflow-auto flex flex-col lg:flex-row items-center gap-4 lg:gap-24 w-full px-7 lg:px-20" style={{ scrollbarWidth: "none" }}>
        <div class="flex flex-col justify-center lg:min-w-[500px] w-full lg:w-[486px]">
          {title?.text && <div class="text-3xl lg:text-[70px] leading-[110%] font-normal" style={{ fontFamily: title.font }} dangerouslySetInnerHTML={{ __html: title.text }} />}
          {caption && <div class="text-lg lg:text-2xl leading-[120%] font-light mt-4" dangerouslySetInnerHTML={{ __html: caption }} />}
        </div>
        {items.map((item) => (
          <div
            class="relative flex items-end rounded-xl lg:rounded-[45px] overflow-hidden lg:min-w-[97vh] w-full lg:w-[97vh] h-[77vw] lg:h-[75vh]"
          >
            {item.media?.use == "image" && <Image
              src={item.media.image?.src || ""}
              alt={item.media.image?.alt || "Carousel image"}
              width={item.media?.image?.width || 942}
              height={item.media?.image?.height || 729}
              class="absolute top-0 left-0 h-full w-full -z-50 object-cover"
            />}
            {item.media?.use == "video" && item.media.video && <video width={942} height={729} autoPlay playsInline muted loading="lazy" loop
              class="object-cover absolute top-0 left-0 h-full w-full -z-50">
              <source src={item.media.video} type="video/mp4" />
            </video>}
            <div
              class={`w-full p-4 ${item.textBackgroundColorDegrade ? 'pt-[100px] lg:pt-[157px]' : 'lg:pt-11'} lg:px-14 lg:pb-11`}
              style={{ background: item.textBackgroundColorDegrade ? `linear-gradient(to bottom, transparent 0%, ${item.textBackgroundColor} 50%)` : item.textBackgroundColor }}
            >
              {item.title?.text && <div class="leading-[120%] text-lg lg:text-4xl" dangerouslySetInnerHTML={{ __html: item.title.text }} style={{ fontFamily: item.title.font }} />}
              {item.caption && <div class="text-sm lg:text-xl leading-[120%] mt-5" dangerouslySetInnerHTML={{ __html: item.caption }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
}