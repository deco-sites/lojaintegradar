import type { ImageWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";
import { useId } from "../sdk/useId.ts";

const onLoad = (rootId: string,) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const stickyHeight = sticky.offsetHeight;
  const stickyMedia: NodeListOf<HTMLElement> = parent.querySelectorAll('.stickyMedia');

  let progressPercent = 0;

  const handleScroll = () => {
    const parentRect = parent.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const distanceFromParentTop = stickyRect.top - parentRect.top;
    const parentHeight = parentRect.height - stickyRect.height;

    progressPercent = (distanceFromParentTop / parentHeight) * 100;

    const currentImageIndex = Math.floor((distanceFromParentTop + (0.5 * stickyHeight)) / stickyHeight);

    stickyMedia.forEach((media, index) => index == currentImageIndex ? media.style.opacity = '1' : media.style.opacity = '0')
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
  borderRadius?: string;
  mockup?: boolean;
  mockupScale?: string;
}

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
}

export interface Fold {
  icon?: IImage;
  title?: RichText;
  titleTextProps?: TextProps;
  text?: RichText;
  textProps?: TextProps;
  textPosition?: 'Left' | 'Right';
  image?: IImage;
  video?: IVideo;
  use?: 'image' | 'video';
}

export interface Props {
  folds?: Fold[];
  backgroundMedia?: BackgroundMedia;
  foldsHeight?: string;
}

export default function StickyImage({ folds = [], backgroundMedia, foldsHeight }: Props) {
  const rootId = useId();
  return <div id={rootId} class="flex justify-center gap-6 lg:gap-20 px-7 lg:px-7" style={{ background: backgroundMedia?.backgroundColor }}>
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />

    <div class="lg:w-[312px]">
      {folds.map(fold => (
        <div class="h-screen flex flex-col justify-center items-center" style={{ height: foldsHeight }}>
          {fold.textPosition == "Left" && <div>
            <div class="flex flex-col gap-3">
              {fold.icon?.src && <Image src={fold.icon.src} alt={fold.icon.alt || 'icon'} width={fold.icon.width || 60} height={fold.icon.height || 60} />}
              <div dangerouslySetInnerHTML={{ __html: fold.title || "" }} style={{ ...fold.titleTextProps }} class="text-[26px] lg:text-[40px]" />
              <div dangerouslySetInnerHTML={{ __html: fold.text || "" }} style={{ ...fold.textProps }} class="text-[14px] lg:text-base" />
            </div>
          </div>}

          {/*mobile media */}
          {fold.textPosition == "Right" && <div class="lg:hidden">
            {fold.use != 'video' && fold.image?.src && <Image
              src={fold.image.src}
              alt={fold.image.alt || "Sticky image"}
              width={fold.image.width || 179}
              height={fold.image.height || 367}
            />}
            {fold.use == 'video' && fold.video?.src && <div class="relative" style={{ width: fold.video.width + "px" || "336px", height: fold.video.height + "px" || "690px" }}>
              {fold.video.mockup && fold.image?.src && <div class="absolute z-10 flex items-center w-full h-full" style={{ transform: `scale(${fold.video.mockupScale})` }}>
                <Image
                  src={fold.image.src}
                  alt={fold.image.alt || "Sticky image"}
                  width={fold.image.width || 179}
                  height={fold.image.height || 367} />
              </div>}
              <video width={fold.video.width || 336} height={fold.video.height || 336} autoPlay playsInline muted loading="lazy" loop class="absolute"
                style={{ width: fold.video.width + "px" || "336px", height: fold.video.height + "px" || "690px", borderRadius: fold.video.borderRadius }}>
                <source src={fold.video.src} type="video/mp4" />
              </video>
            </div>}
          </div>}
        </div>
      ))}
    </div>

    <div class="hidden lg:block">
      <div class="sticky h-screen top-0 flex items-center" style={{ height: foldsHeight }}>
        <div class="relative h-full flex items-center justify-center" style={{ width: folds[0].image?.width || 336 }}>
          {folds.map((fold, index) => {
            return <>
              {fold.use != 'video' && fold.image?.src &&
                <Image
                  src={fold.image.src}
                  alt={fold.image.alt || "Sticky image"}
                  width={fold.image.width || 336}
                  height={fold.image.height || 690}
                  class={`absolute z-10 transition-opacity duration-500 stickyMedia`}
                  style={{ opacity: index == 0 ? 1 : 0 }}
                />
              }
              {fold.use == 'video' && fold.video?.src && <div class="absolute h-full w-full flex items-center justify-center transition-opacity duration-500 stickyMedia" style={{ opacity: index == 0 ? 1 : 0 }}>

                {fold.video.mockup && fold.image?.src && <div class="absolute z-10 flex items-center w-full h-full" style={{ transform: `scale(${fold.video.mockupScale})` }}>
                  <Image
                    src={fold.image.src}
                    alt={fold.image.alt || "Sticky image"}
                    width={fold.image.width || 336}
                    height={fold.image.height || 690}
                    class={`absolute z-10 `} />
                </div>}
                <video width={fold.video.width || 336} height={fold.video.height || 336} autoPlay playsInline muted loading="lazy" loop
                  class='absolute h-full w-full '
                  style={{ width: fold.video.width + "px" || "336px", height: fold.video.height + "px" || "690px", borderRadius: fold.video.borderRadius }}>
                  <source src={fold.video.src} type="video/mp4" />
                </video>
              </div>
              }
            </>
          })}
        </div>
      </div>
    </div>

    <div class="lg:w-[312px]">
      {folds?.map(fold => (
        <div class="h-screen flex flex-col justify-center" style={{ height: foldsHeight }}>
          {fold.textPosition == "Right" && <div>
            <div class="flex flex-col gap-3">
              {fold.icon?.src && <Image src={fold.icon.src} alt={fold.icon.alt || 'icon'} width={fold.icon.width || 60} height={fold.icon.height || 60} />}
              <div dangerouslySetInnerHTML={{ __html: fold.title || "" }} style={{ ...fold.titleTextProps }} class="text-[26px] lg:text-[40px]" />
              <div dangerouslySetInnerHTML={{ __html: fold.text || "" }} style={{ ...fold.textProps }} class="text-[14px] lg:text-base" />
            </div>
          </div>}

          {/*mobile media */}
          {fold.textPosition == "Left" && <div class="lg:hidden ">
            {fold.use != 'video' && fold.image?.src && <Image
              src={fold.image.src}
              alt={fold.image.alt || "Sticky image"}
              width={fold.image.width || 179}
              height={fold.image.height || 367}
            />}
            {fold.use == 'video' && fold.video?.src && <div class="relative" style={{ width: fold.video.width + "px" || "336px", height: fold.video.height + "px" || "690px" }}>
              {fold.video.mockup && fold.image?.src && <div class="absolute z-10 flex items-center w-full h-full" style={{ transform: `scale(${fold.video.mockupScale})` }}>
                <Image
                  src={fold.image.src}
                  alt={fold.image.alt || "Sticky image"}
                  width={fold.image.width || 179}
                  height={fold.image.height || 367} />
              </div>}
              <video width={fold.video.width || 336} height={fold.video.height || 336} autoPlay playsInline muted loading="lazy" loop class="absolute"
                style={{ width: fold.video.width + "px" || "336px", height: fold.video.height + "px" || "690px", borderRadius: fold.video.borderRadius }}>
                <source src={fold.video.src} type="video/mp4" />
              </video>
            </div>}

          </div>}
        </div>
      ))}
    </div>
  </div>
}