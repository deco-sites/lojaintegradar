import type { HTMLWidget, RichText } from "apps/admin/widgets.ts";
import { useScript } from "@deco/deco/hooks";
import AnimateOnShow from "../components/ui/AnimateOnShow.tsx";
import TalkToSpecialistCta from "site/components/TalkToSpecialitCta.tsx";

const onChange = () => {
    const element = event!.currentTarget as HTMLInputElement;
    const arrow = element.parentElement?.querySelector(".collapse-arrow") as HTMLElement;
    const secondaryHeaderItems = element.parentElement?.querySelectorAll(".secondaryHeaderItem");
    if (element.checked) {
        arrow.style.transform = 'rotate(-180deg)';
        secondaryHeaderItems?.forEach((header) => header.classList.remove("hidden"));
    }
    else {
        arrow.style.transform = 'rotate(0deg)';
        secondaryHeaderItems?.forEach((header) => header.classList.add("hidden"));
    }
};

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
  }

/** @title {{question}} */
export interface Question {
    question: string;
    answear: RichText;
}

interface textProps {
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export interface Props {
  hideSection?: boolean;
  /** @format color-input */
    backgroundColor?: string;
    title?: RichText;
    titleFont?: string;
    /** @format color-input */
    titleColor?: string;
    titleTextProps?: textProps;
    caption?: string;
    captionFont?: string;
    /** @format color-input */
    captionColor?: string;
    captionTextProps?: textProps;
    questions?: Question[];
    /** @format color-input */
    questionsTitleColor?: string;
    /** @format color-input */
    questionsDivisionLineColor?: string;
    bottomTitle?: string;
    /** @format color-input */
    bottomTitleColor?: string;
    bottomCaption?: string;
    /** @format color-input */
    bottomCaptionColor?: string;
    cta?: CTA[];
}

export default function Faq({ hideSection, title, titleColor, titleFont, titleTextProps, backgroundColor, caption, captionFont, captionColor, captionTextProps, questions = [], bottomTitle, bottomCaption, cta = [], questionsDivisionLineColor, questionsTitleColor, bottomCaptionColor, bottomTitleColor}: Props) {
    if (hideSection) return <></>
    return <div style={{background: backgroundColor}}>
      <div class="max-w-[1220px] mx-auto py-12 lg:py-20 px-7" >
          {title && <h2 class="text-2xl lg:text-5xl text-center leading-[120%] font-normal mb-6" style={{color: titleColor, fontFamily: titleFont, ...titleTextProps}} dangerouslySetInnerHTML={{__html: title}}/>}
          {caption && <p class="text-base lg:text-lg text-center font-normal leading-none " style={{color: captionColor, fontFamily: captionFont, ...captionTextProps}}>{caption}</p>}
          <div class="my-20 max-w-[768px] mx-auto">
          {questions.map((collapse, index) => (
              <div className="collapse rounded-none border-b border-base-200" style={{ borderColor: questionsDivisionLineColor }} key={index}>
                  <input 
                      type="checkbox" 
                      id={`question-${index}`} 
                      hx-on:change={useScript(onChange)} 
                  />
                  <label 
                      htmlFor={`question-${index}`} 
                      className="collapse-title text-base lg:text-lg font-semibold flex pl-0 pr-9 py-6" 
                      style={{ color: questionsTitleColor }}
                  >
                      {collapse.question}
                      <div class="absolute top-7 right-4 transition-all duration-300 collapse-arrow ">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="fill-current" style={{ stroke: questionsTitleColor }} xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.17674 11.5303L8.17676 11.5303L8.5303 11.1767C8.53031 11.1767 8.53031 11.1767 8.53032 11.1767C8.62794 11.0791 8.78621 11.0791 8.88385 11.1767C8.88385 11.1767 8.88385 11.1767 8.88385 11.1767L15.6464 17.9393L16 18.2929L16.3535 17.9393L23.1161 11.1767C23.2138 11.0791 23.372 11.0791 23.4696 11.1767L23.8232 11.5303C23.9208 11.628 23.9208 11.7862 23.8232 11.8838L16.1767 19.5303C16.0791 19.628 15.9209 19.628 15.8232 19.5303L8.17674 11.8838C8.17674 11.8838 8.17674 11.8838 8.17674 11.8838C8.07911 11.7862 8.07911 11.628 8.17674 11.5303Z" />
                          </svg>
                      </div>
                  </label>
                  <div className="collapse-content px-0" dangerouslySetInnerHTML={{ __html: collapse.answear }} />
              </div>
          ))}
          </div>
          {bottomTitle && <p class="text-center text-2xl lg:text-[32px] leading-[130%] font-semibold" style={{color: bottomTitleColor}}>{bottomTitle}</p>}
          {bottomCaption && <p class="text-center text-base lg:text-lg font-normal leading-normal mt-3" style={{color: bottomCaptionColor}}>{bottomCaption}</p>}
          <AnimateOnShow divClass="flex flex-wrap items-center justify-center gap-7 mt-5" animation="animate-fade-up" delay={500}>
              {cta.map((button) => {
                if (button.href == '/talkToSpecialist') return <TalkToSpecialistCta
                  showIcon={button.showIcon}
                  underlineText={button.underlineText}
                  text={button.text}
                  ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base cursor-pointer`}
                  style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
                />
                return <a
                  href={button?.href ?? "#"}
                  target={button?.href.includes("http") ? "_blank" : ""}
                  class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center gap-1 border-primary font-bold hover:scale-110 transition-transform text-base`}
                  style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
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