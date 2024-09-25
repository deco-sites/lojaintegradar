import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useScript } from "deco/hooks/useScript.ts";

const onLoad = () => {
  document.getElementById('logosTitleAndCaption')?.classList.add("opacity-0");
  document.getElementById('logosSliderContent')?.classList.add("opacity-0");

  document.addEventListener('DOMContentLoaded', () => {
    const fadeUp = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          entry.target.classList.remove("opacity-0");
        }
      });
    });
    fadeUp.observe(document.getElementById('logosTitleAndCaption') as HTMLElement);
    fadeUp.observe(document.getElementById('logosSliderContent') as HTMLElement);
  });
}

/** @title {{altText}} */
export interface Logo {
  src?: ImageWidget;
  /** @description text alternative */
  altText?: string;
}

export interface Props {
  title?: string;
  caption?: string;
  logos?: Logo[];
}

const IMG_PLACEHODLER = Array(30).fill(0).map(() => ({
  src:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/03fbcc78-ca86-4616-a59a-b8aa18331a9c",
  altText: "Logo",
}));

export default function Logos({
  title,
  caption,
  logos = IMG_PLACEHODLER,
}: Props) {

  logos = [...logos, ...logos];

  const slideContent = (
    <div id="logosSliderContent" class="flex items-center gap-7 md:gap-16">
      {logos?.map((logo) => {
        return (
          <div class="w-28 md:w-[156px]">
            <Image
              src={logo.src || ""}
              alt={logo.altText || ""}
              width={300}
              class="h-full w-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
  return (
    <div class="lg:container md:max-w-[1260px] lg:mx-auto px-7 md:px-0 pt-14 xl:pt-0">
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
      />
      <div class="flex flex-col gap-10">
        <div id="logosTitleAndCaption">
          <p class="text-lg md:text-[32px] text-primary font-semibold ">{title}</p>
          <p class="text-base md:text-2xl font-light mt-4">{caption}</p>
        </div>
        <div class="relative w-full overflow-hidden h-20">
          <div class="animate-sliding absolute top-0 left-0 flex flex-nowrap h-full">
            {slideContent}
          </div>
        </div>
      </div>
    </div>
  );
}
