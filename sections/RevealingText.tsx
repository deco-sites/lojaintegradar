import { RichText, ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";

const onLoad = (rootId: string, lines: Line[]) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const lineElements: NodeListOf<HTMLElement> = parent.querySelectorAll(".line");

  let progressPercent = 0;
  const eachLinePercentage = 100 / lines.length;

  const handleScroll = () => {
    const parentRect = parent.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const distanceFromParentTop = stickyRect.top - parentRect.top;
    const parentHeight = parentRect.height - stickyRect.height;

    progressPercent = (distanceFromParentTop / parentHeight) * 100;

    lineElements.forEach((line, index) => {
      const disconsideredPercentage = eachLinePercentage * index;
      const currentPorcentage = (progressPercent - disconsideredPercentage) * (lines.length);
      if (lines[index].justReveal) line.style.opacity = (currentPorcentage / 100).toString();
      else line.style.clipPath = `inset(0 ${100 - currentPorcentage}% 0 0)`;
      //else line.style.background = `linear-gradient(to right, ${lines[index].color} ${(currentPorcentage - 10)}%, transparent ${(currentPorcentage)}%)`;
      //if (lines[index].justReveal) line.style.opacity = (distanceFromParentTop - (windowHeight * index)).toString();
      //else line.style.background = `linear-gradient(to right, ${lines[index].color} ${(distanceFromParentTop * speed) - 10 - (index * windowHeight * 0.1)}%, transparent ${(distanceFromParentTop * speed) - (index * windowHeight * 0.1)}%)`
    })
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
}

/** @title {{alt}} */
export interface IImage {
    src?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}

export interface BackgroundMedia {
  /** @format color-input */
  backgroundColor?: string;
}

export interface TextProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
  marginTop?: string;
}

/** @title {{text}} */
export interface Line {
  text?: RichText;
  /** @format color-input */
  color?: string;
  textProps?: TextProps;
  justReveal?: boolean;
}

export interface Props {
  logos?: IImage[];
  lines?: Line[];
  backgroundMedia?: BackgroundMedia
  /** @description deafult is 120 */
  scrollAmount?: number;
}

export default function RevealingText({ lines = [], backgroundMedia, scrollAmount, logos=[] }: Props) {
  const rootId = useId();
  return <div id={rootId} class="relative min-h-[120vh]" style={{ height: `${lines.length * (scrollAmount || 120)}vh` }} >
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId, lines) }}
    />
    <div class="absolute top-0 w-full" style={{ height: `${(lines.length * (scrollAmount || 120)) + 100}vh`, zIndex: -60 }}>
      <div class="h-[100vh] sticky top-0 flex flex-col items-center justify-center" style={{ background: backgroundMedia?.backgroundColor }}>
        {logos.length > 0 && <div class="flex flex-warp justify-center gap-4 mb-9">
          {logos.map(logo => (
            <Image 
              src={logo.src || ""}
              width={logo.width || 220}
              height={logo.height || 74}
              alt={logo.alt || "logo"}
            />
          ))}
        </div>}

        {lines.map(line => (
          <div
            dangerouslySetInnerHTML={{ __html: line.text || "" }}
            class="line leading-none transition-opacity duration-300 pb-1"
            style={{ ...line.textProps, color: line.color}} />
        ))}
      </div>
    </div>
  </div>
}