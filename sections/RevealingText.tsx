import { RichText, ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

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
      else line.style.background = `linear-gradient(to right, ${lines[index].color} ${(currentPorcentage - 10)}%, transparent ${(currentPorcentage)}%)`;
      //if (lines[index].justReveal) line.style.opacity = (distanceFromParentTop - (windowHeight * index)).toString();
      //else line.style.background = `linear-gradient(to right, ${lines[index].color} ${(distanceFromParentTop * speed) - 10 - (index * windowHeight * 0.1)}%, transparent ${(distanceFromParentTop * speed) - (index * windowHeight * 0.1)}%)`
    })
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
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
  lines?: Line[];
  backgroundMedia?: BackgroundMedia
  /** @description deafult is 120 */
  scrollAmount?: number;
}

export default function RevealingText({ lines = [], backgroundMedia, scrollAmount }: Props) {
  const rootId = useId();
  return <div id={rootId} class="relative min-h-[120vh]" style={{ height: `${lines.length * (scrollAmount || 120)}vh` }} >
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId, lines) }}
    />
    <div class="absolute top-0 w-full" style={{ height: `${(lines.length * (scrollAmount || 120)) + 100}vh`, zIndex: -60 }}>
      <div class="h-[100vh] sticky top-0 flex flex-col items-center justify-center" style={{ background: backgroundMedia?.backgroundColor }}>
        {lines.map(line => (
          <div
            dangerouslySetInnerHTML={{ __html: line.text || "" }}
            class="!text-transparent !bg-clip-text line leading-none transition-opacity duration-300"
            style={{ ...line.textProps, background: `linear-gradient(to right, ${line.color} 100%, transparent 110%)`, opacity: line.justReveal ? 0 : "" }} />
        ))}
      </div>
    </div>
  </div>
}