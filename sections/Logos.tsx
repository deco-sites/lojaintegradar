import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx"

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
  titleFont?: string;
  /** @format color-input */
  titleColor?: string;
  caption?: RichText;
  /** @format color-input */
  captionColor?: string;
  logos?: Logo[];
  paddingTop?: string;
  paddingBottom?: string;
}
const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));
export default function Logos({ hideSection, title, caption, logos = IMG_PLACEHODLER, titleFont, titleColor, captionColor, paddingBottom, paddingTop }: Props) {
  if (hideSection) return <></>
  logos = [...logos, ...logos];
  const slideContent = (<div id="logosSliderContent" class="flex items-center gap-7 md:gap-16">
    {logos?.map((logo) => {
      return (<AnimateOnShow animation="animate-fade-up" divClass="w-28 md:w-[156px]">
        <Image src={logo.src || ""} alt={logo.altText || ""} width={logo.width || 300} height={logo.height || 100} class="h-full w-full object-contain" />
      </AnimateOnShow>);
    })}
  </div>);
  return (<div class="lg:container md:max-w-[1260px] lg:mx-auto px-7 md:px-0" style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}>
    <div class="flex flex-col gap-10">
      <div id="logosTitleAndCaption">
        <AnimateOnShow animation="animate-fade-up">
          {title && <div class="text-lg md:text-[32px] text-primary font-normal " dangerouslySetInnerHTML={{ __html: title }} style={{ fontFamily: titleFont, color: titleColor }} />}
        </AnimateOnShow>
        <AnimateOnShow animation="animate-fade-up" delay={200}>
          <div class="text-base md:text-2xl font-light mt-4" style={{ color: captionColor }} dangerouslySetInnerHTML={{ __html: caption || "" }} />
        </AnimateOnShow>
      </div>
      <div class="relative w-full overflow-hidden h-20">
        <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-full">
          {slideContent}
        </div>
      </div>
    </div>
  </div>);
}
