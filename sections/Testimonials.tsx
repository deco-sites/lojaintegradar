import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "deco/hooks/useScript.ts";
/**
 * @titleBy alt
 */

const refreshArrowsVisibility = () => {
  const currentTarget = event!.currentTarget as HTMLElement;
  
  refresh(0);

  function refresh (firstItemLastPosition: number) {
      setTimeout(() => {
          
          if (currentTarget) {
              const carousel = currentTarget.querySelector(".carousel") as HTMLElement;
              const carouselItems = currentTarget.querySelectorAll(".carousel-item") as NodeListOf<Element>;
              
              const startDistance = carousel.getBoundingClientRect().left - carouselItems[0].getBoundingClientRect().left;
              const endDistance = carouselItems[carouselItems.length - 1].getBoundingClientRect().right - carousel.getBoundingClientRect().right;
              console.log(endDistance);
              const prevButton = currentTarget.querySelector(".prev-button") as HTMLElement | null | undefined;
              const nextButton = currentTarget.querySelector(".next-button") as HTMLElement | null | undefined;
  
              if (prevButton && nextButton) {
                  if (startDistance <= 0) {
                      prevButton.style.opacity = "0.2";
                  } else {
                      prevButton.style.opacity = "1";
                  }
  
                  if (endDistance <= 10) {
                      nextButton.style.opacity = "0.2";
                  } else {
                      nextButton.style.opacity = "1";
                  }
              }

              if(carouselItems[0].getBoundingClientRect().left != firstItemLastPosition) refresh(carouselItems[0].getBoundingClientRect().left);
          }
      }, 200);
  }
};

export interface Content {
  description?: HTMLWidget;
  avatar?: ImageWidget;
  /** @description Image's alt text */
  alt?: string;
  /** @format color-input */
  avaterBorderColor?: string;
  name?: HTMLWidget;
  /** @format color-input */
  nameBackgroundColor?: string;
  position?: string;
  /** @format color-input */
  nameIconColor?: string;
  /** @format color-input */
  quoteIconColor?: string;
}

/** @title {{content.name}} */
export interface Testimonial {
  content?: Content;
}
export interface Props {
  title?: string;
  /** @format color-input */
  titleColor?: string;
  slides?: Testimonial[];
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
   */
  arrows?: boolean;
  /** @format color-input */
  arrowsColor?: string;
  /**
   * @title Show dots
   * @description show dots to navigate through the images
   */
  //dots?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  //interval?: number;
}
const DEFAULT_PROPS = {
  slides: [
    {
      content: {
        description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
      },
    },
    {
      content: {
        description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
      },
    },
    {
      content: {
        description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
      },
    },
    {
      content: {
        description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
      },
    },
    {
      content: {
        description: "Showcase customer feedback that emphasizes your product or service's key features and addresses prospective clients' concerns. Display endorsements from customer groups that mirror your target audience.",
        avatar: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e",
        alt: "Avatar",
        name: "Name Surname",
        position: "Position, Company name",
      },
    },
  ],
};
function SliderItem({ slide, id }: {
  slide: Testimonial;
  id: string;
}) {
  const { content, } = slide;
  return (<div id={id} class="relative w-full min-h-[292px]">
    <div class="flex flex-col justify-end rounded-[32px] h-full shadow-spreaded2 overflow-hidden pt-7">

      <div class="px-6 md:pl-12 md:pr-7">
        <svg width="31" height="22" viewBox="0 0 31 22" class="text-primary fill-current" xmlns="http://www.w3.org/2000/svg" style={{ color: content?.quoteIconColor }}>
          <path d="M6.54688 21.7734C4.71354 21.7734 3.2526 21.1576 2.16406 19.9258C1.10417 18.6654 0.574219 17.0326 0.574219 15.0273C0.574219 12.1341 1.30469 9.34115 2.76562 6.64844C4.25521 3.95573 6.0026 1.75 8.00781 0.03125L12.6914 2.30859C11.0013 4.11328 9.71224 5.91797 8.82422 7.72266C7.96484 9.52734 7.53516 11.1029 7.53516 12.4492H12.6914V16.6172C12.6914 17.849 12.1185 19.0234 10.9727 20.1406C9.85547 21.2292 8.38021 21.7734 6.54688 21.7734ZM24.293 21.7734C22.4596 21.7734 20.9987 21.1576 19.9102 19.9258C18.8503 18.6654 18.3203 17.0326 18.3203 15.0273C18.3203 12.1341 19.0508 9.34115 20.5117 6.64844C21.9727 3.95573 23.7057 1.75 25.7109 0.03125L30.3945 2.30859C28.7044 4.11328 27.4154 5.91797 26.5273 7.72266C25.668 9.52734 25.2383 11.1029 25.2383 12.4492H30.3945V16.6172C30.3945 17.849 29.8216 19.0234 28.6758 20.1406C27.5586 21.2292 26.0977 21.7734 24.293 21.7734Z" />
        </svg>

        <div class="text-base text-primary md:text-lg mt-3.5" dangerouslySetInnerHTML={{ __html: content?.description || "" }} />
      </div>
      <div class="flex gap-4 md:gap-5 mt-5 md:mt-11 bg-secondary-content px-6 md:pl-12 md:pr-7 min-h-[86px]" style={{ backgroundColor: content?.nameBackgroundColor }}>
        <div class="h-[72px] md:h-24 w-[72px] md:w-24 min-w-[72px] bg-primary-content rounded-full overflow-hidden mt-[-14px] md:mt-[-26px] border border-secondary-content" style={{ borderColor: content?.avaterBorderColor }}>
          <Image class="object-contain h-full" alt={content?.alt} src={content?.avatar || ""} width={97} />
        </div>
        <div class="flex flex-col">
          <div class="mt-5 flex items-center gap-1">
            <svg height="16px" width="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" class="text-primary fill-current" viewBox="0 0 512 512" style={{ color: content?.nameIconColor }}>
              <g>
                <g>
                  <path d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M172.211,41.609 c-24.934,27.119-44.68,66.125-56.755,111.992H49.749C75.179,102.741,118.869,62.524,172.211,41.609z M25.6,256 c0-26.999,5.077-52.727,13.662-76.8h70.494c-4.608,24.294-7.356,49.963-7.356,76.8s2.748,52.506,7.347,76.8H39.262 C30.677,308.727,25.6,283,25.6,256z M49.749,358.4h65.707c12.083,45.867,31.821,84.872,56.755,111.991 C118.869,449.476,75.179,409.259,49.749,358.4z M243.2,485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2V485.188z M243.2,332.8H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634,7.74-76.8H243.2V332.8z M243.2,153.6H141.841 C161.323,85.052,199.39,35.063,243.2,26.812V153.6z M462.251,153.6h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992 C393.131,62.524,436.821,102.741,462.251,153.6z M268.8,26.812c43.81,8.252,81.877,58.24,101.359,126.788H268.8V26.812z M268.8,179.2h107.46c4.924,24.166,7.74,49.997,7.74,76.8s-2.816,52.634-7.74,76.8H268.8V179.2z M268.8,485.188V358.4h101.359 C350.677,426.948,312.61,476.937,268.8,485.188z M339.789,470.391c24.934-27.127,44.672-66.125,56.755-111.991h65.707 C436.821,409.259,393.131,449.476,339.789,470.391z M402.244,332.8c4.608-24.294,7.356-49.963,7.356-76.8 s-2.748-52.506-7.347-76.8h70.494c8.576,24.073,13.653,49.801,13.653,76.8c0,27-5.077,52.727-13.662,76.8H402.244z" />
                </g>
              </g>
            </svg>
            <div class="font-semibold text-sm md:text-base" dangerouslySetInnerHTML={{ __html: content?.name || "" }} />
          </div>
          <p class="text-base">{content?.position}</p>
        </div>
      </div>
    </div>
  </div>);
}
// function Dots({ slides, interval = 0 }: Props) {
//     return (<>
//       <style dangerouslySetInnerHTML={{
//             __html: `
//           @property --dot-progress {
//             syntax: '<percentage>';
//             inherits: false;
//             initial-value: 0%;
//           }
//           `,
//         }}/>
//       <ul class="carousel col-span-full gap-3 z-10">
//         {slides?.map((_, index) => (<li class="carousel-item">
//             <Slider.Dot index={index}>
//               <div class="py-5">
//                 <div class="w-2 h-2 rounded-full group-disabled:animate-progress dot" style={{ animationDuration: `${interval}s` }}/>
//               </div>
//             </Slider.Dot>
//           </li>))}
//       </ul>
//     </>);
// }
function Buttons({ arrowsColor }: { arrowsColor?: string }) {
  return (<div class="flex gap-4">
    <div class="flex items-center justify-center z-10 ">
      <Slider.PrevButton class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 prev-button transition-opacity opacity-20" style={{ color: arrowsColor }}>
          <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
        </svg>
      </Slider.PrevButton>
    </div>
    <div class="flex items-center justify-center z-10 ">
      <Slider.NextButton class="flex items-center justify-center ">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current next-button transition-opacity" style={{ color: arrowsColor }}>
          <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z" />
        </svg>
      </Slider.NextButton>
    </div>
  </div>);
}
function Carousel(props: Props) {
  const id = useId();
  const { title, slides } = { ...DEFAULT_PROPS, ...props };
  return (<AnimateOnShow animation="animate-fade-up50" delay={300}>

    <div id={id} class="min-h-min flex flex-col lg:container md:max-w-[1332px] lg:mx-auto pt-7 lg:pt-14" hx-on:click={useScript(refreshArrowsVisibility)} hx-on:touchend={useScript(refreshArrowsVisibility)}>

      {title && <h2 class="text-4xl leading-snug lg:w-1/2 pb-12 lg:pb-16 text-primary" style={{ color: props.titleColor }}>
        {title}
      </h2>}
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-9 pl-[30px] pr-[22px] py-9 md:px-9" rootId={id} interval={0 && 0 * 1e3} infinite>
        {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item max-w-[608px] w-full">
          <SliderItem slide={slide} id={`${id}::${index}`} />
        </Slider.Item>))}
      </Slider>

      <div class="flex justify-end pr-[22px] lg:px-9 ">
        {/* {props.dots && <Dots slides={slides} interval={interval}/>}{" "} */}
        {props.arrows && <Buttons arrowsColor={props.arrowsColor} />}
      </div>
    </div>
  </AnimateOnShow>);
}
export default Carousel;
