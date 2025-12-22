import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";

import { useScript } from "@deco/deco/hooks";
import CTA, { Props as CTAProps } from "site/components/ui/CTA.tsx";

const onClick = () => {
  const currentTarget = event!.currentTarget as HTMLElement;
  const parent = (currentTarget.parentElement as HTMLElement).parentElement as HTMLElement;
  parent.classList.add("hidden");
};

export interface TextProps {
  /** @format color-input */
  color?: string;
  fontFamily?: string;
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
}

export interface Props {
  hideSection?: boolean;
  /** @format color-input */
  backgroundColor?: string;
  logo?: IImage;
  text?: RichText;
  textProps?: TextProps;
  cta?: CTAProps[];
  leftBackgroundImage?: IImage;
  rightBackgroundImage?: IImage;
  height?: string;
  /** @format color-input */
  xButtonColor?: string;
  hideXButton?: boolean;
  centerContent?: boolean;
}

export default function FixedBottom({ hideSection, backgroundColor, logo, text, textProps, height, leftBackgroundImage, rightBackgroundImage, cta = [], xButtonColor, hideXButton, centerContent }: Props) {
  if (hideSection) return <></>;
  const zIndex = 30;
  return <div
    class="fixed bottom-0 left-0 w-full"
    style={{ background: backgroundColor, zIndex }}>
    <div class="relative">
      {!hideXButton && <button class="absolute top-2 right-2 p-2 z-40" hx-on:click={useScript(onClick)} style={{color: xButtonColor}}>
        X
      </button>}
      <div class={`px-[46px] py-[18px] lg:py-[35px] lg:px-16 flex flex-wrap lg:flex-nowrap gap-16 gap-y-5 items-center ${centerContent ? 'justify-center' : 'justify-between'} relative peer-checked:hidden`} style={{ zIndex: zIndex + 2, height }}>
        <div class="flex gap-5 justify-between">
          {logo?.src && <img src={logo.src} loading="lazy" decoding="async" fetchPriority="low" width={logo.width || 271} height={logo.height || 50} alt={logo.alt || 'Logo'} />}

          <div width="100%" dangerouslySetInnerHTML={{ __html: text || "" }} style={{ ...textProps }} class="text-[22px] font-medium lg:hidden" />
        </div>

        <div width="100%" dangerouslySetInnerHTML={{ __html: text || "" }} style={{ ...textProps }} class="text-[22px] font-medium hidden lg:block" />

        <div class={`flex flex-wrap lg:flex-nowrap gap-4 flex-grow lg:flex-grow-0 ${centerContent && 'justify-center'}`} style="min-height: 42px;">
          {cta.map(cta => (
            <CTA {...cta} />
          ))}
        </div>

      </div>
      {rightBackgroundImage?.src && <img
        src={rightBackgroundImage.src}
        width={rightBackgroundImage.width || 442}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        height={rightBackgroundImage.height || 120}
        alt={rightBackgroundImage.alt || "background image"}
        class="absolute right-0 top-0 h-full"
        style={{ zIndex: zIndex + 1 }}
      />}

      {leftBackgroundImage?.src && <img
        src={leftBackgroundImage.src}
        width={leftBackgroundImage.width || 442}
        loading="lazy"
        decoding="async"
        fetchPriority="low"        
        height={leftBackgroundImage.height || 120}
        alt={leftBackgroundImage.alt || "background image"}
        class="absolute left-0 top-0 h-full"
        style={{ zIndex: zIndex + 1 }}
      />}
    </div>
  </div>
}