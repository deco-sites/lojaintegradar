import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"

export interface TextProps {
  fontFamily?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

/** @title {{altText}} */
export interface Logo {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
  width?: number;
  height?: number;
}
export interface Props {
  hideSection?: boolean;
  title?: RichText;
  titleTextProps?: TextProps;
  caption?: RichText;
  captionTextProps?: TextProps;
  logos?: Logo[];
  blackAndWhiteLogos?: boolean;
  paddingTop?: string;
  paddingBottom?: string;
}
const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));
export default function Logos({ hideSection, title, caption, logos = IMG_PLACEHODLER, titleTextProps, captionTextProps, paddingBottom, paddingTop, blackAndWhiteLogos }: Props) {
  if (hideSection) return <></>
  logos = [...logos, ...logos];
  const slideContent = (<div id="logosSliderContent" class="flex items-center gap-7 md:gap-16">
    {logos?.map((logo) => {
      return (<div class="w-28 md:w-[156px]">
        <Image src={logo.src || ""} alt={logo.altText || "Logo"} width={logo.width || 300} height={logo.height || 100} class={`${blackAndWhiteLogos && 'grayscale opacity-60'} h-full w-full object-contain`} />
      </div>);
    })}
  </div>);
  return (<div class="lg:container md:max-w-[1260px] lg:mx-auto px-4 md:px-0 overflow-hidden" width="398" height="162" style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}>
    <div class="flex flex-col">
      {title && <AnimateOnShow animation="animate-fade-up">
        <div class="text-lg md:text-[32px] text-primary font-normal leading-normal" dangerouslySetInnerHTML={{ __html: title }} style={{ ...titleTextProps }} />
      </AnimateOnShow>}
      {caption && <AnimateOnShow animation="animate-fade-up" delay={200}>
        <div class="text-base md:text-2xl font-light" style={{ ...captionTextProps }} dangerouslySetInnerHTML={{ __html: caption }} />
      </AnimateOnShow>}
      <AnimateOnShow divClass="relative w-full overflow-hidden h-20 mt-10" animation="animate-fade-up">
        <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-full">
          {slideContent}
        </div>
      </AnimateOnShow>
    </div>
  </div>);
}
