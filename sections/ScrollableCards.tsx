import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";

const onLoad = (rootId: string) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const cardsContainer = parent.querySelector(".cardsContainer") as HTMLElement;

  let progressPercent = 0;
  const numberOfCards = cardsContainer.children.length;
  const animationTriggersAtEach = 100 / numberOfCards;
  console.log(animationTriggersAtEach);

  const handleScroll = () => {
    const parentRect = parent.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const distanceFromParentTop = stickyRect.top - parentRect.top;
    const parentHeight = parentRect.height - stickyRect.height;

    progressPercent = (distanceFromParentTop / parentHeight) * 100;

    for (let i = 0; i < numberOfCards; i++) {
      const currentCard = cardsContainer.children[i] as HTMLElement;
      const currentCardInnerDiv = currentCard.firstChild as HTMLElement;
      if (progressPercent > (animationTriggersAtEach * i) + animationTriggersAtEach / 2) {
        currentCard.style.transform = 'translateY(-80vh)';
        currentCardInnerDiv.style.transform = 'rotate(-50deg)';
      } else {
        currentCard.style.transform = 'translateY(0)';
        currentCardInnerDiv.style.transform = `rotate(-${5 * i}deg)`;
      }
    }

    console.log(progressPercent);
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
}

export default function ScrollableCards() {
  const rootId = useId();
  const transitionClass = "transition-transform duration-1000 ease-in-out";
  return <div id={rootId} class="relative h-[180vh]">
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />
    <div class="sticky top-0 h-[100vh] bg-black flex flex-col justify-center items-center">
      <h2 class="text-4xl py-5">Testando uma coisa</h2>
      <div class="cardsContainer relative h-56 w-36">

        <div class={`absolute ${transitionClass}`}>
          <div class={`h-56 w-36 bg-green-500 ${transitionClass}`}></div>
        </div>

        <div class={`absolute ${transitionClass}`} style={{ zIndex: -1 }}>
          <div class={`h-56 w-36 bg-red-500 ${transitionClass}`} style={{ transform: 'rotate(-5deg)' }}></div>
        </div>

        <div class={`absolute ${transitionClass}`} style={{ zIndex: -2 }}>
          <div class={`h-56 w-36 bg-blue-500 ${transitionClass}`} style={{ transform: 'rotate(-10deg)' }}></div>
        </div>

      </div>
    </div>
  </div>
}
