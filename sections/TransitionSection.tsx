import { RichText, ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Image from "site/components/ui/SmartImage.tsx";

const onLoad = (rootId: string) => {
  const section = document.getElementById(rootId) as HTMLElement;
  //const section = parent.querySelector('.sticky') as HTMLElement;

  const handleScroll = () => {
    const windowTop = globalThis.scrollY;
    const windowBottom = windowTop + globalThis.innerHeight;


    const sectionTop = section.offsetTop;
    // Consider full height for exit
    const sectionBottom = sectionTop + section.offsetHeight;

    if (sectionBottom >= windowTop && sectionTop <= windowBottom) {
      // Section is at least partially in view
      const scrollProgress = Math.max(0, Math.min(1, (windowTop - sectionTop) / (sectionBottom - sectionTop)));
      section.style.setProperty('--scroll', scrollProgress.toString());
      console.log(scrollProgress);
    } else {
      // Section is completely out of view
      section.style.removeProperty('--scroll');
    }

  };

  globalThis.addEventListener('scroll', handleScroll);
}

export interface Props {
  /** @format color-input */
  color1?: string;
  /** @format color-input */
  color2?: string;
  title?: string;
}

export default function TransitionSection({ color1, color2, title }: Props) {
  const rootId = useId();
  return <div class="h-[100vh]">
    <div id={rootId} class={`h-[400vh] bg-purple-400 relative ${rootId}-class`} style={{ background: color1 }}>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
      />
      <div class="flex items-center justify-center h-[100vh] bg-blue-400 sticky top-0 animate" style={{ background: color2 }}>
        <h1 class="text-5xl">{title}</h1>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes growingCircle {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(100% at 50% 50%); }
        }

        .${rootId}-class .sticky {
          --delay-multiplier: -2s;
          animation-name: growingCircle;
          animation-timing-function: ease-in-out;
        }

        .animate {
          /* --delay-multiplier: the value of --delay-multiplier cannot not be less than -1, this css variable modifies the speed and when the animation should complete.
          - a value equal to -2 allows for the animation to complete while the section is in view
          - a value less than -1 and greater than -2 allows for the animation to continue running as the user scrolls out of the section.
          - a value less than -2 allows for the animation to complete while the section is in view, but also ramps up the animation speed to completion
          */
          animation-delay: calc(var(--scroll) * var(--delay-multiplier));
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-play-state: paused;
        }
      `}} />
    </div>
  </div>
}