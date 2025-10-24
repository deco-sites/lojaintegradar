import type { ImageWidget} from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Props as LinkProps } from "site/components/ui/CTA.tsx";
import { useScript } from "@deco/deco/hooks";

const openModalFunction = (modal: string, planId: string,) => {

  if (modal == 'Talk to specialist') {
    const form = document.getElementById("talkToSpecialistPopUpForm") as HTMLElement;
    form.classList.remove("hidden");

    const container = form.querySelector("#talkToSpecialistFormContainer") as HTMLElement;

     if (container.children.length == 0) {
            const script1 = document.createElement('script');
            script1.setAttribute('charset', 'utf-8');
            script1.setAttribute('type', 'text/javascript');
            script1.setAttribute('src', '//js.hsforms.net/forms/embed/v2.js');
            
            script1.onload = () => {
            const script2 = document.createElement('script');
            script2.textContent = `
                hbspt.forms.create({
                region: "na1",
                portalId: "7112881",
                formId: "06d3df52-7c37-4749-aa27-5c7744917d89"
                });
            `;
            container.appendChild(script2);
            };
            container.appendChild(script1);
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
  } else if (modal == 'Komea wait list') {
    const form = document.getElementById("waitlist-form") as HTMLElement;
    form.classList.remove("hidden");

    const komeaWaitListModal = document.getElementById("waitlist-form") as HTMLElement;
    const nameInput = komeaWaitListModal.querySelector('input[name="name"]') as HTMLInputElement;
    nameInput.focus();
  } else if (modal == 'Black Friday Hubspot Form') {
    const form = document.getElementById("blackFridayHubspotForm") as HTMLElement;
    form.classList.remove("hidden");

    const input = form.querySelector('input') as HTMLInputElement;
    input.focus();
    
  }
}

interface IImage {
  src: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

interface Link {
  href?: string;
  openModal?: 'Komea wait list' | 'Talk to specialist' | 'Create Store' | 'Customer Advisory Board Modal' | 'Black Friday Hubspot Form';
  createStorePlanId?: string;
}

interface Props {
  sectionId?: string;
  image: IImage;
  link?: Link;
  containerWidth?: string;
  containerHeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export default function Banner({sectionId, image, link, containerHeight, containerWidth, paddingBottom, paddingTop}: Props) {
  return <div id={sectionId} class="flex justify-center" style={{paddingTop, paddingBottom}}>
    <a style={{width: containerWidth, height: containerHeight}}
      hx-on:click={link?.openModal ? useScript(openModalFunction, link?.openModal, link?.createStorePlanId || '172' || '') : ''}
      href={link?.openModal ? undefined : link?.href}
      aria-label="Banner"
      target={link?.href?.includes("http") ? "_blank" : "_self"}
      class="cursor-pointer">
      <Image
        width={image.width || 1440}
        height={image.height || 449}
        src={image.src}
        alt={image.alt || "Banner"}
        class="h-full w-full object-cover"/>
    </a>
  </div>
}