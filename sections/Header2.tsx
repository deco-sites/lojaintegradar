import type { ImageWidget, HTMLWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
import CampaignTimer from "../components/CampaignTimerHeader.tsx";
import CreateStoreCta from "site/components/CreateStoreCta.tsx";
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

const onLoad = (backgroundColor?: string, navigation?: Navigation, noScrollBackgroundColor?: string) => {
  globalThis.addEventListener("scroll", () => {
    const headerContainer = document.querySelector("#headerContainer") as HTMLElement;
    if (globalThis.scrollY > 0 && headerContainer) {
      headerContainer.style.background = backgroundColor || 'transparent';
      headerContainer.classList.add("lg:!py-5");
      headerContainer.style.background = backgroundColor || "";

      const createStoreCtaMobile = document.querySelector(".createStoreMobile") as HTMLElement | undefined;
      if (createStoreCtaMobile) {
        createStoreCtaMobile.style.color = navigation?.createStoreCtaMobileOnScrollColors?.textColor || "";
        createStoreCtaMobile.style.background = navigation?.createStoreCtaMobileOnScrollColors?.backgroundColor || "";
        createStoreCtaMobile.style.borderColor = navigation?.createStoreCtaMobileOnScrollColors?.borderColor || "";
      }
    }
    else {
      headerContainer.style.background = noScrollBackgroundColor || 'transparent';
      headerContainer.classList.remove("lg:!py-5");

      const createStoreCtaMobile = document.querySelector(".createStoreMobile") as HTMLElement | undefined;
      if (createStoreCtaMobile) {
        createStoreCtaMobile.style.color = navigation?.createStoreCtaMobile?.textColor || "";
        createStoreCtaMobile.style.background = navigation?.createStoreCtaMobile?.backgroundColor || "";
        createStoreCtaMobile.style.borderColor = navigation?.createStoreCtaMobile?.borderColor || "";
      }
    }
  });
};

/** @title {{text}} {{underlineText}} */
export interface CTA {
  href: string;
  text?: RichText;
  underlineText?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  borderColor?: string;
  ctaStyle?: "button" | "link";
  showIcon?: boolean;
  id?: string;
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
  ctaStyle: "button" | "link";
  showIcon?: boolean;
  order?: number;
}

export interface HeaderMessage {
  show?: boolean;
  text?: RichText;
  font?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  backgroundColor?: string;
  cta?: CTA[];
}

export interface CampaignTimer {
  show?: boolean;
  /** @format color-input */
  noScrollBackgroundColor?: string;
  /** @format color-input */
  backgroundColor?: string;
  /**
   * @title Text
   * @default Time left for a campaign to end with a link
   */
  text?: string;
  /** @format color-input */
  textColor?: string;

  /** @format rich-text */
  expiredText?: string;
  /**
   * @title Expires at date
   * @format datetime
   */
  expiresAt?: string;
  labels?: {
      days?: string;
      hours?: string;
      minutes?: string;
      seconds?: string;
  };
  /** @format color-input */
  labelsColor?: string;
  /** @format color-input */
  numbersColor?: string;
}

export interface Link {
  label?: string;
  url?: string;
}

export interface MenuLink extends Link {
  text?: string;
  openIn?: "current tab" | "new tab";
}

export interface CTAColors {
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  backgroundColor?: string;
  /** @format color-input */
  borderColor?: string;
}

export interface Navigation {
  links: Link[];
  /** @format color-input */
  linksBorderColor?: string;
  /** @format color-input */
  textColor?: string;
  /** @format color-input */
  textHoverColor?: string;
  createStoreCta?: CreateStoreWithPlanCTA;
  buttons: CTA[];
  buttonsHeight?: string;
  createStoreCtaMobile?: CreateStoreWithPlanCTA;
  createStoreCtaMobileOnScrollColors?: CTAColors;
  mobileButtons: CTA[];
  asideCreateStoreCta?: CreateStoreWithPlanCTA;
  asideMenuButtons?: CTA[];
}

/** @title {{title}} */
export interface Menu {
  title: string;
  titleLink?: string;
  links: MenuLink[];
}

export interface DropdownMenus {
  menus: Menu[];
  /** @format color-input */
  titlesTextColor?: string;
  /** @format color-input */
  titlesTextHoverColor?: string;
  /** @format color-input */
  menusBackgroundColor?: string;
  /** @format color-input */
  menusShadowColor?: string;
  /** @format color-input */
  menusTextColor?: string;
  /** @format color-input */
  menusItemsHoverBackgroundColor?: string;
  /** @format color-input */
  menusItemsHoverLineColor?: string;
}

export interface Nav {
  hideSection?: boolean;
  /** @format color-input */
  noScrollBackgroundColor?: string;
  /** @format color-input */
  backgroundColor?: string;
  logo?: {
    src?: ImageWidget;
    alt?: string;
    href?: string;
    height?: number;
    width?: number;
  };
  dropdownMenus?: DropdownMenus;
  navigation?: Navigation;
  hideAsideMenu?: boolean;
  asideMenuOnlyMobile?: boolean;
  /** @format color-input */
  barsColor?: string;
  /** @format color-input */
  asideMenuTopBackgroundColor?: string;
  /** @format color-input */
  asideMenuBackgroundColor?: string;
  /** @format color-input */
  asideMenuCloseIconColor?: string;
  headerMessage?: HeaderMessage;
  campaignTimer?: CampaignTimer;
}
export default function Header2({ logo = {
  src: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
  alt: "Logo",
},
  barsColor, asideMenuTopBackgroundColor, asideMenuBackgroundColor, noScrollBackgroundColor, backgroundColor, dropdownMenus = {menus: []}, asideMenuCloseIconColor, headerMessage, campaignTimer, hideAsideMenu = false,
  navigation, asideMenuOnlyMobile, hideSection }: Nav) {
  if (hideSection) return <></>
  return (
  <header>
    {headerMessage?.show && <div class="h-16" />}
    {campaignTimer?.show && <div class="h-[76px]" />}
    <div class="fixed top-0 left-0 w-full z-50 justify-center ">
      
      {headerMessage?.show && <div class="h-16 w-full bg-primary text-primary-content px-1 lg:px-11 py-2 flex items-center justify-center gap-1" style={{background: headerMessage?.backgroundColor, color: headerMessage?.textColor, fontFamily: headerMessage.font}}>
        <p class="text-xs lg:text-2xl text-center font-semibold leading-[120%] flex items-center justify-center">
          <div class="text-lg lg:text-2xl" dangerouslySetInnerHTML={{__html: headerMessage.text || ""}}/>
          {headerMessage.cta?.map((button) => (<span><a
                href={button?.href ?? "#"}
                target={button?.href.includes("http") ? "_blank" : "_self"}
                class={`ml-1 ${button.ctaStyle != "link" && 'btn btn-primary px-7 ml-4'} inline-flex  items-center gap-1 border-primary font-normal hover:scale-110 transition-transform text-xs lg:text-base`}
                style={button.ctaStyle == "button" ? { backgroundColor: button.backgroundColor, color: button.textColor, borderColor: button.borderColor } : { color: button.textColor }}
              >
                <span class="text-lg lg:text-2xl" dangerouslySetInnerHTML={{__html: button.text || ""}}/>
                {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                </svg>}
              </a></span>))}
        </p>
      </div>}

      {campaignTimer?.show && <div class="min-h-[76px] bg-primary text-primary-content py-2 flex flex-wrap items-center justify-center gap-2.5 lg:gap-7" style={{background: campaignTimer.backgroundColor}}>
        {campaignTimer.text && <p class="text-xs lg:text-base text-primary-content font-semibold leading-[120%]" style={{color: campaignTimer.textColor}}>
          {campaignTimer.text}
        </p>}
        <CampaignTimer {...campaignTimer} labelsColor={campaignTimer.labelsColor} numbersColor={campaignTimer.numbersColor} />
      </div>}

      <nav id="headerContainer" class="drawer drawer-end top-0 left-0 bg-primary-content transition-all duration-300 ease-in-out py-4 lg:py-7 " style={{background: noScrollBackgroundColor || 'transparent'}} >
        <input id="mobile-drawer-nav" type="checkbox" class="drawer-toggle" />

        {/* main content */}
        <div class="drawer-content mx-auto w-full lg:px-0 px-4 py-0 flex gap-8 items-center justify-between max-w-[1305px]">

          <script type="module" dangerouslySetInnerHTML={{ __html: useScript(onLoad, backgroundColor, navigation, noScrollBackgroundColor) }} />

          <a href={logo.href || "/"} class="w-28 h-5 md:w-auto md:h-10 flex items-center">
            <Image src={logo.src || ""} width={logo.width || 257} height={logo.height || 40} alt={logo.alt || "header logo"} />
          </a>
          
          <ul class="hidden lg:flex items-center gap-10 text-sm flex-wrap" style={{color: dropdownMenus.titlesTextColor}}>
            {dropdownMenus.menus.map(menu => (
              <li class="relative group h-full" hx-on={`mouseleave: this.children[0].style.color='${dropdownMenus.titlesTextColor}'; this.children[1]?.classList.remove('animate-fade-in')`}>
                <a 
                  href={menu.titleLink} 
                  class={`text-center flex gap-2 items-start ${!menu.titleLink && 'cursor-default'}`}
                  hx-on={`mouseenter: this.style.color='${dropdownMenus.titlesTextHoverColor}'; this.parentElement.children[1]?.classList.add('animate-fade-in');`}
                  target={menu?.titleLink?.includes("http") ? "_blank" : "_self"}
                  >
                  {menu.title}
                  {menu.links.length > 0 && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" class="fill-current mt-2 group-hover:rotate-180 transition-all duration-300">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L4.29289 4.29289C4.68342 4.68342 5.31658 4.68342 5.70711 4.29289L10 0" />
                  </svg>}
                </a>
                {menu.links.length > 0 && <div 
                  class="p-6 top-full left-0 invisible group-hover:visible absolute z-50 w-[552px] flex flex-wrap rounded-lg" 
                  style={{background: dropdownMenus.menusBackgroundColor, color: dropdownMenus.menusTextColor, boxShadow: `0 16px 40px ${dropdownMenus.menusShadowColor}`, animationDuration: '300ms'}}>
                  {menu.links.map(link => (
                    <a 
                      class="max-w-[252px] min-h-[125px]" 
                      href={link.url} target={link.openIn == "new tab" ? "_blank" : "_self"}
                      hx-on={`mouseleave: this.children[0].style.background='none'; this.children[0].children[0].style.background='none'`}
                      >
                      <div 
                        class="relative px-7 py-5 transition-colors rounded-lg h-full" 
                        hx-on={`mouseenter: this.style.background='${dropdownMenus.menusItemsHoverBackgroundColor}'; this.children[0].style.background='${dropdownMenus.menusItemsHoverLineColor}'`}>
                        <div class="absolute w-1.5 h-[74px] top-6 left-0 rounded-tr-3xl rounded-br-3xl transition-colors" />
                        <p class="mb-1 font-semibold">{link.label}</p>
                        <p>{link.text}</p>
                      </div>
                    </a>
                  ))}
                </div>}
              </li>
            ))}
          </ul>

          <div class="items-center justify-between">
            <ul class="flex md:hidden justify-end gap-4" >
            <div class="flex items-center gap-4">
              {navigation?.createStoreCtaMobile?.text && <CreateStoreCta 
                period="anual"
                planId={navigation.createStoreCtaMobile.planId}
                text={navigation.createStoreCtaMobile.text}
                showIcon={navigation.createStoreCtaMobile.showIcon}
                underlineText={navigation.createStoreCtaMobile.underlineText}
                ctaClass={` font-bold text-primary px-4 py-1.5 rounded-md transition-all hover:scale-110 text-xs bg-primary-content bg-opacity-60 border cursor-pointer createStoreMobile`}
                style={navigation.createStoreCtaMobile.ctaStyle == "button" 
                  ? { background: navigation.createStoreCtaMobile.backgroundColor, color: navigation.createStoreCtaMobile.textColor, borderColor: navigation.createStoreCtaMobile.borderColor, order: navigation.createStoreCtaMobile.order } 
                  : { color: navigation.createStoreCtaMobile.textColor, order: navigation.createStoreCtaMobile.order }}
              />}
              {navigation?.mobileButtons?.map((button, index) => {
                return <a
                  href={button?.href ?? "#"}
                  target={button?.href.includes("http") ? "_blank" : "_self"}
                  class={` font-bold text-primary px-4 py-1.5 rounded-md transition-all hover:scale-110 text-xs bg-primary-content bg-opacity-60 border`}
                  style={button.ctaStyle == "button" ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                >
                  <div dangerouslySetInnerHTML={{__html: button.text || ""}}/>
                  {button.underlineText && <span class="underline">{button.underlineText}</span>}
                  {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                  </svg>}
                </a>
              })}
              </div>
              {!hideAsideMenu && <label htmlFor="mobile-drawer-nav" class={`btn btn-ghost drawer-button px-0`}>
                {/* <Icon id="Bars3" size={25} strokeWidth={0.1} class="text-primary fill-current" style={{color: barsColor}} /> */}
                <svg xmlns="http://www.w3.org/2000/svg" size={25} width={25} viewBox="0 0 20 20"  class="fill-current" style={{color: barsColor}}>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5.00033C2.5 4.54009 2.8731 4.16699 3.33333 4.16699H16.6667C17.1269 4.16699 17.5 4.54009 17.5 5.00033C17.5 5.46056 17.1269 5.83366 16.6667 5.83366H3.33333C2.8731 5.83366 2.5 5.46056 2.5 5.00033ZM2.5 10.0003C2.5 9.54009 2.8731 9.16699 3.33333 9.16699H16.6667C17.1269 9.16699 17.5 9.54009 17.5 10.0003C17.5 10.4606 17.1269 10.8337 16.6667 10.8337H3.33333C2.8731 10.8337 2.5 10.4606 2.5 10.0003ZM2.5 15.0003C2.5 14.5401 2.8731 14.167 3.33333 14.167H16.6667C17.1269 14.167 17.5 14.5401 17.5 15.0003C17.5 15.4606 17.1269 15.8337 16.6667 15.8337H3.33333C2.8731 15.8337 2.5 15.4606 2.5 15.0003Z" />
                </svg>

              </label>}
            </ul>
            <ul class="hidden md:flex justify-end gap-7 flex-wrap">
              {navigation?.createStoreCta?.text && <CreateStoreCta 
                period="anual"
                planId={navigation.createStoreCta.planId}
                showIcon={navigation.createStoreCta.showIcon}
                text={navigation.createStoreCta.text}
                underlineText={navigation.createStoreCta.underlineText}
                ctaClass={`${navigation.createStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} ${navigation.buttonsHeight && 'min-h-0'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                style={navigation.createStoreCta.ctaStyle == "button" 
                  ? { backgroundColor: navigation.createStoreCta.backgroundColor, color: navigation.createStoreCta.textColor, borderColor: navigation.createStoreCta.borderColor, height: navigation.buttonsHeight, order: navigation.createStoreCta.order } 
                  : { color: navigation.createStoreCta.textColor, height: navigation.buttonsHeight, order: navigation.createStoreCta.order }}
              />}
              {navigation?.buttons?.map((button, index) => {
                if (button.href == "/talkToSpecialist") return <TalkToSpecialistCta 
                  showIcon={button.showIcon}
                  underlineText={button.underlineText}
                  text={button.text}
                  ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} ${navigation.buttonsHeight && 'min-h-0'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                  style={button.ctaStyle == "button" 
                    ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, height: navigation.buttonsHeight , order: index + 1 } 
                    : { color: button.textColor, height: navigation.buttonsHeight, order: index + 1 }}
                />

                return <a
                  href={button?.href ?? "#"}
                  target={button?.href.includes("http") ? "_blank" : "_self"}
                  class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} ${navigation.buttonsHeight && 'min-h-0'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                  style={button.ctaStyle == "button" 
                    ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, height: navigation.buttonsHeight , order: index + 1 } 
                    : { color: button.textColor, height: navigation.buttonsHeight, order: index + 1 }}
                >
                  <div dangerouslySetInnerHTML={{__html: button.text || ""}}/>
                  {button.underlineText && <span class="underline">{button.underlineText}</span>}
                  {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                  </svg>}
                </a>
              })}
              {!hideAsideMenu && <label htmlFor="mobile-drawer-nav" class={`flex btn btn-ghost drawer-button px-0 order-last ${asideMenuOnlyMobile && 'lg:hidden'}`}>
                {/* <Icon id="Bars3" size={46} strokeWidth={0.1} class="text-primary fill-current" style={{ color: barsColor }} /> */}
                <svg size={46} width={46} strokeWidth={0.1} class="text-primary fill-current" viewBox="0 0 20 20"  style={{ color: barsColor }}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5.00033C2.5 4.54009 2.8731 4.16699 3.33333 4.16699H16.6667C17.1269 4.16699 17.5 4.54009 17.5 5.00033C17.5 5.46056 17.1269 5.83366 16.6667 5.83366H3.33333C2.8731 5.83366 2.5 5.46056 2.5 5.00033ZM2.5 10.0003C2.5 9.54009 2.8731 9.16699 3.33333 9.16699H16.6667C17.1269 9.16699 17.5 9.54009 17.5 10.0003C17.5 10.4606 17.1269 10.8337 16.6667 10.8337H3.33333C2.8731 10.8337 2.5 10.4606 2.5 10.0003ZM2.5 15.0003C2.5 14.5401 2.8731 14.167 3.33333 14.167H16.6667C17.1269 14.167 17.5 14.5401 17.5 15.0003C17.5 15.4606 17.1269 15.8337 16.6667 15.8337H3.33333C2.8731 15.8337 2.5 15.4606 2.5 15.0003Z" />
                </svg>
              </label>}
            </ul>
          </div>

        </div>

        {/* sidebar */}
        <aside class="drawer-side z-50 overflow-hidden"> 
          {/* Close when clicking on overlay */}
          <label htmlFor="mobile-drawer-nav" aria-label="close sidebar" class="drawer-overlay" />

          <div class="flex flex-col gap-8 min-h-full min-w-64 h-10 bg-base-100 text-base-content" style={{ background: asideMenuBackgroundColor }}>
            <ul class="pt-8 pb-6 pl-4 pr-16 flex items-center flex-wrap gap-3 bg-accent relative" style={{ background: asideMenuTopBackgroundColor }}>
              <label class="flex justify-center items-center h-8 w-8 cursor-pointer absolute top-10 right-6" aria-label="close sidebar" htmlFor="mobile-drawer-nav">
                <svg xmlns="http://www.w3.org/2000/svg" class="text-primary fill-current" style={{color: asideMenuCloseIconColor}} width="25" height="25" viewBox="0 0 25 25">
                  <path d="M23.6357 21.4319C23.9528 21.749 24.1309 22.1789 24.1309 22.6273C24.1309 23.0756 23.9528 23.5056 23.6357 23.8226C23.3187 24.1396 22.8888 24.3177 22.4404 24.3177C21.9921 24.3177 21.5621 24.1396 21.2451 23.8226L12.3168 14.8915L3.38574 23.8198C3.06872 24.1368 2.63876 24.3149 2.19043 24.3149C1.7421 24.3149 1.31213 24.1368 0.995115 23.8198C0.678098 23.5027 0.5 23.0728 0.5 22.6245C0.5 22.1761 0.678098 21.7462 0.995115 21.4291L9.92621 12.5009L0.997927 3.56976C0.68091 3.25275 0.502813 2.82278 0.502813 2.37445C0.502813 1.92612 0.68091 1.49615 0.997927 1.17914C1.31494 0.862121 1.74491 0.684023 2.19324 0.684023C2.64157 0.684023 3.07154 0.862121 3.38855 1.17914L12.3168 10.1102L21.2479 1.17773C21.5649 0.860715 21.9949 0.682617 22.4432 0.682617C22.8916 0.682617 23.3215 0.860715 23.6385 1.17773C23.9556 1.49475 24.1337 1.92471 24.1337 2.37304C24.1337 2.82137 23.9556 3.25134 23.6385 3.56836L14.7075 12.5009L23.6357 21.4319Z" />
                </svg>
              </label>
              {navigation?.asideCreateStoreCta?.text && <CreateStoreCta 
                period="anual"
                planId={navigation.asideCreateStoreCta.planId}
                showIcon={navigation.asideCreateStoreCta.showIcon}
                text={navigation.asideCreateStoreCta.text}
                underlineText={navigation.asideCreateStoreCta.underlineText}
                ctaClass={`${navigation.asideCreateStoreCta.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                style={navigation.asideCreateStoreCta.ctaStyle == "button" 
                  ? { backgroundColor: navigation.asideCreateStoreCta.backgroundColor, color: navigation.asideCreateStoreCta.textColor, borderColor: navigation.asideCreateStoreCta.borderColor, order: navigation.asideCreateStoreCta.order } 
                  : { color: navigation.asideCreateStoreCta.textColor, order: navigation.asideCreateStoreCta.order }}
              />}
              {navigation?.asideMenuButtons?.map((button, index) => {
                if (button.href == "/talkToSpecialist") return <TalkToSpecialistCta 
                  showIcon={button.showIcon}
                  underlineText={button.underlineText}
                  text={button.text}
                  ctaClass={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                  style={button.ctaStyle == "button" ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                />

                return <a
                  href={button?.href ?? "#"}
                  target={button?.href.includes("http") ? "_blank" : "_self"}
                  class={`${button.ctaStyle != "link" && 'btn btn-primary px-7'} flex items-center self-start gap-1 border-primary font-bold hover:scale-110 transition-transform text-lg`}
                  style={button.ctaStyle == "button" ? { background: button.backgroundColor, color: button.textColor, borderColor: button.borderColor, order: index + 1 } : { color: button.textColor, order: index + 1 }}
                >
                  <div dangerouslySetInnerHTML={{__html: button.text || ""}}/>
                  {button.underlineText && <span class="underline">{button.underlineText}</span>}
                  {button.showIcon && <svg width="20" height="20" viewBox="0 0 20 20" class="fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3941 4.50977V12.2285C15.3941 12.386 15.3316 12.537 15.2202 12.6484C15.1089 12.7597 14.9579 12.8223 14.8004 12.8223C14.6429 12.8223 14.4919 12.7597 14.3805 12.6484C14.2692 12.537 14.2066 12.386 14.2066 12.2285V5.94293L5.72046 14.4298C5.60905 14.5413 5.45794 14.6038 5.30038 14.6038C5.14282 14.6038 4.99171 14.5413 4.8803 14.4298C4.76889 14.3184 4.7063 14.1673 4.7063 14.0098C4.7063 13.8522 4.76889 13.7011 4.8803 13.5897L13.3672 5.10352H7.08163C6.92416 5.10352 6.77313 5.04096 6.66178 4.92961C6.55043 4.81826 6.48788 4.66724 6.48788 4.50977C6.48788 4.35229 6.55043 4.20127 6.66178 4.08992C6.77313 3.97857 6.92416 3.91602 7.08163 3.91602H14.8004C14.9579 3.91602 15.1089 3.97857 15.2202 4.08992C15.3316 4.20127 15.3941 4.35229 15.3941 4.50977Z" />
                  </svg>}
                </a>
              })}
            </ul>

            <ul class="menu carousel px-8">
              <ul class="flex flex-col">
              {dropdownMenus.menus.map(menu => {
                if (menu.titleLink) return <a href={menu.titleLink} class="p-4 shadow-spreaded font-semibold text-sm rounded-2xl mb-5 text-center" style={{background: dropdownMenus.menusBackgroundColor, color: dropdownMenus.menusTextColor}}>
                  {menu.title}
                </a>
                return (
                <div className="collapse bg-base-200 shadow-spreaded mb-7">
                <input type="checkbox" class="!min-h-0 !p-4" hx-on:change={useScript(onChange)}/>
                <div 
                  className="collapse-title font-semibold text-sm !min-h-0 !p-4 text-center flex justify-between" 
                  style={{background: dropdownMenus.menusBackgroundColor, color: dropdownMenus.menusTextColor}}>
                  <div />
                  {menu.title}
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" class="fill-current mt-2 group-hover:rotate-180 transition-all duration-300 collapse-arrow">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L4.29289 4.29289C4.68342 4.68342 5.31658 4.68342 5.70711 4.29289L10 0" />
                  </svg>
                </div>
                <div className="collapse-content" style={{background: dropdownMenus.menusBackgroundColor, color: dropdownMenus.menusTextColor}}>
                {menu.links.map(link => (
                      <a class="block text-center mb-5" href={link.url} target={link.openIn == "new tab" ? "_blank" : "_self"}>
                        {link.label}
                      </a>
                    ))}
                </div>
              </div>
              )})}
                {navigation?.links.map((link) => (<li class="border-b border-neutral last:border-none" style={{ borderColor: navigation.linksBorderColor }} hx-on={`mouseleave: this.children[0].style.color='${navigation.textColor}'`} >
                  <a href={link.url} aria-label={link.label} class="text-primary hover:text-accent hover:bg-transparent  text-base font-semibold flex justify-between py-6 rounded-none" style={{ color: navigation.textColor }} hx-on={`mouseenter: this.style.color='${navigation.textHoverColor}'`} >
                    <div class="w-full flex justify-between" hx-on:click="document.getElementById('mobile-drawer-nav').checked = false;">
                      {link.label}
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" class="fill-current" viewBox="0 0 11 20">
                        <path d="M10.6018 10.8967L2.1643 19.3342C1.92654 19.572 1.60407 19.7056 1.26782 19.7056C0.931573 19.7056 0.609098 19.572 0.371336 19.3342C0.133573 19.0965 2.50523e-09 18.774 0 18.4377C-2.50523e-09 18.1015 0.133573 17.779 0.371336 17.5413L7.91341 10.0013L0.373446 2.45923C0.255718 2.3415 0.16233 2.20174 0.0986162 2.04792C0.0349023 1.8941 0.00210902 1.72924 0.00210902 1.56274C0.00210902 1.39625 0.0349023 1.23139 0.0986162 1.07757C0.16233 0.923749 0.255718 0.783986 0.373446 0.666258C0.491174 0.54853 0.630937 0.455143 0.784756 0.391429C0.938575 0.327715 1.10344 0.294922 1.26993 0.294922C1.43642 0.294922 1.60128 0.327715 1.7551 0.391429C1.90892 0.455143 2.04869 0.54853 2.16641 0.666258L10.6039 9.10376C10.7218 9.22148 10.8152 9.3613 10.8789 9.51522C10.9426 9.66913 10.9753 9.83411 10.9751 10.0007C10.9749 10.1673 10.9418 10.3322 10.8778 10.4859C10.8137 10.6397 10.7199 10.7793 10.6018 10.8967Z" />
                      </svg>
                    </div>
                  </a>
                </li>))}
              </ul>
            </ul>
          </div>
        </aside>
      </nav>
    </div>

    <div dangerouslySetInnerHTML={{__html: `
      <!-- Start VWO Async SmartCode -->
      <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
      <script type='text/javascript' id='vwoCode'>
      window._vwo_code || (function() {
      var account_id=750929,
      version=2.1,
      settings_tolerance=2000,
      hide_element='body',
      hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important;',
      /* DO NOT EDIT BELOW THIS LINE */
      f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='_vwo_'+account_id+'_settings',cc={};try{var c=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=c&&typeof c==='object'?c:{}}catch(e){}var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={nonce:v&&v.nonce,use_existing_jquery:function(){return typeof use_existing_jquery!=='undefined'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}v&&t.setAttribute('nonce',v.nonce);d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){var n=this.getSettings(),i=d.createElement('script'),r=this;t=t||{};if(n){i.textContent=n;d.getElementsByTagName('head')[0].appendChild(i);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200||o.status===304){_vwo_code.addScript({text:o.responseText})}else{_vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}_vwo_code.finish('&e=loading_failure:'+e)};o.send()}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){_vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var n=this.hide_element(),i=n?n+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=i;else t.appendChild(d.createTextNode(i));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var i=d.createElement('div');i.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;display: block !important;';i.setAttribute('id','_vis_opt_path_hides');i.classList.add('_vis_hide_layer');t.parentNode.insertBefore(i,t.nextSibling)}var o=window._vis_opt_url||d.URL,s='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(o)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:s})}else{this.load(s+'&x=true')}}};w._vwo_code=code;code.init();})();
      </script>
      <!-- End VWO Async SmartCode -->
    `}}/>
  </header>
  );
}
