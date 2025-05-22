import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
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
  /** @format color-input */
  backgroundColor?: string;
  logo?: IImage;
  text?: RichText;
  textProps?: TextProps;
  cta?: CTAProps[];
  leftBackgroundImage?: IImage;
  rightBackgroundImage?: IImage;
}

export default function FixedBottom({ backgroundColor, logo, text, textProps, leftBackgroundImage, rightBackgroundImage, cta = [] }: Props) {
  const zIndex = 30;
  return <div
    class="fixed bottom-0 left-0 w-full"
    style={{ background: backgroundColor, zIndex }}>
    <div class="relative">
      <button class="absolute top-2 left-2 p-2 z-40" hx-on:click={useScript(onClick)}>
        X
      </button>
      <div class="px-[46px] py-[18px] lg:py-[35px] lg:px-16 flex flex-wrap lg:flex-nowrap gap-16 gap-y-5 items-center justify-between relative peer-checked:hidden" style={{ zIndex: zIndex + 2 }}>
        <div class="flex gap-5 justify-between">
          {logo?.src && <Image src={logo.src} width={logo.width || 271} height={logo.height || 50} alt={logo.alt || 'Logo'} />}

          <div dangerouslySetInnerHTML={{ __html: text || "" }} style={{ ...textProps }} class="text-[22px] font-medium lg:hidden" />
        </div>

        <div dangerouslySetInnerHTML={{ __html: text || "" }} style={{ ...textProps }} class="text-[22px] font-medium hidden lg:block" />

        <div class={`flex flex-wrap lg:flex-nowrap gap-4 flex-grow lg:flex-grow-0`}>
          {cta.map(cta => (
            <CTA {...cta} />
          ))}
        </div>

      </div>
      {rightBackgroundImage?.src && <Image
        src={rightBackgroundImage.src}
        width={rightBackgroundImage.width || 442}
        height={rightBackgroundImage.height || 120}
        alt={rightBackgroundImage.alt || "background image"}
        class="absolute right-0 top-0 h-full"
        style={{ zIndex: zIndex + 1 }}
      />}

      {leftBackgroundImage?.src && <Image
        src={leftBackgroundImage.src}
        width={leftBackgroundImage.width || 442}
        height={leftBackgroundImage.height || 120}
        alt={leftBackgroundImage.alt || "background image"}
        class="absolute left-0 top-0 h-full"
        style={{ zIndex: zIndex + 1 }}
      />}
    </div>
  </div>
}