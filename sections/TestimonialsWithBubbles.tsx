import type { ImageWidget, HTMLWidget, RichText, VideoWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../components/ui/Slider2.tsx";
import { useId } from "../sdk/useId.ts";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import { useScript } from "@deco/deco/hooks";
import { HeroMedia } from "site/sections/HeroV2.tsx";

const openModal = (modalId: string) => {
  event!.preventDefault();
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.remove("hidden");
};
const closeModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLElement;
  modal?.classList.add("hidden");
};

const onLoad = (rootId: string, bubblesImages: BubbleImage[]) => {
  const parent = document.getElementById(rootId) as HTMLElement;
  const bubbleElements = parent.querySelectorAll(".bubbleImage");

  const horizontalComeFrom = {
    "top left": "-",
    "top right": "",
    "bottom left": "-",
    "bottom right": "",
  }

  const verticalComeFrom = {
    "top left": "-",
    "top right": "-",
    "bottom left": "",
    "bottom right": "",
  }

  const speed = {
    "fast": 1,
    "normal": 0.6,
    "slow": 0.3
  }

  const handleScroll = () => {
    let distanceFromTop = (parent?.getBoundingClientRect().top - 200);
    if (distanceFromTop < 0) distanceFromTop = 0;
    for (let i = 0; i < bubbleElements.length; i++) {
      const currentHorizontalComeFrom = horizontalComeFrom[bubblesImages[i].comeFrom || "top left"];
      const currentVerticalComeFrom = verticalComeFrom[bubblesImages[i].comeFrom || "top left"];
      const currentSpeed = speed[bubblesImages[i].speed || "normal"];
      (bubbleElements[i] as HTMLElement).style.transform = `translateY(${currentVerticalComeFrom}${distanceFromTop * currentSpeed * 0.3}px) translateX(${currentHorizontalComeFrom}${distanceFromTop * currentSpeed}px)`;
    }
  };

  globalThis.addEventListener('scroll', handleScroll);

  return () => {
    globalThis.removeEventListener('scroll', handleScroll);
  };
}

const refreshArrowsVisibility = () => {
    const currentTarget = event!.currentTarget as HTMLElement;
    refresh(0);
    function refresh(firstItemLastPosition: number) {
        setTimeout(() => {
            if (currentTarget) {
                const carousel = currentTarget.querySelector(".carousel") as HTMLElement;
                const carouselItems = currentTarget.querySelectorAll(".carousel-item") as NodeListOf<Element>;
                const startDistance = carousel.getBoundingClientRect().left - carouselItems[0].getBoundingClientRect().left;
                const endDistance = carouselItems[carouselItems.length - 1].getBoundingClientRect().right - carousel.getBoundingClientRect().right;
                const prevButton = currentTarget.querySelector(".prev-button") as HTMLElement | null | undefined;
                const nextButton = currentTarget.querySelector(".next-button") as HTMLElement | null | undefined;
                if (prevButton && nextButton) {
                    if (startDistance <= 0) {
                        prevButton.style.opacity = "0.2";
                    }
                    else {
                        prevButton.style.opacity = "1";
                    }
                    if (endDistance <= 10) {
                        nextButton.style.opacity = "0.2";
                    }
                    else {
                        nextButton.style.opacity = "1";
                    }
                }
                if (carouselItems[0].getBoundingClientRect().left != firstItemLastPosition)
                    refresh(carouselItems[0].getBoundingClientRect().left);
            }
        }, 200);
    }
};

export interface HubspotForm {
  show?: boolean;
  region?: string;
  portalId?: string;
  formId?: string;
  /** @format color-input */
  buttonColor?: string;
  /** @format color-input */
  buttonTextColor?: string;
  /** @format color-input */
  buttonIcon?: boolean;
  buttonWidth?: 'min' | 'full';
  /** @format color-input */
  errorMessageColor?: string;
  inputLabel?: string;
  /** @format color-input */
  inputLabelColor?: string;
  /** @format color-input */
  inputLabelBackgroundColor?: string;
  inputLabelWidth?: 'min' | 'full';
}

/** @title {{alt}} */
export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

/** @title {{alt}} */
export interface BubbleImage extends IImage {
  horizontalPosition?: string;
  verticalPosition?: string;
  comeFrom?: "top left" | "top right" | "bottom left" | "bottom right"
  speed?: "normal" | "slow" | "fast";
}

export interface BackgroundMedia {
    image?: IImage;
    video?: VideoWidget;
    use?: "image" | "video";
}

export interface IVideo {
  src?: VideoWidget;
  width?: string;
  height?: string;
}

export interface Media {
    image?: IImage;
    video?: IVideo;
    use?: "image" | "video" | "embed";
}

/** @title {{text}} */
export interface CTA {
    href?: string;
    text?: string;
    underlineText?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    textColor?: string;
    /** @format color-input */
    borderColor?: string;
    ctaStyle: "button" | "link";
    showIcon?: boolean;
}

export interface Modal {
    title: string;
    /** @format color-input */
    titleColor?: string;
    text?: string;
    /** @format color-input */
    textColor?: string;
    media?: Media;
    cta?: CTA[];
}

export interface Content {
    description?: HTMLWidget;
    avatar?: ImageWidget;
    /** @description Image's alt text */
    alt?: string;
    avatarWidth?: number;
    avatarHeight?: number;
    /** @format color-input */
    avaterBorderColor?: string;
    roundedAvatar?: boolean;
    name?: HTMLWidget;
    nameCaption?: RichText;
    /** @format color-input */
    quoteIconColor?: string;
    /** @format color-input */
    backgroundColor?: string;
    /** @format color-input */
    borderColor?: string;
}
/** @title {{content.alt}} */
export interface Testimonial {
    content?: Content;
}
export interface Props {
  hideSection?: boolean;
  title?: RichText;
  titleFont?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  titleLetterSpacing?: string;
  titleLineHeight?: string;
  caption?: RichText;
  captionFont?: string;
  captionFontSize?: string;
  captionFontWeight?: string;
  captionLetterSpacing?: string;
  captionLineHeight?: string;
  hubspotForm?: HubspotForm;
  slides?: Testimonial[];
  /**
   * @title Show arrows
   * @description show arrows to navigate through the images
  */
  arrows?: boolean;
  /** @format color-input */
  arrowsColor?: string;
  backgroundMedia?: BackgroundMedia;
  bubbleImages?: BubbleImage[];
  modal?: Modal;
  paddingTop?: string;
  paddingBottom?: string;
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
    return (<div id={id} class="relative w-full z-10">
    <div 
      class={`${content?.borderColor && "border"} flex flex-col justify-between rounded-xl h-full gap-4 shadow-spreaded4 overflow-hidden pt-7`} 
      style={{background: content?.backgroundColor, borderColor: content?.borderColor, boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.05), 0px 5.563px 31.72px 0px rgba(0, 72, 82, 0.09)"}}>

      <div class="px-7">
        {content?.quoteIconColor && <svg width="31" height="22" viewBox="0 0 31 22" class="text-primary fill-current mb-3.5" xmlns="http://www.w3.org/2000/svg" style={{ color: content?.quoteIconColor }}>
          <path d="M6.54688 21.7734C4.71354 21.7734 3.2526 21.1576 2.16406 19.9258C1.10417 18.6654 0.574219 17.0326 0.574219 15.0273C0.574219 12.1341 1.30469 9.34115 2.76562 6.64844C4.25521 3.95573 6.0026 1.75 8.00781 0.03125L12.6914 2.30859C11.0013 4.11328 9.71224 5.91797 8.82422 7.72266C7.96484 9.52734 7.53516 11.1029 7.53516 12.4492H12.6914V16.6172C12.6914 17.849 12.1185 19.0234 10.9727 20.1406C9.85547 21.2292 8.38021 21.7734 6.54688 21.7734ZM24.293 21.7734C22.4596 21.7734 20.9987 21.1576 19.9102 19.9258C18.8503 18.6654 18.3203 17.0326 18.3203 15.0273C18.3203 12.1341 19.0508 9.34115 20.5117 6.64844C21.9727 3.95573 23.7057 1.75 25.7109 0.03125L30.3945 2.30859C28.7044 4.11328 27.4154 5.91797 26.5273 7.72266C25.668 9.52734 25.2383 11.1029 25.2383 12.4492H30.3945V16.6172C30.3945 17.849 29.8216 19.0234 28.6758 20.1406C27.5586 21.2292 26.0977 21.7734 24.293 21.7734Z"/>
        </svg>}

        <div class="text-base text-primary " dangerouslySetInnerHTML={{ __html: content?.description || "" }}/>
      </div>
      <div class="flex gap-4 md:gap-5 px-7 pb-7">
        <div class={`${content?.roundedAvatar && "rounded-full"} overflow-hidden ${content?.avaterBorderColor && 'border'}`} style={{ borderColor: content?.avaterBorderColor }}>
          <Image class="object-contain h-full" alt={content?.alt} src={content?.avatar || ""} width={content?.avatarWidth || 68} height={content?.avatarHeight || 68}/>
        </div>
        <div class="flex flex-col justify-center gap-1">
          <div class="font-normal text-sm md:text-base" dangerouslySetInnerHTML={{ __html: content?.name || "" }}/>
          {content?.nameCaption &&<div class="font-normal text-sm" dangerouslySetInnerHTML={{ __html: content?.nameCaption }}/>}
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
function Buttons({ arrowsColor }: {
    arrowsColor?: string;
}) {
    return (<div class="flex gap-4">
    <div class="flex items-center justify-center z-10 ">
      <Slider.PrevButton class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current rotate-180 prev-button transition-opacity opacity-20" style={{ color: arrowsColor }}>
          <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
        </svg>
      </Slider.PrevButton>
    </div>
    <div class="flex items-center justify-center z-10 ">
      <Slider.NextButton class="flex items-center justify-center ">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="text-primary fill-current next-button transition-opacity" style={{ color: arrowsColor }}>
          <path d="M25.3835 4.67773C21.4279 4.67773 17.5611 5.85071 14.2721 8.04834C10.9831 10.246 8.41969 13.3695 6.90593 17.0241C5.39218 20.6786 4.99611 24.6999 5.76782 28.5795C6.53952 32.4592 8.44434 36.0228 11.2414 38.8199C14.0384 41.6169 17.6021 43.5217 21.4817 44.2934C25.3613 45.0651 29.3827 44.6691 33.0372 43.1553C36.6917 41.6416 39.8153 39.0781 42.0129 35.7891C44.2105 32.5002 45.3835 28.6334 45.3835 24.6777C45.3779 19.3751 43.269 14.2913 39.5195 10.5418C35.77 6.79227 30.6861 4.68333 25.3835 4.67773ZM31.0874 25.7662L23.3951 33.4585C23.2521 33.6014 23.0824 33.7148 22.8957 33.7922C22.7089 33.8695 22.5087 33.9094 22.3066 33.9094C22.1045 33.9094 21.9043 33.8695 21.7175 33.7922C21.5308 33.7148 21.3611 33.6014 21.2181 33.4585C21.0752 33.3156 20.9618 33.1459 20.8845 32.9591C20.8071 32.7724 20.7673 32.5722 20.7673 32.37C20.7673 32.1679 20.8071 31.9677 20.8845 31.781C20.9618 31.5942 21.0752 31.4245 21.2181 31.2816L27.8239 24.6777L21.2181 18.0739C20.9295 17.7852 20.7673 17.3937 20.7673 16.9854C20.7673 16.5772 20.9295 16.1856 21.2181 15.897C21.5068 15.6083 21.8983 15.4461 22.3066 15.4461C22.7149 15.4461 23.1064 15.6083 23.3951 15.897L31.0874 23.5893C31.2304 23.7322 31.3439 23.9018 31.4213 24.0886C31.4987 24.2754 31.5386 24.4756 31.5386 24.6777C31.5386 24.8799 31.4987 25.0801 31.4213 25.2669C31.3439 25.4536 31.2304 25.6233 31.0874 25.7662Z"/>
        </svg>
      </Slider.NextButton>
    </div>
  </div>);
}
function TestimonialsWithBubbles(props: Props) {
    if (props.hideSection) return <></>
    const id = useId();
    const modalId = id + "modal";
    const hubspostFormId = id + "hubspotForm";
    const { title, slides, titleFont, caption, captionFont, hubspotForm, bubbleImages = [], captionFontSize, captionFontWeight, captionLetterSpacing, captionLineHeight, backgroundMedia, modal, paddingBottom, paddingTop, titleLineHeight, titleFontSize, titleFontWeight, titleLetterSpacing } = { ...DEFAULT_PROPS, ...props };
    return (<div class="relative overflow-hidden" >
      <div id={id} class="min-h-min flex flex-col lg:container md:max-w-[1332px] lg:mx-auto pt-7 lg:pt-14" 
        style={{paddingTop}}
        hx-on:click={useScript(refreshArrowsVisibility)} 
        hx-on:touchend={useScript(refreshArrowsVisibility)}>
        <script
              type="module"
              dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, bubbleImages) }}
            />
        {title && <div class="text-[110px] leading-[120%] mb-4 text-primary" 
          style={{ fontFamily:  titleFont, fontSize: titleFontSize, fontWeight: titleFontWeight, letterSpacing: titleLetterSpacing, lineHeight: titleLineHeight}} 
          dangerouslySetInnerHTML={{ __html: title}}/>}
        {caption && <div class="text-6xl leading-[120%] text-primary" 
          style={{ fontFamily:  captionFont, fontSize: captionFontSize, fontWeight: captionFontWeight, letterSpacing: captionLetterSpacing, lineHeight: captionLineHeight}} 
          dangerouslySetInnerHTML={{ __html: caption}}/>}

        {hubspotForm?.show && <label class="pt-5 md:pt-10 lg:w-[600px] mx-auto">
                        {hubspotForm?.inputLabel && <p 
                            class={`bg-info-content rounded-tl-xl rounded-tr-xl py-1.5 pl-2.5 lg:pl-4 text-sm lg:text-base text-primary inline-block ${hubspotForm?.inputLabelWidth == 'full' ? "w-full text-center px-1" : "pr-12"}`} 
                            style={{ color: hubspotForm?.inputLabelColor, background: hubspotForm?.inputLabelBackgroundColor }}
                        >
                            {hubspotForm?.inputLabel}
                        </p>}
                        <div class={hubspostFormId} dangerouslySetInnerHTML={{
                            __html: `
                            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
                            <script>
                            hbspt.forms.create({
                                region: "${hubspotForm?.region || ""}",
                                portalId: "${hubspotForm?.portalId}",
                                formId: "${hubspotForm?.formId}",
                                onFormSubmit: function($form) {
                                    const modal = document.getElementById("${modalId}");
                                    if (modal) modal.classList.remove('hidden');
                                }
                            });
                            </script>` 
                        }}/>                                  
                    </label>}

        <Slider class="carousel relative carousel-center w-full col-span-full row-span-full gap-8 mx-auto px-5 md:px-9 max-w-[1105px] py-9 md:py-20" rootId={id} interval={0 && 0 * 1e3} infinite style={{paddingBottom}}>
          {slides?.map((slide, index) => (<Slider.Item index={index} class="carousel-item max-w-[510px] w-full">
            <SliderItem slide={slide} id={`${id}::${index}`}/>
          </Slider.Item>))}
        </Slider>

        <div class="flex justify-end pr-[22px] lg:px-9 ">
          {/* {props.dots && <Dots slides={slides} interval={interval}/>}{" "} */}
          {props.arrows && <Buttons arrowsColor={props.arrowsColor}/>}
        </div>
        {bubbleImages.map((image) => (
          <Image 
            src={image.src || ""}
            width={image.width || 95}
            height={image.height || 95}
            alt={image.alt || "bubble image"}
            class="absolute -z-40 rounded-full transition-transform ease-linear duration-150 bubbleImage"
            style={{top: image.verticalPosition, left: image.horizontalPosition}}
          />
        ))}
      </div>
      {backgroundMedia?.use == "image" && backgroundMedia.image?.src && <Image
            src={backgroundMedia.image.src}
            alt={backgroundMedia.image.alt || "background image"}
            width={backgroundMedia.image.width || 1440}
            height={backgroundMedia.image.height || 960}
            class="absolute -z-50 top-0 left-0 h-full w-full object-cover"
        />}
        {backgroundMedia?.use == "video" && backgroundMedia.video && <video width={1280} height={720} autoPlay playsInline muted loading="lazy" loop
            class="object-cover absolute -z-50 top-0 left-0 h-full w-full">
            <source src={backgroundMedia.video} type="video/mp4" />
        </video>}

        <style dangerouslySetInnerHTML={{
                __html: `
                    .${hubspostFormId} .hs-form-private {
                        position: relative;
                        display: flex; /* flex */
                        flex-wrap: wrap !important;
                        justify-content: space-between; /* justify-between */
                        padding: 0.375rem;
                        font-size: 1rem; /* text-base */
                        border: 1px solid #EBEBEB;
                        --tw-border-opacity: 1;
                        border-radius: ${hubspotForm?.inputLabel ? '0 0.75rem 0.75rem 0.75rem' : '0.75rem'};
                        ${hubspotForm?.inputLabel && hubspotForm?.inputLabelWidth == 'full' && 'border-radius: 0 0 0.75rem 0.75rem;'}
                        box-shadow: 0px 5.5px 31.7px 0px rgba(0, 72, 82, 0.09);
                        --tw-bg-opacity: 1;
                        background-color: white;
                    }
                    
                    .${hubspostFormId} .input {
                        padding-right: 0px;
                    } 

                    .${hubspostFormId} .hs-form-private {
                        flex-wrap: nowrap;
                    }
                        
                    .${hubspostFormId} .hs-input {
                        width: 100%;
                        margin-top: 10px;
                    }
                    
                    .${hubspostFormId} ${hubspotForm?.buttonIcon && '.actions::before'} {
                        content: '';
                        background-image: url("data:image/svg+xml,%3Csvg width='40' height='41' viewBox='0 0 40 41' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.5' width='40' height='40' rx='4' fill='white'/%3E%3Cpath d='M26.8087 19.3671L16.4581 12.8195C16.2836 12.709 16.0837 12.6487 15.8791 12.6447C15.6745 12.6408 15.4726 12.6934 15.2943 12.7972C15.1176 12.8993 14.9705 13.0483 14.868 13.2287C14.7654 13.4091 14.7112 13.6145 14.7109 13.8238V26.9175C14.7123 27.2314 14.8341 27.5319 15.0496 27.753C15.2652 27.9741 15.5568 28.0976 15.8604 28.0964C16.0723 28.0963 16.28 28.0359 16.461 27.9218L26.8087 21.3743C26.9751 21.2694 27.1125 21.1221 27.2079 20.9465C27.3033 20.7709 27.3534 20.5728 27.3534 20.3714C27.3534 20.17 27.3033 19.9719 27.2079 19.7963C27.1125 19.6207 26.9751 19.4734 26.8087 19.3685V19.3671Z' fill='%232F575C'/%3E%3C/svg%3E%0A");
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                            
                    .${hubspostFormId} .hs-submit {
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }

                    .${hubspostFormId} .actions {
                        display: flex;
                        align-items: center;
                        height: 47px;
                        background-color: ${hubspotForm?.buttonColor};
                        cursor: pointer;
                        border-radius: 8px;
                        padding-left: 4px;
                        transition: transform 0.2s ease-in-out;
                    }
                                
                    .${hubspostFormId} .actions:hover {
                        transform: scale(1.15);
                    }

                    .${hubspostFormId} .hs-button {
                        color: ${hubspotForm?.buttonTextColor};
                        padding: 0px 18px 0px 18px;
                        height: 100%;
                        font-size: 18px;
                        font-style: normal;
                        font-weight: 500;
                        cursor: pointer;
                        text-align: center;
                        ${hubspotForm?.buttonWidth == 'full' && 'width: 100%;'}
                    }
                                    
                    
                                        
                    .${hubspostFormId} .hs-input {
                        outline: none;
                        font-size: 0.875rem; /* text-sm */
                    }
                                            
                                            .${hubspostFormId} .input  {
                                                outline: none; /* Remove a borda padrão */
                                                border: none;
                                                box-shadow: none; /* Remove qualquer sombra */
                                                }
                                                
                                                .${hubspostFormId} .hs-error-msg {
                                                    --tw-text-opacity: 1;
                                                    color: var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)));
                                                    }
                                                    
                                                    .${hubspostFormId} .submitted-message {
                                                        text-align: center;
                                                        }
                                                        
                                                        .${hubspostFormId} .hs-error-msg {
                                                            position: absolute;
                                                            top: 60px;
                                                            left: 24px;
                                                            max-width: 50%;
                                                            color: ${hubspotForm?.errorMessageColor}
                                                            }
                                                            
                                                            .${hubspostFormId} .hs_error_rollup {
                                                                display: none;
                                                                }
                
                                                                @media (min-width: 768px) {
                                                                    .${hubspostFormId} .hs-input {
                                                                        width: auto;
                                                                        flex-grow: 1;
                                                                        font-size: 1rem; /* text-base */
                                                                        }
                                                                        `
                                                                    }}/>
              <div id={modalId} class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50 z-[60] overflow-auto hidden px-6">            
                <div class="bg-primary-content lg:rounded-[30px] p-7 lg:p-12 animate-pop-up relative pt-12" style={{ animationDuration: "0.3s" }}>
                    <button class="text-primary font-black p-2.5 absolute top-2.5 right-[19px]" hx-on:click={useScript(closeModal, modalId)}>
                        <svg width="20" height="20" viewBox="0 0 19 19" class="text-primary fill-current" style={{ color: modal?.titleColor }} xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5997 16.6802C18.8546 16.935 18.9977 17.2807 18.9977 17.6411C18.9977 18.0015 18.8546 18.3471 18.5997 18.602C18.3448 18.8568 17.9992 19 17.6387 19C17.2783 19 16.9326 18.8568 16.6778 18.602L9.5 11.4224L2.31996 18.5997C2.06509 18.8546 1.71943 18.9977 1.359 18.9977C0.99857 18.9977 0.652903 18.8546 0.398042 18.5997C0.14318 18.3449 5.37081e-09 17.9992 0 17.6388C-5.37081e-09 17.2784 0.14318 16.9328 0.398042 16.6779L7.57809 9.50057L0.400302 2.32095C0.145441 2.0661 0.00226112 1.72046 0.00226113 1.36005C0.00226113 0.999641 0.145441 0.653995 0.400302 0.399148C0.655164 0.144302 1.00083 0.00113028 1.36126 0.00113028C1.72169 0.00113028 2.06735 0.144302 2.32222 0.399148L9.5 7.57877L16.68 0.398017C16.9349 0.143171 17.2806 -6.00439e-09 17.641 0C18.0014 6.00439e-09 18.3471 0.143171 18.602 0.398017C18.8568 0.652864 19 0.99851 19 1.35892C19 1.71932 18.8568 2.06497 18.602 2.31982L11.4219 9.50057L18.5997 16.6802Z"/>
                        </svg>
                    </button>
                    <h2 class="font-normal text-[32px] leading-[130%] max-w-[475px] max-w-[700px] " style={{ color: modal?.titleColor }}>{modal?.title}</h2>
                    <p class="mt-7 text-xl text-neutral font-medium leading-[120%] max-w-[700px] " style={{ color: modal?.textColor }}>{modal?.text}</p>
                    <HeroMedia media={modal?.media} />
                    <div class="flex flex-wrap items-center gap-7 mt-5">
                        {modal?.cta?.map((button) => {
                return <a href={button?.href} target={button?.href?.includes("http") ? "_blank" : ""} hx-on:click={useScript(closeModal, modalId)} class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`} style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}>
                            {button?.text}
                            {button.underlineText && <span class="underline">{button.underlineText}</span>}
                            {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z"/>
                            </svg>}
                        </a>;
            })}
                    </div>
                </div>
            </div>
  </div>);
}
export default TestimonialsWithBubbles;
