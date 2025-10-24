import type { ImageWidget, VideoWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import CreateStoreForm from "../islands/CreateStoreForm.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";

export interface TextProps {
  fontFamily?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
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
  ctaStyle: "button" | "link";
  showIcon?: boolean;
  width?: string;
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

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Title {
  text?: RichText;
  font?: string;
  /** @format color-input */
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface BackgroundMedia {
  image?: IImage;
  video?: VideoWidget;
  use?: "image" | "video";
}


export interface createStoreFormLink {
  text?: string;
  href?: string;
}

export interface CreateStoreFormProps {
  googleAccountButton?: boolean;
  googleAccountBelowText?: string;
  showForm?: boolean;
  planoId?: string;
  periodo?: string;
  nameCaption?: string;
  namePlaceholder?: string;
  emailCaption?: string;
  emailPlaceholder?: string;
  passwordCaption?: string;
  passwordPlaceholder?: string;
  passwordText?: string;
  confirmPasswordCaption?: string;
  confirmPasswordPlaceholder?: string;
  agreeText1?: string;
  agreeLink1?: createStoreFormLink;
  agreeText2?: string;
  agreeLink2?: createStoreFormLink;
  agreeText3?: string;
  buttonText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  inputsLabelColor?: string;
  /** @format color-input */
  inputsTextColor?: string;
  /** @format color-input */
  inputsBorderColor?: string;
  /** @format color-input */
  inputsBellowTextColor?: string;
  /** @format color-input */
  linksColor?: string;
  /** @format color-input */
  buttonBackgroundColor?: string;
  /** @format color-input */
  buttonTextColor?: string;
}

export interface Props {
  hideSection?: boolean;
  id?: string;
  title?: Title;
  caption?: RichText;
  captionTextProps?: TextProps;
  createStoreCta?: CreateStoreWithPlanCTA;
  cta?: CTA[];
  ctaPlacement?: 'left' | 'center' | 'right';
  backgroundMedia?: BackgroundMedia;
  paddingTop?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingLeft?: string;
  sectionMinHeight?: string;
  createStoreFormProps?: CreateStoreFormProps;
}

export default function CreateStoreHero({ 
  hideSection, 
  id, 
  title, 
  caption, 
  captionTextProps, 
  createStoreCta, 
  cta = [], 
  ctaPlacement, 
  backgroundMedia, 
  createStoreFormProps, 
  paddingTop, 
  paddingBottom, 
  paddingLeft, 
  paddingRight, 
  sectionMinHeight 
}: Props) {
  if (hideSection) return <></>
  
  const placement = {
    "left": "justify-start",
    "center": "justify-center",
    "right": "justify-end"
  }

  return (
    <div 
      id={id} 
      class="relative pt-24 px-7 lg:pt-44 pb-16 lg:pb-20" 
      style={{ paddingTop, paddingLeft, paddingRight, paddingBottom, minHeight: sectionMinHeight }}
    >
      <div class="max-w-[1250px] mx-auto flex flex-col items-center lg:flex-row justify-between">
        <div class={`w-full ${createStoreFormProps?.showForm && 'max-w-[620px]'}`}>
          
          {/* TITLE - Mantém animação em ambos */}
          {title?.text && (
            <AnimateOnShow
              animation="animate-fade-up50"
              divClass="text-2xl lg:text-[72px] leading-[120%] mb-4"
              style={{ 
                fontFamily: title.font, 
                color: title.color, 
                fontSize: title.fontSize, 
                fontWeight: title.fontWeight, 
                letterSpacing: title.letterSpacing, 
                lineHeight: title.lineHeight 
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: title.text }} />
            </AnimateOnShow>
          )}

          {/* CAPTION - Otimizado para LCP Mobile */}
          {caption && (
            <>
              {/* Mobile: SEM animação, SEM minHeight (acelera LCP) */}
              <div class="lg:hidden text-base lg:text-2xl font-light leading-normal mb-4">
                <div 
                  width="100%" 
                  dangerouslySetInnerHTML={{ __html: caption }} 
                  style={{ ...captionTextProps }} 
                />
              </div>

              {/* Desktop: COM animação, COM minHeight (previne CLS) */}
              <AnimateOnShow
                animation="animate-fade-up50"
                divClass="hidden lg:block text-base lg:text-2xl font-light leading-normal mb-4"
              >
                <div 
                  width="100%" 
                  dangerouslySetInnerHTML={{ __html: caption }} 
                  class="lg:min-h-[90px]"
                  style={{ ...captionTextProps }} 
                />
              </AnimateOnShow>
            </>
          )}

          {/* CTAs - Mantém animação em ambos */}
          <AnimateOnShow
            divClass={`relative flex flex-col rounded-xl lg:rounded-3xl`}
            animation="animate-fade-up50"
          >
            <div class={`mb-8 flex gap-4 flex-wrap ${placement[ctaPlacement || "left"]}`}>
              
              {/* CreateStore CTA */}
              {createStoreCta?.text && (
                <CreateStoreCta
                  period="anual"
                  text={createStoreCta.text}
                  planId={createStoreCta.planId}
                  showIcon={createStoreCta.showIcon}
                  underlineText={createStoreCta.underlineText}
                  ctaClass={`${createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg cursor-pointer`}
                  style={createStoreCta.ctaStyle != "link"
                    ? { background: createStoreCta.backgroundColor, color: createStoreCta.textColor, borderColor: createStoreCta.borderColor, order: createStoreCta.order }
                    : { color: createStoreCta.textColor, order: createStoreCta.order }}
                />
              )}

              {/* Regular CTAs */}
              {cta.map((button, index) => {
                if (button.href == '/talkToSpecialist') {
                  return (
                    <TalkToSpecialistCta
                      key={`cta-specialist-${index}`}
                      showIcon={button.showIcon}
                      underlineText={button.underlineText}
                      text={button.text}
                      ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto cursor-pointer`}
                      style={button.ctaStyle == "button" 
                        ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } 
                        : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                    />
                  )
                }
                
                return (
                  <a
                    key={`cta-${index}`}
                    href={button?.href ?? "#"}
                    target={button?.href.includes("http") ? "_blank" : ""}
                    class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-sm lg:text-base h-auto`}
                    style={button.ctaStyle == "button" 
                      ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, width: button.width || "fit-content", order: index + 1 } 
                      : { color: button.textColor, width: button.width || "fit-content", order: index + 1 }}
                  >
                    {button?.text}
                    {button.underlineText && <span class="underline">{button.underlineText}</span>}
                    {button.showIcon && (
                      <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                      </svg>
                    )}
                  </a>
                )
              })}
            </div>
          </AnimateOnShow>
        </div>

        {/* Create Store Form */}
        {createStoreFormProps?.showForm && <CreateStoreForm {...createStoreFormProps} />}
      </div>

      {/* Background Image - Otimizado para não competir com LCP */}
      {backgroundMedia?.use == "image" && backgroundMedia.image?.src && (
        <Image
          src={backgroundMedia.image.src}
          alt={backgroundMedia.image.alt || "background image"}
          width={backgroundMedia.image.width || 1440}
          height={backgroundMedia.image.height || 836}
          loading="eager"
          fetchPriority="high"
          preload={false}
          class="absolute -z-50 top-0 left-0 h-full w-full object-cover"
        />
      )}

      {/* Background Video - Otimizado */}
      {backgroundMedia?.use == "video" && backgroundMedia.video && (
        <video 
          width={1280} 
          height={720} 
          preload="none"
          autoPlay 
          playsInline 
          muted 
          loop
          class="object-cover absolute -z-50 top-0 left-0 h-full w-full"
        >
          <source src={backgroundMedia.video} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
