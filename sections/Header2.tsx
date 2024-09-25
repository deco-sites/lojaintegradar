import type { ImageWidget } from "apps/admin/widgets.ts";
import { useScript } from "deco/hooks/useScript.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

const onLoad = () => {
  globalThis.addEventListener("scroll", () => {
    const headerContainer = document.querySelector("#headerContainer") as HTMLElement;
    if (globalThis.scrollY > 0 && headerContainer) {
      headerContainer.classList.remove("bg-opacity-0");
      headerContainer.classList.add("!pt-6");
    } else {
      headerContainer.classList.add("bg-opacity-0");
      headerContainer.classList.remove("!pt-6");
    }
  })
};

/** @title {{text}} */
export interface CTA {
  id?: string;
  href: string;
  text: string;
  outline?: boolean;
}

export interface Nav {
  logo?: {
    src?: ImageWidget;
    alt?: string;
  };
  navigation?: {
    links: {
      label?: string;
      url?: string;
    }[];
    buttons: CTA[];
    mobileButtons: CTA[];
    asideMenuButtons?: CTA[];
  };
}

export default function Header2({
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
    alt: "Logo",
  },
  navigation = {
    links: [
      { label: "Home", url: "/" },
      { label: "About us", url: "/" },
      { label: "Princing", url: "/" },
      { label: "Contact", url: "/" },
    ],
    buttons: [
      { id: "change-me-1", href: "/", text: "Change me", outline: false },
      { id: "change-me-2", href: "/", text: "Change me", outline: true },
    ],
    mobileButtons: [],
  },
}: Nav) {

  return (
    <nav id="headerContainer" class="drawer drawer-end fixed top-0 left-0 z-50 bg-primary-content bg-opacity-0 transition-all duration-300 ease-in-out pt-9 pb-5 ">
      <input id="mobile-drawer-nav" type="checkbox" class="drawer-toggle" />

      {/* main content */}
      <div class="drawer-content mx-auto w-full lg:px-0 px-4 py-0 flex gap-8 items-center justify-between max-w-[1260px] ">

        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
        />

        <a href="/" class="min-w-32 h-5 md:min-w-64 md:h-10">
          <Image src={logo.src || ""} width={257} height={40} alt={logo.alt} class="h-full w-full" />
        </a>

        {/* <div class="hidden items-center justify-between lg:flex w-full"> */}
        <div class="items-center justify-between w-full">
          {/* <ul class="flex"> */}
          <ul class="hidden">
            {navigation.links.map((link) => (
              <li>
                <a
                  href={link.url}
                  aria-label={link.label}
                  class="link no-underline hover:underline p-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul class="flex md:hidden justify-end gap-7">
            {navigation.mobileButtons?.map((item) => (
              <div class="flex items-center">
                <a
                  key={item?.id}
                  id={item?.id}
                  href={item?.href ?? "#"}
                  target={item?.href.includes("http") ? "_blank" : "_self"}
                  class={` ${item.outline ? "" : ""} font-bold text-primary px-4 py-1.5 rounded-md transition-all hover:scale-110 text-xs bg-primary-content bg-opacity-60`}
                >
                  {item?.text}
                </a>
              </div>
            ))}
            <label
              htmlFor="mobile-drawer-nav"
              class="flex btn btn-ghost drawer-button px-0"
            >
              <Icon id="Bars3" size={25} strokeWidth={0.1} class="text-primary fill-current" />
            </label>
          </ul>
          <ul class="hidden md:flex justify-end gap-7">
            {navigation.buttons?.map((item) => (
              <a
                key={item?.id}
                id={item?.id}
                href={item?.href ?? "#"}
                target={item?.href.includes("http") ? "_blank" : "_self"}
                class={`btn btn-primary ${item.outline ? "btn-outline" : ""} font-bold px-7 hover:scale-110 text-lg`}
              >
                {item?.text}
              </a>
            ))}
            <label
              htmlFor="mobile-drawer-nav"
              class="flex btn btn-ghost drawer-button px-0"
            >
              <Icon id="Bars3" size={46} strokeWidth={0.1} class="text-primary fill-current" />
            </label>
          </ul>
        </div>

      </div>

      {/* sidebar */}
      <aside class="drawer-side z-50 overflow-hidden">
        {/* Close when clicking on overlay */}
        <label
          htmlFor="mobile-drawer-nav"
          aria-label="close sidebar"
          class="drawer-overlay"
        />

        <div class="flex flex-col gap-8 min-h-full min-w-64 h-10 bg-base-100 text-base-content">
          <ul class="pt-8 pb-6 pl-4 pr-16 flex items-center flex-wrap gap-3 bg-accent relative">
            <label class="flex justify-center items-center h-8 w-8 cursor-pointer absolute top-10 right-6" aria-label="close sidebar" htmlFor="mobile-drawer-nav">
              <svg xmlns="http://www.w3.org/2000/svg" class="text-primary fill-current" width="25" height="25" viewBox="0 0 25 25">
                <path d="M23.6357 21.4319C23.9528 21.749 24.1309 22.1789 24.1309 22.6273C24.1309 23.0756 23.9528 23.5056 23.6357 23.8226C23.3187 24.1396 22.8888 24.3177 22.4404 24.3177C21.9921 24.3177 21.5621 24.1396 21.2451 23.8226L12.3168 14.8915L3.38574 23.8198C3.06872 24.1368 2.63876 24.3149 2.19043 24.3149C1.7421 24.3149 1.31213 24.1368 0.995115 23.8198C0.678098 23.5027 0.5 23.0728 0.5 22.6245C0.5 22.1761 0.678098 21.7462 0.995115 21.4291L9.92621 12.5009L0.997927 3.56976C0.68091 3.25275 0.502813 2.82278 0.502813 2.37445C0.502813 1.92612 0.68091 1.49615 0.997927 1.17914C1.31494 0.862121 1.74491 0.684023 2.19324 0.684023C2.64157 0.684023 3.07154 0.862121 3.38855 1.17914L12.3168 10.1102L21.2479 1.17773C21.5649 0.860715 21.9949 0.682617 22.4432 0.682617C22.8916 0.682617 23.3215 0.860715 23.6385 1.17773C23.9556 1.49475 24.1337 1.92471 24.1337 2.37304C24.1337 2.82137 23.9556 3.25134 23.6385 3.56836L14.7075 12.5009L23.6357 21.4319Z" />
              </svg>
            </label>
            {navigation.asideMenuButtons?.map((item) => (
              <a
                key={item?.id}
                id={item?.id}
                href={item?.href ?? "#"}
                target={item?.href.includes("http") ? "_blank" : "_self"}
                class={`btn btn-primary ${item.outline ? "btn-outline" : ""} font-bold px-7 hover:scale-110 text-lg`}
              >
                {item?.text}
              </a>
            ))}
          </ul>

          <ul class="menu carousel px-8">
            <div class="flex flex-col">

              {navigation?.links.map((link) => (
                <li class="border-b border-neutral last:border-none">
                  <a
                    href={link.url}
                    aria-label={link.label}
                    class="text-primary hover:text-accent hover:bg-transparent text-base font-semibold flex justify-between py-6 rounded-none"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" class="fill-current" viewBox="0 0 11 20">
                      <path d="M10.6018 10.8967L2.1643 19.3342C1.92654 19.572 1.60407 19.7056 1.26782 19.7056C0.931573 19.7056 0.609098 19.572 0.371336 19.3342C0.133573 19.0965 2.50523e-09 18.774 0 18.4377C-2.50523e-09 18.1015 0.133573 17.779 0.371336 17.5413L7.91341 10.0013L0.373446 2.45923C0.255718 2.3415 0.16233 2.20174 0.0986162 2.04792C0.0349023 1.8941 0.00210902 1.72924 0.00210902 1.56274C0.00210902 1.39625 0.0349023 1.23139 0.0986162 1.07757C0.16233 0.923749 0.255718 0.783986 0.373446 0.666258C0.491174 0.54853 0.630937 0.455143 0.784756 0.391429C0.938575 0.327715 1.10344 0.294922 1.26993 0.294922C1.43642 0.294922 1.60128 0.327715 1.7551 0.391429C1.90892 0.455143 2.04869 0.54853 2.16641 0.666258L10.6039 9.10376C10.7218 9.22148 10.8152 9.3613 10.8789 9.51522C10.9426 9.66913 10.9753 9.83411 10.9751 10.0007C10.9749 10.1673 10.9418 10.3322 10.8778 10.4859C10.8137 10.6397 10.7199 10.7793 10.6018 10.8967Z" />
                    </svg>
                  </a>
                </li>
              ))}
            </div>
          </ul>

        </div>
      </aside>
    </nav>
  );
}
