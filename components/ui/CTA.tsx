import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface IImage {
  src?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface CustomProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  padding?: string;
  letterSpacing?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

/** @title {{text}} */
export interface Props {
  href?: string;
  text?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  borderColor?: string;
  type?: 'Button' | 'Only text';
  size?: 'Large' | 'Medium' | 'Small';
  openModal?: 'Talk to specialist' | 'Create Store' | 'Customer Advisory Board Modal';
  createStorePlanId?: string;
  showIcon?: boolean;
  customIcon?: IImage;
  iconGap?: string;
  singleLine?: boolean;
  customProps?: CustomProps;
}

const openModalFunction = (modal: string, planId: string) => {
  if(modal == 'Talk to specialist') {
    const form = document.getElementById("talkToSpecialistPopUpForm") as HTMLElement;
    form.classList.remove("hidden");
  
    const container = document.getElementById("talkToSpecialistFormContainer") as HTMLElement;
        
        if (container.children.length == 0) {
            const script1 = document.createElement('script');
            script1.setAttribute('charset', 'utf-8');
            script1.setAttribute('type', 'text/javascript');
            script1.setAttribute('src', '//js.hsforms.net/forms/embed/v2.js');
            
            const script2 = document.createElement('script');
            script2.textContent = `
                hbspt.forms.create({
                    region: "na1",
                    portalId: "7112881",
                    formId: "06d3df52-7c37-4749-aa27-5c7744917d89"
                });
            `;
            
            container.appendChild(script1);
            container.appendChild(script2);
        }
  } else if (modal == 'Create Store') {
    const getModal = document.getElementById("createStoreModal");
    const period = null;
    const coupon = null;
    if (getModal) {
        getModal.classList.add("flex");
        getModal.classList.remove("hidden");
        getModal.setAttribute("data-planId", planId ?? "");
        getModal.setAttribute("data-period", period ?? "anual");
        getModal.setAttribute("data-coupon", coupon ?? "");
    }
  } else if (modal == "Customer Advisory Board Modal") {
    const customerAdvisoryBoardModal = document.getElementById("customerAdvisoryBoardModal") as HTMLElement;
    const nameInput = customerAdvisoryBoardModal.querySelector('input[name="name"]') as HTMLInputElement;
    customerAdvisoryBoardModal.style.display = "flex";
    nameInput.focus();
  }

};


export default function CTA({ href = "", text, textColor, backgroundColor, iconGap, borderColor, size = "Medium", type = "Button", singleLine = false, showIcon = false, openModal, createStorePlanId, customIcon, customProps}: Props) {
  const sizeClasses = {
    "Large": "py-4 px-8 text-base font-semibold border",
    "Medium": "py-2 px-8 text-sm font-semibold leading-[171%] border",
    "Small": "py-1 px-6 text-xs font-semibold border leading-loose"
  }

  const iconSizes = {
    "Large": "24",
    "Medium": "16",
    "Small": "16"
  }

  return <a
    hx-on:click={openModal && useScript(openModalFunction, openModal, createStorePlanId || '172')}
    class={`${sizeClasses[size]} rounded-lg hover:scale-110 transition-transform cursor-pointer flex justify-center items-center gap-2.5 text-center ${singleLine && 'whitespace-nowrap'}`}
    style={type == "Button"
      ? { background: backgroundColor, color: textColor, borderColor, gap: iconGap, ...customProps}
      : { color: textColor, border: 'none', padding: 0, gap:iconGap, ...customProps }}
    href={openModal ? undefined : href}
    target={href.includes("http") ? "_blank" : "_self"}>
    {text}
    {showIcon && ( customIcon?.src 
      ? <Image src={customIcon.src} width={customIcon.width || 20} height={customIcon.height || 20} alt={customIcon.alt || "button icon"} /> 
      : <svg xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 25" fill="none" class="inline-block">
      <path d="M9 17.9028L15 11.9028L9 5.90283" stroke={textColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>)}
  </a>
}