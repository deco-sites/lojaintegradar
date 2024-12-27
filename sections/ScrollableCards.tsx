import { RichText, ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";

const onLoad = (rootId: string) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const sticky = parent.querySelector('.sticky') as HTMLElement;
  const cardsContainer = parent.querySelector(".cardsContainer") as HTMLElement;
  const cards = cardsContainer.querySelectorAll(".scrollCard") as NodeListOf<HTMLElement>

  let progressPercent = 0;
  const numberOfCards = cardsContainer.children.length;
  const animationTriggersAtEach = 100 / numberOfCards;

  const handleScroll = () => {
    const parentRect = parent.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const distanceFromParentTop = stickyRect.top - parentRect.top;
    const parentHeight = parentRect.height - stickyRect.height;

    progressPercent = (distanceFromParentTop / parentHeight) * 100;

    for (let i = 0; i < numberOfCards; i++) {
      const currentCard = cards[i];
      const currentCardInnerDiv = currentCard.firstElementChild as HTMLElement;
      if (progressPercent > (animationTriggersAtEach * i) + animationTriggersAtEach / 2) {
        currentCard.style.transform = 'translateY(-100vh)';
        currentCardInnerDiv.style.transform = 'rotate(-50deg)';
      } else {
        currentCard.style.transform = 'translateY(0)';
        currentCardInnerDiv.style.transform = `rotate(-${5 * i}deg)`;
      }
    }
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
}

/** @title {{text}} {{underlineText}} */
export interface CTA {
  href: string;
  text?: string;
  underlineText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  borderColor?: string;
  ctaStyle?: "button" | "link";
  showIcon?: boolean;
}

export interface CreateStoreWithPlanCTA {
  planId: string;
  text?: string;
  underlineText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  borderColor?: string;
  ctaStyle?: "button" | "link";
  showIcon?: boolean;
  order?: number;
}

export interface Title {
  text?: RichText;
  font?: string;
}

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Card {
  title?: Title;
  caption?: RichText;
  image?: IImage;
  imageCaption?: RichText;
}

export interface Props {
  id?: string;
  title?: Title;
  leftText?: RichText;
  rightText?: RichText;
  cards?: Card[];
  cardsMarginTop?: string;
  cardsMinHeight?: string;
  cardsWidth?: string;
  createStoreCta?: CreateStoreWithPlanCTA;
  cta?: CTA[];
  ctaMargintop?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function ScrollableCards({ id, title, leftText, rightText, createStoreCta, cta = [], cards = [], ctaMargintop, cardsWidth, cardsMinHeight, cardsMarginTop, paddingBottom, paddingTop }: Props) {
  const rootId = useId();
  const transitionClass = "transition-transform duration-1000 ease-in-out";
  return <div id={rootId} class="relative min-h-[120vh]" style={{ height: `${80 * cards.length}vh` }}>
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(onLoad, rootId) }}
    />
    <div id={id} class="sticky top-0 min-h-[100vh] flex flex-col justify-center items-center pb-[91px] pt-[45px] lg:pt-0 overflow-hidden" style={{ paddingTop, paddingBottom }}>
      <div class="text-[25vw] lg:text-[345px] -z-40" dangerouslySetInnerHTML={{ __html: title?.text || "" }} style={{ fontFamily: title?.font }} />
      <div class="flex justify-center gap-1 mb-4 lg:hidden">
        <div class="text-[6vw]" dangerouslySetInnerHTML={{ __html: leftText || "" }} style={{ fontFamily: title?.font }} />
        <div class="text-[6vw]" dangerouslySetInnerHTML={{ __html: rightText || "" }} style={{ fontFamily: title?.font }} />
      </div>
      <div class="flex justify-center">
        <div class="cardsContainer relative min-h-[400px] w-[380px] lg:mt-[-180px]" style={{ marginTop: cardsMarginTop, minHeight: cardsMinHeight, width: cardsWidth }}>
          <div class="text-[6vw] lg:text-[80px] whitespace-nowrap font-normal absolute right-full mt-[74px] mr-7 hidden lg:block" dangerouslySetInnerHTML={{ __html: leftText || "" }} style={{ fontFamily: title?.font }} />
          <div class="text-[6vw] lg:text-[80px] whitespace-nowrap font-normal absolute left-full mt-[74px] ml-7 hidden lg:block" dangerouslySetInnerHTML={{ __html: rightText || "" }} style={{ fontFamily: title?.font }} />
          {cards.map((card, index) => (
            <div class={`scrollCard absolute ${transitionClass}`} style={{ zIndex: -(index) }}>
              <div
                class={`min-h-[400px] w-[380px] rounded-[34px] shadow-spreaded2 p-10 ${transitionClass}`}
                style={{ transform: `rotate(-${5 * index}deg)`, background: 'linear-gradient(176deg, rgba(255, 255, 255, 0.92) 3.61%, #FFF 50.32%)', minHeight: cardsMinHeight, width: cardsWidth }}>
                <div class="" dangerouslySetInnerHTML={{ __html: card.title?.text || "" }} />
                <div class="mt-3" dangerouslySetInnerHTML={{ __html: card.caption || "" }} />
                <div class="flex gap-4 mt-8">
                  {card.image?.src && <Image
                    src={card.image.src}
                    alt={card.image.alt || "card image"}
                    width={card.image.width || 75}
                    height={card.image.height || 75}
                  />}
                  {card.imageCaption && <div dangerouslySetInnerHTML={{ __html: card.imageCaption }} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AnimateOnShow divClass="flex flex-wrap justify-center items-center gap-7 mt-20 px-7 z-40" animation="animate-fade-up" style={{ marginTop: ctaMargintop }}>
        {createStoreCta?.text && <CreateStoreCta
          period="anual"
          text={createStoreCta.text}
          planId={createStoreCta.planId}
          showIcon={createStoreCta.showIcon}
          underlineText={createStoreCta.underlineText}
          ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
          style={createStoreCta.ctaStyle != "link"
            ? { background: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order }
            : { color: createStoreCta.textColor, order: createStoreCta.order }}
        />}
        {cta.map((button, index) => {
          if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
            showIcon={button.showIcon}
            underlineText={button.underlineText}
            text={button.text}
            ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
          />
          return <a
            href={button?.href ?? "#"}
            target={button?.href.includes("http") ? "_blank" : ""}
            class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} h-auto flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
            style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
          >
            {button?.text}
            {button.underlineText && <span class="underline">{button.underlineText}</span>}
            {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
            </svg>}
          </a>
        })}
      </AnimateOnShow>
    </div>
  </div>
}
