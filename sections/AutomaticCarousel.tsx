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

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
}

export interface ITitle {
  text?: RichText;
  font?: string;
}

export interface IMedia {
  image?: IImage;
  video?: IVideo;
  use?: "image" | "video";
}

export interface IBackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}

export interface Item {
  title?: ITitle;
  caption?: RichText;
  media?: IMedia;
  /** @format color-input */
  textBackgroundColor?: string;
  /** @default true */
  textBackgroundColorDegrade?: boolean
}

export interface Props {
  title?: ITitle;
  caption?: RichText;
  items?: Item[];
}

export default function AutomaticCarousel({ title, caption, items = [] }: Props) {
  const rootId = useId();
  return <div id={rootId} class="relative min-h-[100vh]" style={{ height: `${items.length * 100}vh` }}>
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />
    <div class="sticky top-0 min-h-[100vh] flex items-end pb-7">
      <div class="automaticCarousel overflow-auto flex items-center gap-24 w-full px-20" style={{ scrollbarWidth: "none" }}>
        <div class="flex flex-col justify-center min-w-[500px] w-[486px]">
          {title?.text && <div class="text-[70px] leading-[110%] font-normal" style={{ fontFamily: title.font }} dangerouslySetInnerHTML={{ __html: title.text }} />}
          {caption && <div class="text-2xl leading-[120%] font-light mt-4" dangerouslySetInnerHTML={{ __html: caption }} />}
        </div>
        {items.map((item) => (
          <div
            class="relative flex items-end rounded-[45px] overflow-hidden"
            style={{
              minWidth: item.media?.use == "image" ? `${item.media?.image?.width || 942}px` : `${item.media?.video?.width || 942}px`,
              width: item.media?.use == "image" ? `${item.media?.image?.width || 942}px` : `${item.media?.video?.width || 942}px`,
              height: item.media?.use == "image" ? `${item.media?.image?.height || 729}px` : `${item.media?.video?.height || 729}px`
            }}
          >
            {item.media?.use == "image" && <Image
              src={item.media.image?.src || ""}
              alt={item.media.image?.alt || "Carousel image"}
              width={item.media?.image?.width || 942}
              height={item.media?.image?.height || 729}
              class="absolute top-0 left-0 h-full w-full -z-50"
            />}
            {item.media?.use == "video" && item.media.video?.src && <video width={item.media.video.width || 942} height={item.media.video.height || 729} autoPlay playsInline muted loading="lazy" loop
              class="object-cover absolute top-0 left-0 h-full w-full -z-50"
              style={{ width: item.media.video.width + "px" || "942px", height: item.media.video.height + "px" || "729px" }}>
              <source src={item.media.video.src} type="video/mp4" />
            </video>}
            <div
              class={`w-full ${item.textBackgroundColorDegrade ? 'pt-[157px]' : 'pt-11'} px-14 pb-11`}
              style={{ background: item.textBackgroundColorDegrade ? `linear-gradient(to bottom, transparent 0%, ${item.textBackgroundColor} 50%)` : item.textBackgroundColor }}
            >
              {item.title?.text && <div class="leading-[120%] text-4xl" dangerouslySetInnerHTML={{ __html: item.title.text }} style={{ fontFamily: item.title.font }} />}
              {item.caption && <div class="text-xl leading-[120%] mt-5" dangerouslySetInnerHTML={{ __html: item.caption }} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
}